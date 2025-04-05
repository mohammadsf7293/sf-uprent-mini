import { writable } from 'svelte/store';
import { isChromeEnvironment, getDataFromChromeStorage, setDataToChromeStorage, isUprentExtensionInstalled } from './utils';

const storageKey = 'addresses';

// Create a writable store for addresses
export const addresses = writable<string[]>([]);

const syncDataWithExtension = async () => {
  const chromeAddresses = await getDataFromChromeStorage(storageKey);
  const storedAddresses = localStorage.getItem(storageKey);
  if (chromeAddresses) {
    addresses.set(chromeAddresses);
  } else if (storedAddresses && !chromeAddresses) {
    // The case when the extension has just been installed, and we need to migrate the data to extension storage
    addresses.set(JSON.parse(storedAddresses));
    // Set the addresses in Chrome storage
    await setDataToChromeStorage(storageKey, JSON.parse(storedAddresses));
  }
}

let firstSubscribed = true;
// Subscribe to changes and update storage
addresses.subscribe(async value => {
  if (typeof window !== 'undefined') {
    // localStorage.setItem(storageKey, JSON.stringify(value));

    // Also sync with Chrome storage if extension is installed
    const extensionInstalled = await isUprentExtensionInstalled();
    if (extensionInstalled) {
      if (firstSubscribed) {
        syncDataWithExtension();
        firstSubscribed = false;
      } else {
        await setDataToChromeStorage(storageKey, value);
      }
    } else {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }
  }
});

// Initialize from storage if available
if (typeof window !== 'undefined') {
  const isChrome = isChromeEnvironment();
  if (isChrome) {
    isUprentExtensionInstalled().then(async extensionInstalled => {
      if (extensionInstalled) {
        window.addEventListener("visibilitychange", async () => {
          if (!document.hidden) {
              syncDataWithExtension().then(() => {
              console.log('synced data with extension');
            });
          }
        });
        
        syncDataWithExtension();
      }
    });
  }

  // Fallback to localStorage if Chrome storage is not available
  const storedAddresses = localStorage.getItem(storageKey);
  if (storedAddresses) {
    try {
      const parsedAddresses = JSON.parse(storedAddresses);
      addresses.set(parsedAddresses);
    } catch (e) {
      console.error('Failed to parse stored addresses:', e);
    }
  }
} 
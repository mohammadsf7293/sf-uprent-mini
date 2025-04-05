import { writable } from 'svelte/store';
import { isChromeEnvironment, getDataFromChromeStorage, setDataToChromeStorage, isUprentExtensionInstalled } from './utils';

const storageKey = 'addresses';

// Create a writable store for addresses
export const addresses = writable<string[]>([]);

const syncDataWithExtension = async () => {
  const chromeAddresses = await getDataFromChromeStorage(storageKey);
  const storedAddresses = localStorage.getItem(storageKey);
  if (chromeAddresses && chromeAddresses.length > 0) {
    addresses.set(chromeAddresses);
  } else if (storedAddresses && storedAddresses.length > 0) {
    // The case when the extension has just been installed, and we need to migrate the data to extension storage
    addresses.set(JSON.parse(storedAddresses));
  }
}

let firstSubscribed = true;
// Subscribe to changes and update storage
addresses.subscribe(async value => {
  if (typeof window !== 'undefined') {
    // Syncing with Chrome storage if extension is installed
    if (firstSubscribed) {
      await syncDataWithExtension();
      firstSubscribed = false;
    } else {
      const extensionInstalled = await isUprentExtensionInstalled();
      if (extensionInstalled) {
          await setDataToChromeStorage(storageKey, value);
      }

      // Also storing data to localStorage as a backup
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
                console.log('synced addresses data with extension');
            });
          }
        });
      }
    });
  }
}
import { writable } from 'svelte/store';
import { isChromeEnvironment, getDataFromChromeStorage, setDataToChromeStorage, isUprentExtensionInstalled } from './utils';

// Create a writable store for max durations
const storageKey = 'maxDurations';
const defaultMaxDurations = {
  walking: 30,
  biking: 20,
  driving: 15,
  transit: 25
};
export const maxDurations = writable<Record<string, number>>(defaultMaxDurations);


const syncDataWithExtension = async () => {
  const chromeMaxDurations = await getDataFromChromeStorage(storageKey);
  const locallyStoredMaxDurations = localStorage.getItem(storageKey);
  if (chromeMaxDurations) {
    maxDurations.set(chromeMaxDurations);
  } else if (locallyStoredMaxDurations && !chromeMaxDurations) {
    // The case when the extension has just been installed, and we need to migrate the data to extension storage
    maxDurations.set(JSON.parse(locallyStoredMaxDurations));
    // Set the addresses in Chrome storage
    await setDataToChromeStorage(storageKey, JSON.parse(locallyStoredMaxDurations));
  }
}

let firstSubscribed = true;
// Subscribe to changes and update storage
maxDurations.subscribe(async value => {
  if (typeof window !== 'undefined') {
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
  } else {
    // Fallback to localStorage if Chrome storage is not available
    const storedMaxDurations = localStorage.getItem(storageKey);
    if (storedMaxDurations) {
        try {
        const parsedMaxDurations = JSON.parse(storedMaxDurations);
        maxDurations.set(parsedMaxDurations);
        } catch (e) {
            console.error('Failed to parse stored max durations:', e);
        }
    } 
  }
} 
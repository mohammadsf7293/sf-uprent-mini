import { writable } from 'svelte/store';

// Create a writable store for addresses
export const addresses = writable<string[]>([]);

// Function to check if we're in Chrome and if our extension is installed
function isChromeEnvironment() {
  var isChromium = window.chrome;
  var winNav = window.navigator;
  var vendorName = winNav.vendor;
  var isOpera = typeof window.opr !== "undefined";
  var isFirefox = winNav.userAgent.indexOf("Firefox") > -1;
  var isIEedge = winNav.userAgent.indexOf("Edg") > -1;

  var isGoogleChrome = isChromium !== null
    && typeof isChromium !== "undefined"
    && vendorName === "Google Inc."
    && isOpera === false
    && isIEedge === false
    && (typeof winNav.userAgentData === "undefined" || winNav.userAgentData.brands.some(x => x.brand === "Google Chrome"));


  console.log('Environment check:');
  console.log('WinNav: ', winNav);
  console.log('VendorName: ', vendorName);
  console.log('IsOpera: ', isOpera);
  console.log('IsFirefox: ', isFirefox);
  console.log('IsIEedge: ', isIEedge);
  console.log('IsGoogleChrome: ', isGoogleChrome);
  console.log('- Is Chrome:', isGoogleChrome);
  console.log('- Extension ID:', chrome.runtime?.id);

  return isGoogleChrome;
}

// Function to check if uprent extensions is installed
async function isUprentExtensionInstalled() {
  if (typeof chrome === 'undefined' || !chrome.runtime) {
    console.log('Chrome runtime not available');
    return false;
  }

  const extensionId = "nnjokgfpoecefilcbmcinacgmefmdabl";
  
  try {
    const reply = await new Promise((resolve) => {
      chrome.runtime.sendMessage(extensionId, { message: "getVersion" }, (response) => {
        resolve(response);
      });
    });

    console.log('Extension check reply:', reply);
    return !!reply;
  } catch (error) {
    console.log('Error checking extension:', error);
    return false;
  }
}

// Check environment on store initialization
if (typeof window !== 'undefined') {
  const isChrome = isChromeEnvironment();
  console.log('isChrome: ', isChrome);
  if (isChrome) {
    isUprentExtensionInstalled().then(extensionInstalled => {
      console.log('extensionInstalled: ', extensionInstalled);
    });
  }

  // checkExtensionEnvironment();
}

// Initialize from storage if available
if (typeof window !== 'undefined') {
  const storedAddresses = localStorage.getItem('addresses');
  if (storedAddresses) {
    try {
      const parsedAddresses = JSON.parse(storedAddresses);
      addresses.set(parsedAddresses);
    } catch (e) {
      console.error('Failed to parse stored addresses:', e);
    }
  }
}

// Subscribe to changes and update storage
addresses.subscribe(value => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('addresses', JSON.stringify(value));
  }
}); 
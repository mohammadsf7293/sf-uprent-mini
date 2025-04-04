// Function to check if we're in Chrome and if our extension is installed
export function isChromeEnvironment() {
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
  
    return isGoogleChrome;
  }
  
// Function to check if uprent extensions is installed
export async function isUprentExtensionInstalled(): Promise<boolean> {
    return new Promise((resolve) => {
      // Set a timeout to resolve false if no response is received
      const timeout = setTimeout(() => {
        resolve(false);
      }, 1000);
  
      // Listen for the pong response
      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === 'uprent-extension-pong') {
          console.log('content-script response received pong!')
          window.removeEventListener('message', messageHandler);
          clearTimeout(timeout);
          resolve(true);
        }
      };
  
      window.addEventListener('message', messageHandler);
  
      // Send the ping
      window.postMessage({ type: 'uprent-extension-ping' }, '*');
    });
  }
  
  // Storage methods
  export async function getDataFromChromeStorage(key: string): Promise<any> {
    return new Promise((resolve) => {
      // Set a timeout to resolve null if no response is received
      const timeout = setTimeout(() => {
        resolve(null);
      }, 1000);
  
      // Listen for the storage response
      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === 'STORAGE_DATA_RESPONSE' && event.data.key === key) {
          window.removeEventListener('message', messageHandler);
          clearTimeout(timeout);
          resolve(event.data.data);
        }
      };
  
      window.addEventListener('message', messageHandler);
  
      // Send the storage request
      window.postMessage({ type: 'GET_STORAGE_DATA', key }, '*');
    });
  }
  
  export async function setDataToChromeStorage(key: string, value: any): Promise<boolean> {
    return new Promise((resolve) => {
      // Set a timeout to resolve false if no response is received
      const timeout = setTimeout(() => {
        resolve(false);
      }, 1000);
  
      // Listen for the storage response
      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === 'STORAGE_DATA_RESPONSE' && event.data.key === key) {
          window.removeEventListener('message', messageHandler);
          clearTimeout(timeout);
          resolve(event.data.success);
        }
      };
  
      window.addEventListener('message', messageHandler);
  
      // Send the storage request
      window.postMessage({ type: 'SET_STORAGE_DATA', key, value }, '*');
    });
  }
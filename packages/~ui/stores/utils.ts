// Function to check if we're in Chrome and if our extension is installed
export function isChromeEnvironment(): boolean {
  const winNav = window.navigator;
  const vendorName = winNav.vendor;
  const isOpera = typeof (window as any).opr !== "undefined";
  const isFirefox = winNav.userAgent.indexOf("Firefox") > -1;
  const isIEedge = winNav.userAgent.indexOf("Edge") > -1;

  return Boolean(
    vendorName === "Google Inc."
      && !isOpera
      && !isFirefox
      && !isIEedge
      && (
        typeof (winNav as any).userAgentData === "undefined" 
        || (winNav as any).userAgentData?.brands?.some((x: { brand: string }) => x.brand === "Google Chrome")
      )
  );
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
        if (event.data.type === 'PONG_UPRENT_EXTENSION') {
          console.log('content-script response received pong!')
          window.removeEventListener('message', messageHandler);
          clearTimeout(timeout);
          resolve(true);
        }
      };
  
      window.addEventListener('message', messageHandler);
  
      // Send the ping
      window.postMessage({ type: 'PING_UPRENT_EXTENSION' }, '*');
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
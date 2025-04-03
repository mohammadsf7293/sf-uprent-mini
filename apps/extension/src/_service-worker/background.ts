import api from '~api'

// Storage methods
async function getStorageData(key: string) {
  try {
    const result = await chrome.storage.local.get(key);
    return result[key];
  } catch (error) {
    console.error('Error getting storage data:', error);
    return null;
  }
}

async function setStorageData(key: string, value: any) {
  try {
    await chrome.storage.local.set({ [key]: value });
    return true;
  } catch (error) {
    console.error('Error setting storage data:', error);
    return false;
  }
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_STORAGE_DATA') {
    console.log('BACKGROUND_GET_STORAGE_DATA', request.key);
    getStorageData(request.key).then(response => {
      console.log('BACKGROUND_GET_STORAGE_DATA2', request.key, response);
      sendResponse(response);
    });
    return true; // Will respond asynchronously
  }
  
  if (request.type === 'SET_STORAGE_DATA') {
    console.log('BACKGROUND_SET_STORAGE_DATA', request.key, request.value);
    setStorageData(request.key, request.value).then(sendResponse);
    return true; // Will respond asynchronously
  }
  
  if (request.action === "fetchDurations") {
    api.commute.durations.post({ address: request.address })
      .then(response => {
        sendResponse({ success: true, data: response.data })
      })
      .catch(error => {
        sendResponse({ success: false, error })
      })
    return true // Keep message channel open for async response
  }
})

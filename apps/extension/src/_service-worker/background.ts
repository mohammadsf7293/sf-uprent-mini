import api from '~api'

// Storage methods
interface Message {
  action?: string;
  type?: string;
  key?: string;
  value?: unknown;
  addresses?: string[];
  data?: unknown;
}

interface Response {
  success: boolean;
  data?: unknown;
  error?: string;
}

interface ChromeMessageSender {
  tab?: chrome.tabs.Tab;
  frameId?: number;
  id?: string;
  url?: string;
  tlsChannelId?: string;
}

type MessageResponse = (response: unknown) => void;

const defaultMaxDurations = {
  walking: 30,
  biking: 20,
  driving: 15,
  transit: 25,
};

async function getStorageData<T>(key: string): Promise<T | undefined> {
  const result = await chrome.storage.local.get(key);
  return result[key];
}

async function setStorageData<T>(key: string, value: T): Promise<void> {
  await chrome.storage.local.set({ [key]: value });
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message: Message, sender: ChromeMessageSender, sendResponse: MessageResponse) => {
  if (message.type === 'GET_STORAGE_DATA') {
    if (!message.key) {
      sendResponse(null);
      return true;
    }
    getStorageData(message.key).then(response => {
      sendResponse(response);
    });
    return true;
  }
  
  if (message.type === 'SET_STORAGE_DATA') {
    if (!message.key || message.value === undefined) {
      sendResponse(null);
      return true;
    }
    setStorageData(message.key, message.value).then(sendResponse);
    return true;
  }
  
  if (message.action === "FETCH_DURATIONS") {
    if (!message.addresses || message.addresses.length === 0) {
      sendResponse({ success: false, error: 'No addresses provided' });
      return true;
    }
    api.commute.durations.post({ addresses: message.addresses })
      .then(response => {
        sendResponse({ success: true, data: response.data } as Response);
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message } as Response);
      });
    return true;
  }
})

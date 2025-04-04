// Listen for messages from the webpage
window.addEventListener('message', (event) => {
  // Make sure the message is from the same window
  if (event.source === window) {
    console.log('Content script received message:', event.data)
    
    // Handle different message types
    switch (event.data.type) {
      case 'uprent-extension-ping':
        console.log('Received extension ping')
        // Respond immediately to confirm extension is installed
        window.postMessage({ type: 'uprent-extension-pong' }, '*')
        break
        
      case 'GET_STORAGE_DATA':
        // Forward to background script
        chrome.runtime.sendMessage({
          type: 'GET_STORAGE_DATA',
          key: event.data.key
        }, response => {
          // Send response back to webpage
          window.postMessage({
            type: 'STORAGE_DATA_RESPONSE',
            key: event.data.key,
            data: response
          }, '*');
        });
        break;
        
      case 'SET_STORAGE_DATA':
        // Forward to background script
        chrome.runtime.sendMessage({
          type: 'SET_STORAGE_DATA',
          key: event.data.key,
          value: event.data.value
        }, response => {
          // Send response back to webpage
          window.postMessage({
            type: 'STORAGE_DATA_RESPONSE',
            key: event.data.key,
            success: response
          }, '*');
        });
        break;
        
      case 'FROM_PAGE':
        console.log('Message from webpage:', event.data.message)
        // Forward to background script if needed
        chrome.runtime.sendMessage({
          type: 'FROM_CONTENT_SCRIPT',
          data: event.data
        })
        break
        
      case 'ADDRESSES_UPDATE':
        console.log('Addresses updated:', event.data.addresses)
        // Forward to background script
        chrome.runtime.sendMessage({
          type: 'ADDRESSES_UPDATE',
          data: event.data.addresses
        })
        break
        
      case 'COMMUTE_UPDATE':
        console.log('Commute update:', event.data)
        // Forward to background script
        chrome.runtime.sendMessage({
          type: 'COMMUTE_UPDATE',
          data: event.data
        })
        break
    }
  }
})

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Content script received message from background:', message)
  
  switch (message.type) {
    case 'ADDRESSES_UPDATE':
      // Forward to webpage
      window.postMessage({
        type: 'FROM_EXTENSION',
        data: message.data
      }, '*')
      break
      
    case 'COMMUTE_UPDATE':
      // Forward to webpage
      window.postMessage({
        type: 'FROM_EXTENSION',
        data: message.data
      }, '*')
      break
  }
  
  return true // Keep message channel open for async response
}) 
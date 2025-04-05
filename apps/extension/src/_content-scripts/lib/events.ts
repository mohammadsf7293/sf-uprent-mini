// Listen for messages from the webpage
window.addEventListener('message', (event) => {
  // Make sure the message is from the same window
  if (event.source === window) {
    // Handle different message types
    switch (event.data.type) {
      case 'PING_UPRENT_EXTENSION':
        console.log('Received extension ping')
        // Respond immediately to confirm extension is installed
        window.postMessage({ type: 'PONG_UPRENT_EXTENSION' }, '*')
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
    }
  }
}) 
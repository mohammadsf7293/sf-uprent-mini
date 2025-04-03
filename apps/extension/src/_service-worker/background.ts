import api from '~api'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log('message', message)
  if (message.action === "fetchDurations") {
    api.commute.durations.post({ address: message.address })
      .then(response => {
        sendResponse({ success: true, data: response.data })
      })
      .catch(error => {
        sendResponse({ success: false, error })
      })
    return true // Keep message channel open for async response
  }
})

// chrome.runtime.onMessageExternal.addListener(
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('request', request)
      if (request) {
        console.log('request2', request)
          if (request.message) {
            console.log('request3', request)
              if (request.message == "getVersion") {
                console.log('request4', request)
                  sendResponse({version: 1.0});
              }
          }
      }
      return true;
});

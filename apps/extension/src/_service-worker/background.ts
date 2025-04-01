import api from '~api'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log('message', message)
  if (message.action === "fetchDurations") {
    api.commute.durations.get()
      .then(response => {
        sendResponse({ success: true, data: response.data })
      })
      .catch(error => {
        sendResponse({ success: false, error })
      })
    return true // Keep message channel open for async response
  }
})

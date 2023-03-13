
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({"resizeOption1": "0,0,50,100", "resizeOption2":
    "50,0,50,100", "resizeOption3": "0,0,50,50", "resizeOption4": "50,0,50,50"})
});

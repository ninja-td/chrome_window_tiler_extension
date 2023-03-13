
function restoreResizeOptions() {
  var configListHtml = ""
  chrome.storage.local.get(null, function(items) {
    var config = null;
    for (item in items) {
      config = items;
      break;
    }
    if (config == null) {
      config = {'resizeOption1': '0,0,50,100', 'resizeOption2': '0,50,50,100'};
      chrome.storage.local.set(config);
    }
    for (item in config) {
      configListHtml += "<div> Config " + item.substr(12) + " : " + config[item] + "</div>";
      console.log(item);
    }
    document.getElementById("configList").innerHTML = configListHtml;
  });
}

restoreResizeOptions();

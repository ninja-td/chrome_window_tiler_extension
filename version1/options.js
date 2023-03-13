function saveResizeOptions() {
  resizeOption1 = sanitizeConfig(document.getElementById("resizeOption1").value);
  resizeOption2 = sanitizeConfig(document.getElementById("resizeOption2").value);
  resizeOption3 = sanitizeConfig(document.getElementById("resizeOption3").value);
  resizeOption4 = sanitizeConfig(document.getElementById("resizeOption4").value);
  // Restore the text boxes with sanitized values.
  document.getElementById("resizeOption1").value = resizeOption1 || "0,0,50,100";
  document.getElementById("resizeOption2").value = resizeOption2 || "0,50,50,100";
  document.getElementById("resizeOption3").value = resizeOption3 || "0,0, 50,50";
  document.getElementById("resizeOption4").value = resizeOption4 || "0,50,50,50";
  chrome.storage.local.set({"resizeOption1": resizeOption1, "resizeOption2": resizeOption2, "resizeOption3": resizeOption3, "resizeOption4": resizeOption4})
  console.log("Options saved");
}

function restoreResizeOptions() {
  chrome.storage.local.get(["resizeOption1", "resizeOption2", "resizeOption3", "resizeOption4"], function(result){
    document.getElementById("resizeOption1").value = result.resizeOption1 || "0,0,50,100";
    document.getElementById("resizeOption2").value = result.resizeOption2 || "50,0,50,100";
    document.getElementById("resizeOption3").value = result.resizeOption3 || "0,0, 50,50";
    document.getElementById("resizeOption4").value = result.resizeOption4 || "50,0,50,50";
  });
  var configListHtml = ""
  chrome.storage.local.get(null, function(items) {
    for (item in items) {
      configListHtml += "<div> Config " + item.substr(12) + " : " + items[item] + "</div>";
      console.log(item);
    }
    document.getElementById("configList").innerHTML = configListHtml;
  });
}

function sanitizeConfig(config) {
  var options = String(config).split(",");
  if (options.length != 4) {
    return undefined;
  }
  for (option in options) {
    if (isNaN(parseInt(option))) {
      return undefined;
    }
  }
  return config;
}

function printCurrentWindowSize() {
  var currentWindowSizeText = document.getElementById("currentWindowSize");
  currentWindowSizeText.innerText =
      Math.round(window.screenLeft * 100/window.screen.availWidth) + "," +
      Math.round(window.screenTop * 100/window.screen.availHeight) + "," +
      Math.round(window.outerWidth * 100/window.screen.availWidth) + "," +
      Math.round(window.outerHeight * 100 /window.screen.availHeight);
}

restoreResizeOptions();
saveResizeOptions();
saveOptions = document.getElementById("saveOptions");
saveOptions.addEventListener("click", saveResizeOptions)
window.addEventListener("load", (event) => {
  printCurrentWindowSize()
});
window.addEventListener("resize", (event) => {
  printCurrentWindowSize()
});
setInterval(printCurrentWindowSize, 500);

document.getElementById("copyCurrentConfigButton").addEventListener("click", (event) => {
  navigator.clipboard.writeText(document.getElementById("currentWindowSize").innerText);
  document.getElementById("currentWindowSize").innerText = "copied";
});

document.getElementById("setConfig").addEventListener("click", async () => {
  setConfig();
});
document.addEventListener("keypress", (key) => {
  console.log(key);
  if (parseInt(key.key) > 0  && parseInt(key.key) < 9) {
    configNum = parseInt(key.key);
    if (document.getElementById("configVal").innerText == "") {
      executeResize(configNum);
      emptySavedMessage();
    } else {
      var configObj = {};
      configObj["resizeOption" + String(configNum)] =  document.getElementById("configVal").innerText;
      chrome.storage.local.set(configObj);
      document.getElementById("savedMessage").innerText = "Saved as Config " + configNum;
      document.getElementById("configVal").innerText = "";
    }
  }
});

function emptySavedMessage() {
  document.getElementById("savedMessage").innerText = "";
  document.getElementById("configVal").innerText = "";
}

function executeResize(configNum) {
  chrome.windows.getCurrent(function(wind) {
    chrome.storage.local.get("resizeOption" + String(configNum), (result) => {
      console.log(result);
      resizeWindow(result[Object.getOwnPropertyNames(result)[0]], wind.id);
    });
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

function setConfig() {
  console.log("setting config");
  document.getElementById("savedMessage").innerText = "press number to save config: "
  chrome.windows.getCurrent(function(wind) {
    var config = Math.round((wind.left * 100/window.screen.availWidth)*100)/100 + "," +
    Math.round((wind.top * 100/window.screen.availHeight)*100)/100 + "," +
    Math.round((wind.width * 100/window.screen.availWidth)*100)/100 + "," +
    Math.round((wind.height * 100 /window.screen.availHeight)*100)/100;
    document.getElementById("configVal").innerText = config;
  });
}

function resizeWindow(resizeOptions, windowId) {
  console.log(resizeOptions);
  if (resizeOptions) {
    var options = resizeOptions.split(",");
    var leftOp = Math.round(window.screen.availWidth * options[0] / 100);
    var topOp = Math.round(window.screen.availHeight * options[1] / 100);
    var widthOp = Math.round(window.screen.availWidth * options[2] / 100);
    var heightOp = Math.round(window.screen.availHeight * options[3] / 100);
    var updateInfo = {
        left: leftOp, //change those to whatever you like
        top: topOp,
        width: widthOp,
        height: heightOp,
    	state: "normal"
    };
    console.log(updateInfo);
    chrome.windows.update(windowId, updateInfo);

  }

}

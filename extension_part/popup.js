

/**
 * Gets the saved background color for url.
 *
 * @param {string} url URL whose background color is to be retrieved.
 * @param {function(string)} callback called with the saved background color for
 *     the given url on success, or a falsy value if no color is retrieved.
 */
function getUsernameSetting(callback) {
  // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
  // for chrome.runtime.lastError to ensure correctness even when the API call
  // fails.
  chrome.storage.local.get("show_username", (items) => {
    console.log(items);
    console.log(items["show_username"]);
    callback(chrome.runtime.lastError ? null : items["show_username"]);
  });
}

function getAkashiSetting(callback) {
  // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
  // for chrome.runtime.lastError to ensure correctness even when the API call
  // fails.
  chrome.storage.local.get("headpat_akashi", (items) => {
    console.log(items);
    console.log(items["headpat_akashi"]);
    callback(chrome.runtime.lastError ? null : items["headpat_akashi"]);
  });
}

function getFCMedalsSetting(callback) {
  // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
  // for chrome.runtime.lastError to ensure correctness even when the API call
  // fails.
  chrome.storage.local.get("show_FCmedals", (items) => {
    console.log(items);
    console.log(items["show_FCmedals"]);
    callback(chrome.runtime.lastError ? null : items["show_FCmedals"]);
  });
}

/**
 * Sets the given background color for url.
 *
 * @param {string} url URL for which background color is to be saved.
 * @param {string} color The background color to be saved.
 */
function saveUsernameSetting(setting) {
  // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
  // optional callback since we don't need to perform any action once the
  // background color is saved.
  console.log(setting);
  console.log(setting=="true");
  chrome.storage.local.set({"show_username":(setting=="true")});
}

function saveAkashiSetting(setting) {
  console.log(setting);
  console.log(setting=="true");
  chrome.storage.local.set({"headpat_akashi":(setting=="true")});
}
function saveFCMedalsSetting(setting) {
  console.log(setting);
  console.log(setting=="true");
  chrome.storage.local.set({"show_FCmedals":(setting=="true")});
}

function getHomeSetting(callback) {
  chrome.storage.local.get("home_template", (items) => {
    console.log(items["home_template"]);
    callback(chrome.runtime.lastError ? null : items["home_template"]);
  });
}
function saveHomeTemplate(setting) {
  console.log(setting);
  chrome.storage.local.set({"home_template":setting});
}

// This extension loads the saved background color for the current tab if one
// exists. The user can select a new background color from the dropdown for the
// current page, and it will be saved as part of the extension's isolated
// storage. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.
document.addEventListener('DOMContentLoaded', () => {
  
    var dropdown = document.getElementById('dropdown');
    var dropdownAkashi = document.getElementById('dropdownAkashi');
    var dropdownFCMedals = document.getElementById('dropdownFCMedals');
    var homeTemp = document.getElementById("homeTemp");
    var submitHome = document.getElementById("submitHome");

    // Load the saved background color for this page and modify the dropdown
    // value, if needed.
    getUsernameSetting((sett) => {
      if (sett==true || sett==false) {
        console.log(sett);
        if (sett) {
          dropdown.value = "true";
        } else {
          dropdown.value = "false";
        }
      }
    });

    getAkashiSetting((sett) => {
      if (sett==true || sett==false) {
        console.log(sett);
        if (sett) {
            dropdownAkashi.value = "true";
        } else {
            dropdownAkashi.value = "false";
        }
      }
    });

    getFCMedalsSetting((sett) => {
      if (sett==true || sett==false) {
        console.log(sett);
        if (sett) {
            dropdownFCMedals.value = "true";
        } else {
            dropdownFCMedals.value = "false";
        }
      }
    });

    getHomeSetting((sett) => {
      if (sett) {
        homeTemp.value = sett;
      }
    });

    // Ensure the background color is changed and saved when the dropdown
    // selection changes.
    dropdown.addEventListener('change', () => {
      saveUsernameSetting(dropdown.value);
    });

    dropdownAkashi.addEventListener('change', () => {
        saveAkashiSetting(dropdownAkashi.value);
    });

    dropdownFCMedals.addEventListener('change', () => {
        saveFCMedalsSetting(dropdownFCMedals.value);
    });

    submitHome.addEventListener('click', () => {
      saveHomeTemplate(homeTemp.value);
    });

});

'use strict'

import * as call_LS from './callBack_Localstorage.js';

// Modify Theme
//*******************************************************************
// from https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting and adapted

//determines if the user has a set theme
function detectColorScheme() {
    let theme = "blue"; //default to blue

    //local storage is used to override OS theme settings
    if (call_LS.isKeyExistLS("theme")) {
        if (call_LS.getInfoLS("theme") == "green") {
            theme = "green";
        }
    } else if (!window.matchMedia) {
        //matchMedia method not supported
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: green)").matches) {
        //OS theme setting detected as green
        theme = "green";
    }

    //green theme preferred, set document with a `data-theme` attribute
    if (theme == "green") {
        document.documentElement.setAttribute("data-theme", "green");
    }
}

//identify the toggle switch HTML element
const toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');

//function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme(e) {
    if (e.target.checked) {
        call_LS.updateInfoLS('theme', 'green');
        document.documentElement.setAttribute('data-theme', 'green');
        // toggleSwitch.checked = true;
    } else {
        call_LS.updateInfoLS('theme', 'blue');
        document.documentElement.setAttribute('data-theme', 'blue');
        // toggleSwitch.checked = false;
    }
}


export { detectColorScheme, switchTheme }
'use strict'

import * as call_LS from './callBack_Localstorage.js';

// Display messages
//*******************************************************************
/**
 * 
 * @param {string} message Test message for colors of display window
 * Danger : message starts width Danger
 * Alert : message starts width  Attention
 * Success : other case 
 */

function testMessageBeforeDisplay(message) {

    call_LS.addInfoLS("log", "testMessageBeforeDisplay");

    let indexOfFirst;
    if (indexOfFirst = message.indexOf("Danger") != -1) {
        displayMessage('Danger', message.slice(8));
    } else if (indexOfFirst = message.indexOf("Warning") != -1) {
        displayMessage('Warning', message.slice(9));
    } else {
        displayMessage('Success', message.slice(9));
    }
}

/**
 * 
 * @param {string} state criticality of message
 * @param {string} message Message to display
 */
function displayMessage(state, message) {

    call_LS.addInfoLS("log", message);

    const $messages = document.querySelector('.message');
    const $balise = document.createElement('div')
    $balise.setAttribute('class', 'alert alert-' + state);
    $messages.append($balise);
    $balise.append(message);

}

export { testMessageBeforeDisplay, displayMessage }
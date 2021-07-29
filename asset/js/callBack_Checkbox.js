'use strict'

import ErrorCustom from './ErrorCustom.js';
import * as callback from './callBack.js'
import * as call_LS from './callBack_Localstorage.js';

/**
 * If checkBox ALL is shecked, then all the CheckBox are checked
 * @param {bool} isChecked
 * @param {string} type user or player : to choose good array
 */
function checkInputAll(isChecked, type) {

    call_LS.addInfoLS("log", "checkInputAll");

    const checkboxes = document.querySelectorAll('.tab' + type + 'List input');
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
}

/** 
 * Control if at least one checkbox is shecked in this array (type = user or player)
 * @param {*} type 
 */
function isAtLeastOneCheck(type) {

    let isCheck = false;
    const checkboxes = document.querySelectorAll('.tab' + type + "List input[name='checkboxuser[]']");
    checkboxes.forEach(checkbox => {

        if (checkbox.checked === true) {
            isCheck = true;
        };
    });

    call_LS.addInfoLS("log", "isAtLeastOneCheck, type : " + type + " = " + isCheck);

    if (!isCheck) {
        const _customError = new ErrorCustom
        _customError.setMessages('Vous n\'avez sélectionné aucune ligne dans cette liste !');
        _customError.displayMessages(callback.currentPage(), 'display');
    }
    return isCheck;
}


export { checkInputAll, isAtLeastOneCheck }
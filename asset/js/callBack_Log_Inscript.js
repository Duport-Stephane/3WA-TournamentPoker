'use strict'

import * as call_LS from './callBack_Localstorage.js';

// COMMON page LOGIN & INSCRIPTION
//*******************************************************************

/**
 * Test email
 * @param {string} email 
 * @returns {boolean} valid or not
 */
function isMailValid(email) {

    call_LS.addInfoLS("log", "isMailValid");

    // from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript and adapted
    const regExMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
    if (regExMail.test(email) && email.length < 32) {
        return true;
    } else {
        return false;
    }
}

/**
 * Test password
 * @param {string} pwd 
 * @returns {boolean} valid or not
 */
function isPasswordValid(pwd) {

    call_LS.addInfoLS("log", "isPassordValid");

    // from https://ihateregex.io/expr/password/ and adapted
    // At least 8 characters [max 32] with 1 uppercase, 1 lowercase, 1 number and 1 special char
    const regExPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/;
    if (regExPwd.test(pwd)) {
        return true;
    } else {
        return false;
    }
}


export { isMailValid, isPasswordValid }
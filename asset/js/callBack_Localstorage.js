'use strict'

import ManagerLS from './ManagerLS.js';

// For LOCALSTORAGE
//*******************************************************************
/**
 * Get the value for this key
 * @param {string} key 
 * @returns {string} LocalStorage's value for this key
 */
function getInfoLS(key) {
    const _manager = new ManagerLS;
    addInfoLS("log", "Get value from LS " + key)
    return _manager.getDatasByKey(key);
}

/**
 * Persist/update in LocalStorage the value for the Key
 * @param {string} key 
 * @param {string} value 
 */
function updateInfoLS(key, value) {
    const _manager = new ManagerLS
    _manager.setDatas(key, value)
    addInfoLS("log", "Update " + value + " in LS " + key)
}

/**
 * add value in LocalStorage for the key
 * to optimise the UX
 * @param {string} key 
 * @param {string} value 
 */
function addInfoLS(key, value) {
    // this function is to optimise the User Experience
    const _manager = new ManagerLS
    const _old = _manager.getDatasByKey(key)
    const _new = _old + String.fromCharCode(10) + value
    _manager.setDatas(key, _new)
}

/**
 * Test if key exist in LocalStorage
 * @param {string} key  
 */
function isKeyExistLS(key) {
    const _manager = new ManagerLS
    addInfoLS("log", "Test if key " + key + " exist in LS : " + _manager.existKey(key))
    return _manager.existKey(key)
}

/**
 * Remove key in LocalStorage
 * @param {string} key  
 */
function removeKeyLS(key) {
    const _manager = new ManagerLS
    addInfoLS("log", "Remove " + key + " from LS")
    _manager.removeKey(key)
}


export { getInfoLS, updateInfoLS, addInfoLS, isKeyExistLS, removeKeyLS }
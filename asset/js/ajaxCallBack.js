'use strict';

import * as call_LS from './callBack_Localstorage.js'
import ErrorCustom from './ErrorCustom.js' // Gestion des erreurs s'il y en a


// page INSCRIPTION
//*******************************************************************
/**
 * Persist User in database
 * @param {formData} form 
 */
async function persistUser(form) {

    const response = await fetch('./index.php?action=persist', {
        method: 'post',
        body: form
    })
    const result = await response.text()

    call_LS.addInfoLS("log", "FETCH persitUser : " + result);
    return result;
}

function isPersistUser(form) {

    persistUser(form).then(result => result.text())
        .then(result => {

            call_LS.addInfoLS("log", "FETCH isPersistUser : " + result);

            if (result.length < 500) {
                const _customError = new ErrorCustom;
                _customError.messages = "Attention, cette adresse mail est déjà utilisée !";
                return false;
            } else {
                return true;
            }
        })
}

/**
 * Update User in database
 * @param {formData} form 
 */
async function updateUser(form) {

    call_LS.addInfoLS("log", "FETCH updateUser");

    const response = await fetch('./index.php?action=updateUser', {
        method: 'post',
        body: form
    })
}

/**
 * Update Admin in database
 * @param {formData} form 
 */
async function updateAdmin(form) {

    call_LS.addInfoLS("log", "FETCH updateAdmin");

    const response = await fetch('./index.php?action=updateAdmin#userProfilDashboard', {
        method: 'post',
        body: form
    })
}


// page LOGIN
//*******************************************************************
/**
 * Compare password
 * @param {formData} form
 * @returns {boolean}
 */
function isSamePassword(form) {

    call_LS.addInfoLS("log", "FETCH isSamePassword");

    // on compare les 2 password
    return fetch('./index.php', {
            method: 'POST',
            body: form
        })
        .then(response => response.text())
}


// page DASHBOARDADMIN
//*******************************************************************
/**
/** 
 * Delete User checked on List
 * @param {*} form Le formulaire validé
 */
function delUserList(form) {

    call_LS.addInfoLS("log", "FETCH delUserList");

    fetch('./index.php?action=delUserList', {
            method: 'POST',
            body: form
        })
        .then(response => {
            window.location = './index.php?page=dashboardAdmin';
        });
}


// page PLAYER
//*******************************************************************
/**
 * récupère le(s) input(s) coché(s) dans le tableau des users pour déplacer ce(s) user(s) dans la table des players
 * Uniquement si la partie n'est pas commencée !
 * @param {*} form Le formulaire validé
 */
function modifPlayerList(form) {


    call_LS.addInfoLS("log", "FETCH modifPlayerList");

    // Fetch pour actualiser la table Player

    fetch('./index.php', {
            method: 'POST',
            body: form
        })
        .then(response => response.text())
        .then(response => {
            window.location = './index.php?page=players&action=display';
        });
}


export { modifPlayerList, isSamePassword, isPersistUser, updateUser, updateAdmin, delUserList }
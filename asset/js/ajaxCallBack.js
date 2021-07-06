/* Ici, les fonctions AJAX de Callback appelées par les écouteurs de app.js */

// Appels de dépendances
import * as callback from './callBack.js';
import ErrorCustom from './ErrorCustom.js' // Gestion des erreurs s'il y en a

// page PLAYER
//*******************************************************************
/**
 * Refresh Tab User, Players
 */
// function refresh() {
//     fetch('./index.php?page=players&action=display')

// fetch('./index.php?action=refresh&type=user')
//     .then(response => response.json())
//     .then(users => {

//         console.log("Refresh USERS");

// callback.displayTabUser(users, 'users');
//     });

// fetch('./index.php?action=refresh&type=player')
//     .then(response => response.json())
//     .then(players => {

//         console.log("Refresh PLAYERS");

// callback.displayTabUser(players, 'players');
//     });
// }:

/** 
 * récupère le(s) input(s) coché(s) dans le tableau des users pour déplacer ce(s) user(s) dans la table des players
 * Uniquement si la partie n'est pas commencée !
 * @param {*} form Le formulaire validé
 */
function modifPlayerList(form) {

    console.log('FETCH MODIF-PLAYER')
        // Fetch pour actualiser la table Player

    fetch('./index.php', {
            method: 'POST',
            body: form
        })
        .then(response => response.text())
        // .then(response => console.log("response : " + response))
        .then(response => {
            // console.log(response);
            callback.testMessageBeforeDisplay(response);
            window.location = './index.php?page=players&action=display';
            // window.location.reload();
            // refresh()
        });
}


// page LOGIN
//*******************************************************************

/**
 * Compare password
 * @param {formData} form
 * @returns {boolean}
 */
function isSamePassword(form) {

    // console.log(form);

    // on compare les 2 password
    return fetch('./index.php', {
            method: 'POST',
            body: form
        })
        .then(response => response.text())
        // .then(response => console.log("Retour ajax : " + response))
        // .then(response => {
        //     if (response === "Le mot de passe n'est pas correct") {
        //         console.log("Retour ajax FALSE : ")
        //         return false;
        //     } else {
        //         console.log("Retour ajax TRUE : ")

    //         return true;
    //     }
    // })
}

// /**
//  * Login user
//  * @param {formData} form 
//  */
// function loginUser(form) {
//     fetch('./index.php', {
//             method: 'post',
//             body: form
//         })
//         // .then(response => response.text())
//         // .then(response => console.log(response))
// }

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
        // .then(response => console.log(response))
    return result;
}

function isPersistUser(form) {
    persistUser(form).then(result => result.text())
        // .then(response => console.log(response))
        .then(result => {
            // console.log("RES dans le FETCH : " + result);
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
 * UPdate User in database
 * @param {formData} form 
 */
function updateUser(form) {
    fetch('./index.php?action=update', {
            method: 'post',
            body: form
        })
        // .then(response => response.text())
        // .then(response => console.log(response))
}

/**
 * Logout user
 * 
 */
// function logoutUser() {
//     fetch('./index.php?action=logout')
//         .then(response => console.log(response))
// }



export { modifPlayerList, isSamePassword, isPersistUser, updateUser }
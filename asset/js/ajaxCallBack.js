/* Ici, les fonctions AJAX de Callback appelées par les écouteurs de app.js */

// Appels de dépendances
import * as callback from './callBack.js';

// page PLAYER
//*******************************************************************
/**
 * Refresh Tab User, Players
 */
function refresh() {
    fetch('../../src/services/ajaxPlayers.php?action=refresh&type=User')
        .then(response => response.json())
        .then(users => {
            callback.displayTabUser(users, 'users');
        });

    fetch('../../src/services/ajaxPlayers.php?action=refresh&type=Player')
        .then(response => response.json())
        .then(users => {
            callback.displayTabUser(users, 'players');
        });
}

/** 
 * récupère le(s) input(s) coché(s) dans le tableau des users pour déplacer ce(s) user(s) dans la table des players
 * Uniquement si la partie n'est pas commencée !
 * @param {*} form Le formulaire validé
 */
function modifPlayerList(form) {

    // console.log('FETCH MODIF-PLAYER')
    // Fetch pour actualiser la table Player

    fetch('../../src/services/ajaxPlayers.php', {
            method: 'POST',
            body: form
        })
        .then(response => response.text())
        // .then(response => console.log("response : " + response))
        .then(response => {
            callback.testMessageBeforeDisplay(response);
            refresh()
        });
}


// page LOGIN
//*******************************************************************

function userKnown(user_email) {

    console.log(user_email);

    // pour savoir si l'utilisateur est déjà connu
    fetch('../../src/services/ajaxLog.php?email=' + user_email)
        .then(response => response.json())

    .then(response => console.log(response))

    .then(user => {
        document.querySelector('#auth input[name="email"]').value = user.email;
    })
}

function controlPassword(user) {
    // envoyer un fetch pour checker le password
    fetch('../../src/services/ajaxLog.php', {
            method: 'POST',
            body: form
        })
        .then(response => console.log(response))
        .then(response => {
            if ($_SESSION['info'] != "") {
                callback.testMessageBeforeDisplay($_SESSION['info']);
            }
            return true;
        })
}

function insert(form) {
    fetch('../../src/services/ajaxLog.php', {
            method: 'post',
            body: form
        })
        .then(response => console.log(response));

}

export { modifPlayerList, userKnown, controlPassword, insert }
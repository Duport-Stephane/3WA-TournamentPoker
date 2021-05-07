/* Ici, les fonctions AJAX de Callback appelées par les écouteurs de app.js */

// Import util
import * as callback from './callBack.js';

/**
 * Refresh Tab User, Players
 */
function refresh() {
    fetch('../../src/services/ajax.php?action=refresh&type=User')
        .then(response => response.json())
        .then(users => {
            displayTabUser(users, 'User');
        });

    fetch('../../src/services/ajax.php?action=refresh&type=Player')
        .then(response => response.json())
        .then(users => {
            displayTabUser(users, 'Player');
        });

}

function displayTabUser(users, typeUser) {

    const $tableauUser = document.querySelector('.tab' + typeUser + 'List');
    // vider les noeuds contenu dans le tableau
    while ($tableauUser.firstChild) {
        $tableauUser.removeChild($tableauUser.firstChild);
    }
    // insert table pour préparer le tableau
    const $userList = document.createElement('table');
    $userList.classList.add('array', typeUser);
    $tableauUser.append($userList);
    users.map(user => {
        // Construction des lignes du tableau, 1 par user
        const $tr = document.createElement('tr');
        $userList.append($tr);
        // un td pour chaque colonne
        let $td = document.createElement('td');
        $tr.append($td);
        // l'input avec la checkbox dans la 1ere colonne
        const $input = document.createElement('input');
        $input.type = 'checkbox';
        $input.name = 'checkboxuser[]';
        $input.value = user['id'];
        $td.append($input);
        let value;
        let $add
            // nickName dans le 2eme colonne, puis fisrt et last name...
        for (let column = 2; column < 5; column++) {
            switch (column) {
                case 2:
                    value = user['nickName']
                    break;
                case 3:
                    value = user['firstName']
                    break;
                case 4:
                    value = user['lastName']
                    break;
                default:
                    console.log('Désolé, il n\'y a plus de choix');
            }
            $add = document.createElement('td');
            $tr.append($add);
            $add.append(value);
        }
        // et s'il y a un avatar... en dernière colonne
        if (user['avatar'] && user['avatar'] != '') {
            const $avatar = document.createElement('img');
            $avatar.src = user['avatar'];
            $avatar.alt = 'avatar';
            $add = document.createElement('td');
            $tr.append($add);
            $add.append($avatar);
        }
    })
}

/** 
 * récupère le(s) input(s) coché(s) dans le tableau des users pour déplacer ce(s) user(s) dans la table des players
 * Uniquement si la partie n'est pas commencée !
 */

function addPlayerList(form) {

    // console.log('FETCH ADDPLAYER')
    // Fetch pour actualiser la table Player
    fetch('../../src/services/ajax.php', {
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


/**
 * récupère le(s) input(s) coché(s) dans le tableau des players pour les remettre dans la table des users
 * Uniquement si la partie n'est pas commencée !
 */

function delPlayerList(form) {

    // console.log('FETCH DELPLAYER')
    // Fetch pour actualiser la table Player
    fetch('../../src/services/ajax.php', {
            method: 'POST',
            body: form
        })
        .then(response => response.text())
        // .then(response => console.log('response : ' + response))
        .then(response => {
            callback.testMessageBeforeDisplay(response);
            refresh()
        });
}


export { addPlayerList, delPlayerList }
'use strict'
/* Ici, les fonctions de Callback appelées par les écouteurs de app.js */





/**
 * Met en évidence le menu courant dans la navbar du header.
 * Arrivée sur une page soit par la navbar soit par le click sur la carte de Home
 */

function currentNav() {
    const address = window.location.href
    const pageAct = address.slice(address.lastIndexOf('=') + 1);

    // liste des balises 'a' du menu
    const listA = document.querySelectorAll('.navHeader a, .about a')
    listA.forEach(e => {

        // console.log(pageAct + " / " + e)

        if (e.classList.contains(pageAct)) {
            e.classList.toggle('current');
        }
    });
}


// page PLAYER
//*******************************************************************
/**
 * vérifier si la checkbox de ALL est coché ou non
 * et fait de même pour tous les check dessous
 * @param {bool} isChecked
 * @param {string} type user ou player : pour sélectionner le bon tableau
 */

function checkInputAll(isChecked, type) {
    const checkboxes = document.querySelectorAll('.tab' + type + 'List input');
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
}

/**
 * Affiche les 2 tableaux de la page PLAYERS
 * @param {array} users retour de la requête
 * @param {string} typeUser user ou player : pour sélectionner le bon tableau
 */
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


// page LOGIN
//*******************************************************************




// Gestion de l'affichage des MESSAGES
//*******************************************************************
/**
 * 
 * @param {string} message Le message a tester pour savoir si :
 * Danger : le message commence par Danger
 * Alert : le message commence par Attention
 * Success : tous les autres cas 
 */

function testMessageBeforeDisplay(message) {
    let indexOfFirst;
    if (indexOfFirst = message.indexOf("Danger") != -1) {
        displayDanger(message.slice(8));
    } else if (indexOfFirst = message.indexOf("Attention") != -1) {
        displayAlert(message.slice(11));
    } else {
        displaySuccess(message);
    }
}

/**
 * 
 * @param {string} message Message de SUCCESS à afficher
 */
function displaySuccess(message) {

    // console.log(message);

    const $messages = document.querySelector('.message');
    const $balise = document.createElement('div')
    $balise.setAttribute('class', 'alert alert-success');
    $messages.append($balise);
    $balise.append(message);

    removeMessage();
}

/**
 * 
 * @param {string} message Message d'ALERTE à afficher
 */
function displayAlert(message) {

    // console.log(message);

    const $messages = document.querySelector('.message');
    const $balise = document.createElement('div')
    $balise.setAttribute('class', 'alert alert-alert');
    $messages.append($balise);
    $balise.append(message);

    removeMessage();
}

/**
 * 
 * @param {string} message Message de DANGER à afficher
 */
function displayDanger(message) {

    // console.log(message);

    const $messages = document.querySelector('.message');
    const $balise = document.createElement('div')
    $balise.setAttribute('class', 'alert alert-danger');
    $messages.append($balise);
    $balise.append(message);

    removeMessage();
}

/**
 * Gestion du temps d'affichage des messages
 */
function removeMessage() {
    // console.log("REMOVE INFOS")

    // const mess = document.querySelector('.alert');
    // mess.delay(2500).fadeOut(600);
    $('.alert').delay(5000).fadeOut(600);
}


export { currentNav, checkInputAll, displayTabUser, testMessageBeforeDisplay }
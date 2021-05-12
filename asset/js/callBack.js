'use strict'
/* Ici, les fonctions de Callback appelées par les écouteurs de app.js */




/**
 * Met en évidence le menu courant dans la navbar du header.
 * Arrivée sur une page soit par la navbar soit par le click sur la carte de Home
 */

function currentNav() {
    const address = window.location.href
    const compt = address.lastIndexOf('=')
        // console.log(window.location);
    const pageAct = address.slice(compt + 1);

    // cas particulier de la page HOME lors du premier chargement
    // il n'y a pas de parametre "page=" dans le root
    if (compt === -1) {
        document.querySelector('.navHeader a.home').classList.add('current');
    } else {
        // liste des balises 'a' du menu
        const listA = document.querySelectorAll('.navHeader a, footer section:last-child a')
        listA.forEach(e => {

            // console.log(pageAct + " \\+/ " + compt + " \\+/ " + e)
            if (e.classList.contains(pageAct)) {
                e.classList.toggle('current');
            }
        });
    }
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



// page INSCRIPTION
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


// changement de thème
//*******************************************************************

// https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting

//determines if the user has a set theme
function detectColorScheme() {
    var theme = "blue"; //default to blue

    //local storage is used to override OS theme settings
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "green") {
            var theme = "green";
        }
    } else if (!window.matchMedia) {
        //matchMedia method not supported
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: green)").matches) {
        //OS theme setting detected as green
        var theme = "green";
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
        localStorage.setItem('theme', 'green');
        document.documentElement.setAttribute('data-theme', 'green');
        toggleSwitch.checked = true;
    } else {
        localStorage.setItem('theme', 'blue');
        document.documentElement.setAttribute('data-theme', 'blue');
        toggleSwitch.checked = false;
    }
}


export { currentNav, checkInputAll, displayTabUser, testMessageBeforeDisplay, detectColorScheme, switchTheme }
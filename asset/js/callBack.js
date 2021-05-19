'use strict'
/* Ici, les fonctions de Callback appelées par les écouteurs de app.js */


// Appels de dépendances
import * as ajaxCallBack from './ajaxCallback.js'
import ManagerLS from './ManagerLS.js'
import ErrorCustom from './ErrorCustom.js' // Gestion des erreurs s'il y en a


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

/**
 * 
 * @param {formData} form 
 * @returns {boolean}
 */
function logValidate(form) {

    const _key = 'user' // Clé d'accès au stockage du LocalStorage
    const _errors = [] // Référencer les erreurs trouvées dans le form lors du validate
    const _customError = new ErrorCustom // Référencer et afficher les erreurs
    const _user = {
            email: '',
            password: ''
        } // Stocker les infos du user

    // console.log(form)

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {

        console.log(input)

        // Si les champs obligatoires sont vides => ERROR
        if (input.value === "") {
            this._errors.push({
                field: input.name,
                type: 'empty',
                message: `Merci de remplir le champ ${input.placeholder}`
            })
        } else if (input.name === 'email' && !isMailValid(input.value)) {
            // Création de l'erreur de format du mail
            _errors.push({
                field: input.name,
                type: 'format',
                message: `Merci de remplir le champ ${input.placeholder} avec un email correctement formaté`
            })
        } else if (input.name === 'password' && !isPasswordValid(input.value)) {
            // Création de l'erreur de format du password
            _errors.push({
                field: input.name,
                type: 'format',
                message: `Le mot de passe doit contenir au moins 8 caractères dont un chiffre, une majuscule et un caractère spécial`
            })
        } else {
            switch (input.name) {
                case 'email':
                    _user.email = input.value
                    break;
                case 'password':
                    _user.password = input.value
                    break;
            }
        }
    })

    if (_errors.length > 0) {

        console.log("Il y a des errors !!!!!!!!!!!")

        // On enregistre les errors de notre form dans la class ErrorCustom,
        _customError.messages = _errors
            // afin de bénéficier des fonctionnalités de celui-ci pour les affichées par la suite
        return false
    } else {

        const isPwdOK = ajaxCallBack.comparePassword(form, _user.email)

        if (isPwdOK) {
            // si OK, actualise le mail dans le LocalStorage
            updateUserInfoLS(_key, _user.email)

            // on modifie l'affichage : affiche le token LOGOUT et masque inscription
            displayTokenLog();

            // Vider les erreurs
            const errorSpan = document.querySelector('.errors')
            errorSpan.classList.remove('form-error')
            errorSpan.innerHTML = ''
            errorSpan.innerText = ''

            return true;
        } else {
            _errors.push({
                field: 'email',
                type: 'format',
                message: `Vos identifiants sont incorrects. Merci de réessayer.`
            });
            _customError.messages = _errors;

            return false;
        }
    }
}


// page INSCRIPTION
//*******************************************************************

/**
 * Controle si le Form est correctement renseigné, avant de persist le User
 * @param {formData} form
 * @returns {boolean}
 */
function addValidate(form) {

    const _key = 'user' // Clé d'accès au stockage du LocalStorage
    const _errors = [] // Référencer les erreurs trouvées dans le form lors du validate
    const _customError = new ErrorCustom // Référencer et afficher les erreurs
    const _user = {
            nickname: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            avatar: ''
        } // Stocker les infos du user

    // console.log(form)

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        // Si les champs obligatoires sont vides => ERROR
        if (input.value === "" && input.name != 'lastname' && input.name != 'firstname' && input.name != 'avatar') {
            _errors.push({
                field: input.name,
                type: 'empty',
                message: `Merci de remplir le champ ${input.placeholder}`
            })
        } else if (input.name === 'email' && !isMailValid(input.value)) {
            // Création de l'erreur de format du mail
            _errors.push({
                field: input.name,
                type: 'format',
                message: `Merci de remplir le champ ${input.placeholder} avec un email correctement formaté`
            })
        } else if (input.name === 'password' && !isPasswordValid(input.value)) {
            // Création de l'erreur de format du password
            _errors.push({
                field: input.name,
                type: 'format',
                message: `Le mot de passe doit contenir au moins 8 caractères dont un chiffre, une majuscule et un caractère spécial`
            })

        } else {

            //     // console.log("tout s est bien passé, on peut créer le user");

            //     //La valeur de l'input est ni vide, ni en erreur (format)
            //     // Valorisé à chaque tour dans la boucle la propriété correctement rempli dans le this._user

            //     // console.log(input.value);
            //     // console.log(_user);

            switch (input.name) {
                case 'nickname':
                    _user.nickname = input.value
                    break;
                case 'lastname':
                    if (_user.lastname != "") {
                        _user.lastname = input.value
                    }
                    break;
                case 'firstname':
                    if (_user.firstname != "") {
                        _user.firstname = input.value
                    }
                    break;
                case 'email':
                    _user.email = input.value
                        // console.log(_user.email)
                    break;
                case 'password':
                    _user.password = input.value
                    break;
                case 'avatar':
                    if (_user.avatar != "") {
                        _user.avatar = input.value
                    }
                    break;
            }
        }
    })

    // Si On a des errors
    if (_errors.length > 0) {

        console.log("Il y a des errors !!!!!!!!!!!")

        // On enregistre les errors de notre form dans la class ErrorCustom,
        _customError.messages = _errors
            // afin de bénéficier des fonctionnalités de celui-ci pour les affichées par la suite
        return false
    } else {

        // console.log(form)

        ajaxCallBack.persistUser(form);

        updateUserInfoLS(_key, _user.email)

        // on modifie l'affichage : affiche le token LOGOUT et masque inscription
        displayTokenLog();


        // Vider les erreurs
        const errorSpan = document.querySelector('.errors')
        errorSpan.classList.remove('form-error')
        errorSpan.innerHTML = ''
        errorSpan.innerText = ''

        return true
    }
}

/**
 * Get the value for this key
 * @param {string} key 
 * @returns {string} LocalStorage's value for this key
 */
function getUserInfoLS(key) {
    const _manager = new ManagerLS;
    return _manager.getDatasByKey(key);
}

/**
 * Persist in LocalStorage the value for the Key
 * @param {string} key 
 * @param {string} value 
 */
function updateUserInfoLS(key, value) {
    const _manager = new ManagerLS // Enregistrer ou mettre à jour le mail du user dans le LocalStorage
    _manager.setDatas(key, value)
}

/**
 * Test email
 * @param {string} email 
 * @returns {boolean} valid or not
 */
function isMailValid(email) {
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const regExMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
    if (regExMail.test(email) && email.length < 30) {
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
    // https://ihateregex.io/expr/password/
    // Au moins 8 caractères [max 20] dont une majuscule, [une minuscule], un chiffre et un caractère spécial
    const regExPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/;
    if (regExPwd.test(pwd)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Display Token on navbar
 */
function displayTokenLog() {
    const $tokens = document.querySelectorAll('.navHeader.log li');
    $tokens.forEach($token => {
        $token.classList.toggle('hide');
    });
}


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


export { currentNav, checkInputAll, displayTabUser, logValidate, addValidate, getUserInfoLS, updateUserInfoLS, testMessageBeforeDisplay, detectColorScheme, switchTheme }
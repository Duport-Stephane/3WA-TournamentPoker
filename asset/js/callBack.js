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
        // console.log(address);
    let beginPage = address.indexOf('=') + 1;
    // console.log(beginPage);
    let endPage = address.indexOf('&', beginPage);
    // console.log(endPage);
    if (endPage === -1) {
        endPage = address.length;
    }
    // console.log(endPage);
    const pageAct = address.slice(beginPage, endPage);

    // addInfoLS("log", "Display " + pageAct)
    // console.log(pageAct);

    // cas particulier de la page HOME lors du premier chargement
    // il n'y a pas de parametre "page=" dans le root
    if (beginPage === 0) {
        document.querySelector('.navHeader a.home').classList.add('current');
    } else {
        // liste des balises 'a' du menu
        const listA = document.querySelectorAll('.navHeader a, footer section:last-child a')
        listA.forEach(e => {

            // console.log(pageAct + " \\+/ " + beginPage + " \\+/ " + e)
            if (e.classList.contains(pageAct)) {
                // console.log(pageAct + " \\+/ " + e)
                e.classList.toggle('current');
            }
        });
    }
    return pageAct;
}


// Remplacement de caractères interdits lors des saisies
function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/#/g, '&#35;')
        .replace(/{/g, '&laquo;')
        .replace(/}/g, '&raquo;')
        .replace(/\n/g, '&#92;n')
        .replace(/\r/g, '&#92;r');
}


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
 * @param {string} key 
 * @param {string} value 
 */
function addInfoLS(key, value) {
    const _manager = new ManagerLS
    const _old = _manager.getDatasByKey(key)
        // const timeNow = new Date()
        // const timeNowFormat = timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds() + " => "
        // const _new = _old + String.fromCharCode(10) + timeNowFormat + value
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


// page INSCRIPTION || DASHBOARDUSER
//*******************************************************************
/**
 * Controle si le Form est correctement renseigné, avant de persist le User
 * @param {formData} form
 * @returns {boolean}
 */
function addValidate(form, action) {

    addInfoLS("log", "addValidate")

    const _key = 'user' // Clé d'accès au stockage du LocalStorage
    const _errors = [] // Référencer les erreurs trouvées dans le form lors du validate
    const _customError = new ErrorCustom // Référencer et afficher les erreurs
    const _user = {
            nickname: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role_id: '',
            avatar: ''
        } // Stocker les infos du user

    // console.log(form)

    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {

        addInfoLS("log", input.name + " : " + input.value);

        // Si les champs obligatoires sont vides => ERROR
        if (input.value === "" && input.name != 'lastname' && input.name != 'firstname' && input.name != 'avatar' && input.name != 'findUser') {
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
                message: `Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial`
            })
        } else if (input.name === 'role' && isNaN(parseInt(input.value))) {
            _errors.push({
                field: input.name,
                type: 'format',
                message: `Merci de remplir le champ ${input.name}`
            })

        } else {

            //     // console.log("tout s est bien passé, on peut créer le user");

            //     //La valeur de l'input est ni vide, ni en erreur (format)
            //     // Valorisé à chaque tour dans la boucle la propriété correctement rempli dans le this._user

            //     // console.log(input.value);
            //     // console.log(_user);

            switch (input.name) {
                case 'nickname':
                    _user.nickname = htmlEntities(input.value)
                    break;
                case 'lastname':
                    if (_user.lastname !== "") {
                        _user.lastname = htmlEntities(input.value)
                    }
                    break;
                case 'firstname':
                    if (_user.firstname !== "") {
                        _user.firstname = htmlEntities(input.value)
                    }
                    break;
                case 'email':
                    _user.email = htmlEntities(input.value)
                        // console.log(_user.email)
                    break;
                case 'password':
                    _user.password = htmlEntities(input.value)
                    break;
                case 'avatar':
                    if (_user.avatar !== "") {
                        _user.avatar = htmlEntities(input.value)
                    }
                    break;
                case 'role':
                    if (_user.role_id !== "") {
                        _user.role_id = parseInt(input.value)
                    }
                    break;
            }
        }
    })

    // Si On a des errors
    if (_errors.length > 0) {

        // console.log("Il y a des errors !!!!!!!!!!!")
        addInfoLS("log", "There's some ERRORS");
        // _errors.forEach(err => {
        //     addInfoLS("log", `${err.field} : ${err.message}`);
        // });

        // On enregistre les errors de notre form dans la class ErrorCustom,
        _customError.setMessages(_errors);
        // afin de bénéficier des fonctionnalités de celui-ci pour les affichées par la suite

        _customError.displayMessages();

        return false
    } else {

        addInfoLS("log", "ACTION : " + action)
        let res;

        if (action === 'persist') {
            res = ajaxCallBack.isPersistUser(form);

            // Inscrire le nouvel user dans le localStorage : pas une bonne idée
            // updateInfoLS(_key, _user.email)

        } else if (action === 'updateUser') {
            ajaxCallBack.updateUser(form);

        } else if (action === 'updateAdmin') {
            ajaxCallBack.updateAdmin(form);
        }
        // console.log(_customError.messages);
        // console.log("RES : " + res);

        if (!res) {
            return false
        } else {
            _customError.viderError();
            return true;
        }

        // // Vider les erreurs
        // const errorSpan = document.querySelector('.errors')
        // errorSpan.classList.remove('form-error')
        // errorSpan.innerHTML = ''
        // errorSpan.innerText = ''

    }
}



// page LOGIN
//*******************************************************************

/**
 * 
 * @param {formData} form 
 * @returns {boolean}
 */
function logValidate(form) {

    addInfoLS("log", "logValidate");

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

        // console.log("TEST de ", input)

        // Si les champs obligatoires sont vides => ERROR
        if (input.value === "") {


            addInfoLS("log", "invalid: EMPTY ", input)

            this._errors.push({
                field: input.name,
                type: 'empty',
                message: `Merci de remplir le champ ${input.placeholder}`
            })
        } else if (input.name === 'email' && !isMailValid(input.value)) {

            addInfoLS("log", "invalid EMAIL ", input)

            // Création de l'erreur de format du mail
            _errors.push({
                field: input.name,
                type: 'format',
                message: `Merci de remplir le champ ${input.placeholder} avec un email correctement formaté`
            })
        } else if (input.name === 'password' && !isPasswordValid(input.value)) {

            addInfoLS("log", "invalid PWD ", input)

            // Création de l'erreur de format du password
            _errors.push({
                field: input.placeholder,
                type: 'format',
                message: `Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial`
            })
        } else {

            // addInfoLS("log", "save l'input ", input.name)

            switch (input.name) {
                case 'email':
                    _user.email = htmlEntities(input.value)
                    break;
                case 'password':
                    _user.password = htmlEntities(input.value)
                    break;
            }
        }
    })

    if (_errors.length > 0) {

        addInfoLS("log", _errors);

        // On enregistre les errors de notre form dans la class ErrorCustom,
        _customError.messages = _errors
            // afin de bénéficier des fonctionnalités de celui-ci pour les affichées par la suite

        _customError.displayMessages();

        return false
    } else {
        // on compare le password saisi à celui qui est en BDD
        // const Rep = ajaxCallBack.isSamePassword(form);
        // console.log(Rep);

        if (ajaxCallBack.isSamePassword(form)) {

            addInfoLS("log", "Les mots de passe coïncident : LOGIN ok !")

            // si OK, actualise le mail dans le LocalStorage
            updateInfoLS(_key, _user.email)

            return true;
        } else {
            _errors.push({
                field: 'email',
                type: 'format',
                message: `Vos identifiants sont incorrects. Merci de réessayer.`
            });
            _customError.messages = _errors;
            _customError.displayMessages();
            document.querySelector('.auth input[name=password]').value = "";
            document.querySelector('.auth input[name=password]').focus();

            return false;
        }
    }
}



// COMMUN page LOGIN & INSCRIPTION
//*******************************************************************

/**
 * Test email
 * @param {string} email 
 * @returns {boolean} valid or not
 */
function isMailValid(email) {

    addInfoLS("log", "isMailValid");

    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
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

    addInfoLS("log", "isPassordValid");

    // https://ihateregex.io/expr/password/
    // Au moins 8 caractères [max 32] dont une majuscule, [une minuscule], un chiffre et un caractère spécial
    const regExPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/;
    if (regExPwd.test(pwd)) {
        return true;
    } else {
        return false;
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

    addInfoLS("log", "checkInputAll");

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

    addInfoLS("log", "displayTabUSer");

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
        // Construction des lignes du tableau, une par user
        const $tr = document.createElement('tr');
        $userList.append($tr);
        // un td pour chaque colonne
        let $td = document.createElement('td');
        $tr.append($td);
        // l'input avec la checkbox dans la 1ere colonne
        const $input = document.createElement('input');
        $input.type = 'checkbox';
        $input.name = 'checkboxuser[]';
        $input.value = htmlEntities(user['id']);
        $td.append($input);
        let value;
        let $add
            // nickName dans le 2eme colonne, puis fisrt et last name...
        for (let column = 2; column < 5; column++) {
            switch (column) {
                case 2:
                    value = htmlEntities(user['nickName'])
                    break;
                case 3:
                    value = htmlEntities(user['firstName'])
                    break;
                case 4:
                    value = htmlEntities(user['lastName'])
                    break;
                default:
                    console.log('Désolé, il n\'y a plus de choix');
            }
            $add = document.createElement('td');
            $tr.append($add);
            $add.append(value);
        }
        // et s'il y a un avatar... en dernière colonne
        if (htmlEntities(user['avatar']) && htmlEntities(user['avatar']) != '') {
            const $avatar = document.createElement('img');
            $avatar.src = htmlEntities(user['avatar']);
            $avatar.alt = 'avatar';
            $add = document.createElement('td');
            $tr.append($add);
            $add.append($avatar);
        }
    })
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

    addInfoLS("log", "testMessageBeforeDisplay");

    let indexOfFirst;
    if (indexOfFirst = message.indexOf("Danger") != -1) {
        displayMessage(message.slice(8), 'Danger');
    } else if (indexOfFirst = message.indexOf("Warning") != -1) {
        displayMessage(message.slice(9), 'Warning');
    } else {
        displayMessage(message.slice(9), 'Success');
    }
}

/**
 * 
 * @param {string} state criticité du message
 * @param {string} message Message à afficher
 */
function displayMessage(state, message) {

    addInfoLS("log", message);

    const $messages = document.querySelector('.message');
    const $balise = document.createElement('div')
    $balise.setAttribute('class', 'alert alert-' + state);
    $messages.append($balise);
    $balise.append(message);

    // removeMessage();
}

/**
 * Gestion du temps d'affichage des messages
 */
function removeMessage() {

    // addInfoLS("log","REMOVE INFOS")

    // const mess = document.querySelector('.alert');
    // mess.delay(2500).fadeOut(600);
    $('.message').delay(2000).fadeOut(600);


    // @TODO Supprimer les anciens message, pour qu'il ne s'affichent plus en cas de refresh de la page
    // voir a supprimer les P plutot que les DIV !!!!!!

    const $messages = document.querySelector('.message');
    // console.log($messages.childNodes);
    if ($messages.hasChildNodes()) {
        $messages.removeChild($messages.querySelector('.alert'))
    };
    // console.log($messages.childNodes);
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

    // Remove Key "log" from LocalStorage
    removeKeyLS("log");
}


export { currentNav, htmlEntities, checkInputAll, displayTabUser, logValidate, addValidate, getInfoLS, updateInfoLS, addInfoLS, isKeyExistLS, removeKeyLS, testMessageBeforeDisplay, detectColorScheme, switchTheme }
'use strict';

// Appels de dépendances
import * as callback from './callBack.js';
import * as ajaxCallback from './ajaxCallBack.js';
import ErrorCustom from './ErrorCustom.js' // Gestion des erreurs s'i
// import Form from './Form.js';
import * as canvas from './canvas.js';

///////////////////////////////// JS DESACTIVé ////////////////////////////////////
/*
Si on désactive JS, les formulaires peuvent être remplis et soumis, les erreurs gérées :
- Player ; refresh / addlayer / delplayer....
Eventuellement, mettre des action= et des method= dans les form
*/

// Ecoute global (chargement)
document.addEventListener('DOMContentLoaded', function() {

    // ENSEMBLE DES PAGES
    //*******************************************************************
    // A chaque changement de page, met en évidence le bon menu de la nav du header etcelui de A propos
    callback.currentNav();

    // jQuery - Affichage de la notif pendant 2 sec 
    $('#notif').delay(2000).fadeOut()

    // connaitre la page actuelle
    const address = window.location.href
    const pageAct = address.slice(address.lastIndexOf('=') + 1);

    // page PLAYER
    //*******************************************************************
    // Refresh la page PLAYER, pour afficher les 2 tableaux
    if (pageAct === 'players') {

        // Ecoute le click sur la checkbox ALL des 2 tableaux Users et Players 
        // Si coché alors il faut cocher TOUS les checkboxes
        // Si décoché, alors décocher TOUS les checkboxes
        const $allCheckboxes = document.querySelectorAll("input[name='checkboxall[]']");

        // console.log('APPEL DE ALL INPUTS : ' + $allCheckboxes);

        $allCheckboxes.forEach($checkbox => {
            $checkbox.addEventListener('change', e => {
                // console.log(e)
                callback.checkInputAll(e.target.checked, e.target.value);
            })
        });


        // console.log('APPEL DE addplayer et delPlayer');
        // Ecoute des boutons Ajouter un player et Retirer un player
        const $buttonValidUsers = document.querySelectorAll('.addPlayerList, .delPlayerList')
            // Ecoute le click sur les boutons et passe les checkboses cochées au travers du form
        $buttonValidUsers.forEach($button => {
            $button.addEventListener('submit', e => {
                e.preventDefault();
                const form = new FormData(e.target);
                e.target.reset();

                ajaxCallback.modifPlayerList(form);
            });
        });
    }

    // page LOGIN
    //*******************************************************************
    if (pageAct === 'login') {

        console.log("Page LOGIN");

        const _customError = new ErrorCustom // Référencer et afficher les erreurs
        const user_email = callback.getUserInfoLS('user');

        // Si exist : affiche le mail du LocalStorage dans l'input Mail du log
        if (user_email != "" && user_email != null) {
            // console.log(user_email);
            ajaxCallback.userKnown(user_email);
        };

        document.querySelector('#auth').addEventListener('submit', e => {
            e.preventDefault();
            // console.log(e);
            const action = e.currentTarget.id

            console.log(action);

            // form datas
            const form = new FormData(e.currentTarget)
                // console.log(form);

            if (callback.logValidate(form)) {
                console.log("TOUT EST OK pour l'authentification")
                    // true => on efface le formulaire
                e.currentTarget.reset();
            } else {
                console.log("PERDU PAS d'authentification")
                    // false => on reste sur le form et on affiche les erreurs détectées
                _customError.displayMessages();
            }
        });
    }

    // page INSCRIPTION
    //*******************************************************************
    if (pageAct === 'inscription') {

        console.log('PAGE inscription');
        // return;

        document.getElementById('createUser').addEventListener('submit', e => {
            // $('#createUser').on('submit', e => {
            e.preventDefault();

            // console.log(e);

            // const champsAControler = ['nickname', 'lastname', 'firstname', 'email', 'password', 'avatar'];
            // const inputs = document.querySelectorAll('input');
            // const form = new Form(inputs, champsAControler);

            // Get action to do (from input hidden)
            const action = e.currentTarget.id

            console.log(action);

            // form datas
            const form = new FormData(e.currentTarget)

            // console.log(form);

            if (callback.addValidate(form)) {
                console.log("TOUT EST OK pour la création du USER")
                    // true => on efface le formulaire
                e.currentTarget.reset();
            } else {
                console.log("PERDU PAS de création")
                    // false => on reste sur le form et on affiche les erreurs détectées
                form.customError.displayMessages();
            }
        });
    }

    // page BONUS
    //*******************************************************************
    if (pageAct === 'bonus') {
        document.getElementById('canvasOn').addEventListener('click', e => {
            e.preventDefault;
            canvas.animCanvas();
        });
        document.getElementById('canvasOff').addEventListener('click', e => {
            e.preventDefault;
            canvas.stopCanvas();
        });
    };


    // changement de thème
    //*******************************************************************

    // https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting

    callback.detectColorScheme();

    //identify the toggle switch HTML element
    const toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');

    //listener for changing themes
    toggleSwitch.addEventListener('change', callback.switchTheme, false);

    //pre-check the green-theme checkbox if green-theme is set
    if (document.documentElement.getAttribute("data-theme") == "green") {
        toggleSwitch.checked = true;
    }
});
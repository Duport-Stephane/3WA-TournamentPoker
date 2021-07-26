'use strict';

// Appels de dépendances
import * as callback from './callBack.js';
import * as ajaxCallback from './ajaxCallBack.js';
import ErrorCustom from './ErrorCustom.js' // Gestion des erreurs s'i
// import Form from './Form.js';
import * as canvas from './canvas.js';
import ManagerLS from './ManagerLS.js';

///////////////////////////////// JS DESACTIVé ////////////////////////////////////
/*
Si on désactive JS, les formulaires peuvent être remplis et soumis, les erreurs gérées :
- Player ; refresh / addlayer / delplayer....
Eventuellement, mettre des 'action=' et des 'method=' dans les form
*/

// Ecoute global (chargement)
document.addEventListener('DOMContentLoaded', function() {

    // ENSEMBLE DES PAGES
    //*******************************************************************

    // A chaque changement de page, récupère le nom de la page
    const pageAct = callback.currentPage();

    // met en évidence le bon menu de la nav du header et du footer
    callback.currentNav(pageAct);

    callback.addInfoLS("log", "Display " + pageAct);

    // console.log(pageAct);

    // jQuery - Affichage de la notif pendant 4 sec 
    $('#notif').delay(4000).fadeOut()
    $('#notifAlert').delay(4000).fadeOut()

    // logout before leaving site and NOT PAGE !!!!!!!!!
    // si on prend onbeforeunload, c'est executé dès qu'on change de page et pas à la fermeture de l'appli !
    // window.onbeforeunload = callback.updateUserInfoLS('user', '');


    // page INSCRIPTION || DASHBOARDUSER || DASHBOARDADMIN
    //*******************************************************************
    if (pageAct === 'inscription' || pageAct === 'dashboardUSer' || pageAct === 'dashboardAdmin') {

        // callback.addInfoLS("log", "PAGE inscription / dashboard User");
        // return;

        const $manipUsers = document.querySelectorAll('.createUser, .updateUser, .updateAdmin');
        $manipUsers.forEach($manipUser => {
            $manipUser.addEventListener('submit', e => {
                e.preventDefault();

                // callback.addInfoLS("log", e);
                // console.log(e);
                // callback.addInfoLS("log", e.target[1].value);

                // const champsAControler = ['nickname', 'lastname', 'firstname', 'email', 'password', 'avatar'];
                // const inputs = document.querySelectorAll('input');
                // const form = new Form(inputs, champsAControler);

                // Get action to do (from input hidden)
                const action = e.target[1].value;

                callback.addInfoLS("log", action);

                // form datas
                const form = new FormData(e.currentTarget)

                // console.log(form);

                if (callback.addValidate(form, action)) {
                    // console.log("TOUT EST OK, le USER a été " + action);
                    // true => on efface le formulaire
                    // e.currentTarget.reset();

                    if (action === 'persist') {
                        // Back to Home Page
                        window.location.href = "./index.php?page=home";
                    }
                } else {
                    // console.log("PERDU ! PAS de création / modification du USER")
                    // false => on reste sur le form et on affiche les erreurs détectées
                    // _customError.displayMessages();
                    window.location.reload();
                }
            });
        })
    }


    // page LOGIN
    //*******************************************************************
    if (pageAct === 'login') {

        // callback.addInfoLS("log", "Page LOGIN");

        // const _customError = new ErrorCustom // Référencer et afficher les erreurs
        const user_email = callback.getInfoLS('user');

        // Si exist : affiche le mail du LocalStorage dans l'input Mail du log
        if (user_email.length !== 0) {
            // console.log(user_email);
            callback.addInfoLS("log", "Mail exist")

            document.querySelector('.auth input[name="email"]').value = user_email;
            document.querySelector('.auth input[name="password"]').value = "";
            document.querySelector('.auth input[name="password"]').focus();
        };

        document.querySelector('.auth').addEventListener('submit', e => {
            e.preventDefault();
            // console.log(e);
            // const action = e.currentTarget.id
            // console.log(action);
            // form datas
            const form = new FormData(e.currentTarget)
                // console.log(form);

            if (callback.logValidate(form)) {

                // console.log("TOUT EST OK pour l'authentification")

                // ajaxCallback.loginUser(form);

                // true => on efface le formulaire
                e.currentTarget.reset();

                window.location = './index.php?page=home';


            } else {

                // console.log("PERDU PAS d'authentification")

                // false => on reste sur le form et on affiche les erreurs détectées
                // _customError.displayMessages();
                document.querySelector('.auth input[name=password]').value = "";
                document.querySelector('.auth input[name=password]').focus();
            }
        });
    }


    // Page LOGOUT
    //*******************************************************************

    if (pageAct === 'logout' && callback.isKeyExistLS('user')) {
        document.querySelector('button').addEventListener('click', e => {
            // Vider le localStorage
            callback.removeKeyLS('user');
        })
    }


    // page DASHBOARDADMIN only
    //*******************************************************************
    if (pageAct === 'dashboardAdmin') {

        // Ecoute le clic n'importe où sur une ligne du tableau pour cocher la checkbox
        callback.ListenClickLine();

        // Listenkeyboard on find field
        // document.querySelector('.findUser').addEventListener('keydown', e => {
        //     e.preventDefault;
        //     // a partir de 3 caracteres, on filtre les users affichées dans le tableau


        // })

        // Listen DELETE button
        document.querySelector('.delUserList').addEventListener('submit', e => {
            e.preventDefault();

            // @TODO
            // @TODO = vérifier s'il y au moins une ligne de chochée
            // @TODO

            const form = new FormData(e.target);
            e.target.reset();

            // Confirm ?
            if (window.confirm("Toute suppression est définitve ! Souhaitez-vous supprimer la sélection ?")) {

                callback.addInfoLS("log", "Button delUserList");

                ajaxCallback.delUserList(form);
            }
        });
    }


    // page PLAYER
    //*******************************************************************
    if (pageAct === 'players') {

        // Ecoute le click sur la checkbox ALL des 2 tableaux Users et Players 
        // Si coché alors il faut cocher TOUS les checkboxes
        // Si décoché, alors décocher TOUS les checkboxes
        const $allCheckboxes = document.querySelectorAll("input[name='checkboxall[]']");
        $allCheckboxes.forEach($checkbox => {
            $checkbox.addEventListener('change', e => {
                // console.log(e)
                callback.checkInputAll(e.target.checked, e.target.value);
            })
        });


        // Ecoute le clic n'importe où sur une ligne du tableau pour cocher la checkbox
        callback.ListenClickLine();


        // console.log('APPEL DE addplayer et delPlayer');
        // Ecoute des boutons Ajouter un player et Retirer un player
        const $buttonValidUsers = document.querySelectorAll('.addPlayerList, .delPlayerList')
            // Ecoute le click sur les boutons et passe les checkboxes cochées au travers du form
        $buttonValidUsers.forEach($button => {
            $button.addEventListener('submit', e => {
                e.preventDefault();

                let type;
                if (e.target.className === 'addPlayerList') {
                    type = 'users'
                } else {
                    type = 'players'
                }

                callback.addInfoLS("log", "Button " + e.target.className);

                if (callback.isAtLeastOneCheck(type)) {
                    const form = new FormData(e.target);
                    e.target.reset();

                    ajaxCallback.modifPlayerList(form);
                }
            });
        });
    }


    // page GAME
    //*******************************************************************

    if (pageAct === 'game') {

        const actualTime = document.getElementById("actualTime");
        window.setTimeout(callback.updateTime(), 1000);

    };


    // page BONUS
    //*******************************************************************
    if (pageAct === 'bonus') {

        // callback.addInfoLS("log", "page Bonus");

        const $btnStart = document.getElementById('canvasOn');
        $btnStart.addEventListener('click', e => {
            e.preventDefault;
            $btnStart.disabled = true;
            canvas.animCanvas();
        });
        const $btnStop = document.getElementById('canvasOff');
        $btnStop.addEventListener('click', e => {
            e.preventDefault;
            $btnStart.disabled = false;
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
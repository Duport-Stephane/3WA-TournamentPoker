'use strict';

import * as callback from './callBack.js';
import * as ajaxCallback from './ajaxCallBack.js';
import * as canvas from './canvas.js';
import * as app_Inscription from './app_Inscription.js';
import * as app_Login from './app_Login.js';

document.addEventListener('DOMContentLoaded', function() {

    // FOR ALL PAGES
    //*******************************************************************

    // A chaque changement de page, récupère le nom de la page
    const pageAct = callback.currentPage();

    // met en évidence le bon menu de la nav du header et du footer
    callback.currentNav(pageAct);

    callback.addInfoLS("log", "Display " + pageAct);

    // Remove messages after 4 secondes 
    $('#notif').delay(4000).fadeOut()
    $('#notifAlert').delay(4000).fadeOut()


    // page INSCRIPTION || DASHBOARD_USER || DASHBOARD_ADMIN
    //*******************************************************************
    if (pageAct === 'inscription' || pageAct === 'dashboardUser' || pageAct === 'dashboardAdmin') {

        app_Inscription.inscriptionDashboard();

    }


    // page LOGIN
    //*******************************************************************
    if (pageAct === 'login') {

        app_Login.login_user();

    }


    // Page LOGOUT
    //*******************************************************************

    if (pageAct === 'logout' && callback.isKeyExistLS('user')) {
        document.querySelector('button').addEventListener('click', e => {
            // Remove localStorage
            callback.removeKeyLS('user');
        })
    }


    // page DASHBOARD_ADMIN only
    //*******************************************************************
    if (pageAct === 'dashboardAdmin') {

        // Listen click on line
        callback.ListenClickLine();

        // Listen DELETE button
        document.querySelector('.delUserList').addEventListener('submit', e => {
            e.preventDefault();

            callback.addInfoLS("log", "Button DELETE user");

            if (callback.isAtLeastOneCheck('users')) {
                const form = new FormData(e.target);
                e.target.reset();

                // Confirm ?
                if (window.confirm("Toute suppression est définitve ! Souhaitez-vous supprimer la sélection ?")) {

                    callback.addInfoLS("log", "Button delUserList");

                    ajaxCallback.delUserList(form);
                } else {

                    callback.addInfoLS("log", "Abort DELETE user");

                    window.location = './index.php?page=dashboardAdmin';
                }

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
'use strict';

import * as callback from './callBack.js';
import * as inscription from './app_Inscription.js';
import * as login from './app_Login.js';
import * as admin from './app_Admin.js';
import * as player from './app_Player.js';
import * as bonus from './app_Bonus.js';

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

        inscription.funct_inscriptionDashboard();

    }


    // page LOGIN
    //*******************************************************************
    if (pageAct === 'login') {

        login.funct_login_user();

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

        admin.funct_dashboard_Admin();

    }


    // page PLAYER
    //*******************************************************************
    if (pageAct === 'players') {

        player.funct_player();

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

        bonus.funct_bonus();

    };


    // Modify Theme
    //*******************************************************************
    // https://stackoverflow.com/questions/56300132/how-to-override-css-prefers-color-scheme-setting

    callback.detectColorScheme();

    //identify the toggle switch HTML element
    const toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');

    //listener for changing themes
    toggleSwitch.addEventListener('change', callback.switchTheme, false);

    // //pre-check the green-theme checkbox if green-theme is set
    // if (document.documentElement.getAttribute("data-theme") == "green") {
    //     toggleSwitch.checked = true;
    // }
});
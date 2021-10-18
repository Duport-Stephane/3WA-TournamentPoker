'use strict';

import * as inscription from './app/app_Inscription.js';
import * as login from './app/app_Login.js';
import * as admin from './app/app_Admin.js';
import * as player from './app/app_Player.js';
import * as bonus from './app/app_Bonus.js';
import * as callback from './callBack.js';
import * as call_LS from './callback/callBack_Localstorage.js'
import * as call_Game from './callback/callBack_Game.js'
import * as call_Theme from './callback/callBack_Theme.js'

document.addEventListener('DOMContentLoaded', function() {

    // FOR ALL PAGES
    //*******************************************************************
    // To search for page name
    const pageAct = callback.currentPage();

    // Highlight name in menu and header navbar
    callback.currentNav(pageAct);

    call_LS.addInfoLS("log", "Display " + pageAct);

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
    if (pageAct === 'logout' && call_LS.isKeyExistLS('user')) {
        document.querySelector('button').addEventListener('click', e => {
            // Remove localStorage
            call_LS.removeKeyLS('user');
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
        window.setTimeout(call_Game.updateTime(), 1000);

    };

    // page BONUS
    //*******************************************************************
    if (pageAct === 'bonus') {

        bonus.funct_bonus();

    };

    // Modify Theme
    //*******************************************************************
    call_Theme.detectColorScheme();

    //identify the toggle switch HTML element
    const toggleSwitch = document.querySelector('#theme-switch input[type="checkbox"]');

    //listener for changing themes
    toggleSwitch.addEventListener('change', call_Theme.switchTheme, false);
});
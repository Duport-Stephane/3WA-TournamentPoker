'use strict';

import * as callback from './callBack.js';
import * as ajaxCallback from './ajaxCallBack.js';

// page PLAYER
//*******************************************************************
function funct_player() {

    // Listen checkbox ALL on array Users et Players 
    // if CheckAll is checked, then check all the checkboxes
    // and onversely
    const $allCheckboxes = document.querySelectorAll("input[name='checkboxall[]']");
    $allCheckboxes.forEach($checkbox => {
        $checkbox.addEventListener('change', e => {
            callback.checkInputAll(e.target.checked, e.target.value);
        })
    });

    // Listen click anywhere on line
    callback.ListenClickLine();

    // Liste add and delete player button
    const $buttonValidUsers = document.querySelectorAll('.addPlayerList, .delPlayerList')
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

export { funct_player }
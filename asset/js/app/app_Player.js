'use strict';

import * as call_LS from '../callback/callBack_Localstorage.js'
import * as call_Payer_DashAdmin from '../callback/callBack_Player_DashAdmin.js'
import * as call_checkbox from '../callback/callBack_Checkbox.js'
import * as ajaxCallback from '../ajaxCallBack.js';

// page PLAYER
//*******************************************************************
function funct_player() {

    // Listen checkbox ALL on array Users et Players 
    // if CheckAll is checked, then check all the checkboxes
    // and onversely
    const $allCheckboxes = document.querySelectorAll("input[name='checkboxall[]']");
    $allCheckboxes.forEach($checkbox => {
        $checkbox.addEventListener('change', e => {
            call_checkbox.checkInputAll(e.target.checked, e.target.value);
        })
    });

    // Listen click anywhere on line
    call_Payer_DashAdmin.ListenClickLine();

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

            call_LS.addInfoLS("log", "Button " + e.target.className);

            if (call_checkbox.isAtLeastOneCheck(type)) {
                const form = new FormData(e.target);
                e.target.reset();

                ajaxCallback.modifPlayerList(form);
            }
        });
    });
}

export { funct_player }
'use strict';

import * as call_LS from './callBack_Localstorage.js'
import * as call_Payer_DashAdmin from './callBack_Player_DashAdmin.js'
import * as call_checkbox from './callBack_Checkbox.js'
import * as ajaxCallback from './ajaxCallBack.js';

// page DASHBOARD_ADMIN only
//*******************************************************************
function funct_dashboard_Admin() {
    // Listen click on line
    call_Payer_DashAdmin.ListenClickLine();

    // Listen DELETE button
    document.querySelector('.delUserList').addEventListener('submit', e => {
        e.preventDefault();

        if (call_checkbox.isAtLeastOneCheck('users')) {
            const form = new FormData(e.target);
            e.target.reset();

            call_LS.addInfoLS("log", "Button DELETE user");

            ajaxCallback.delUserList(form);

        }
    });
}

export { funct_dashboard_Admin }
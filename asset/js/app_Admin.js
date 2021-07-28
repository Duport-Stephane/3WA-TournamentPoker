'use strict';

import * as call_LS from './callBack_Localstorage.js'
import * as call_Payer_DashAdmin from './callBack_Player_DashAdmin.js'
import * as call_Player from './callBack_Player.js'
import * as ajaxCallback from './ajaxCallBack.js';

// page DASHBOARD_ADMIN only
//*******************************************************************
function funct_dashboard_Admin() {
    // Listen click on line
    call_Payer_DashAdmin.ListenClickLine();

    // Listen DELETE button
    document.querySelector('.delUserList').addEventListener('submit', e => {
        e.preventDefault();

        call_LS.addInfoLS("log", "Button DELETE user");

        if (call_Player.isAtLeastOneCheck('users')) {
            const form = new FormData(e.target);
            e.target.reset();

            // Confirm ?
            if (window.confirm("Toute suppression est définitve ! Souhaitez-vous supprimer la sélection ?")) {

                call_LS.addInfoLS("log", "Button delUserList");

                ajaxCallback.delUserList(form);
            } else {

                call_LS.addInfoLS("log", "Abort DELETE user");

                window.location = './index.php?page=dashboardAdmin';
            }

        }
    });
}

export { funct_dashboard_Admin }
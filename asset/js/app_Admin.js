'use strict';

import * as callback from './callBack.js';
import * as ajaxCallback from './ajaxCallBack.js';

// page DASHBOARD_ADMIN only
//*******************************************************************
function funct_dashboard_Admin() {
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

export { funct_dashboard_Admin }
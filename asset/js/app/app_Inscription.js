'use strict';

import * as call_LS from '../callback/callBack_Localstorage.js'
import * as call_Inscription from '../callback/callBack_Inscription.js'

// page INSCRIPTION || DASHBOARD_USER || DASHBOARD_ADMIN
//*******************************************************************

function funct_inscriptionDashboard() {
    const $manipUsers = document.querySelectorAll('.createUser, .updateUser, .updateAdmin');
    $manipUsers.forEach($manipUser => {
        $manipUser.addEventListener('submit', e => {
            e.preventDefault();

            // Get action to do (from input hidden)
            const action = e.target[1].value;

            call_LS.addInfoLS("log", action);

            // form datas
            const form = new FormData(e.currentTarget)

            if (call_Inscription.addValidate(form, action)) {

                if (action === 'persist') {
                    // Back to Home Page
                    window.location.href = "./index.php?page=home";
                }
            } else {
                window.location.reload();
            }
        });
    });
}

export { funct_inscriptionDashboard };
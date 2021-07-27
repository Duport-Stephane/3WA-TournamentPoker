'use strict';

import * as callback from './callBack.js';

// page INSCRIPTION || DASHBOARD_USER || DASHBOARD_ADMIN
//*******************************************************************

function funct_inscriptionDashboard() {
    const $manipUsers = document.querySelectorAll('.createUser, .updateUser, .updateAdmin');
    $manipUsers.forEach($manipUser => {
        $manipUser.addEventListener('submit', e => {
            e.preventDefault();

            // Get action to do (from input hidden)
            const action = e.target[1].value;

            callback.addInfoLS("log", action);

            // form datas
            const form = new FormData(e.currentTarget)

            if (callback.addValidate(form, action)) {

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
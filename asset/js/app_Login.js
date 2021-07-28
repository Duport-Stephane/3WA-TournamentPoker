'use strict';

import * as call_Login from './callBack_Login.js';
import * as call_LS from './callBack_Localstorage.js'

// page LOGIN
//*******************************************************************

function funct_login_user() {
    const user_email = call_LS.getInfoLS('user');

    // If exist : display mail from LocalStorage
    if (user_email.length !== 0) {

        call_LS.addInfoLS("log", "Mail exist")

        document.querySelector('.auth input[name="email"]').value = user_email;
        document.querySelector('.auth input[name="password"]').value = "";
        document.querySelector('.auth input[name="password"]').focus();
    };

    document.querySelector('.auth').addEventListener('submit', e => {
        e.preventDefault();
        // form datas
        const form = new FormData(e.currentTarget)

        if (call_Login.logValidate(form)) {

            e.currentTarget.reset();
            window.location = './index.php?page=home';

        } else {

            document.querySelector('.auth input[name=password]').value = "";
            document.querySelector('.auth input[name=password]').focus();
        }
    });
};

export { funct_login_user }
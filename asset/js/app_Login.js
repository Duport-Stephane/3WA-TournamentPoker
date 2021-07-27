'use strict';

import * as callback from './callBack.js';

// page LOGIN
//*******************************************************************

function funct_login_user() {
    const user_email = callback.getInfoLS('user');

    // If exist : display mail from LocalStorage
    if (user_email.length !== 0) {

        callback.addInfoLS("log", "Mail exist")

        document.querySelector('.auth input[name="email"]').value = user_email;
        document.querySelector('.auth input[name="password"]').value = "";
        document.querySelector('.auth input[name="password"]').focus();
    };

    document.querySelector('.auth').addEventListener('submit', e => {
        e.preventDefault();
        // form datas
        const form = new FormData(e.currentTarget)

        if (callback.logValidate(form)) {

            e.currentTarget.reset();
            window.location = './index.php?page=home';

        } else {

            document.querySelector('.auth input[name=password]').value = "";
            document.querySelector('.auth input[name=password]').focus();
        }
    });
};

export { funct_login_user }
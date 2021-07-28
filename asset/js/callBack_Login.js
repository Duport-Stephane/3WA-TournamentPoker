'use strict'

import * as ajaxCallBack from './ajaxCallBack.js';
import ManagerLS from './ManagerLS.js';
import ErrorCustom from './ErrorCustom.js';
import * as call_LS from './callBack_Localstorage.js';

// page LOGIN
//*******************************************************************

/**
 * 
 * @param {formData} form 
 * @returns {boolean}
 */
function logValidate(form) {

    call_LS.addInfoLS("log", "logValidate");

    const _key = 'user' // Key for LocalStorage
    const _errors = []
    const _customError = new ErrorCustom
    const _user = {
        email: '',
        password: '',
        role: ''
    }

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {

        if (input.value === "") {

            call_LS.addInfoLS("log", "invalid: EMPTY ", input)

            this._errors.push({
                field: input.name,
                type: 'empty',
                message: `Merci de remplir le champ ${input.placeholder}`
            })
        } else if (input.name === 'email' && !isMailValid(input.value)) {

            call_LS.addInfoLS("log", "invalid EMAIL ", input)

            _errors.push({
                field: input.name,
                type: 'format',
                message: `Merci de remplir le champ ${input.placeholder} avec un email correctement formaté`
            })
        } else if (input.name === 'password' && !isPasswordValid(input.value)) {

            call_LS.addInfoLS("log", "invalid PWD ", input)

            _errors.push({
                field: input.placeholder,
                type: 'format',
                message: `Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial`
            })
        } else {

            input.value = htmlEntities(input.value)

            switch (input.name) {
                case 'email':
                    _user.email = htmlEntities(input.value)
                    break;
                case 'password':
                    _user.password = htmlEntities(input.value)
                    break;
            }
        }
    })

    if (_errors.length > 0) {

        call_LS.addInfoLS("log", _errors);

        _customError.setMessages(_errors);
        _customError.displayMessages(currentPage(), 'auth');

        return false
    } else {

        if (ajaxCallBack.isSamePassword(form)) {

            call_LS.addInfoLS("log", "Les mots de passe coïncident : LOGIN ok !")

            // if OK, update mail in LocalStorage
            call_LS.updateInfoLS(_key, _user.email)

            return true;
        } else {
            _errors.push({
                field: 'email',
                type: 'format',
                message: `Vos identifiants sont incorrects. Merci de réessayer.`
            });
            _customError.setMessages(_errors);
            _customError.displayMessages(currentPage(), 'auth');
            document.querySelector('.auth input[name=password]').value = "";
            document.querySelector('.auth input[name=password]').focus();

            return false;
        }
    }
}

export { logValidate }
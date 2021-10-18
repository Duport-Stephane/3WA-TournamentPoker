'use strict'

import * as callback from '../callBack.js';
import * as call_LS from '../callback/callBack_Localstorage.js';
import * as call_Log_Inscript from '../callback/callBack_Log_Inscript.js'
import * as ajaxCallBack from '../ajaxCallBack.js';
import ErrorCustom from '../class/ErrorCustom.js';


// page INSCRIPTION || DASHBOARDUSER || DASHBOARDADMIN
//*******************************************************************
/**
 * Control if no problems in FORM before persist/update User/admin
 * @param {formData} form
 * @returns {boolean}
 */
function addValidate(form, action) {

    call_LS.addInfoLS("log", "addValidate")

    const _key = 'user' // Key for LocalStorage
    const _errors = []
    const _customError = new ErrorCustom
    const _user = {
        nickname: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role_id: '',
        avatar: ''
    }

    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {

        if (input.value === "" && input.name != 'lastname' && input.name != 'firstname' && input.name != 'avatar' && input.name != 'findUser') {
            _errors.push({
                field: input.name,
                type: 'empty',
                message: `Merci de remplir le champ ${input.placeholder}`
            })
        } else if (input.name === 'email' && !call_Log_Inscript.isMailValid(input.value)) {
            _errors.push({
                field: input.name,
                type: 'format',
                message: `Merci de remplir le champ ${input.placeholder} avec un email correctement formaté`
            })
        } else if (input.name === 'password' && !call_Log_Inscript.isPasswordValid(input.value)) {
            _errors.push({
                field: input.name,
                type: 'format',
                message: `Le mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial`
            })
        } else if (input.name === 'role' && isNaN(parseInt(input.value))) {
            _errors.push({
                field: input.name,
                type: 'format',
                message: `Merci de remplir le champ ${input.name}`
            })

        } else {
            switch (input.name) {
                case 'nickname':
                    input.value = callback.htmlEntities(input.value);
                    _user.nickname = callback.htmlEntities(input.value)
                    break;
                case 'lastname':
                    if (_user.lastname !== "") {
                        input.value = callback.htmlEntities(input.value);
                        _user.lastname = callback.htmlEntities(input.value)
                    }
                    break;
                case 'firstname':
                    if (_user.firstname !== "") {
                        input.value = callback.htmlEntities(input.value);
                        _user.firstname = callback.htmlEntities(input.value)
                    }
                    break;
                case 'email':
                    input.value = callback.htmlEntities(input.value);
                    _user.email = callback.htmlEntities(input.value)
                    break;
                case 'password':
                    input.value = callback.htmlEntities(input.value);
                    _user.password = callback.htmlEntities(input.value)
                    break;
                case 'avatar':
                    if (_user.avatar !== "") {
                        _user.avatar = callback.htmlEntities(input.value)
                    }
                    break;
                case 'role':
                    if (_user.role_id !== "") {
                        _user.role_id = parseInt(input.value)
                    }
                    break;
            }
        }
    })

    if (_errors.length > 0) {

        call_LS.addInfoLS("log", "There's some ERRORS");
        _customError.setMessages(_errors);

        _customError.displayMessages(currentPage(), action);

        return false
    } else {
        let res;

        if (action === 'persist') {
            res = ajaxCallBack.isPersistUser(form);

        } else if (action === 'updateUser') {
            ajaxCallBack.updateUser(form);

        } else if (action === 'updateAdmin') {
            ajaxCallBack.updateAdmin(form);
        }

        if (!res) {
            call_LS.addInfoLS("log", action + ": FALSE");
            return false
        } else {
            call_LS.addInfoLS("log", action + ": TRUE");
            _customError.viderError();
            return true;
        }
    }
}

export { addValidate }
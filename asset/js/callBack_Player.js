'use strict'

import ErrorCustom from './ErrorCustom.js';
import * as call_LS from './callBack_Localstorage.js';

// page PLAYER
//*******************************************************************
/**
 * If checkBox ALL is shecked, then all the CheckBox are checked
 * @param {bool} isChecked
 * @param {string} type user or player : to choose good array
 */
function checkInputAll(isChecked, type) {

    call_LS.addInfoLS("log", "checkInputAll");

    const checkboxes = document.querySelectorAll('.tab' + type + 'List input');
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
}

/** 
 * Control if at least one checkbox is shecked in this array (type = user or player)
 * @param {*} type 
 */
function isAtLeastOneCheck(type) {

    let isCheck = false;
    const checkboxes = document.querySelectorAll('.tab' + type + "List input[name='checkboxuser[]']");
    checkboxes.forEach(checkbox => {

        if (checkbox.checked === true) {
            isCheck = true;
        };
    });

    call_LS.addInfoLS("log", "isAtLeastOneCheck, type : " + type + " = " + isCheck);

    if (!isCheck) {
        const _customError = new ErrorCustom
        _customError.setMessages('Vous n\'avez sélectionné aucune ligne dans cette liste !');
        _customError.displayMessages(currentPage(), 'display');
    }
    return isCheck;
}

/**
 * Display 2 array in page Player
 * @param {array} users 
 * @param {string} typeUser user or player : to choose good array
 */
function displayTabUser(users, typeUser) {

    call_LS.addInfoLS("log", "displayTabUSer");

    const $tableauUser = document.querySelector('.tab' + typeUser + 'List');
    // Clear nods in html array
    while ($tableauUser.firstChild) {
        $tableauUser.removeChild($tableauUser.firstChild);
    }
    // insert table to prepare array
    const $userList = document.createElement('table');
    $userList.classList.add('array', typeUser);
    $tableauUser.append($userList);
    users.map(user => {
        // add one line per user
        const $tr = document.createElement('tr');
        $userList.append($tr);
        // add one td per column
        let $td = document.createElement('td');
        $tr.append($td);
        // Input with checkbox in first column
        const $input = document.createElement('input');
        $input.type = 'checkbox';
        $input.name = 'checkboxuser[]';
        $input.value = htmlEntities(user['id']);
        $td.append($input);
        let value;
        let $add
            // nickName in second column, then first and last name
        for (let column = 2; column < 5; column++) {
            switch (column) {
                case 2:
                    value = htmlEntities(user['nickName'])
                    break;
                case 3:
                    value = htmlEntities(user['firstName'])
                    break;
                case 4:
                    value = htmlEntities(user['lastName'])
                    break;
                default:
                    console.log('Désolé, il n\'y a plus de choix');
            }
            $add = document.createElement('td');
            $tr.append($add);
            $add.append(value);
        }
        // And if avatar at the end
        if (htmlEntities(user['avatar']) && htmlEntities(user['avatar']) != '') {
            const $avatar = document.createElement('img');
            $avatar.src = htmlEntities(user['avatar']);
            $avatar.alt = 'avatar';
            $add = document.createElement('td');
            $tr.append($add);
            $add.append($avatar);
        }
    })
}

export { checkInputAll, isAtLeastOneCheck, displayTabUser }
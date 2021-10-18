'use strict'

import * as callback from '../callBack.js';
import * as call_LS from '../callback/callBack_Localstorage.js';
import * as call_checkbox from '../callback/callBack_Checkbox.js'

// page PLAYER
//*******************************************************************

//  If checkBox ALL is shecked, then all the CheckBox are checked
call_checkbox.checkInputAll(isChecked, type)

//  Control if at least one checkbox is shecked in this array (type = user or player)
call_checkbox.isAtLeastOneCheck(type)

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
        $input.value = callback.htmlEntities(user['id']);
        $td.append($input);
        let value;
        let $add
            // nickName in second column, then first and last name
        for (let column = 2; column < 5; column++) {
            switch (column) {
                case 2:
                    value = callback.htmlEntities(user['nickName'])
                    break;
                case 3:
                    value = callback.htmlEntities(user['firstName'])
                    break;
                case 4:
                    value = callback.htmlEntities(user['lastName'])
                    break;
                default:
                    console.log('Désolé, il n\'y a plus de choix');
            }
            $add = document.createElement('td');
            $tr.append($add);
            $add.append(value);
        }
        // And if avatar at the end
        if (callback.htmlEntities(user['avatar']) && callback.htmlEntities(user['avatar']) != '') {
            const $avatar = document.createElement('img');
            $avatar.src = callback.htmlEntities(user['avatar']);
            $avatar.alt = 'avatar';
            $add = document.createElement('td');
            $tr.append($add);
            $add.append($avatar);
        }
    })
}

export { displayTabUser }
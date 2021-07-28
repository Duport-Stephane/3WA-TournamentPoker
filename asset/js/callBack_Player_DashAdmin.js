'use strict'

import * as call_LS from './callBack_Localstorage.js';

// COMMUN page PLAYER & DASHBOARDADMIN
//*******************************************************************

function ListenClickLine() {
    // Ecoute le clic n'importe où sur une ligne du tableau pour cocher la checkbox
    const $lineUser = document.querySelectorAll('.selectUser');

    $lineUser.forEach($line => {
        $line.addEventListener('click', e => {

            call_LS.addInfoLS("log", "Click une ligne entière")

            const $cell = document.querySelector("input[value='" + e.target.classList[1] + "']");
            $cell.checked ? $cell.checked = false : $cell.checked = true;
        })
    });
}

export { ListenClickLine }
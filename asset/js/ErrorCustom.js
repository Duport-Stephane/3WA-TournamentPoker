'use strict'
/*
    Gestion des erreurs
*/

import * as callback from './callBack.js';

class ErrorCustom {

    constructor() {
        this._messages = []
    }

    /**
     * Récupération des erreurs
     *
     * @return array messages
     */
    getMessages() {
        callback.addInfoLS("log", "get errorMessages");
        return this._messages
    }

    /**
     * Mise à jour des erreurs
     */
    setMessages(errorMessages) {

        callback.addInfoLS("log", "Set errorMessages");

        this._messages = errorMessages
    }

    // Affichage des erreurs s'il y en a
    displayMessages(page, action) {

        callback.addInfoLS("log", "display ErrorMessages");
        const $errorSpan = document.querySelector('.message');
        // $errorSpan.innerHTML = '';
        $errorSpan.classList.add('form-error');

        const $p = document.createElement('p');
        const newContent = document.createTextNode(`${this._messages}`);
        // $p.textContent = `${this._messages}`;
        $p.appendChild(newContent);
        $errorSpan.appendChild($p);

        window.setTimeout(function() {
            window.location = './index.php?page=' + page + '&action=' + action
        }, 4000);
    }

    viderError() {

        callback.addInfoLS("log", "Clear Errors");
        // Vider les erreurs
        const $errorSpan = document.querySelector('.message')
        const $errorP = $errorSpan.querySelector('p')
        const $errorChild = $errorSpan.removeChild($errorP)

        $errorSpan.classList.remove('form-error')
            // $errorSpan.innerHTML = ''
            // $errorSpan.innerText = ''
            // $errorSpan.textContent = ''
    }
}

export default ErrorCustom
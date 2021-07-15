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
    displayMessages() {

        callback.addInfoLS("log", "display ErrorMessages");
        const $errorSpan = document.querySelector('.message');
        // $errorSpan.innerHTML = '';
        $errorSpan.classList.add('form-error');
        // Fill
        this._messages.map(msg => {

            callback.addInfoLS("log", `Error = ${msg.field} :: ${msg.message}`);

            const $p = document.createElement('p');
            $p.textContent = `${msg.field} : ${msg.message}`;
            $errorSpan.appendChild($p);
        })

        //     setInterval(this.removeMessages(), 5000);
        this.viderError();
    }

    removeMessages() {

        callback.addInfoLS("log", "remove ErrorMessage");

        const $errorSpan = document.querySelector('.message');
        $errorSpan.classList.remove('form-error');
    }

    viderError() {

        callback.addInfoLS("log", "Clear Errors");
        // Vider les erreurs
        const $errorSpan = document.querySelector('.message')
        $errorSpan.classList.remove('form-error')
            // const $errorP = $errorSpan.querySelector('p')
        $errorSpan.innerHTML = ''
        $errorSpan.innerText = ''
    }
}

export default ErrorCustom
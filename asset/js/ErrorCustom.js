'use strict'

import * as call_LS from './callBack_Localstorage.js';

class ErrorCustom {

    constructor() {
        this._messages = []
    }

    /**
     * Get errors
     *
     * @return array messages
     */
    getMessages() {
        call_LS.addInfoLS("log", "get errorMessages");
        return this._messages
    }

    /**
     * Set errors
     */
    setMessages(errorMessages) {

        call_LS.addInfoLS("log", "Set errorMessages");

        this._messages = errorMessages
    }

    // Display errors
    displayMessages(page, action) {

        call_LS.addInfoLS("log", "display ErrorMessages");
        const $errorSpan = document.querySelector('.message');
        $errorSpan.classList.add('form-error');

        const $p = document.createElement('p');
        const newContent = document.createTextNode(`${this._messages}`);
        $p.appendChild(newContent);
        $errorSpan.appendChild($p);

        window.setTimeout(function() {
            window.location = './index.php?page=' + page + '&action=' + action
        }, 4000);
    }

    viderError() {

        call_LS.addInfoLS("log", "Clear Errors");
        const $errorSpan = document.querySelector('.message')
        const $errorP = $errorSpan.querySelector('p')
        const $errorChild = $errorSpan.removeChild($errorP)

        $errorSpan.classList.remove('form-error')
    }
}

export default ErrorCustom
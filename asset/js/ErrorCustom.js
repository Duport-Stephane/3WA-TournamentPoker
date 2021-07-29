'use strict'

import * as callback from './callBack.js';

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
        callback.addInfoLS("log", "get errorMessages");
        return this._messages
    }

    /**
     * Set errors
     */
    setMessages(errorMessages) {

        callback.addInfoLS("log", "Set errorMessages");

        this._messages = errorMessages
    }

    // Display errors
    displayMessages(page, action) {

        callback.addInfoLS("log", "display ErrorMessages");
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

        callback.addInfoLS("log", "Clear Errors");
        const $errorSpan = document.querySelector('.message')
        const $errorP = $errorSpan.querySelector('p')
        const $errorChild = $errorSpan.removeChild($errorP)

        $errorSpan.classList.remove('form-error')
    }
}

export default ErrorCustom
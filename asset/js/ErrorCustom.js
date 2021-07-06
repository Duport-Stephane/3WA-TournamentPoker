'use strict'
/*
    Gestion des erreurs
*/
class ErrorCustom {

    constructor() {
        this._messages = []
    }

    /**
     * Récupération des erreurs
     *
     * @return array messages
     */
    get messages() {
        return this._messages
    }

    /**
     * Mise à jour des erreurs
     */
    set messages(errorMessages) {

        console.log("Save errorMessage : " + errorMessages);

        this._messages = errorMessages
    }

    // Affichage des erreurs s'il y en a
    displayMessages() {
        const $errorSpan = document.querySelector('.message');
        // $errorSpan.innerHTML = '';
        $errorSpan.classList.add('form-error');
        // Fill
        this.messages.map(msg => {

            console.log(`${msg.field} : ${msg.message}`);

            const $p = document.createElement('p');
            $p.textContent = `${msg.field} : ${msg.message}`;
            $errorSpan.appendChild($p);
        })

        //     setInterval(this.removeMessages(), 5000);
        this.viderError();
    }

    removeMessages() {
        const $errorSpan = document.querySelector('.message');
        $errorSpan.classList.remove('form-error');
    }

    viderError() {
        // Vider les erreurs
        const $errorSpan = document.querySelector('.message')
        $errorSpan.classList.remove('form-error')
            // const $errorP = $errorSpan.querySelector('p')
        $errorSpan.innerHTML = ''
        $errorSpan.innerText = ''
    }
}

export default ErrorCustom
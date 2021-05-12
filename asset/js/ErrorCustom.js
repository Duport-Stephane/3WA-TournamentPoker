'use strict'
/*
    Gestion des erreurs dans le form
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
        this._messages = errorMessages
    }

    // Affichage des erreurs s'il y en a
    displayMessages() {
        const errorSpan = document.querySelector('.errors')
        errorSpan.innerHTML = ''
        errorSpan.classList.add('form-error')
            // Fill
        this.messages.map(msg => {
            const p = document.createElement('p')
            p.textContent = `${msg.field} : ${msg.message}`
            errorSpan.appendChild(p)
        })

    }
}

export default ErrorCustom
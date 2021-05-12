'use strict'

// Appels de dépendances
import ManagerLS from './ManagerLS.js'
import ErrorCustom from './ErrorCustom.js' // Gestion des erreurs s'il y en a
import * as ajaxCallBack from './ajaxCallback.js'

/*
    Gestion des champs de form
*/
class Form {
    // Init inputs, errors, validator, checked, _contact, _contacts, key, Manager, ErrorCustom
    constructor(fields, fieldsChecked) {
        // Les champs du form à contrôler
        this.inputs = fields
            // La liste des champs à contrôler
        this.checked = fieldsChecked

        // Annexes
        this._errors = [] // Référencer les erreurs trouvées dans le form lors du validate
        this.isValid = false // Flag si form is Ok or Not
        this._user = {
                email: '',
                password: ''
            } // Stocker le user avant d'être persisté

        this.key = 'user' // Clé d'accès au stockage du LocalStorage
        this.manager = new ManagerLS // Enregistrer et mettre à jour le user dans le LocalStorage
        this.customError = new ErrorCustom // Référencer et afficher les erreurs
    }

    // Récup le localstorage
    get userInfo() {
        return this.manager.getDatasByKey(this.key)
    }

    // set userInfo(userInfo) {
    //     // On écrase la prop _userInfo avec le param reçu
    //     this._user = userInfo
    // }

    // Behaviors
    updateUserInfo() {
        // persist le mail
        this.manager.setDatas(this.key, JSON.stringify(this._user.email))
    }

    logValidate() {


        this.inputs.forEach(input => {

            console.log(input)

            if (this.checked.includes(input.name)) {
                if (!input.value) {
                    this._errors.push({
                        field: input.name,
                        type: 'empty',
                        message: `Merci de remplir le champ ${input.name}`
                    })
                } else if (input.name === 'email' && !this.isMailValid(input.name)) {
                    this._errors.push({
                        field: input.name,
                        type: 'format',
                        message: `Merci de remplir le champ ${input.name} avec un email correctement formaté`
                    })
                } else {
                    switch (input.name) {
                        case 'email':
                            this._user.email = input.value;
                            break;
                        case 'password':
                            this._user.password = input.value;
                            break;
                    }
                }
            }
        })

        if (this._errors.length > 0) {
            this.customError.messages = this._errors
            return this.isValid = false
        } else {
            // on controle le password
            if (ajaxCallback.controlPassword(this._user)) {

                // actualise le mail dans le LocalStorage
                this.updateUserInfo();

                // Vider les erreurs
                const errorSpan = document.querySelector('.errors')
                errorSpan.classList.remove('form-error')
                errorSpan.innerHTML = ''
                errorSpan.innerText = ''
                return this.isValid = true;
            } else {
                this._errors.push({
                    field: 'email',
                    type: 'format',
                    message: `Vos identifiants sont incorrects. Merci de réessayer.`
                });
                this.customError.messages = this._errors;
                return this.isValid = false;
            }
        }
    }


    isMailValid(email) {
        // Prise en charge du contrôl de l'email
        // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const regExMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
        if (regExMail.test(email) && email.length < 30) {
            return true;
        } else {
            return false;
        }
    }

    login() {




    }

    validate() {
        // For Each input check name : Cela permettra de déterminer le test à effectuer (number, text, email, tel, ....)
        this.inputs.forEach(input => {
            // Si le champ fait partie de la liste à contrôller (this.checked)
            if (this.checked.includes(input.name)) {
                // Prise en charge du contrôl de l'email
                // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
                const regExMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
                // Si une erreur est détéctée
                /*if (input.value === '') {*/
                if (!input.value) {
                    this._errors.push({
                        field: input.name,
                        type: 'empty',
                        message: `Merci de remplir le champ ${input.name}`
                    })
                } else if (input.name === 'email' && !regExMail.test(input.value)) {
                    // Création de l'erreur de format du mail
                    this._errors.push({
                        field: input.name,
                        type: 'format',
                        message: `Merci de remplir le champ ${input.name} avec un email correctement formaté`
                    })
                } else if (input.name === 'email' && !empty(input.value)) {
                    // Création de l'erreur de format du mail
                    // Définition d'une erreur liée à un champ vide (field => le champ concerné, type => le type d'erreur relevée, message => messeage d'erreur)
                    this._errors.push({
                        field: input.name,
                        type: 'format',
                        message: `Merci de remplir le champ ${input.name} avec un nombre entier`
                    })
                } else {
                    console.log("tout s est bien passé, on peut logger le user");
                    this.manager.setDatas('user', "toto@toto.fr")
                        //La valeur de l'input  est ni vide, ni en erreur (format)
                        // Valorisé à chaque tour dans la boucle la propriété correctement rempli dans le this._contact

                    // switch (input.name) {
                    //     case 'email':
                    //         this._contact.email = input.value
                    //         break;
                    //     case 'age':
                    //         this._contact.age = input.value
                    //         break;
                    // }
                }
            }
        })

        // Si On a des errors
        if (this._errors.length > 0) {
            // On enregistre les errors de notre form dans la class ErrorCustom,
            this.customError.messages = this._errors
                // afin de bénéficier des fonctionnalités de celui-ci pour les affichées par la suite
            return this.isValid = false
        } else {
            // Get old Contacts
            this._contacts = this.contacts
                // Push new to old contacts array (this.contacts)
            this._contacts.push(this._contact)
                // Persist contact (to LocalStorage)
            this.updateContactsList()

            // Vider les erreurs
            const errorSpan = document.querySelector('.errors')
            errorSpan.classList.remove('form-error')
            errorSpan.innerHTML = ''
            errorSpan.innerText = ''
        }

        // Retour OK // KO
        return this.isValid = true
    }
}

export default Form
'use strict'

// Appels de dépendances
import ManagerLS from './ManagerLS.js'
import ErrorCustom from './ErrorCustom.js' // Gestion des erreurs s'il y en a
import * as ajaxCallBack from './ajaxCallback.js'

/*
    Gestion des champs de form
*/
class Form {
    constructor(fields, fieldsChecked) {
        this.inputs = fields
        this.checked = fieldsChecked

        // Annexes
        this._errors = [] // Référencer les erreurs trouvées dans le form lors du validate
            // this.isValid = false // Flag si form is Ok or Not
        this._user = {
                nickname: '',
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                avatar: ''
            } // Stocker les infos du user

        this.key = 'user' // Clé d'accès au stockage du LocalStorage
        this.manager = new ManagerLS // Enregistrer et mettre à jour le user dans le LocalStorage
        this.customError = new ErrorCustom // Référencer et afficher les erreurs
    }

    logValidate() {
        this.inputs.forEach(input => {

            console.log(input)

            if (this.checked.includes(input.name)) {
                if (!input.value) {
                    this._errors.push({
                        field: input.name,
                        type: 'empty',
                        message: `Merci de remplir le champ ${input.placeholder}`
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
            // on compare les 2 password    
            fetch('./src/services/ajaxLog.php?user' + user, {
                    method: 'POST',
                    body: form
                })
                .then(response => response.json())
                .then(response => console.log(response))

            // .then( response => {if ("les password sont égaux") {
            //     // si OK, actualise le mail dans le LocalStorage
            //     this.updateUserInfo();

            //     // on modifie l'affichage : affiche le token LOGOUT et masque inscription
            //     this.displayTokenLog();

            //     // Vider les erreurs
            //     const errorSpan = document.querySelector('.errors')
            //     errorSpan.classList.remove('form-error')
            //     errorSpan.innerHTML = ''
            //     errorSpan.innerText = ''
            //     return true;
            // } else {
            //     this._errors.push({
            //         field: 'email',
            //         type: 'format',
            //         message: `Vos identifiants sont incorrects. Merci de réessayer.`
            //     });
            //     this.customError.messages = this._errors;
            //     return false;
            // }
            // }
        }
    }

    addValidate() {
        // For Each input check name : Cela permettra de déterminer le test à effectuer (number, text, email, tel, ....)
        this.inputs.forEach(input => {
            // Si le champ fait partie de la liste à contrôller (this.checked)
            if (this.checked.includes(input.name)) {
                // Si les champs obligatoires sont vides
                if (input.value === "" && input.name != 'lastname' && input.name != 'firstname' && input.name != 'avatar') {
                    this._errors.push({
                        field: input.name,
                        type: 'empty',
                        message: `Merci de remplir le champ ${input.placeholder}`
                    })
                } else if (input.name === 'email' && !this.isMailValid(input.value)) {
                    // Création de l'erreur de format du mail
                    this._errors.push({
                        field: input.name,
                        type: 'format',
                        message: `Merci de remplir le champ ${input.placeholder} avec un email correctement formaté`
                    })
                } else if (input.name === 'password' && !this.isPasswordValid(input.value)) {
                    // Création de l'erreur de format du password
                    this._errors.push({
                        field: input.name,
                        type: 'format',
                        message: `Le mot de passe doit contenir au moins 8 caractères dont un chiffre, une majuscule et un caractère spécial`
                    })
                } else {

                    // console.log("tout s est bien passé, on peut créer le user");

                    //La valeur de l'input est ni vide, ni en erreur (format)
                    // Valorisé à chaque tour dans la boucle la propriété correctement rempli dans le this._user

                    // console.log(input.value);
                    // console.log(this._user);

                    switch (input.name) {
                        case 'nickname':
                            this._user.nickname = input.value
                            break;
                        case 'lastname':
                            if (this._user.lastname != "") {
                                this._user.lastname = input.value
                            }
                            break;
                        case 'firstname':
                            if (this._user.firstname != "") {
                                this._user.firstname = input.value
                            }
                            break;
                        case 'email':
                            this._user.email = input.value
                            break;
                        case 'password':
                            this._user.password = input.value
                            break;
                        case 'avatar':
                            if (this._user.avatar != "") {
                                this._user.avatar = input.value
                            }
                            break;
                    }
                }
            }
        })

        // Si On a des errors
        if (this._errors.length > 0) {

            console.log("Il y a des errors !!!!!!!!!!!")

            // On enregistre les errors de notre form dans la class ErrorCustom,
            this.customError.messages = this._errors
                // afin de bénéficier des fonctionnalités de celui-ci pour les affichées par la suite
            return false
        } else {

            console.log(this)

            fetch('./src/services/ajaxLog.php', {
                    method: 'post',
                    body: this
                })
                // .then(response => response.text())
                .then(response => console.log(response))

            this.updateUserInfo(this.key, this._user.email)

            // on modifie l'affichage : affiche le token LOGOUT et masque inscription
            this.displayTokenLog();


            // Vider les erreurs
            const errorSpan = document.querySelector('.errors')
            errorSpan.classList.remove('form-error')
            errorSpan.innerHTML = ''
            errorSpan.innerText = ''

            return true
        }
    }

    // // Récup le localstorage
    // get userInfo() {
    //     return this.manager.getDatasByKey(this.key)
    // }

    // // Behaviors
    // updateUserInfo(key, value) {

    //     console.log(value)

    //     // persist le mail dans le LocalStorage
    //     this.manager.setDatas(key, JSON.stringify(value))
    // }

    // isMailValid(email) {
    //     // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    //     const regExMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
    //     if (regExMail.test(email) && email.length < 30) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // isPasswordValid(pwd) {
    //     // https://ihateregex.io/expr/password/
    //     // Au moins 8 caractères [max 20] dont une majuscule, [une minuscule], un chiffre et un caractère spécial
    //     const regExPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/;
    //     if (regExPwd.test(pwd)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // displayTokenLog() {
    //     const $tokens = document.querySelectorAll('.navHeader.log li');
    //     $tokens.forEach($token => {
    //         $token.classList.toggle('hide');
    //     });
    // }
}

export default Form
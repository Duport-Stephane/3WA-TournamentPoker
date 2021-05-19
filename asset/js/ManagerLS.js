'use strict'

// Gestion du Locastorage

class ManagerLS {
    // Propriétés
    // constructor() {
    //     this.date = new Date()
    // }

    // Gestion des datas sur le localstorage
    getDatasByKey(key) {
        const datas = window.localStorage.getItem(key);
        // return JSON.parse(datas) || []; // uniquement si les données sont des tableaux ou, plus complexes que des simples chaines
        return datas || [];
    }

    setDatas(key, value) {
        // Convertion des datas avant envoi, si c'est des tableaux ou, plus complexes que des simples chaines
        // const datasCompressed = JSON.stringify(value);

        window.localStorage.setItem(key, value)
    };
}

export default ManagerLS;
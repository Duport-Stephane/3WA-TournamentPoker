'use strict'

// Gestion du Locastorage

class ManagerLS {
    // Propriétés
    // constructor() {
    //     this.date = new Date()
    // }

    // Gestion des datas sur le localstorage
    getDatasByKey(key) {
        // Check if ls is empty or not
        const datas = window.localStorage.getItem(key);

        return JSON.parse(datas) || [];
    }

    setDatas(key, value) {
        // Convertion des datas avant envoi
        const datasCompressed = JSON.stringify(value);

        window.localStorage.setItem(key, datasCompressed)
    };
}

export default ManagerLS;
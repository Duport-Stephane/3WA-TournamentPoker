'use strict'

// for Locastorage

class ManagerLS {

    getDatasByKey(key) {
        const datas = window.localStorage.getItem(key);
        return datas || [];
    }

    setDatas(key, value) {
        window.localStorage.setItem(key, value)
    };

    removeKey(key) {
        // Delete Key in LocalStorage
        window.localStorage.removeItem(key);
    }

    existKey(key) {
        if (window.localStorage.getItem(key) !== null) {
            return true;
        } else {
            return false;
        }
    }
}

export default ManagerLS;
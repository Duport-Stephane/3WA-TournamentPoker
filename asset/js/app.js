'use strict';

// Import util
import * as callback from './ajaxCallBack.js'

// Ecoute global (chargement)
document.addEventListener('DOMContentLoaded', function() {

    // A chaque changement de page, met en évidence le bon menu de la nav du header
    callback.currentNav();

});
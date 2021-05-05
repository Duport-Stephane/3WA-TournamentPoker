'use strict';

// Import util
import * as callback from './callBack.js';
import * as ajaxCallback from './ajaxCallBack.js';

// Ecoute global (chargement)
document.addEventListener('DOMContentLoaded', function() {

    // ENSEMBLE DES PAGES
    //*******************************************************************
    // A chaque changement de page, met en évidence le bon menu de la nav du header
    callback.currentNav();

    // page PLAYER
    //*******************************************************************
    // Refresh la page PLAYER, pour afficher les 2 tableaux
    const address = window.location.href
    const pageAct = address.slice(address.lastIndexOf('=') + 1);
    if (pageAct === 'players') {

        console.log('Appel REFRESH');

        // Refresh la page PLAYER, pour afficher les 2 tableaux
        ajaxCallback.refresh();

        // Ecoute le click l'input ALL des 2 tableaux Users et Players 
        // Si coché alors il faut cocher TOUS les inputs
        // Si décoché, alors décocher TOUS les inputs
        // @TODO : envisager l'activation de la coche par la TAB du clavier et la barre espace...

        console.log('APPEL DE ALL INPUTS');
        // callback.checkInputAll();  --> name='checkboxall[]'


        console.log('APPEL DE addplayer et delPlayer');
        // Ecoute des boutons Ajouter un player et Retirer un player
        // document.querySelector('.addPlayerList, .delPlayerList').addEventListener('submit', e => {
        $('.addPlayerList, .delPlayerList').on('submit', e => {
            // Block form auto refresh
            e.preventDefault();
            // console.log(e)
            // Get action to do (from input hidden)
            const action = e.target.className;
            // console.log(action);
            // form datas
            const form = new FormData(e.target);
            // console.log(form);

            // Empty form, for next fill
            e.target.reset();
            // Request
            switch (action) {
                case 'addPlayerList':
                    // Ecoute le bouton new-player : récupère les inputs cochés dans le tableau des users pour ajouter ce(s) users à la table des players (et donc les supprime du tableau users, ce qui se fait tout seul grace à la requête de remplissage du tableau)
                    ajaxCallback.addPlayerList(form);
                    break;
                case 'delPlayerList':
                    // console.log('CASE DELPLAYERLIST')
                    // Ecoute le bouton del-player : récupère les inputs cochés dans le tableau players pour les supprimer de ce tableau (et donc les remettre dans l'autre, ce qui se fait tout seul grace à la requête de remplissage du tableau)
                    ajaxCallback.delPlayerList(form);
                    break;
                default:
                    ////////////////// FAIRE QUELQUE CHOSE DE MIEUX !!!!!!
                    console.log('Rien trouvé !');
                    break;
            }
        });
    }

    // page TABLES
    //*******************************************************************
    if (pageAct === 'canvas') {
        document.querySelector('.canvasOn').addEventListener('click', e => {
            e.preventDefault;
            callback.animCanvas();
        });
        document.querySelector('.canvasOff').addEventListener('click', e => {
            e.preventDefault;
            callback.stopCanvas();
        });
    }
});
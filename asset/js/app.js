'use strict';

// Import util
import * as callback from './callBack.js';
import * as ajaxCallback from './ajaxCallBack.js';

///////////////////////////////// JS DESACTIVé ////////////////////////////////////
/*
Si on désactive JS, les formulaires peuvent être remplis et soumis, les erreurs gérées :
- Player ; refresh / addlayer / delplayer....
Eventuellement, mettre des action= et des method= dans les form
*/

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

        // Ecoute le click sur la chackbox ALL des 2 tableaux Users et Players 
        // Si coché alors il faut cocher TOUS les checkboxes
        // Si décoché, alors décocher TOUS les checkboxes
        const $allCheckboxes = document.querySelectorAll("input[name='checkboxall[]']");

        // console.log('APPEL DE ALL INPUTS : ' + $allCheckboxes);

        $allCheckboxes.forEach($checkbox => {
            $checkbox.addEventListener('change', e => {
                // console.log(e)
                callback.checkInputAll(e.target.checked, e.target.value);
            })
        });


        // console.log('APPEL DE addplayer et delPlayer');
        // Ecoute des boutons Ajouter un player et Retirer un player
        const $checkboxes = document.querySelectorAll('.addPlayerList, .delPlayerList')
            // pour utiliser le vanilla, il faut boucler sur le tableau résultant du selectAll et faire un eventListener sur chaque element
            // Si non voici en JQuery : $('.addPlayerList, .delPlayerList').on('submit', e => {
        $checkboxes.forEach($checkbox => {
            $checkbox.addEventListener('submit', e => {
                e.preventDefault();
                const action = e.target.className;
                const form = new FormData(e.target);
                e.target.reset();
                switch (action) {
                    case 'addPlayerList':
                        // Ecoute le bouton new-player : récupère les checkboxes cochés dans le tableau des users pour ajouter ce(s) users à la table des players (et donc les supprime du tableau users, ce qui se fait tout seul grace à la requête de remplissage du tableau)
                        ajaxCallback.addPlayerList(form);
                        break;
                    case 'delPlayerList':
                        // console.log('CASE DELPLAYERLIST')
                        // Ecoute le bouton del-player : récupère les checkboxes cochés dans le tableau players pour les supprimer de ce tableau (et donc les remettre dans l'autre, ce qui se fait tout seul grace à la requête de remplissage du tableau)
                        ajaxCallback.delPlayerList(form);
                        break;
                    default:
                        ////////////////// FAIRE QUELQUE CHOSE DE MIEUX !!!!!!
                        console.log('Rien trouvé !');
                }
            });
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
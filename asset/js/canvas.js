'use strict'

import * as call_LS from './callBack_Localstorage.js'

//////////////////// CANVAS for BONUS
let timeoutId;
let ctx;
const carte = {
    largeur: 75,
    hauteur: 100,
    picture: './asset/images/bonus/Card75x100.png'
}
const nbCard = 20;
const pos = new Array();

function animCanvas() {
    call_LS.addInfoLS('log', 'ANIME CANVAS')

    let $canvas = document.querySelector('.canvas');
    ctx = $canvas.getContext('2d');

    for (let i = 0; i < nbCard; i++) {
        pos[i] = [0, 0];
        pos[i][0] = Math.floor(Math.random() * (canvas.width - carte.largeur));
        pos[i][1] = -(Math.random() * 600 + 50);
    }
    timeoutId = window.setTimeout(updateTime(), 1);

}

function updateTime() {
    onClear();
    for (let i = 0; i < nbCard; i++) {
        addImage('./asset/images/carte-R-50x70.jpg', pos[i][0], pos[i][1], ctx);
        pos[i][1] += 1;
        if (pos[i][1] > canvas.height) {
            pos[i][1] = -(Math.random() * 400 + 100);
            pos[i][0] = Math.floor(Math.random() * (canvas.width - carte.largeur));
        }
    }

    timeoutId = window.setTimeout(updateTime, 1);
}

function stopCanvas() {
    call_LS.addInfoLS('log', 'STOP CNAVAS')
    window.clearTimeout(timeoutId);
    stop;
}

function onClear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function addImage(src, posX, posY, ctx) {
    let myImg = document.createElement('img')
        // On définie la source de cette image 
    myImg.src = src;
    // Quand l'image est chargée par le navigateur on la place dans le Canvas 
    // myImg.onload = function() {
    //On place l'image 
    // ctx.save();
    // ctx.rotate(pos.angle);
    ctx.drawImage(myImg, posX, posY);
    // ctx.restore();
    // };
}

export { animCanvas, stopCanvas }
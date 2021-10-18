'use strict';

import * as canvas from '../canvas.js';

// page BONUS
//*******************************************************************
function funct_bonus() {

    const $btnStart = document.getElementById('canvasOn');
    $btnStart.addEventListener('click', e => {
        e.preventDefault;
        $btnStart.disabled = true;
        canvas.animCanvas();
    });
    const $btnStop = document.getElementById('canvasOff');
    $btnStop.addEventListener('click', e => {
        e.preventDefault;
        $btnStart.disabled = false;
        canvas.stopCanvas();
    });
}

export { funct_bonus }
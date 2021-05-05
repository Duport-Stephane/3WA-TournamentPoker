/* Ici, les fonctions de Callback appelées par les écouteurs de app.js */

/**
 * Met en évidence le menu courant dans la navbar du header.
 * Arrivée sur une page soit par la navbar soit par le click sur la carte de Home
 * @menuClasse   -> classe du menu de la page actuelle, à comparer avec toutes celles des autres menus
 * @listA        -> liste des balises 'a' du menu
 */

function currentNav() {
    const address = window.location.href
    const pageAct = address.slice(address.lastIndexOf('=') + 1);

    const listA = document.querySelectorAll('.navHeader nav li a')
    listA.forEach(e => {
        if (e.classList.contains(pageAct)) {
            if (!e.classList.contains('current')) e.classList.add('current');
        } else {
            if (e.classList.contains('current')) e.classList.remove('current');
        }
    });
}





/**
 * vérifier si le input de ALL est coché ou non
 * au click (dans un premier temps)
 * @TODO gérer la coche avec le clavier : TAB + ESPACE
 */

function checkInputAll() {

}



//////////////////// CANVAS pour BONUS
let timeoutId;
let ctx;
const carte = {
    largeur: 50,
    hauteur: 70
}
const pos = new Array();
pos[0] = [0, 0];
pos[1] = [0, 0];
pos[2] = [0, 0];
pos[3] = [0, 0];
pos[4] = [0, 0];
pos[5] = [0, 0];
pos[6] = [0, 0];
pos[7] = [0, 0];
pos[8] = [0, 0];
pos[9] = [0, 0];

function animCanvas() {
    console.log('ANIME CANVAS')
        // Manipulation du CANVAS
    let $canvas = document.querySelector('.canvas');
    ctx = $canvas.getContext('2d');

    // ctx.strokeStyle = "black";
    for (let i = 0; i < 10; i++) {
        pos[i][0] = Math.floor(Math.random() * (canvas.width - carte.largeur));
        pos[i][1] = -carte.hauteur;
        // console.log("i = " + i + " - " + pos[i][0] + ' / ' + pos[i][1]);
    }
    timeoutId = window.setTimeout(updateTime($canvas), 1);

}

function updateTime($canvas) {
    onClear();
    // ctx.strokeRect(pos.coordX, pos.coordY, carte.largeur, carte.hauteur);
    for (let i = 0; i < 5; i++) {
        addImage('../../asset/images/carte-R-50x70.jpg', pos[i][0], pos[i][1], ctx);
        pos[i][1] += 2;
        if (pos[i][1] > canvas.height) {
            pos[i][1] = -carte.hauteur;
            pos[i][0] = Math.floor(Math.random() * (canvas.width - carte.largeur));
        }
        // console.log("i = " + i + " - " + pos[i][0] + ' / ' + pos[i][1]);
    }

    timeoutId = window.setTimeout(updateTime, 1);
}

function stopCanvas() {
    console.log('STOP CNAVAS')
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


export { currentNav, checkInputAll, animCanvas, stopCanvas }
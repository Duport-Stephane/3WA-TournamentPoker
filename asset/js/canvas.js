////////////////////////////////////////////////////////////////////////////////
//////////////////// CANVAS pour BONUS
let timeoutId;
let ctx;
const carte = {
    largeur: 75,
    hauteur: 100,
    domObject: null,
    picture: '../images/bonus/Card75x100.png'
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


export { animCanvas, stopCanvas }
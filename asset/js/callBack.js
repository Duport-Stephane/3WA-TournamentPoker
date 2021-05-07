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
 * vérifier si la checkbox de ALL est coché ou non
 * et fait de même pour tous les check dessous
 */

function checkInputAll(isChecked, type) {
    const checkboxes = document.querySelectorAll('.tab' + type + 'List input');
    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
}

/**
 * 
 * @param message a tester pour savoir si :
 * Danger : le message commence par Danger
 * Alert : le message commence par Attention
 * Success : tous les autres cas 
 */

function testMessageBeforeDisplay(message) {
    let indexOfFirst;
    if (indexOfFirst = message.indexOf("Danger") != -1) {
        displayDanger(message.slice(8));
    } else if (indexOfFirst = message.indexOf("Attention") != -1) {
        displayAlert(message.slice(11));
    } else {
        displaySuccess(message);
    }
}

/**
 * 
 * @param message de SUCCESS à afficher
 */
function displaySuccess(message) {

    // console.log(message);

    const $messages = document.querySelector('.message');
    const $balise = document.createElement('div')
    $balise.setAttribute('class', 'alert alert-success');
    $messages.append($balise);
    $balise.append(message);

    removeMessage();
}

/**
 * 
 * @param message d'ALERTE à afficher
 */
function displayAlert(message) {

    // console.log(message);

    const $messages = document.querySelector('.message');
    const $balise = document.createElement('div')
    $balise.setAttribute('class', 'alert alert-alert');
    $messages.append($balise);
    $balise.append(message);

    removeMessage();
}

/**
 * 
 * @param message de DANGER à afficher
 */
function displayDanger(message) {

    // console.log(message);

    const $messages = document.querySelector('.message');
    const $balise = document.createElement('div')
    $balise.setAttribute('class', 'alert alert-danger');
    $messages.append($balise);
    $balise.append(message);

    removeMessage();
}

/**
 * Gestion du temps d'affichage des messages
 */
function removeMessage() {
    // console.log("REMOVE INFOS")

    // const mess = document.querySelector('.alert');
    // mess.delay(2500).fadeOut(600);
    $('.alert').delay(2500).fadeOut(600);
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


export { currentNav, checkInputAll, testMessageBeforeDisplay, animCanvas, stopCanvas }
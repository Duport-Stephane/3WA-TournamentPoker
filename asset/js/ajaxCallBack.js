/* Ici, les fonctions de Callback appelées par les écouteurs de app.js */

/**
 * Met en évidence le menu courant dans la navbar du header
 * @menuClasse   -> classe du menu cliqué, à comparer avec toutes celles des autres menus
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

export { currentNav }
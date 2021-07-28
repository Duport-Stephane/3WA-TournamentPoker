'use strict'

// FOR ALL PAGES
//*******************************************************************

// To search for page name after click on menu or card
function currentPage() {
    const address = window.location.href
    let beginPage = address.indexOf('=') + 1;
    let endPage = address.indexOf('&', beginPage);
    if (endPage === -1) {
        endPage = address.length;
    }
    return address.slice(beginPage, endPage);
}

// Highlight name in menu and header navbar
function currentNav(pageAct) {
    const address = window.location.href
    let beginPage = address.indexOf('=') + 1;
    // HOME page
    if (beginPage === 0) {
        document.querySelector('.navHeader a.home').classList.add('current');
    } else {
        const listA = document.querySelectorAll('.navHeader a, footer section:last-child a')
        listA.forEach(e => {

            if (e.classList.contains(pageAct)) {
                e.classList.toggle('current');
            }
        });
    }
}

// Replace invalid characters
function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/#/g, '&#35;')
        .replace(/{/g, '&laquo;')
        .replace(/}/g, '&raquo;')
        .replace(/\n/g, '&#92;n')
        .replace(/\r/g, '&#92;r');
}

export { currentPage, currentNav, htmlEntities }
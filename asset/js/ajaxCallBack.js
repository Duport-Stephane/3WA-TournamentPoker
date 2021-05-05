/* Ici, les fonctions AJAX de Callback appelées par les écouteurs de app.js */

/**
 * Refresh Tab User, Players
 */
function refresh() {
    fetch('../../src/services/ajax.php?action=refresh&type=users')
        .then(response => response.json())
        .then(users => {

            //////////////////////////  @TODO : externaliser ce code car c'est le même qui sert pour les PLAYERS ////////////////////////// 

            const $tableauUser = document.querySelector('.tabUserList');
            // vider les noeuds contenu dans le tableau
            while ($tableauUser.firstChild) {
                $tableauUser.removeChild($tableauUser.firstChild);
            }
            // insert de la table pour préparer le tableau
            const $userList = document.createElement('table');
            $userList.classList.add('array', 'user');
            $tableauUser.append($userList);
            users.map(user => {

                //////////////////////////  @TODO : 5 colonnes : faire une boucle pour ne pas répéter le même code ////////////////////////// 

                // Construction des lignes du tableau, 1 par user
                const $tr = document.createElement('tr');
                $userList.append($tr);
                // un td pour chaque colonne
                let $td = document.createElement('td');
                $tr.append($td);
                // l'input avec la checkbox dans la 1ere colonne
                const $input = document.createElement('input');
                $input.type = 'checkbox';
                $input.name = 'checkboxuser[]';
                $input.value = user['id'];
                $td.append($input);
                // nickName dans le 2eme colonne...
                $td = document.createElement('td');
                $tr.append($td);
                $td.append(user['nickName']);
                $td = document.createElement('td');
                $tr.append($td);
                $td.append(user['firstName']);
                $td = document.createElement('td');
                $tr.append($td);
                $td.append(user['lastName']);
                // et s'il y a un avatar... en dernière colonne
                if (user['avatar'] && user['avatar'] != "") {
                    const $avatar = document.createElement('img');
                    $avatar.src = user['avatar'];
                    $avatar.alt = 'avatar';
                    $td = document.createElement('td');
                    $tr.append($td);
                    $td.append($avatar);
                }
            })
        });

    fetch('../../src/services/ajax.php?action=refresh&type=players')
        .then(response => response.json())
        .then(users => {

            const $tableauUser = document.querySelector('.tabPlayerList');
            // vider les noeuds contenu dans le tableau
            while ($tableauUser.firstChild) {
                $tableauUser.removeChild($tableauUser.firstChild);
            }
            // insert de la table pour préparer le tableau
            const $userList = document.createElement('table');
            $userList.classList.add('array', 'player');
            $tableauUser.append($userList);
            users.map(user => {

                //////////////////////////  @TODO : 5 colonnes : faire une boucle pour ne pas répéter le même code ////////////////////////// 

                // Construction des lignes du tableau, 1 par user
                const $tr = document.createElement('tr');
                $userList.append($tr);
                // un td pour chaque colonne
                let $td = document.createElement('td');
                $tr.append($td);
                // l'input avec la checkbox dans la 1ere colonne
                const $input = document.createElement('input');
                $input.type = 'checkbox';
                $input.name = 'checkboxuser[]';
                $input.value = user['id'];
                $td.append($input);
                // nickName dans le 2eme colonne...
                $td = document.createElement('td');
                $tr.append($td);
                $td.append(user['nickName']);
                $td = document.createElement('td');
                $tr.append($td);
                $td.append(user['firstName']);
                $td = document.createElement('td');
                $tr.append($td);
                $td.append(user['lastName']);
                // et s'il y a un avatar... en dernière colonne
                if (user['avatar'] && user['avatar'] != "") {
                    const $avatar = document.createElement('img');
                    $avatar.src = user['avatar'];
                    $avatar.alt = 'avatar';
                    $td = document.createElement('td');
                    $tr.append($td);
                    $td.append($avatar);
                }
            })
        });
}


/** 
 * récupère le(s) input(s) coché(s) dans le tableau des users pour déplacer ce(s) user(s) dans la table des players
 * Uniquement si la partie n'est pas commencée !
 */

function addPlayerList(form) {

    // console.log("FETCH ADDPLAYER")
    // Fetch pour actualiser la table Player
    fetch('../../src/services/ajax.php', {
            method: 'POST',
            body: form
        })
        .then(response => response.text())
        .then(response => refresh())
        // .then(response => console.log("resp : " + response))
}


/**
 * récupère le(s) input(s) coché(s) dans le tableau des players pour les remettre dans la table des users
 * Uniquement si la partie n'est pas commencée !
 */

function delPlayerList(form) {

    // console.log("FETCH DELPLAYER")
    // Fetch pour actualiser la table Player
    fetch('../../src/services/ajax.php', {
            method: 'POST',
            body: form
        })
        .then(response => response.text())
        .then(response => refresh())
        // .then(response => console.log("resp : " + response))
}


export { refresh, addPlayerList, delPlayerList }
<?php

\Models\Session::logout();

// header('Location: ./index.php?page=logout');
// die;


require_once './src/views/logout.phtml';

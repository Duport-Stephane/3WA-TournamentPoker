<?php

declare(strict_types=1);

// Fonctions utiles
/**
 * Render une vue
 *
 * @param string $path
 * @param array $variables
 * @return void
 */
function render(string $path, array $variables = []): void
{
    extract($variables);

    // var_dump($variables);

    ob_start();
    require "$path.phtml";
    $pageContent = ob_get_clean();

    // var_dump(dirname(__DIR__) . '/views/layout.php');

    require dirname(__DIR__) . '/views/layout.php';
}

<!-- Mise à disposition de la session -->
<?php require '../services/session.php';?>

<?php foreach ($_SESSION['posts'] as $post): ?>
    <tr>
        <td><?= $post['nickName'] ?></td>
        <td><?= $post['firstName'] ?></td>
        <td><?= $post['lastName'] ?></td>
        <td><?= $post['avatar'] ?></td>
    </tr>
<?php endforeach; ?>
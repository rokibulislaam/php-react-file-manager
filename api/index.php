<?php
require __DIR__ . '/../vendor/autoload.php';
require('./headers.php');
require('./Filesystem.php');
define('CURRENT_PATH', isset($_GET['path'])  ? $_GET['path'] : "./");

$fs = new Filesystem(__DIR__ . "/../");

if (isset($_GET['getFiles'])) {
  $coll = $fs->getDirectoryCollection(CURRENT_PATH);
  echo json_encode($coll);
}


if (isset($_POST['operation'])) {
  $operation = $_POST['operation'];
  switch ($operation) {
    case 'upload':
      foreach ($_FILES as $file) {
        move_uploaded_file($file['tmp_name'], __DIR__ . "/../" . $file['full_path']);
        // $fs->move($file['tmp_name'], $file['full_path']);
      }
      break;
    case 'delete':
      if (isset($_POST['path']) and isset($_POST['type'])) {
        $path = $_POST['path'];
        $type = $_POST['type'];
        if ($type == 'file') {
          $fs->deleteFile($path);
        } else if ($type == "dir") {
          $fs->deleteDir($path);
        }
      }
    case 'rename':
      if (isset($_POST['path']) and isset($_POST['newName']) and isset($_POST['basePath'])) {
        $path = $_POST['path'];
        $newName = $_POST['newName'];
        $basePath = $_POST['basePath'];
        $fs->rename($path, $basePath . '/' . $newName);
      }
  }
}

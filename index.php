<?php
session_start();
if (isset($_SESSION['username'])) {
  require('./ui/build/index.php');
} else {
  header('Location: signin.php');
}

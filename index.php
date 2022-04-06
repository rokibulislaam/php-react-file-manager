<?php
session_start();
if (isset($_SESSION['username'])) {
 /**
  * handle redirecting to file-manager dashboard here
  */
} else {
  header('Location: signin.php');
}

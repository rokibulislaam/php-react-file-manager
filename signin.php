<?php
require('./common/header.php');
require('config/db_connect.php');
?>
<title> Sign in | PHP File Manager </title>
</head>

<body>
  <?php

  require('config/db_connect.php');
  if (isset($_POST['username'])) {
    $username = stripslashes($_REQUEST['username']);
    $username = mysqli_real_escape_string($conn, $username);
    $password = stripslashes($_REQUEST['password']);
    $password = mysqli_real_escape_string($conn, $password);
    //Checking is user existing in the database or not
    $query = "SELECT * FROM `users` WHERE username='$username' and password='" . md5($password) . "'";
    $result = mysqli_query($conn, $query);
    $rows = mysqli_num_rows($result);
    if ($rows == 1) {
      $_SESSION['username'] = $username;
      // Redirect user to index.php
      header("Location: index.php");
    } else {
      $incorrect_password = 1;
    }
    mysqli_free_result($result);
  }
  ?>

  <div class="app">
    <div class="wrapper">
      <h1>Sign in</h1>
      <p>Please enter your credentials</p>
      <?php if (isset($incorrect_password)) : ?>
        <span style="color: red"> Incorrect credentials </span>
        <br><br>
      <?php endif; ?>

      <form method="POST" action="<?php echo $_SERVER['PHP_SELF'] ?>">
        <input type="text" name="username" placeholder="Enter username" />
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" name="submit" value="Log in" />
      </form>
      <div class="signup-container">
        <p>
          don't have an account?
          <a style="text-decoration: none; color: rgba(25, 25, 25, 0.803); font-weight: bold;" href="signup.php">Sign up</a>
        </p>
      </div>
    </div>
  </div>
</body>

</html>
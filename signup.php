<?php
require('./common/header.php');
require('config/db_connect.php');
?>
<title> Sign up |PHP File Manager </title>
</head>

<body>
  <?php
  require('config/db_connect.php');

  // If form submitted, insert values into the database.
  if (isset($_REQUEST['username'])) {
    // removes backslashes
    $username = stripslashes($_REQUEST['username']);
    //escapes special characters in a string
    $username = mysqli_real_escape_string($conn, $username);
    $email = stripslashes($_REQUEST['email']);
    $email = mysqli_real_escape_string($conn, $email);
    $password = stripslashes($_REQUEST['password']);
    $password = mysqli_real_escape_string($conn, $password);
    $created_at = date("Y-m-d H:i:s");
    $query = "INSERT into `users` (username, password, email, created_at)
VALUES ('$username', '" . md5($password) . "', '$email', '$created_at')";
    $result = mysqli_query($conn, $query);
    if ($result) {
      echo "<div class='app'>
    <div class='container'>
      <h2>Congratulations!!></h2>
      <h3>your account is successfully created.</h3>
      <a href='signin.php'>Go to login page</a>
    </div>
  </div>";
      exit(0);
    }
  } else {
  ?>

    <div class="app">
      <div class="wrapper">
        <h1>Sign Up</h1>
        <p>enter details to create account</p>
        <form method="POST">
          <input type="email" name="email" placeholder="Enter email" />
          <input type="text" name="username" placeholder="Enter username" />
          <input type="password" name="password" placeholder="Password" />
          <input type="submit" name="submit" value="Create Account" />
        </form>
        <div>
          <p>
            already have an account?
            <a style="
                text-decoration: none;
                color: rgba(25, 25, 25, 0.803);
                font-weight: bold;
              " href="signin.php">Log in</a>
          </p>
        </div>
      </div>
    </div>
  <?php } ?>
</body>

</html>
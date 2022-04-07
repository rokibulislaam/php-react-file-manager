<?php 

	// connect to the database
	$conn = mysqli_connect('localhost', 'root', '', 'filemanager');

	// check connection
	if(!$conn){
		echo 'Connection error: '. mysqli_connect_error();
	}

?>
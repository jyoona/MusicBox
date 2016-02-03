

<!DOCTYPE html>

<html>
<head>
</head>
<body>
	<?php
	$q = intval($_GET['q']);
	echo "hey";
	
		echo "name is: " . $q.getName();

	$servername = "localhost";
	$username = "username";
	$password = "password";
	$dbname = "myMusic";

	/* Create connection */
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	/* Check connection */
	if (!$conn) {
		echo "connection failed";
		die("Connection failed: " . mysqli_connect_error());
	}
	echo "connection successfull.";

	/* sql to create table */
	$sql = "CREATE TABLE myMusic (Title STRING(50) PRIMARY KEY, Artist STRING(50), Favourite BOOL, YL STRING(50))";

	if (mysqli_query($conn, $sql)) {
		echo "Table MyMusic created successfully";
	} else {
		echo "Error creating table: " . mysqli_error($conn);
	}

	$sql = "INSERT INTO myMusic (Title, Artist, Favourite, YL) VALUES ('Love so sweet', 'Arashi', false, 'hhh')";

	if (mysqli_query($conn, $sql)) {
		echo "New record created successfully";
		echo "name is: " . $q.getName();
	} else {
		echo "Error creating record: " . mysqli_error($conn);
	}

	mysqli_close($conn);
	?>
</body>
</html>
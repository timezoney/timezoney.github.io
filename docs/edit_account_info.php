<?php

// get data from form
$user_id = $_POST["user_id"];
$user_name = $_POST["user_name"];
$user_password = $_POST["user_password"];
$user_description = $_POST["user_description"];
$user_email = $_POST["user_email"];
$user_phone = $_POST["user_phone"];


// variables to connect to database
$host = "localhost";
$dbname = "Jobster";
$username = "root";
$password = "Fushd-111107";

// connection to database
$conn = mysqli_connect(hostname: $host,
                username: $username,
                password: $password,
                database: $dbname);

// catch a connection error
if (mysqli_connect_errno()) {
    die("Connetion error: " . mysqli_connect_error());
}

// make data acceptable by sql (e.x. " ' " symbols in the description break th sql)
$user_description = mysqli_real_escape_string($conn, $user_description);
$user_email = mysqli_real_escape_string($conn, $user_email);

 //creating sql query
$sql = "UPDATE user_info
        SET user_password = '$user_password', user_description = '$user_description', user_email = '$user_email', user_phone = '$user_phone'
        WHERE user_id = $user_id";

if (mysqli_query($conn, $sql)) {
    header("Location: ./profile.php");
} else {
    echo "Error: " . mysqli_error($conn);
}
?>


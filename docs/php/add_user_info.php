<?php

// get data from form
$user_name = $_POST["user_name"];
$user_password = $_POST["user_password"];
$user_description = "example_description";
$user_email = "example@email";
$user_phone = "+12345678967";

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

//creating sql query
$sql = "INSERT INTO user_info (user_name, user_password, user_description, user_email, user_phone)
        VALUES ('$user_name', '$user_password', '$user_description', '$user_email', '$user_phone')";

if (mysqli_query($conn, $sql)) {
    echo "Record saved successfully!";
} else {
    echo "Error: " . mysqli_error($conn);
};

?>

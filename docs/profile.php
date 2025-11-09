<?php

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
$sql = "SELECT user_name, user_password, user_description, user_email, user_phone 
        FROM user_info
        WHERE user_id=1";

$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Profile</title>
        <meta charset="UTF-8">
        <meta name="author" content="Daniil">
        <meta name="keywords" content="profile page, personal">
        <meta name="description" content="Profile page with information about the user, rating and reviews">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./css/normalize.css">
        <link rel="stylesheet" href="./css/profile_page.css">
    </head>
    <body>

        <header>
            <a href="#">
                <h1>Jobster</h1>
            </a>

            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Catalog (employees)</a></li>
                <li><a href="#">Catalog (jobs)</a></li>
                <li><a href="#" id="active">Profile</a></li>
            </ul>
            <a href="#">
                <img src="./images/user.png" alt="profile avatar">
            </a>
        </header>

        <main>
            
            <img src="./images/user.png" alt="profile picture">
            <section id="user_info">
                <p>Username: <b><?php echo $row["user_name"]?></b></p>
                <p>Password: <b><?php echo $row["user_password"]?></b></p>
                <p>Description: <b><?php echo $row["user_description"]?></b></p>
                <p>Email: <b><?php echo $row["user_email"]?></b></p>
                <p>Phone: <b><?php echo $row["user_phone"]?></b></p>
            </section>
            <!-- <a href="#" id="avatar">Edit Avatar</a><br><br> -->
            <!-- <form action="./php/add_user_info.php" method="post">
                <label for="user_name">Login:</label>
                <input type="text" name="user_name"><br>
                <label for="user_password">Password:</label>
                <input type="text" name="user_password"><br>
                <input type="submit">
            </form> -->
            
        </main>

        <footer>
            <p>&copy; 2025 Jobster</p>
            <p>Author: *author name*</p>
        </footer>

    </body>
</html>

<?php

// variables to connect to database
$host = "localhost";
$dbname = "Jobster";
$username = "root";
$password = "Fushd-111107"; // when i started working with MySQL it requested a password,
//                              so now it only works with this password,
//                               but i'm pretty sure this will only work on my computer.
//                                Because i still don't know how to create databases that would be transportable
//                                 i attached a script that would create a database needed for this program to work.
//                                  (docs/sql_scripts/jobster_db.sql)

// connection to database
$conn = mysqli_connect(hostname: $host,
                username: $username,
                password: $password,
                database: $dbname);

// catch a connection error
if (mysqli_connect_errno()) {
    die("Connetion error: " . mysqli_connect_error());
}

//collectiong data from user_info user_info
$sql_info = "SELECT user_id, user_name, user_password, user_description, user_email, user_phone 
        FROM user_info
        WHERE user_id=1";

$result_info = mysqli_query($conn, $sql_info);
$row_info = mysqli_fetch_array($result_info);

//collectiong_data from reviews
$user_id = $row_info["user_id"];
$sql_reviews = "SELECT review_text, review_rating 
        FROM reviews
        WHERE user_id = $user_id
        ORDER BY review_id DESC";

$result_reviews = mysqli_query($conn, $sql_reviews);

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
                <li><a href="#">Profile</a></li>
            </ul>
            <a href="#">
                <img src="./images/user.png" alt="profile avatar">
            </a>
        </header>

        <main>
            
            <img src="./images/user.png" alt="profile picture">
            <div id="profile_grid">

               <section id="user_info">
                    <h2>Account Information</h2>
                    <p>Username: <b><?php echo $row_info["user_name"]?></b></p>

                    <!-- covering the password -->
                    <?php
                    $user_password_length = strlen($row_info["user_password"]);
                    $covered_password = str_repeat("*", $user_password_length);
                    ?>
                    <p>Password: <b><?php echo $covered_password?></b></p>
                    <p>Description: <b><?php echo $row_info["user_description"]?></b></p>
                    <p>Email: <b><?php echo $row_info["user_email"]?></b></p>
                    <p>Phone: <b><?php echo $row_info["user_phone"]?></b></p>
                    <br>
                    <button type="button" onclick="edit_account_info()">Edit Account Information</button>
                </section>
            
                <script>
                        function edit_account_info() {
                            document.getElementById('user_info').innerHTML = 
                                `<h2>Account Information</h2>
                                <form action="./edit_account_info.php" method="post">
                                    <input type="hidden" name="user_id" value="<?php echo $user_id?>">

                                    <p>Username: <input type="text" name="user_name" value="<?php echo $row_info["user_name"]?>" readonly></p>

                                    <p>Password: <input type="password" name="user_password" value="<?php echo $row_info["user_password"]?>" pattern="[a-zA-Z0-9!_\\-]{8,}" placeholder="Minimum 8 characters"></p>

                                    <p>Description: <input type="text" name="user_description" value="<?php echo $row_info["user_description"]?>"></p>
                                    
                                    <p>Email: <input type="email" name="user_email" value="<?php echo $row_info["user_email"]?>"></p>
                                    
                                    <p>Phone: <input type="tel" name="user_phone" value="<?php echo $row_info["user_phone"]?>" pattern="[0-9]{10}" placeholder="9999999999"></p>
                                    <br>
                                    <input type="submit">
                                </form>`
                        }
                </script>

                <section id="reviews">
                    <h2>Recent Reviews</h2>
                    <section>
                        <?php while ($row_reviews = mysqli_fetch_assoc($result_reviews)): ?>
                            <h3>&#9733 Rating: <?php echo $row_reviews["review_rating"]?>/5</h3>
                            <p> Review: <?php echo $row_reviews["review_text"]?></p>
                        <?php endwhile?>
                    </section>
                </section>
                
            </div>
            
        </main>

        <footer>
            <p>&copy; 2025 Jobster</p>
            <p>Author: Daniil Vladimirov</p>
        </footer>
    </body>
</html>

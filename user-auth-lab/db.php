<?php
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'root'); 
    define('DB_PASSWORD', '');
    define('DB_DATABASE', 'user_auth_lab');

    //tạo chuỗi kết nối tới database.
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    // Check connection
    if ($conn === false) {
        die("ERROR: Could not connect. " . mysqli_connect_error());
    }
?>
<?php
    include('db.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = $_POST['email'];
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash password

        // Check if email already exists
        $query = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo "Email already exists!";
        } else {
            // Insert new user
            $query = "INSERT INTO users (email, password) VALUES (?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ss", $email, $password);

            if ($stmt->execute()) {
                echo "Registration successful!";
                header("Location: login.html"); // Redirect to login page
                exit;
            } else {
                echo "Error: " . $stmt->error;
            }
        }
    }
?>

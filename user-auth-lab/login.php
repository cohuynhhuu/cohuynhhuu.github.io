<?php
    session_start();
    include('db.php');

    // Check if user is already logged in
    if(isset($_SESSION['user_id'])) {
        header("Location: home.html");
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
        $password = $_POST['password'];

        // Find user by email
        $query = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();

            // Verify password
            if (password_verify($password, $user['password'])) {
                // Set session variables
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['logged_in'] = true;
                $_SESSION['last_activity'] = time();

                // Set remember me cookie if requested
                if(isset($_POST['remember']) && $_POST['remember'] == 'on') {
                    $token = bin2hex(random_bytes(32)); // Generate secure token
                    $expiry = time() + (30 * 24 * 60 * 60); // 30 days

                    // Store token in database
                    $query = "UPDATE users SET remember_token = ?, token_expiry = ? WHERE id = ?";
                    $stmt = $conn->prepare($query);
                    $stmt->bind_param("ssi", $token, date('Y-m-d H:i:s', $expiry), $user['id']);
                    $stmt->execute();

                    // Set secure cookie
                    setcookie('remember_token', $token, $expiry, '/', '', true, true);
                }

                // Log login attempt
                $ip = $_SERVER['REMOTE_ADDR'];
                $query = "INSERT INTO login_logs (user_id, ip_address, status) VALUES (?, ?, 'success')";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("is", $user['id'], $ip);
                $stmt->execute();

                header("Location: home.html");
                exit;
            } else {
                $error = "Incorrect password.";
                
                // Log failed attempt
                $ip = $_SERVER['REMOTE_ADDR'];
                $query = "INSERT INTO login_logs (user_id, ip_address, status) VALUES (?, ?, 'failed')";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("is", $user['id'], $ip);
                $stmt->execute();
            }
        } else {
            $error = "No user found with that email.";
        }

        // If there's an error, store it in session and redirect back to login
        if(isset($error)) {
            $_SESSION['error'] = $error;
            header("Location: login.html");
            exit;
        }
    }
?>

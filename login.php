<?php
session_start();

if (isset($_SESSION['username'])) {
    header("Location: dashboard.php");
    exit();
}

$error = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username === 'admin' && $password === 'password123') {
        $_SESSION['username'] = $username;
        header("Location: dashboard.php");
        exit();
    } else {
        $error = 'Username atau password salah!';
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Secondhand Treasure</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Pirata+One&family=Quicksand:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div id="notification-container"></div>
    
    <div class="auth-container">
        <div class="treasure-decoration"><i class="fas fa-gem"></i></div>
        <div class="treasure-decoration"><i class="fas fa-compass"></i></div>
        <div class="treasure-decoration"><i class="fas fa-key"></i></div>
        
        <div class="treasure-map-background"></div>
        
        <div class="auth-box animated">
            <div class="auth-header">
                <div class="treasure-icon">
                    <i class="fas fa-treasure-chest"></i>
                </div>
                <h2>Login Pemburu Harta</h2>
                <p>Masukkan kredensial Anda untuk memulai ekspedisi.</p>
            </div>
            
            <?php if ($error): ?>
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i> 
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="login.php" class="auth-form">
                <div class="input-group-interactive">
                    <input type="text" id="username" name="username" class="input-field" placeholder=" " required>
                    <label for="username" class="input-label"><i class="fas fa-user"></i> Username Pemburu</label>
                </div>
                <div class="input-group-interactive">
                    <input type="password" id="password" name="password" class="input-field" placeholder=" " required>
                    <label for="password" class="input-label"><i class="fas fa-lock"></i> Kata Sandi Rahasia</label>
                    <span class="password-toggle"><i class="fas fa-eye"></i></span>
                </div>
                <button type="submit" class="btn-auth">
                    <i class="fas fa-map-marked-alt"></i> Mulai Ekspedisi
                </button>
            </form>
            
            <div class="auth-note">
                <p><i class="fas fa-scroll"></i> <strong>Petunjuk:</strong> admin & password123</p>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script>
    // Menangani notifikasi logout
    <?php if (isset($_GET['status']) && $_GET['status'] === 'logout_success'): ?>
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof showNotification === 'function') {
                showNotification('Ekspedisi telah berakhir. Sampai jumpa lagi!', 'info');
            }
        });
    <?php endif; ?>
    </script>
</body>
</html>
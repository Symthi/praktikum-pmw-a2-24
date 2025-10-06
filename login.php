<?php
session_start();

// Jika user sudah login, arahkan langsung ke dashboard
if (isset($_SESSION['username'])) {
    header("Location: dashboard.php");
    exit();
}

$error = '';
// Memeriksa apakah form telah disubmit menggunakan method POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Autentikasi sederhana
    if ($username === 'admin' && $password === 'password123') {
        // Jika berhasil, simpan username ke dalam session
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
    
    <!-- Elemen dekoratif -->
    <div class="treasure-decoration">
        <i class="fas fa-gem"></i>
    </div>
    <div class="treasure-decoration">
        <i class="fas fa-compass"></i>
    </div>
    <div class="treasure-decoration">
        <i class="fas fa-treasure-chest"></i>
    </div>
    
    <div class="treasure-map-background"></div>
    
    <div class="auth-container">
        <div class="auth-box">
            <div class="auth-header">
                <div class="treasure-icon">
                    <i class="fas fa-treasure-chest"></i>
                </div>
                <h2>Login Pemburu Harta</h2>
                <p>Masukkan kredensial Anda untuk memulai ekspedisi pencarian harta karun</p>
            </div>
            
            <?php if ($error): ?>
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i> 
                    <?php echo $error; ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="login.php" class="auth-form">
                <div class="input-group">
                    <label for="username">Username Pemburu</label>
                    <input type="text" id="username" name="username" required placeholder="Masukkan username Anda">
                </div>
                <div class="input-group">
                    <label for="password">Kata Sandi Rahasia</label>
                    <input type="password" id="password" name="password" required placeholder="Masukkan kata sandi Anda">
                </div>
                <button type="submit" class="btn-auth">
                    <i class="fas fa-map-marked-alt"></i> Mulai Ekspedisi
                </button>
            </form>
            
            <div class="auth-note">
                <p><i class="fas fa-scroll"></i> Petunjuk: gunakan username <strong>admin</strong> dan password <strong>password123</strong></p>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script>
    // Menangani notifikasi logout
    <?php if (isset($_GET['status']) && $_GET['status'] === 'logout_success'): ?>
        document.addEventListener('DOMContentLoaded', () => {
            showNotification('Ekspedisi telah berakhir. Sampai jumpa lagi, Pemburu Harta!', 'info');
        });
    <?php endif; ?>
    </script>
</body>
</html>
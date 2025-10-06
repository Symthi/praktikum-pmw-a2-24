<?php
session_start();

// Jika user belum login, redirect ke halaman login
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Secondhand Treasure</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Pirata+One&family=Cinzel+Decorative:wght@400;700&family=Quicksand:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div id="notification-container"></div>

    <!-- Navigation -->
    <nav class="treasure-nav">
        <div class="nav-container">
            <div class="nav-logo">
                <div class="compass-icon">
                    <i class="fas fa-compass"></i>
                </div>
                <h1>Secondhand Treasure</h1>
                <div class="treasure-chest">
                    <i class="fas fa-chess-queen"></i>
                </div>
            </div>
            <ul class="nav-links">
                <li><a href="index.php" class="nav-link"><i class="fas fa-home"></i> Kembali ke Beranda</a></li>
                <li><a href="logout.php" class="nav-link logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
            <div class="nav-actions">
                <button class="btn-search"><i class="fas fa-search"></i></button>
                <button class="btn-cart"><i class="fas fa-treasure-chest"></i> <span class="cart-count">0</span></button>
            </div>
            <div class="mobile-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-treasure">
        <div class="treasure-map">
            <div class="map-container">
                <div class="island-shape">
                    <div class="treasure-spot spot-1" data-product="elektronik">
                        <div class="spot-marker"><i class="fas fa-bolt"></i></div>
                        <div class="spot-tooltip">Elektronik Bekas</div>
                    </div>
                    <div class="treasure-spot spot-2" data-product="furnitur">
                        <div class="spot-marker"><i class="fas fa-couch"></i></div>
                        <div class="spot-tooltip">Furnitur Klasik</div>
                    </div>
                    <div class="treasure-spot spot-3" data-product="buku">
                        <div class="spot-marker"><i class="fas fa-book"></i></div>
                        <div class="spot-tooltip">Buku Langka</div>
                    </div>
                    <div class="treasure-spot spot-4" data-product="pakaian">
                        <div class="spot-marker"><i class="fas fa-tshirt"></i></div>
                        <div class="spot-tooltip">Pakaian Vintage</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero-content">
            <div class="hero-text">
                <h2>Selamat Datang, <span class="highlight"><?php echo htmlspecialchars($_SESSION['username']); ?>!</span></h2>
                <p>Selamat datang di pusat ekspedisi Secondhand Treasure! Sebagai <?php echo htmlspecialchars($_SESSION['username']); ?>, Anda memiliki akses penuh untuk menjelajahi semua harta karun yang tersembunyi.</p>
                <div class="hero-actions">
                    <button class="btn-treasure" onclick="location.href='index.php'">Mulai Pencarian <i class="fas fa-map-marked-alt"></i></button>
                    <button class="btn-guide">Panduan Pemburu <i class="fas fa-scroll"></i></button>
                </div>
            </div>
            <div class="hero-visual">
                <div class="floating-treasure">
                    <div class="treasure-item">
                        <i class="fas fa-crown"></i>
                    </div>
                    <div class="treasure-item">
                        <i class="fas fa-gem"></i>
                    </div>
                    <div class="treasure-item">
                        <i class="fas fa-key"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="dashboard-stats">
        <div class="section-header">
            <h2>Statistik Ekspedisi Anda</h2>
            <p>Track progress petualangan Anda dalam mencari harta karun</p>
        </div>
        <div class="stats-container">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-eye"></i>
                </div>
                <div class="stat-info">
                    <h3>12</h3>
                    <p>Harta Dilihat</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-heart"></i>
                </div>
                <div class="stat-info">
                    <h3>5</h3>
                    <p>Dalam Wishlist</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="stat-info">
                    <h3>3</h3>
                    <p>Dalam Keranjang</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="stat-info">
                    <h3>8</h3>
                    <p>Harta Dimiliki</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Actions -->
    <section class="quick-actions">
        <div class="section-header">
            <h2>Aksi Cepat</h2>
            <p>Kelola ekspedisi Anda dengan mudah</p>
        </div>
        <div class="actions-grid">
            <div class="action-card" onclick="location.href='index.php'">
                <div class="action-icon">
                    <i class="fas fa-gem"></i>
                </div>
                <h3>Jelajahi Harta</h3>
                <p>Lihat koleksi harta karun terbaru</p>
            </div>
            <div class="action-card" onclick="showNotification('Fitur wishlist akan segera hadir!', 'info')">
                <div class="action-icon">
                    <i class="fas fa-heart"></i>
                </div>
                <h3>Wishlist Saya</h3>
                <p>Kelola barang yang diincar</p>
            </div>
            <div class="action-card" onclick="showNotification('Fitur keranjang akan segera hadir!', 'info')">
                <div class="action-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h3>Keranjang</h3>
                <p>Lihat barang dalam keranjang</p>
            </div>
            <div class="action-card" onclick="showNotification('Fitur profil akan segera hadir!', 'info')">
                <div class="action-icon">
                    <i class="fas fa-user-cog"></i>
                </div>
                <h3>Pengaturan</h3>
                <p>Kelola akun pemburu</p>
            </div>
        </div>
    </section>

    <footer class="treasure-footer">
        <div class="footer-container">
            <div class="footer-main">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <i class="fas fa-treasure-chest"></i>
                        <span>Secondhand Treasure</span>
                    </div>
                    <p>Selamat berburu harta karun, <?php echo htmlspecialchars($_SESSION['username']); ?>!</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-pinterest"></i></a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Ekspedisi</h4>
                    <ul>
                        <li><a href="index.php">Harta Karun</a></li>
                        <li><a href="index.php#categories">Peta Kategori</a></li>
                        <li><a href="index.php#about">Tentang Kami</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Akun</h4>
                    <ul>
                        <li><a href="#" onclick="showNotification('Fitur akan segera hadir!', 'info')">Profil Saya</a></li>
                        <li><a href="#" onclick="showNotification('Fitur akan segera hadir!', 'info')">Riwayat</a></li>
                        <li><a href="logout.php">Logout</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Secondhand Treasure. Semua harta karun dilindungi.</p>
                <p>Selamat berpetualang, <?php echo htmlspecialchars($_SESSION['username']); ?>!</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
    <script>
        // Fungsi untuk treasure spot interactions
        document.querySelectorAll('.treasure-spot').forEach(spot => {
            spot.addEventListener('click', function() {
                const productType = this.getAttribute('data-product');
                showNotification(`Membuka kategori ${productType}...`, 'info');
                setTimeout(() => {
                    window.location.href = `index.php`;
                }, 1000);
            });
        });

        // Guide button functionality
        document.querySelector('.btn-guide').addEventListener('click', function() {
            showNotification('Membuka Panduan Pemburu...', 'info');
            setTimeout(() => {
                // Panggil fungsi showGuideModal dari script.js
                if (typeof showGuideModal === 'function') {
                    showGuideModal();
                }
            }, 500);
        });

        // Mobile menu toggle
        document.querySelector('.mobile-toggle').addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('.nav-links').classList.toggle('active');
        });
    </script>
</body>
</html>
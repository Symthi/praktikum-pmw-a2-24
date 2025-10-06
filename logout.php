<?php
session_start(); // Memulai session untuk mengaksesnya

// Menghapus semua variabel session
$_SESSION = array();

// Menghancurkan session
session_destroy();

// Redirect ke halaman utama dengan query string untuk notifikasi
header("Location: index.php?status=logout_success");
exit();
?>
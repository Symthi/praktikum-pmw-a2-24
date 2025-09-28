// Menunggu hingga seluruh halaman HTML dimuat sebelum menjalankan JavaScript
document.addEventListener('DOMContentLoaded', () => {

/* Menampilkan Pop-up Panduan Pemburu */
const guideButton = document.querySelector('.btn-guide');

    if (guideButton) {
        guideButton.addEventListener('click', () => {
            showGuideModal();
        });
    }

    function showGuideModal() {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';

        modalOverlay.innerHTML = `
            <div class="modal-content guide-modal-content">
                <span class="modal-close">&times;</span>
                <h2 class="modal-title"><i class="fas fa-scroll"></i> Panduan Pemburu Harta Karun</h2>
                <p class="guide-intro">Temukan barang impianmu dengan mengikuti tips-tips rahasia dari para pemburu berpengalaman!</p>
                <ul class="guide-list">
                    <li>
                        <div class="guide-icon"><i class="fas fa-search-plus"></i></div>
                        <div class="guide-text">
                            <h4>Teliti Deskripsi & Foto</h4>
                            <p>Baca deskripsi dengan saksama dan perhatikan setiap detail pada foto untuk memastikan kondisi barang.</p>
                        </div>
                    </li>
                    <li>
                        <div class="guide-icon"><i class="fas fa-star"></i></div>
                        <div class="guide-text">
                            <h4>Periksa Kondisi & Rating</h4>
                            <p>Gunakan fitur "Lihat Cepat" untuk melihat rating dan status kondisi barang yang diberikan oleh kami.</p>
                        </div>
                    </li>
                    <li>
                        <div class="guide-icon"><i class="fas fa-gem"></i></div>
                        <div class="guide-text">
                            <h4>Manfaatkan Wishlist</h4>
                            <p>Simpan barang yang kamu incar di wishlist agar tidak kehilangan jejak harta karun potensialmu.</p>
                        </div>
                    </li>
                </ul>
                <p class="guide-closing">Selamat Berburu! ✨</p>
            </div>
        `;
        document.body.appendChild(modalOverlay);        

        // Event listener untuk menutup modal
        modalOverlay.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
        });
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
    }

    /* Fitur Notifikasi Custom (Toast Notification) */
    function showNotification(message, type = 'success') {
        // Cek apakah container notifikasi sudah ada, jika tidak, buat baru
        let notificationContainer = document.getElementById('notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'notification-container';
            document.body.appendChild(notificationContainer);
        }

        // Buat elemen notifikasi baru
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Tambahkan notifikasi ke container
        notificationContainer.appendChild(notification);

        // Hapus notifikasi setelah 3 detik
        setTimeout(() => {
            notification.classList.add('fade-out');
            notification.addEventListener('animationend', () => {
                notification.remove();
            });
        }, 3000);
    }

    let cartItemCount = 0;
    const cartCountElement = document.querySelector('.cart-count');

    // Fungsi untuk memperbarui tampilan angka di keranjang
    function updateCartCounter() {
        if (cartCountElement) {
            cartCountElement.textContent = cartItemCount;
            
            // Sembunyikan lingkaran merah jika keranjang kosong (angka 0)
            if (cartItemCount === 0) {
                cartCountElement.classList.add('hidden');
            } else {
                cartCountElement.classList.remove('hidden');
            }
        }
    }

    updateCartCounter();

    function showNotification(message, type = 'success') {
        let notificationContainer = document.getElementById('notification-container');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notificationContainer.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('fade-out');
            notification.addEventListener('animationend', () => {
                notification.remove();
            });
        }, 3000);
    }

    /* Fitur #1: Modal "Lihat Cepat" untuk Detail Produk */
    const quickViewButtons = document.querySelectorAll('.btn-quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-item');
            if (!productCard) {
                console.error("Elemen '.product-item' tidak ditemukan.");
                return;
            }

            // Mengambil data dari elemen HTML dan data-atribut
            const title = productCard.querySelector('h3')?.textContent || 'Nama Produk';
            const price = productCard.querySelector('.product-price')?.textContent || 'Harga';
            const imageSrc = productCard.querySelector('img')?.src || '';
            
            // Mengambil data detail dari atribut data-*
            const fullDescription = productCard.dataset.fullDescription || 'Deskripsi lengkap tidak tersedia.';
            const rating = parseFloat(productCard.dataset.rating) || 0;
            const category = productCard.dataset.category || 'Tidak ada kategori';
            const condition = productCard.dataset.condition || 'Tidak diketahui';

            createModal(title, price, imageSrc, fullDescription, rating, category, condition);
        });
    });

    // Fungsi untuk membuat rating bintang
    function generateStarRating(rating) {
        let starsHTML = '';
        let fullStars = Math.floor(rating);
        let halfStar = rating % 1 !== 0;
        let emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        return starsHTML;
    }

    function createModal(title, price, imageSrc, fullDescription, rating, category, condition) {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const ratingHTML = generateStarRating(rating);

        modalOverlay.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="${imageSrc}" alt="${title}">
                <h2 class="modal-title">${title}</h2>
                <div class="modal-rating">${ratingHTML} <span>(${rating.toFixed(1)})</span></div>
                <p class="modal-full-description">${fullDescription}</p>
                <div class="modal-meta">
                    <span class="meta-item"><strong>Kategori:</strong> ${category}</span>
                    <span class="meta-item"><strong>Kondisi:</strong> ${condition}</span>
                </div>
                <div class="modal-price">${price}</div>
            </div>
        `;
        document.body.appendChild(modalOverlay);

        // Event listener untuk menutup modal
        modalOverlay.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
        });
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
    }

    /* Fitur #2: Tombol Wishlist */
    const wishlistButtons = document.querySelectorAll('.btn-wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            if (!icon) return;

            const isWishlisted = icon.classList.contains('fas');
            if (isWishlisted) {
                icon.classList.remove('fas');
                icon.classList.add('far');
                button.style.color = '#ddd';
                showNotification('Produk dihapus dari wishlist', 'info');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
                button.style.color = 'var(--primary-gold)';
                showNotification('Produk berhasil ditambahkan ke wishlist');
            }
        });
    });

    /* Fitur #3: Tombol "+ Keranjang" */
    const cartButtons = document.querySelectorAll('.btn-add-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isAdded = button.classList.contains('added');
            if (isAdded) {
                button.textContent = '+ Keranjang';
                button.classList.remove('added');
                showNotification('Produk dihapus dari keranjang', 'info');
                cartItemCount--;
            } else {
                button.textContent = '✓ Ditambahkan';
                button.classList.add('added');
                showNotification('Berhasil ditambahkan ke keranjang');
                cartItemCount++;
            }
            updateCartCounter();
        });
    });

/* Fitur #4: Efek Scroll Halus untuk Menu Navigasi */
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navOffset = 70;
                const targetPosition = targetSection.offsetTop - navOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

/* Fitur #5: Form Berlangganan Newsletter */
const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            // Mencegah form mengirim data dan me-reload halaman
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const emailValue = emailInput.value;

            // Validasi sederhana: Cek apakah input kosong atau formatnya salah
            if (emailValue === '') {
                showNotification('Alamat email tidak boleh kosong!', 'error');
            } else if (!isValidEmail(emailValue)) {
                showNotification('Harap masukkan alamat email yang valid.', 'error');
            } else {
                // Jika berhasil
                showNotification('Terima kasih! Anda telah bergabung dengan ekspedisi.', 'success');
                emailInput.value = ''; // Kosongkan input field setelah berhasil
            }
        });
    }

    // Fungsi bantuan untuk validasi email sederhana
    function isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

});
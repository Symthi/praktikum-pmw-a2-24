// Menunggu hingga seluruh halaman HTML dimuat sebelum menjalankan JavaScript
document.addEventListener('DOMContentLoaded', () => {

    /* ================================================================== */
    /* Fitur #4: Efek Scroll Halus (KODE DIPERBAIKI SECARA FINAL)        */
    /* ================================================================== */
    // Pilih HANYA link yang href-nya dimulai dengan '#'
    const scrollLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Hentikan aksi default HANYA untuk link scroll ini
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navOffset = 70; // Sesuaikan jika tinggi navbar Anda berbeda
                const targetPosition = targetSection.offsetTop - navOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Catatan: Link ke dashboard.php dan logout.php tidak dipilih oleh query di atas,
    // sehingga mereka akan berfungsi secara normal tanpa terpengaruh oleh script ini.


    /* Menampilkan Pop-up Panduan Pemburu */
    const guideButton = document.querySelector('.btn-guide');
    if (guideButton) {
        guideButton.addEventListener('click', showGuideModal);
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
                        <div class="guide-text"><h4>Teliti Deskripsi & Foto</h4><p>Baca deskripsi dengan saksama dan perhatikan setiap detail pada foto.</p></div>
                    </li>
                    <li>
                        <div class="guide-icon"><i class="fas fa-star"></i></div>
                        <div class="guide-text"><h4>Periksa Kondisi & Rating</h4><p>Gunakan fitur "Lihat Cepat" untuk melihat rating dan status kondisi barang.</p></div>
                    </li>
                    <li>
                        <div class="guide-icon"><i class="fas fa-gem"></i></div>
                        <div class="guide-text"><h4>Manfaatkan Wishlist</h4><p>Simpan barang yang kamu incar di wishlist agar tidak kehilangan jejak.</p></div>
                    </li>
                </ul>
                <p class="guide-closing">Selamat Berburu! ✨</p>
            </div>`;
        document.body.appendChild(modalOverlay);
        modalOverlay.querySelector('.modal-close').addEventListener('click', () => modalOverlay.remove());
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.remove();
        });
    }

    /* Fitur Notifikasi Custom (Toast Notification) */
    window.showNotification = function(message, type = 'success') {
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            document.body.appendChild(container);
        }
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('fade-out');
            notification.addEventListener('animationend', () => notification.remove());
        }, 3000);
    }

    /* Fitur Keranjang Belanja */
    let cartItemCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    function updateCartCounter() {
        if (!cartCountElement) return;
        cartCountElement.textContent = cartItemCount;
        cartCountElement.classList.toggle('hidden', cartItemCount === 0);
    }
    updateCartCounter();

    /* Fitur #1: Modal "Lihat Cepat" */
    document.querySelectorAll('.btn-quick-view').forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.currentTarget.closest('.product-item');
            if (!productItem) return;
            const title = productItem.querySelector('h3')?.textContent || 'N/A';
            const price = productItem.querySelector('.product-price')?.textContent || 'N/A';
            const imageSrc = productItem.querySelector('img')?.src || '';
            const { fullDescription = 'Deskripsi tidak tersedia.', rating = 0, category = 'N/A', condition = 'N/A' } = productItem.dataset;
            createModal(title, price, imageSrc, fullDescription, parseFloat(rating), category, condition);
        });
    });

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
            </div>`;
        document.body.appendChild(modalOverlay);
        modalOverlay.querySelector('.modal-close').addEventListener('click', () => modalOverlay.remove());
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.remove();
        });
    }

    function generateStarRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) stars += '<i class="fas fa-star"></i>';
            else if (i - 0.5 <= rating) stars += '<i class="fas fa-star-half-alt"></i>';
            else stars += '<i class="far fa-star"></i>';
        }
        return stars;
    }

    /* Fitur #2 & #3: Tombol Wishlist & Keranjang */
    document.querySelectorAll('.btn-wishlist').forEach(btn => btn.addEventListener('click', e => {
        const icon = e.currentTarget.querySelector('i');
        const isWishlisted = icon.classList.toggle('fas');
        icon.classList.toggle('far', !isWishlisted);
        e.currentTarget.style.color = isWishlisted ? 'var(--primary-gold)' : '#ddd';
        showNotification(isWishlisted ? 'Ditambahkan ke wishlist' : 'Dihapus dari wishlist', 'info');
    }));

    document.querySelectorAll('.btn-add-cart').forEach(btn => btn.addEventListener('click', e => {
        const isAdded = e.currentTarget.classList.toggle('added');
        if (isAdded) {
            e.currentTarget.textContent = '✓ Ditambahkan';
            cartItemCount++;
            showNotification('Berhasil ditambahkan ke keranjang');
        } else {
            e.currentTarget.textContent = '+ Keranjang';
            cartItemCount--;
            showNotification('Dihapus dari keranjang', 'info');
        }
        updateCartCounter();
    }));

    /* Fitur #5: Form Newsletter */
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput.value) {
                showNotification('Email tidak boleh kosong!', 'error');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                showNotification('Harap masukkan email yang valid.', 'error');
            } else {
                showNotification('Terima kasih telah berlangganan!', 'success');
                emailInput.value = '';
            }
        });
    }
});
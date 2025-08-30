// Fungsi ini akan dipanggil setiap kali halaman baru dimuat oleh index.html
function initializePageScripts() {
    
    // Logika untuk halaman surprise
    const petalAnimationArea = document.querySelector('.petal-animation-area');
    if (petalAnimationArea) {
        const petalInterval = setInterval(() => {
            const petal = document.createElement('div');
            petal.classList.add('animated-petal');
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDuration = (8 + Math.random() * 7) + 's';
            petal.style.opacity = (0.6 + Math.random() * 0.4);
            petal.style.transform = `scale(${0.5 + Math.random() * 0.7})`;
            petalAnimationArea.appendChild(petal);

            setTimeout(() => {
                petal.remove();
            }, 15000); // Hapus kelopak setelah 15 detik
        }, 200); // Buat kelopak baru setiap 200ms

        // Redirect otomatis setelah 5 detik
        setTimeout(() => {
            clearInterval(petalInterval); // Hentikan pembuatan kelopak baru sebelum pindah halaman
            if (typeof loadPage === "function") {
                loadPage('webfaris.html');
            }
        }, 5000);
    }

    // Logika untuk halaman penutup
    const heartFallAnimationArea = document.querySelector('.heart-fall-animation-area');
    if (heartFallAnimationArea) {
        let fallingSymbolsInterval;
        function startFallingSymbolsEnding() {
            clearInterval(fallingSymbolsInterval);
            const container = document.querySelector('.heart-fall-animation-area');
            fallingSymbolsInterval = setInterval(() => {
                const el = document.createElement('div');
                el.classList.add('animated-heart-fall');
                el.innerText = '💖';
                el.style.left = Math.random() * 100 + 'vw';
                el.style.animationDuration = (5 + Math.random() * 3) + 's';
                container.appendChild(el);
                setTimeout(() => el.remove(), 8000);
            }, 600);
        }
        startFallingSymbolsEnding();
    }
}

// === FUNGSI-FUNGSI GLOBAL YANG BISA DIPANGGIL DARI ONCLICK DI HTML ===

// Untuk efek kartu terbuka di webfaris.html
function revealContent(url, event) {
    if (event) event.preventDefault();
    
    const overlay = document.querySelector('#content-container .content-overlay');
    if (overlay) {
        overlay.classList.add('active');
        setTimeout(() => {
            if (typeof loadPage === "function") {
                loadPage(url);
            }
        }, 1500);
    } else {
        if (typeof loadPage === "function") {
            loadPage(url);
        }
    }
}

// Untuk navigasi multi-halaman di pesan.html
function goToPage(pageNum) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(`page${pageNum}`)?.classList.add('active');

    if (pageNum === 3) {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        }
        typeText(fullLetter, document.getElementById('letterText'), 25);
        startFallingSymbols();
    }
}

// Data dan fungsi pembantu untuk pesan.html
const fullLetter = `Sekali lagi happy birthday Farisa!💖

Sebenarnya banyak banget yang pengen aku sampein wkwkwk, 
Aku seneng banget bisa kenal sama kamu jadi bagian dari kisah hidup kamu. 

Seneng sedih, manis pait, semua moment kita lewatin bareng-bareng, dan ini adalah ketiga kalinya kita ngerayain ulang tahun kamu wkwkwk. semoga tahun depan, depanya lagi dan tahun-tahun setelahnya bisa kita rayain bareng terus

Doa aku selalu menyertai kamu semoga kamu diberikan kebahagian di dunia dan akhirat, kesehatan, umur panjang, rezeki yang cukup, pokoknya yang terbaik buat kamu.

Harapan aku semoga kita bisa kuat ngadepin ringtangan yang bakal kita hadapin di depan, semoga bisa terus bareng-bareng juga sampai tua sampai punya cucu dan cicit wkwkwk.

you mean everything to me.

with all my love,
𝜗𝜚 Zahran >⩊<`;

function typeText(text, element, speed) {
    if (!element) return;
    element.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

let fallingSymbolsInterval;
function startFallingSymbols() {
    clearInterval(fallingSymbolsInterval);
    const container = document.querySelector('.page.active') || document.body;
    fallingSymbolsInterval = setInterval(() => {
        const el = document.createElement('div');
        el.classList.add('falling');
        const isHeart = Math.random() < 0.7;
        el.innerText = isHeart ? '💖' : '✨';
        el.classList.add(isHeart ? 'pink-heart' : 'gold-star');
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (5 + Math.random() * 3) + 's';
        container.appendChild(el);
        setTimeout(() => el.remove(), 8000);
    }, 600);
}
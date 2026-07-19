document.addEventListener("DOMContentLoaded", function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const scrollLinks = document.querySelectorAll('.scroll-link');

    // 1. Toggle Hamburger Menu
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 2. Smooth Scroll Anchor
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 3. Accordion Dropdown Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // 4. Logika Rating Interaktif & Redirection
    const stars = document.querySelectorAll('.star-btn');
    const statusText = document.getElementById('ratingStatus');
    // MASUKKAN TARGET LINK TOKOPEDIA LU DI SINI
    const tokopediaLink = "https://www.tokopedia.com/brick-station-store"; 

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const currentVal = this.getAttribute('data-value');
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= currentVal) {
                    s.textContent = '★';
                    s.style.color = '#ffc107';
                }
            });
        });

        star.addEventListener('mouseout', function() {
            stars.forEach(s => {
                if (!s.classList.contains('filled')) {
                    s.textContent = '☆';
                    s.style.color = '#94a3b8';
                }
            });
        });

        star.addEventListener('click', function() {
            const clickVal = this.getAttribute('data-value');
            
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= clickVal) {
                    s.classList.add('filled');
                    s.textContent = '★';
                } else {
                    s.classList.remove('filled');
                    s.textContent = '☆';
                }
            });

            statusText.textContent = `Mengarahkan ke toko Tokopedia dengan rating ${clickVal} bintang...`;
            statusText.style.color = '#2563eb';

            setTimeout(() => {
                window.open(tokopediaLink, '_blank');
                statusText.textContent = "Pilih bintang untuk menuju Marketplace Resmi";
                statusText.style.color = '#475569';
            }, 650);
        });
    });

    // 5. Scroll Reveal Engine
    const targets = document.querySelectorAll('.anim-left, .anim-right, .anim-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 80);
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.02, rootMargin: "0px 0px -10px 0px" });

    targets.forEach(target => observer.observe(target));
});

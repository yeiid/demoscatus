// ============================
// SCROLL REVEAL
// ============================
const scrollElements = document.querySelectorAll('[data-scroll]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

scrollElements.forEach(el => observer.observe(el));

// ============================
// FAQ ACCORDION
// ============================
document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item-v2');
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item-v2').forEach(i => i.classList.remove('active'));

        // Toggle current
        if (!isActive) item.classList.add('active');
    });
});

// ============================
// COUNTER ANIMATION
// ============================
const counters = document.querySelectorAll('.stat-number[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            let current = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = current;
            }, 30);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// ============================
// 3D TILT ON PRICING CARDS
// ============================
document.querySelectorAll('.pricing-card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ============================
// WHATSAPP REDIRECTION ON PLAN BUTTONS
// ============================
document.querySelectorAll('.pricing-card-3d .btn-glow').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.pricing-card-3d');
        const speed = card?.querySelector('.plan-speed')?.textContent?.trim() || '150 Mbps';
        const price = card?.querySelector('.plan-price')?.textContent?.trim() || '$80.000/mes';
        const text = `¡Hola CactusNet! Me interesa contratar el Plan Hogar de ${speed} (${price}) en La Guajira. ¿Podrían brindarme información para agendar la instalación?`;
        window.open(`https://wa.me/573176119013?text=${encodeURIComponent(text)}`, '_blank');
    });
});


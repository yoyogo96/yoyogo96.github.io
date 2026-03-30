// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ===== Active Nav Highlight =====
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-menu a');

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-20% 0px -60% 0px' });

sections.forEach(section => navObserver.observe(section));

// ===== Scroll Fade-in =====
const fadeElements = document.querySelectorAll(
    '.research-card, .pub-year-group, .tl-item, .award-item, .book-card, .contact-item, .sidebar-card, .about-text, .lab-info, .recruit-card'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== Publication Filters =====
const filterBtns = document.querySelectorAll('.pub-filter');
const pubItems = document.querySelectorAll('.pub-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        pubItems.forEach(item => {
            const categories = item.dataset.category || '';
            if (filter === 'all' || categories.includes(filter)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        // Hide empty year groups
        document.querySelectorAll('.pub-year-group').forEach(group => {
            const visibleItems = group.querySelectorAll('.pub-item:not(.hidden)');
            group.style.display = visibleItems.length === 0 ? 'none' : '';
        });
    });
});

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        navbar.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    lastScroll = scrollY;
}, { passive: true });

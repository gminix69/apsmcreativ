/* ═══════════════════════════════════════════════════
   SM CREATIVE — HEAD OF GROWTH PROPOSAL
   Interactive JavaScript
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Cursor Glow Effect ───
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // ─── Navigation Scroll Effect ───
    const nav = document.getElementById('mainNav');
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateNav() {
        const scrollY = window.scrollY;
        
        // Add scrolled class
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Update active link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNav, { passive: true });

    // ─── Mobile Menu ───
    const menuBtn = document.getElementById('navMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── Scroll Animations ───
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate impact bars when strategy section is visible
                if (entry.target.classList.contains('strategy-pillars')) {
                    const fills = entry.target.querySelectorAll('.impact-fill');
                    fills.forEach(fill => {
                        fill.classList.add('animated');
                        const width = fill.style.width;
                        fill.style.width = '0';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 100);
                    });
                }
                
                // Animate counters
                if (entry.target.classList.contains('hero-stats') || entry.target.closest('.hero')) {
                    animateCounters(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // ─── Counter Animation ───
    function animateCounters(container) {
        const counters = container.querySelectorAll ? 
            container.querySelectorAll('.stat-number[data-count]') : 
            document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            if (counter.dataset.animated) return;
            counter.dataset.animated = 'true';
            
            const target = parseInt(counter.dataset.count);
            const suffix = counter.dataset.suffix || '';
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const eased = 1 - Math.pow(1 - progress, 4);
                const current = Math.round(target * eased);
                
                counter.textContent = current.toLocaleString() + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }

    // ─── Hero Particles ───
    const particlesContainer = document.getElementById('heroParticles');
    
    function createParticles() {
        const count = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // ─── Smooth Scroll for Nav Links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── Pillar Hover Parallax ───
    const pillars = document.querySelectorAll('.pillar');
    pillars.forEach(pillar => {
        pillar.addEventListener('mousemove', (e) => {
            const rect = pillar.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            
            const number = pillar.querySelector('.pillar-number');
            if (number) {
                number.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
            }
        });
        
        pillar.addEventListener('mouseleave', () => {
            const number = pillar.querySelector('.pillar-number');
            if (number) {
                number.style.transform = 'translate(0, 0)';
                number.style.transition = 'transform 0.3s ease-out';
                setTimeout(() => { number.style.transition = ''; }, 300);
            }
        });
    });

    // ─── Diagnostic Cards Tilt ───
    const diagCards = document.querySelectorAll('.diag-card');
    diagCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5) * -4;
            const rotateY = (x - 0.5) * 4;
            
            card.style.transform = `translateY(-4px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ─── Timeline Phase Accordion (Mobile) ───
    if (window.innerWidth < 768) {
        const phaseHeaders = document.querySelectorAll('.phase-header');
        phaseHeaders.forEach(header => {
            header.style.cursor = 'pointer';
            const tasks = header.nextElementSibling;
            const kpi = tasks.nextElementSibling;
            
            header.addEventListener('click', () => {
                const isOpen = tasks.style.maxHeight;
                
                // Close all
                document.querySelectorAll('.phase-tasks, .phase-kpi').forEach(el => {
                    el.style.maxHeight = null;
                    el.style.overflow = 'hidden';
                });
                
                // Open clicked
                if (!isOpen) {
                    tasks.style.maxHeight = tasks.scrollHeight + 'px';
                    tasks.style.overflow = 'visible';
                    if (kpi) {
                        kpi.style.maxHeight = kpi.scrollHeight + 'px';
                        kpi.style.overflow = 'visible';
                    }
                }
            });
        });
    }

    // ─── Typing Effect for Hero (subtle) ───
    const heroHighlight = document.querySelector('.hero-highlight');
    if (heroHighlight) {
        heroHighlight.style.opacity = '0';
        setTimeout(() => {
            heroHighlight.style.transition = 'opacity 1s ease-in';
            heroHighlight.style.opacity = '1';
        }, 800);
    }

    // ─── Initialize on Load ───
    // Trigger initial scroll check
    updateNav();
    
    // Animate hero elements on load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
        heroElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, i * 200);
        });
        
        // Trigger counter animation for hero stats
        setTimeout(() => {
            animateCounters(document);
        }, 1000);
    }, 300);

    console.log('%c🚀 SM Creative — Proposta Head of Growth & Marketing', 
        'background: #E63946; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 4px;');
    console.log('%cEsta apresentação foi construída de raiz como demonstração de competências técnicas.', 
        'color: #666; font-size: 12px;');
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.querySelectorAll('span').forEach(span => span.style.transform = 'none');
                menuToggle.querySelectorAll('span')[1].style.opacity = '1';
            });
        });
    }

    // 2. Typewriter Effect
    const typewriterText = document.getElementById('typewriter-text');
    const words = ["Full-Stack Developer", "UX/UI Designer", "Freelance Coder", "Problem Solver"];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typewriterText) return;
        const currentWord = words[wordIdx];
        
        if (isDeleting) {
            typewriterText.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50;
        } else {
            typewriterText.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIdx === currentWord.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }
    
    // Start typewriter
    if (typewriterText) {
        setTimeout(type, 1000);
    }

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Animate Skill Bars on Viewport Intersection
    const skillSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    if (skillSection && skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const targetPercent = bar.getAttribute('data-percent');
                        bar.style.width = targetPercent;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        skillsObserver.observe(skillSection);
    }

    // 5. Active Nav Link Highlighter on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 160; // Offset for sticky navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 6. Project Cards Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow & fade in
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Delay display: none to match transition duration
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 7. Contact Form Handling (Mock submit)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                กำลังส่งข้อมูล...
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            `;

            // Style spinner rotation keyframe injection
            if (!document.getElementById('spin-style')) {
                const style = document.createElement('style');
                style.id = 'spin-style';
                style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
                document.head.appendChild(style);
            }

            // Simulate server network latency
            setTimeout(() => {
                // Mock success
                formStatus.className = 'form-status success';
                formStatus.textContent = 'ส่งข้อความสำเร็จแล้ว! ผมจะตอบกลับหาคุณโดยเร็วที่สุด';
                formStatus.style.display = 'block';

                // Reset form values
                contactForm.reset();

                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;

                // Hide status after 4 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 4000);

            }, 1500);
        });
    }

    // 8. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.transform = 'translateY(0)';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.transform = 'translateY(15px)';
                backToTopBtn.style.pointerEvents = 'none';
            }
        });

        // Initialize state
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'translateY(15px)';
        backToTopBtn.style.transition = 'var(--transition-smooth)';
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

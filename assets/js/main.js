document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Mobile Menu Navigation
    // ==========================================
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        const icon = hamburger.querySelector('i');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon to 'X' when open
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ==========================================
    // Smooth Scroll (Setup for next sections)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // ==========================================
    // Sidebar Active Number Toggle
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const pageNums = document.querySelectorAll('.page-num');

    if (sections.length > 0 && pageNums.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    pageNums.forEach(num => {
                        num.classList.remove('active');
                        if (num.getAttribute('data-section') === sectionId) {
                            num.classList.add('active');
                            
                            // Move a linha para baixo do número ativo
                            const line = document.querySelector('.page-line');
                            if (line) {
                                num.after(line);
                            }
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }
});

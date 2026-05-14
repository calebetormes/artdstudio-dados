document.addEventListener('DOMContentLoaded', () => {
    /**
     * INITIALIZE ICONS
     */
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /**
     * DYNAMIC NAVIGATION LOGIC
     * Updates label and arrows based on current section.
     */
    const sections = document.querySelectorAll('.lp-section');
    const sectionLabel = document.getElementById('nav-current-section');
    const scrollUp = document.getElementById('scroll-up');
    const scrollDown = document.getElementById('scroll-down');

    const sectionNames = {
        'hero': 'HOME',
        'solutions': 'SOLUÇÕES',
        'about': 'SOBRE'
    };

    const sectionOrder = ['hero', 'solutions', 'about'];

    const observerOptions = {
        root: null,
        threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const index = sectionOrder.indexOf(id);
                
                // Update Label
                if (sectionNames[id] && sectionLabel) {
                    sectionLabel.style.opacity = '0';
                    setTimeout(() => {
                        sectionLabel.textContent = sectionNames[id];
                        sectionLabel.style.opacity = '0.4';
                    }, 300);
                }

                // Update Arrows
                if (scrollUp && scrollDown) {
                    // Handle Up Arrow
                    if (index > 0) {
                        scrollUp.setAttribute('href', `#${sectionOrder[index - 1]}`);
                        scrollUp.style.opacity = '1';
                        scrollUp.style.pointerEvents = 'all';
                    } else {
                        scrollUp.style.opacity = '0';
                        scrollUp.style.pointerEvents = 'none';
                    }

                    // Handle Down Arrow
                    if (index < sectionOrder.length - 1) {
                        scrollDown.setAttribute('href', `#${sectionOrder[index + 1]}`);
                        scrollDown.style.opacity = '1';
                        scrollDown.style.pointerEvents = 'all';
                    } else {
                        scrollDown.style.opacity = '0';
                        scrollDown.style.pointerEvents = 'none';
                    }
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

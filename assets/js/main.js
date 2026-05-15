// Função para carregar componentes HTML assincronamente
async function loadComponent(containerId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Falha ao carregar ${filePath}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

// Inicializa a aplicação após carregar as dobras
async function initApp() {
    // 1. Carregar as dobras dinamicamente
    await Promise.all([
        loadComponent('hero-container', 'components/hero.html'),
        loadComponent('diagnostic-container', 'components/diagnostic.html'),
        loadComponent('solution-container', 'components/solution.html')
    ]);

    // 2. Após o carregamento, inicializar as interações
    initMobileMenu();
    initSmoothScroll();
    initHeaderGlassmorphism();
    initSidebarSpy();
    initTimelineSpy();
}

// Funções de Inicialização (Separadas e Organizadas)

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        const icon = hamburger.querySelector('i');
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initHeaderGlassmorphism() {
    const header = document.querySelector('.main-header');
    const socialIcons = document.querySelector('.social-icons');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (header) header.classList.add('scrolled');
            if (socialIcons) socialIcons.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
            if (socialIcons) socialIcons.classList.remove('scrolled');
        }
    });
}

function initSidebarSpy() {
    const sections = document.querySelectorAll('section[id]');
    const pageNums = document.querySelectorAll('.page-num');

    if (sections.length > 0 && pageNums.length > 0) {
        const observerOptions = { threshold: 0.5 };
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
}

function initTimelineSpy() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        // Observa os itens entrando na tela (margin reduzida para ativar no centro)
        const observerOptions = {
            root: null,
            rootMargin: '-15% 0px -15% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    // Remove class when scrolling out of view for repeatable animation
                    entry.target.classList.remove('in-view');
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
}

// Iniciar quando o DOM base estiver pronto
document.addEventListener('DOMContentLoaded', initApp);

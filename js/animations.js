// ===================================
// ANIMATIONS AND INTERACTIVE FEATURES
// Skill bar animations, smooth scrolling, loader, and more
// ===================================

(function () {
    'use strict';

    // ===================================
    // PAGE LOADER
    // ===================================
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            // Hide loader after a short delay
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 300);
        }
    });

    // ===================================
    // SKILL BAR ANIMATIONS
    // Animate skill bars when they come into view
    // ===================================
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-bar');

        if (skillBars.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
                    // Add animate class to trigger CSS animation
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the element is visible
        });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    };

    // Initialize skill bar animations if on about page
    if (document.querySelector('.skills-section')) {
        animateSkillBars();
    }

    // ===================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===================================
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Don't prevent default for modal links or hash-only links
                if (href === '#' || href.startsWith('#project-modal')) return;

                e.preventDefault();

                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for sticky navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    smoothScroll();

    // ===================================
    // CONTACT FORM HANDLING
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Simulate form submission (in real app, send to server)
            console.log('Form submitted:', data);

            // Show success message
            if (formSuccess) {
                formSuccess.classList.add('show');

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
            }
        });
    }

    // ===================================
    // PROJECT FILTER (PROJECTS PAGE)
    // ===================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        // Fade in animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.5s ease';
                            card.style.opacity = '1';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ===================================
    // ENTRANCE ANIMATIONS
    // Add fade-in animations to sections as they come into view
    // ===================================
    const observeElements = () => {
        const elements = document.querySelectorAll('.feature-card, .project-card, .skill-category, .timeline-item');

        if (elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animations
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    };

    observeElements();

    // ===================================
    // NAVBAR SCROLL EFFECT
    // Add shadow to navbar on scroll
    // ===================================
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // ===================================
    // MODAL CLOSE ON ESCAPE KEY
    // ===================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && window.location.hash.startsWith('#project-modal')) {
            window.location.hash = '';
        }
    });

    // Prevent body scroll when modal is open
    window.addEventListener('hashchange', () => {
        if (window.location.hash.startsWith('#project-modal')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

})();

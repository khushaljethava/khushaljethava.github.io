document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('h1, h2, h3');
    const tocLinks = document.querySelectorAll('.toc-list li');

    function updateToc() {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                currentSectionId = section.id;
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.querySelector('a').getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateToc);
    
    // Smooth scroll to sections
    document.querySelectorAll('.toc-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
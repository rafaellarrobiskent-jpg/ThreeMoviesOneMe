// THREE STORIES, ONE ME - SCRIPT.JS


// ========================================
// 1. MOVIE SELECTOR
// ========================================

const storyButtons = document.querySelectorAll('.story-button');
const storyPanels = document.querySelectorAll('[data-story-panel]');

storyButtons.forEach(button => {

    button.addEventListener('click', () => {

        const selectedStory = button.dataset.story;

        // Remove active state from all buttons
        storyButtons.forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-pressed', 'false');
        });

        // Activate the selected button
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        // Hide all story panels
        storyPanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Show the selected story
        const selectedPanel = document.querySelector(
            `[data-story-panel="${selectedStory}"]`
        );

        if (selectedPanel) {
            selectedPanel.classList.add('active');
        }

    });

});


// ========================================
// 2. SCROLL REVEAL ANIMATION
// ========================================

const revealElements = document.querySelectorAll(
    '.section-heading, .movie-content, .character-card, ' +
    '.lesson-card, .reflection-content, .reflection-image, ' +
    '.story-highlight, .closing-content, .credits-content'
);

revealElements.forEach(element => {
    element.classList.add('reveal');
});

if ('IntersectionObserver' in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    // Show everything if the browser does not support IntersectionObserver
    revealElements.forEach(element => {
        element.classList.add('active');
    });

}


// ========================================
// 3. NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.querySelector('.navbar');

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 80) {

        navbar.style.position = 'fixed';
        navbar.style.background = 'rgba(7, 29, 34, 0.96)';
        navbar.style.backdropFilter = 'blur(12px)';

    } else {

        navbar.style.position = 'absolute';
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';

    }

}

window.addEventListener('scroll', updateNavbar, {
    passive: true
});

// Apply the correct navbar style when the page first loads
updateNavbar();


// ========================================
// 4. CONSOLE MESSAGE
// ========================================

console.log('Three Stories, One Me website loaded successfully!');

// ========================================
// 5. BACKGROUND MUSIC PLAYER
// ========================================

const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');

musicToggle.addEventListener('click', async () => {

    if (backgroundMusic.paused) {

        try {
            await backgroundMusic.play();

            musicToggle.classList.add('playing');
            musicIcon.textContent = '♫';
            musicText.textContent = 'MUSIC ON';
            musicToggle.setAttribute('aria-label', 'Pause background music');
            musicToggle.setAttribute('aria-pressed', 'true');

        } catch (error) {
            console.error('Unable to play music:', error);
        }

    } else {

        backgroundMusic.pause();

        musicToggle.classList.remove('playing');
        musicIcon.textContent = '♫';
        musicText.textContent = 'PLAY MUSIC';
        musicToggle.setAttribute('aria-label', 'Play background music');
        musicToggle.setAttribute('aria-pressed', 'false');

    }

});
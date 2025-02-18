document.addEventListener('DOMContentLoaded', function() {
    // Set the start date (YYYY, MM-1, DD, HH, MM)
    const startDate = new Date(2024, 1, 18, 20, 32); // February 18, 2024, 20:32

    function updateCounter() {
        const currentDate = new Date();
        const difference = currentDate - startDate;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Update the display with animation
        updateElement('days', days);
        updateElement('hours', hours);
        updateElement('minutes', minutes);
        updateElement('seconds', seconds);

        // Create hearts effect when numbers change
        if (seconds === 0) createHeartBurst();
    }

    function updateElement(elementId, value) {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent);
        const newValue = value;

        if (currentValue !== newValue) {
            element.style.transform = 'translateY(-20px)';
            element.style.opacity = '0';

            setTimeout(() => {
                element.textContent = String(newValue).padStart(2, '0');
                element.style.transform = 'translateY(20px)';

                requestAnimationFrame(() => {
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                });
            }, 200);
        }
    }

    function createHeartBurst() {
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '🤍';
            heart.className = 'burst-heart';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 1 + 's';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 3000);
        }
    }

    // Cursor heart following
    const cursorHeart = document.getElementById('cursor-heart');
    document.addEventListener('mousemove', (e) => {
        cursorHeart.style.left = e.clientX + 'px';
        cursorHeart.style.top = e.clientY + 'px';
    });

    // Floating hearts animation
    const floatingHeartsContainer = document.querySelector('.floating-hearts');

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '🤍';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.position = 'absolute';
        heart.style.animation = 'float ' + (Math.random() * 3 + 2) + 's ease-in-out';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';

        floatingHeartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }

    // Create floating hearts periodically
    setInterval(createFloatingHeart, 300);

    // Add initial hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(createFloatingHeart, Math.random() * 1500);
    }

    // Slideshow functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('active');
    }

    // Show first slide immediately
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    // Initialize audio
    const audio = new Audio('/static/music/muzik.m4a');
    audio.loop = true;

    // Auto-play music (with user interaction handling)
    document.addEventListener('click', function initAudio() {
        audio.play().catch(e => console.log('Audio playback failed:', e));
        document.removeEventListener('click', initAudio);
    }, { once: true });

    const musicButton = document.getElementById('toggleMusic');
    let isMusicPlaying = false;

    musicButton.addEventListener('click', () => {
        if (isMusicPlaying) {
            audio.pause();
            musicButton.innerHTML = '<i class="fas fa-music"></i><span>Play Music</span>';
        } else {
            audio.play();
            musicButton.innerHTML = '<i class="fas fa-pause"></i><span>Pause Music</span>';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Update counter every second
    setInterval(updateCounter, 1000);
    updateCounter(); // Initial call

    // Change slide every 5 seconds
    setInterval(showSlides, 5000);
});
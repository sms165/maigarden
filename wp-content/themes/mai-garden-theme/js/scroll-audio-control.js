document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Audio Mute Controller ---
    const toggleBtn = document.getElementById('video-mute-toggle');
    const iconContainer = document.getElementById('audio-icon-element');
    const video = document.querySelector('.video-toggle-target');
    
    const mutedSvg = `<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 18V5l12-2v13'></path><circle cx='6' cy='18' r='3'></circle><circle cx='18' cy='16' r='3'></circle><line x1='3' y1='3' x2='21' y2='21'></line></svg>`;
    const unmutedSvg = `<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 18V5l12-2v13'></path><circle cx='6' cy='18' r='3'></circle><circle cx='18' cy='16' r='3'></circle></svg>`;
    
    if (toggleBtn && video) {
        video.muted = true;
        toggleBtn.classList.remove('active-green');
        toggleBtn.classList.add('is-muted');
        if (iconContainer) iconContainer.innerHTML = mutedSvg;

        toggleBtn.onclick = function(e) {
            e.preventDefault();
            if (video.muted) {
                video.muted = false;
                toggleBtn.classList.add('active-green');
                toggleBtn.classList.remove('is-muted');
                if (iconContainer) iconContainer.innerHTML = unmutedSvg;
            } else {
                video.muted = true;
                toggleBtn.classList.remove('active-green');
                toggleBtn.classList.add('is-muted');
                if (iconContainer) iconContainer.innerHTML = mutedSvg;
            }
        };
    }

    // --- 2. Parallax Plate Scroll Interpolator ---
    const container = document.querySelector('.about-parallax-scroll-container');
    const plate = document.querySelector('.about-featured-img');

    if (container && plate) {
        function handlePlateParallax() {
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top <= windowHeight && rect.bottom >= 0) {
                const totalDuration = rect.height + windowHeight;
                const currentProgress = (windowHeight - rect.top) / totalDuration;
                const clampedProgress = Math.min(Math.max(currentProgress, 0), 1);
                container.style.setProperty('--scroll-progress', clampedProgress);
            }
        }
        window.addEventListener('scroll', handlePlateParallax, { passive: true });
        handlePlateParallax(); // Initial calculate
    }
});


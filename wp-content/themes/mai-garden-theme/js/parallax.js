window.addEventListener('load', () => {
    const container = document.querySelector('.about-parallax-scroll-container');
    const plateLayer = document.querySelector('.about-plate-layer');
    const plateImg = document.querySelector('.about-featured-img');
    const slides = document.querySelectorAll('.about-text-panel-slide, .about-table-arrival-slide');
    const tableImg = document.querySelector('.table-parallax-img');

    if (!container) return;

    const isMobile = window.innerWidth <= 991;

    // === MOBILE: Minimal or no animation ===
    if (isMobile) {
        // Reset everything to natural flow
        if (plateLayer) {
            plateLayer.style.position = 'relative';
            plateLayer.style.transform = 'none';
            plateLayer.style.opacity = '1';
        }
        if (plateImg) {
            plateImg.style.transform = 'none';
        }
        slides.forEach(slide => {
            if (slide) {
                slide.style.transform = 'none';
                slide.style.opacity = '1';
            }
        });
        if (tableImg) tableImg.style.transform = 'none';
        return; // Stop here for mobile
    }

    // === DESKTOP: Original parallax logic ===
    const setElementState = (el, opacity) => {
        if (el) el.style.opacity = opacity;
    };

    const runShrinkAnimation = () => {
        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const trackHeight = rect.height - viewportHeight;
        let progress = trackHeight <= 0 ? 0 : -rect.top / trackHeight;
        progress = Math.max(0, Math.min(1, progress));

        // Plate animation
        let scale = 1;
        let opacity = 1;
        let yOffset = 0;
        let layerY = 0;

        if (progress < 0.20) {
            scale = 1; 
            opacity = 1; 
            yOffset = 0;
            layerY = 0;
        } else if (progress < 0.55) {
            const shrinkProgress = (progress - 0.20) / 0.35;
            scale = 1 - (shrinkProgress * 0.55);
            yOffset = shrinkProgress * -410;
        } else {
            scale = 0.45;
            yOffset = -410;
        }

        plateImg.style.transform = `scale(${scale}) translateY(${yOffset}px)`;
        plateLayer.style.transform = `translateY(${layerY}px)`;
        plateLayer.style.opacity = opacity;

        // Text & table parallax (desktop only)
        setElementState(slides[0], 1);
        setElementState(slides[1], 1);

        if (tableImg && progress < 0.60) {
            const tableProgress = progress / 0.60;
            const imgY = -550 + (tableProgress * -300);
            tableImg.style.transform = `translateY(${imgY}px) translateZ(0)`;
        }

        // ... (keep the rest of your Zone 1 / Zone 2 / Zone 3 logic unchanged)
        if (progress < 0.25) {
            setElementState(slides[2], 1);
            setElementState(slides[3], 0);

            const slide0Y = (progress / 0.25) * -225;
            slides[0].style.transform = `translateY(${slide0Y}px)`;
            slides[1].style.transform = 'none';

            const earlyProgress = progress / 0.25;
            const slide2Y = 100 - (earlyProgress * 84);
            slides[2].style.transform = `translateY(${slide2Y}px)`;
        } else if (progress >= 0.25 && progress < 0.60) {
            setElementState(slides[2], 1);
            setElementState(slides[3], 0);

            const overlapProgress = (progress - 0.25) / 0.35;

            slides[0].style.transform = `translateY(${-225 - (overlapProgress * 600)}px)`;
            slides[1].style.transform = `translateY(${overlapProgress * -400}px)`;
            slides[2].style.transform = `translateY(${16 - (overlapProgress * 16)}px)`;
        } else {
            setElementState(slides[1], 1);
            setElementState(slides[2], 1);
            setElementState(slides[3], 1);

            let stageProgress = (progress - 0.60) / 0.40;
            stageProgress = Math.max(0, Math.min(1, stageProgress));

            slides[0].style.transform = `translateY(-1200px)`;
            slides[2].style.transform = 'none';

            if (tableImg) {
                tableImg.style.transform = `translateY(${-850 + (stageProgress * -200)}px)`;
            }
            slides[3].style.transform = `translateY(${(1 - stageProgress) * -100}px)`;
            slides[3].style.marginTop = "-800px";
        }
    };

    let ticking = false;
    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                runShrinkAnimation();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    runShrinkAnimation();
    setTimeout(runShrinkAnimation, 100);

    // Re-check on resize
    window.addEventListener('resize', () => {
        location.reload(); // Simple way - or implement proper resize handler
    });
});
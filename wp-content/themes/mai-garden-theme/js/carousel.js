document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('reviewsTrack');
    if (!track) return;

    let originalCards = Array.from(track.children);
    const originalFirstChild = track.firstChild; // Fixed anchor to prevent order reversal
    
    // --- STEP 1: CONSTRUCT THE INFINITE CAROUSEL LOOPS IN PERFECT SEQUENCE ---
    originalCards.forEach(card => {
        // Appends to the very end: [1, 2, 3, 4, 5]
        track.appendChild(card.cloneNode(true));
        
        // Prepends before the original first item, preserving: [1, 2, 3, 4, 5]
        track.insertBefore(card.cloneNode(true), originalFirstChild);
    });

    const totalCards = track.children.length;
    let currentIndex = originalCards.length; // Focuses directly on the real first card

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let dragMoved = false;

    // Dynamically query responsive layout variables from computed CSS metrics
    const getCardMetrics = () => {
        const style = window.getComputedStyle(document.documentElement);
        const cardWidth = parseInt(style.getPropertyValue('--card-width')) || 360;
        const gap = parseInt(style.getPropertyValue('--card-gap')) || 40;
        return { step: cardWidth + gap, cardWidth };
    };

    // --- TRANSLATION CALCULATOR POSITIONING ENGINE ---
    const setPositionByIndex = (animate = true) => {
        const { step, cardWidth } = getCardMetrics();
        track.style.transition = animate ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
        
        const containerWidth = track.parentElement.offsetWidth;
        const centerOffset = (containerWidth - cardWidth) / 2;
        
        currentTranslate = -(currentIndex * step) + centerOffset;
        track.style.transform = `translateX(${currentTranslate}px)`;
        prevTranslate = currentTranslate;

        // Apply visual magnification and brightness highlights
        Array.from(track.children).forEach((card, idx) => {
            if (idx === currentIndex) {
                card.classList.add('is-featured');
            } else {
                card.classList.remove('is-featured');
            }
        });
    };

    // --- INFINITE STRUCTURAL RELOCATIONS ---
    track.addEventListener('transitionend', () => {
        const count = originalCards.length;
        if (currentIndex < count) {
            currentIndex += count;
            setPositionByIndex(false);
        } else if (currentIndex >= count * 2) {
            currentIndex -= count;
            setPositionByIndex(false);
        }
    });

    // --- CLICK TO HIGHLIGHT SNAPPING MANAGER ---
    track.addEventListener('click', (e) => {
        if (dragMoved) return; 
        const clickedCard = e.target.closest('.review-card-item');
        if (!clickedCard) return;

        currentIndex = Array.from(track.children).indexOf(clickedCard);
        setPositionByIndex(true);
    });

    // --- TOUCH & POINTER EVENTS CAPTURE LOGIC ---
    const startDrag = (e) => {
        isDragging = true;
        dragMoved = false;
        track.style.transition = 'none';
        startX = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
    };

    const moveDrag = (e) => {
        if (!isDragging) return;
        const currentX = (e.type === 'touchmove') ? e.touches[0].clientX : e.clientX;
        const tx = currentX - startX;
        
        if (Math.abs(tx) > 6) dragMoved = true;
        track.style.transform = `translateX(${prevTranslate + tx}px)`;
    };

    const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        if (dragMoved) {
            const { step } = getCardMetrics();
            const currentX = (e.type === 'touchend') ? e.changedTouches[0].clientX : e.clientX;
            const movedBy = currentX - startX;
            
            if (movedBy < -step / 4) {
                currentIndex++;
            } else if (movedBy > step / 4) {
                currentIndex--;
            }
        }
        setPositionByIndex(true);
    };

    // Desktop pointer events
    track.addEventListener('mousedown', startDrag);
    track.addEventListener('mousemove', moveDrag);
    track.addEventListener('mouseup', endDrag);
    track.addEventListener('mouseleave', endDrag);

    // Mobile touch events
    track.addEventListener('touchstart', startDrag);
    track.addEventListener('touchmove', moveDrag);
    track.addEventListener('touchend', endDrag);

    // Recalculate track position instantly if window viewport alterations occur
    window.addEventListener('resize', () => setPositionByIndex(false));
    
    // Safety buffer timeout initialization
    setTimeout(() => setPositionByIndex(false), 50);
});
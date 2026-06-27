document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.menu-card-item');

    cards.forEach(card => {
        // Click to expand
        card.addEventListener('click', (e) => {
            if (e.target.closest('.close-overlay-btn')) return;
            if (card.classList.contains('is-expanded')) return;

            // Close others
            cards.forEach(other => {
                if (other !== card) other.classList.remove('is-expanded');
            });

            card.classList.add('is-expanded');
            
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        });

        // Close button - use event delegation for reliability
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-overlay-btn') || 
                e.target.closest('.close-overlay-btn')) {
                
                e.stopImmediatePropagation(); // Stronger stop
                e.preventDefault();
                
                card.classList.remove('is-expanded');
                
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    });
});
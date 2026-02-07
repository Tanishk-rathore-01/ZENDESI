'use strict';

function initExplorePage() {
    const input = document.getElementById('destination-search');
    const clearBtn = document.getElementById('clear-search');
    const grid = document.getElementById('places-grid');

    if (!input || !grid) return;

    const cards = Array.from(grid.querySelectorAll('.place-card'));

    function applyFilter() {
        const query = input.value.trim().toLowerCase();

        let visibleCount = 0;
        cards.forEach(card => {
            const haystack = (card.dataset.search || card.textContent || '').toLowerCase();
            const isMatch = !query || haystack.includes(query);
            card.style.display = isMatch ? '' : 'none';
            if (isMatch) visibleCount++;
        });

        grid.classList.toggle('is-filtered', input.value.trim().length > 0);
        grid.dataset.results = String(visibleCount);
    }

    input.addEventListener('input', applyFilter);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            input.focus();
            applyFilter();
        });
    }

    applyFilter();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExplorePage);
} else {
    initExplorePage();
}


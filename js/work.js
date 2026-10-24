const filters = document.querySelector('.work-filters');

if (filters) {
    const filterButtons = filters.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('.work-card[data-category]');
    const status = document.querySelector('.filter-status');

    filters.hidden = false;

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const category = button.dataset.filter;
            let visibleCount = 0;

            filterButtons.forEach((filterButton) => {
                filterButton.setAttribute('aria-pressed', String(filterButton === button));
            });

            cards.forEach((card) => {
                const isVisible = category === 'all' || card.dataset.category === category;
                card.hidden = !isVisible;
                visibleCount += Number(isVisible);
            });

            if (status) {
                status.textContent = `${visibleCount} ${visibleCount === 1 ? 'concept' : 'concepts'} shown.`;
            }
        });
    });
}

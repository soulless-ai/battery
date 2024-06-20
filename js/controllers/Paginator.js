export class Paginator {
    constructor(items, itemsPerPage) {
        this.items = items;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 0;
        this.container = document.createElement('div');
        this.container.classList.add('paginator-container');
        this.render();
    }

    nextPage() {
        if (this.hasNextPage()) {
            this.currentPage++;
            this.render();
        }
    }

    prevPage() {
        if (this.hasPrevPage()) {
            this.currentPage--;
            this.render();
        }
    }

    hasNextPage() {
        return this.currentPage < this.getTotalPages() - 1;
    }

    hasPrevPage() {
        return this.currentPage > 0;
    }

    getTotalPages() {
        return Math.ceil(this.items.length / this.itemsPerPage);
    }

    goToPage(pageNumber) {
        this.currentPage = pageNumber;
        this.render();
    }

    render() {
        this.container.innerHTML = ''; // Clear container

        const totalPages = this.getTotalPages();
        for (let i = 0; i < totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i + 1;
            button.addEventListener('click', () => this.goToPage(i));
            if (i === this.currentPage) {
                button.classList.add('active');
            }
            this.container.appendChild(button);
        }

        // Add navigation buttons if there are multiple pages
        if (totalPages > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Prev';
            prevButton.addEventListener('click', () => this.prevPage());
            this.container.prepend(prevButton);

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => this.nextPage());
            this.container.appendChild(nextButton);
        }

        // Render currentPageItems on the page
    }
}

// Usage
const itemsPerPage = 10;
const paginator = new Paginator(items, itemsPerPage);

// Append paginator container to DOM
document.body.appendChild(paginator.container);
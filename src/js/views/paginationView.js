import icons from 'url:../../img/icons.svg' // Parcel 2
import View from './View.js';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;

            // const goToPage = btn.dataset['goto'];
            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        })
    }

    // CHALLENGE: Create a function (_generateMarkupButton) to refactor the code below

    _generateMarkupButton(page, dir, arrow) {
        // Take in the page number, direction, and arrow
        const markup = `
            <button data-goto="${page}" class="btn--inline pagination__btn--${dir}">
                <span>Page ${page}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-${arrow}"></use>
                </svg>
            </button>
        `;
        return markup;
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);
        // Page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return this._generateMarkupButton((curPage + 1), 'next', 'right');
            // return `
            //     <button class="btn--inline pagination__btn--next">
            //         <span>Page ${curPage + 1}</span>
            //         <svg class="search__icon">
            //         <use href="${icons}#icon-arrow-right"></use>
            //         </svg>
            //     </button>
            // `;
        }

        // Last page
        if (curPage === numPages && numPages > 1) {
            return this._generateMarkupButton((curPage - 1), 'prev', 'left');
        //     return `
        //         <button class="btn--inline pagination__btn--prev">
        //             <svg class="search__icon">
        //             <use href="${icons}#icon-arrow-left"></use>
        //             </svg>
        //             <span>Page ${curPage - 1}</span>
        //         </button>
        //   `;
        }

        // Other page
        if (curPage < numPages) {
            return `${this._generateMarkupButton((curPage - 1), 'prev', 'left')}
            ${this._generateMarkupButton((curPage + 1), 'next', 'right')}`;
            // return `
            //     <button class="btn--inline pagination__btn--prev">
            //         <svg class="search__icon">
            //         <use href="${icons}#icon-arrow-left"></use>
            //         </svg>
            //         <span>Page ${curPage - 1}</span>
            //     </button>
            //     <button class="btn--inline pagination__btn--next">
            //         <span>Page ${curPage + 1}</span>
            //         <svg class="search__icon">
            //         <use href="${icons}#icon-arrow-right"></use>
            //         </svg>
            //     </button>
            // `;
        }

        // Page 1, and there are no other pages
        return '';
    }
};

export default new PaginationView();
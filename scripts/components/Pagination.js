import {
    paginationEl,
    paginationBtnNextEl,
    paginationBtnBackEl,
    paginationNumberNextEl,
    paginationNumberBackEl,
    state,
    ITEM_SIZE_PER_PAGE,
    numberEl
} from '../globals.js';

import { renderJobList } from './JobList.js';

const renderPagingBtn = () => {
    if (state.currentPage >= 2) {
        paginationBtnBackEl.classList.remove("pagination__button--hidden");
    }
    else {
        paginationBtnBackEl.classList.add("pagination__button--hidden");
    };
    if ((Number(numberEl.textContent) - state.currentPage * ITEM_SIZE_PER_PAGE) <= 0) {
        paginationBtnNextEl.classList.add("pagination__button--hidden");
    }
    else {
        paginationBtnNextEl.classList.remove("pagination__button--hidden");
    };
    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;

    paginationBtnNextEl.blur();
    paginationBtnBackEl.blur();

};

const pagingClickHandler = event => {
    const pagingBtn = event.target.closest(".pagination__button");

    if (!pagingBtn) return;

    const nextPage = pagingBtn.className.includes("--next") ? true : false;

    if (state.searchJobItems.length > 0) {
        nextPage ? state.currentPage++ : state.currentPage--;

        renderPagingBtn();
        renderJobList();
    };
};

paginationEl.addEventListener('click', pagingClickHandler);

export default renderPagingBtn;
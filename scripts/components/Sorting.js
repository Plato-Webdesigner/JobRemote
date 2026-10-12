import {
    sortingEl,
    sortingBtnRelevantEl,
    sortingBtnRecentEl,
    state,
} from '../globals.js';
import { renderJobList } from './JobList.js';
import renderPagingBtn from './Pagination.js';

// Create a handler for sorting element
const sortingClickHandler = event => {
    // Access to current sorting button
    const clickedButton = event.target.closest(".sorting__button");

    // Exit if clicked button not equal to sorting button
    if (!clickedButton) return;

    state.currentPage = 1;
    renderPagingBtn();

    // Access to select sorting button
    const recent = clickedButton.className.includes("--recent") ? true : false;

    if (recent) {
        state.searchJobItems.sort((a, b) => {
            return a.daysAgo - b.daysAgo;
        });
        renderJobList();
        sortingBtnRecentEl.classList.add("sorting__button--active");
        sortingBtnRelevantEl.classList.remove("sorting__button--active");
    }
    else {
        state.searchJobItems.sort((a, b) => {
            return b.relevanceScore - a.relevanceScore;
        });
        renderJobList();
        sortingBtnRelevantEl.classList.add("sorting__button--active");
        sortingBtnRecentEl.classList.remove("sorting__button--active");
    };

};

// Add event to sorting element
sortingEl.addEventListener('click', sortingClickHandler);

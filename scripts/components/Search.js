import {
    sortingBtnRelevantEl,
    sortingBtnRecentEl,
    searchFormEl,
    searchInputEl,
    state
} from '../globals.js';
import { getJobsSearchApi } from './JobList.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderPagingBtn from './Pagination.js';


// Search component
const submitHandler = event => {
    event.preventDefault();

    // Get input search text
    let searchText = searchInputEl.value;

    if (state.searchJobItems.length > 0) {
        state.currentPage = 1;
        renderPagingBtn();
    };

    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");

    // Validation
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError("Your search text may not contain number!");
        return;
    }

    searchInputEl.blur()
    renderSpinner("search");
    getJobsSearchApi(searchText);
};

// Add a submit event to search form element
searchFormEl.addEventListener("submit", submitHandler);


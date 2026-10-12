import {
    jobListSearchEl,
    numberEl,
    BASE_API_URL,
    getData,
    state,
    ITEM_SIZE_PER_PAGE,
    jobListBookmarksEl
} from '../globals.js'
import renderSpinner from './Spinner.js';

// Create a render job list
export function renderJobList(whichJobList = "search") {
    const jobListEl = whichJobList == "search" ? jobListSearchEl : jobListBookmarksEl;
    jobListEl.innerHTML = "";
    let jobItems;
    if (whichJobList == "search") {
        jobItems = state.searchJobItems.slice(state.currentPage * ITEM_SIZE_PER_PAGE - ITEM_SIZE_PER_PAGE, state.currentPage * ITEM_SIZE_PER_PAGE);
    }
    else {
        jobItems = state.bookmarkJobItems;
    };
    jobItems.forEach(jobItem => {
        let jobItemHtml = `
            <li class="job-item ${state.activeJobItem.id == jobItem.id ? 'job-item--active' : ''}">
                <a class="job-item__link" href="${jobItem.id}">
                    <div class="job-item__badge ${whichJobList != "search" ? 'jobItem__badge--bookmarks' : ''}">${jobItem.badgeLetters}</div>
                    <div class="job-item__middle">
                        <h3 class="third-heading ${whichJobList != "search" ? 'jobItem__title--bookmarks' : ''}">${jobItem.title}</h3>
                        <p class="job-item__company ${whichJobList != "search" ? 'jobItem__company--bookmarks' : ''}">${jobItem.company}</p>
                        <div class="job-item__extras">
                            <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                        </div>
                    </div>
                    <div class="job-item__right">
                        <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some(b => b.id === jobItem.id) ? 'job-item__bookmark-icon--bookmarked' : ''}"></i>
                        <time class="job-item__time">${jobItem.daysAgo}d</time>
                    </div>
                </a>
            </li>
            `;
        jobListEl.insertAdjacentHTML("beforeend", jobItemHtml);
    });
};

// Created a getter job api function for search component
export async function getJobsSearchApi(searchText) {
    try {
        const jobsData = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

        // Jobs
        const { jobItems } = jobsData;

        // UPDATE STATE
        state.searchJobItems = jobItems;

        renderSpinner("search");

        numberEl.textContent = state.searchJobItems.length;

        renderJobList();

    }
    catch (error) {
        console.log(`We encountered with this ${error}`);
    };
};

export const bookmarkEventHandler = event => {
    event.preventDefault();

    const bookmarkIcon = event.target.closest(".job-item__bookmark-icon");
    const jobItemEl = event.target.closest(".job-item");
    const jobId = jobItemEl.children[0].getAttribute("href");
    const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
    state.activeJobItem = allJobItems.find(jobItem => jobItem.id == jobId);
    
    if (!bookmarkIcon) return;

    if (state.bookmarkJobItems.some(bookmark => bookmark.id == state.activeJobItem.id)) {
        state.bookmarkJobItems = state.bookmarkJobItems.filter(b => b.id != state.activeJobItem.id);
    }
    else {
        state.bookmarkJobItems.push(state.activeJobItem);
    };

    // Local storage
    localStorage.setItem("bookmarkJobItems", JSON.stringify(state.bookmarkJobItems));

    bookmarkIcon.classList.toggle("job-item__bookmark-icon--bookmarked");
    renderJobList("bookmarks");
    renderJobList("search");

};

jobListSearchEl.addEventListener("click", bookmarkEventHandler)
import {
    state,
    bookmarksBtnEl,
    jobListBookmarksEl,
    jobDetailsEl
} from '../globals.js';
import { renderJobList } from './JobList.js';
import { bookmarkEventHandler } from './JobList.js';

const clickHandler = event => {
    if (!event.target.className.includes("bookmark")) return;

    if (state.bookmarkJobItems.some(bookmark => bookmark.id == state.activeJobItem.id)) {
        state.bookmarkJobItems = state.bookmarkJobItems.filter(b => b.id != state.activeJobItem.id);
    }
    else {
        state.bookmarkJobItems.push(state.activeJobItem);
    };

    // Local storage
    localStorage.setItem("bookmarkJobItems", JSON.stringify(state.bookmarkJobItems));

    document.querySelector(".job-info__bookmark-icon").classList.toggle("job-info__bookmark-icon--bookmarked");
    renderJobList("bookmarks");
    renderJobList("search");
};

const mouseEnterHandler = () => {
    bookmarksBtnEl.classList.add("bookmarks-btn--active");
    jobListBookmarksEl.classList.add("job-list--visible");
};

const mouseLeaveHandler = () => {
    bookmarksBtnEl.classList.remove("bookmarks-btn--active");
    jobListBookmarksEl.classList.remove("job-list--visible");
};

jobListBookmarksEl.addEventListener("click", bookmarkEventHandler)
jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
bookmarksBtnEl.addEventListener("mouseleave", mouseLeaveHandler);

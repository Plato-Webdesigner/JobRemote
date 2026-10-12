import {
    jobDetailsContentEl,
    state,
    BASE_API_URL,
    getData,
} from '../globals.js';
import getJobsDetailsApi from './JobDetails.js';
import renderSpinner from './Spinner.js';
import {renderJobList} from './JobList.js';

const loadHandler = async () => {
    const id = location.hash.substring(1);

    if (id) {  
        jobDetailsContentEl.innerHTML = '';
        renderSpinner("details");
        getJobsDetailsApi(id);
    }

    renderJobList("bookmarks");
};

window.addEventListener("DOMContentLoaded", loadHandler);
window.addEventListener("hashchange", loadHandler);
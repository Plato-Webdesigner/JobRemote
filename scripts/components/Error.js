import {
    DEFAULT_DISPLAY_TIME,
    errorEl,
    errorTextEl
} from '../globals.js';

const renderError = (message= "Something went wrong!") => {
    errorTextEl.textContent = message;
    errorEl.classList.add("error--visible");
    setTimeout(() => errorEl.classList.remove("error--visible"),
    DEFAULT_DISPLAY_TIME
    );
};

export const fetchError = (message= "Something went wrong!") => {
    const fetchErr = new Error(message);
    return fetchErr;
};

export default renderError;
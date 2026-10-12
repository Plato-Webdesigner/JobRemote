import {
    spinnerSearchEl,
    spinnerJobDetailsEl
} from '../globals.js';

const renderSpinner = whichSpinner => {
    const spinnerEl = whichSpinner === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
    spinnerEl.classList.toggle("spinner--visible");
};

export default renderSpinner;
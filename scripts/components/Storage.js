import {
    state
} from '../globals.js';

const storageJobItems = localStorage.getItem("bookmarkJobItems");

if (storageJobItems) {
    state.bookmarkJobItems = JSON.parse(storageJobItems);
}
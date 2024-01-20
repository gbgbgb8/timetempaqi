import { initDisplayControl } from './displayControl.js';
import { initEventHandlers } from './eventHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
    initDisplayControl();
    initEventHandlers();
});

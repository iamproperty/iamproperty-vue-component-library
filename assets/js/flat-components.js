// @ts-nocheck
// Modules
import * as helpers from '../js/modules/helpers.js';
import nav from '../js/modules/nav.js';
import table from '../js/modules/table.js';
import accordion from './modules/accordion.js';
import testimonial from '../js/modules/testimonial.js';
import carousel from '../js/modules/carousel.js';
import form from '../js/modules/form.js';
import youtubeVideo from '../js/modules/youtubevideo.js';
import modal from '../js/modules/modal.js';
// Attach classes to dom elements
document.addEventListener("DOMContentLoaded", function () {
    // Global stuff
    helpers.addBodyClasses(document.body);
    helpers.addGlobalEvents(document.body);
    helpers.checkElements(document.body);
    // ANav
    Array.from(document.querySelectorAll('.nav')).forEach((arrayElement) => {
        nav(arrayElement);
    });
    // Advanced tables
    Array.from(document.querySelectorAll('.table__wrapper')).forEach((arrayElement) => {
        table(arrayElement);
    });
    // Accordions
    Array.from(document.querySelectorAll('.accordion')).forEach((arrayElement) => {
        accordion(arrayElement);
    });
    // Testimonial
    Array.from(document.querySelectorAll('.testimonial')).forEach((arrayElement) => {
        testimonial(arrayElement);
    });
    // Carousel
    Array.from(document.querySelectorAll('.carousel')).forEach((arrayElement) => {
        carousel(arrayElement);
    });
    // Form
    Array.from(document.querySelectorAll('form')).forEach((arrayElement) => {
        form(arrayElement);
    });
    // Modal
    Array.from(document.querySelectorAll('.modal')).forEach((arrayElement) => {
        modal(arrayElement);
    });
    // YouTube videos
    Array.from(document.querySelectorAll('.youtube-embed')).forEach((arrayElement) => {
        new youtubeVideo(arrayElement);
    });
    window.addEventListener('hashchange', function () {
        const hash = location.hash.replace('#', '');
        const label = document.querySelector(`label[for="${hash}"]`);
        if (label instanceof HTMLElement)
            label.click();
    }, false);
});

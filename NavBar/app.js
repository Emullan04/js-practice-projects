//toggle - toggle adding the show links to the Class List

const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function() {
    links.classList.toggle('show-links');
});
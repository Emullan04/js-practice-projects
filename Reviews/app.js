//local reviews 
const reviews = [{
        id: 1,
        name: 'Susan Smith',
        job: 'Front End Developer',
        img: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatibus temporibus ipsa debitis explicabo id? Excepturi ducimus vel nihil commodi.'
    },
    {
        id: 2,
        name: 'Edna Edison',
        job: 'Back End developer',
        img: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique iure cum delectus quia, exercitationem impedit quibusdam illo non fugiat nam!'
    },
    {
        id: 3,
        name: 'Peter Peterson',
        job: 'QA Analyst',
        img: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nemo culpa ipsum. Et expedita tempore unde magni saepe.'
    },
    {
        id: 4,
        name: 'Xander Xavier',
        job: 'DevOps',
        img: 'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg',
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel voluptatem nemo facere odit incidunt cupiditate numquam ad maxime sapiente minima suscipit illum blanditiis soluta labore repudiandae eius, temporibus quos nisi. Quisquam.'
    },
];

//select items
const img = document.getElementById('person-img');
const author = document.getElementById('author');
const job = document.getElementById('job');
const info = document.getElementById('info');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const randomBtn = document.querySelector('.random-btn');

// set starting item
let currentItem = 0;

//load initial item 
window.addEventListener('DOMContentLoaded', function() {
    showPerson();
});

// show person based on item

function showPerson() {
    const item = reviews[currentItem];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

//show next person
nextBtn.addEventListener('click', function() {
    currentItem++;
    if (currentItem > reviews.length - 1) {
        currentItem = 0;
    };
    showPerson(currentItem);
});

//show previous person
prevBtn.addEventListener('click', function() {
    currentItem--;
    if (currentItem < 0) {
        currentItem = reviews.length - 1;
    }
    showPerson(currentItem);
});

//select random person
randomBtn.addEventListener('click', function() {
    const randomNumber = Math.floor(Math.random() * reviews.length);
    currentItem = randomNumber;
    showPerson(currentItem);
});
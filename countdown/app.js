const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
//setting up future date value for atleast 10 days away
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 00)
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();

const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday} ${month} ${date} ${year} ${hours}:${minutes}pm`;

//countdown timer
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;

    // values in ms
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMin = 60 * 1000;
    const oneSec = 1000;
    let days = Math.floor(t / oneDay);
    let hours = Math.floor((t % oneDay) / oneHour);
    let mins = Math.floor((t % oneHour) / oneMin);
    let secs = Math.floor((t % oneMin) / oneSec);

    //add zero in front if value is less than 10
    function format(item) {
        if (item < 10) {
            return `0${item}`;
        }
        return item;
    }

    //set up items array
    const values = [days, hours, mins, secs];
    items.forEach(function(item, index) {
        item.innerHTML = values[index];
    });
    if (t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h5 class ="expired">Sorry this giveaway has expired! </h5>`;
    }
}
//countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
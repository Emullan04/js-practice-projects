// Solution 1: using selectors inside the element

//
const questions = document.querySelectorAll('.question');

questions.forEach(function(question) {
    const btn = question.querySelector('.question-btn')
    btn.addEventListener('click', function() {
        questions.forEach(function(item) {
            if (item !== question) {
                item.classList.remove('show-text');
            }
        })
        question.classList.toggle('show-text');
    })
});

// // Solution #2: traversing the DOM (not as effective)

// //select all buttons 
// const btns = document.querySelectorAll('.question-btn');

// //set up Event Listener for all buttons, find parent element, and toggle classlist for parent
// btns.forEach(function(btn) {
//     btn.addEventListener('click', function(e) {
//         const question = e.currentTarget.parentElement.parentElement;
//         question.classList.toggle('show-text');
//     });
// });
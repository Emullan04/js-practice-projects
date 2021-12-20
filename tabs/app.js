const about = document.querySelector('.about');
const tabBtn = document.querySelectorAll('.tab-btn');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', function(e) {
    const id = e.target.dataset.id;
    if (id) {
        //remove active class from other btns
        tabBtn.forEach(function(btn) {
            btn.classList.remove('active');
            e.target.classList.add('active');
        });
        // hide all articles
        articles.forEach(function(article) {
            article.classList.remove('active');
        });
        const articleId = document.getElementById(id);
        articleId.classList.add('active');
    }
});
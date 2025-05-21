
const row = document.getElementById("movie-row");
const loadMoreBtn = document.getElementById("load-more-btn");

//overview가 있는 영화만 
const allMovie = movieList.results.filter(movie => movie.overview);
let currentIndex = 0; //지금까지 몇개의 카드를 보여줬고
const moviePrePage = 8;//한번에 몇개씩 보여줄지
function rederMovie () {
    const nextMovie = allMovie.slice(currentIndex, currentIndex + moviePrePage);

    nextMovie.forEach(movie => {
        const col = document.createElement('div');
        col.classList.add('col-3');
        col.classList.add('custom-col-margin');

        const card = document.createElement('div');
        card.classList.add('card','custom-movie-list');
        card.style.width = '18rem';

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.textContent = movie.title;

        const p = document.createElement('p');
        p.classList.add('card-text', 'custom-card-text');
        p.textContent = movie.overview;

        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
    });

    currentIndex += moviePrePage;

    if (currentIndex >= allMovie.length) {
        loadMoreBtn.style.display = 'none';
    }

}

window.onload = () => {
    rederMovie();//moviesPrePage에서 설정한 8개가 자동 렌더링
}

loadMoreBtn.addEventListener('click', () => {
    rederMovie();//currentIndex += moviePrePage
});
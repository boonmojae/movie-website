import {movieList} from './movieList.js';

import {genres} from './genres.js';

const row = document.getElementById("movie-row");
const renderBtn = document.getElementById("load-more-btn");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const allMovie = movieList.results.filter(movie => movie.overview);

// 현재 렌더링 인덱스
let currentIndex = 0;
// 한 번에 보여줄 개수
const moviesPerPage = 8;
// 현재 선택된 장르 ID
let selectedGenreId = null;
// 현재 검색어
let searchKeyword = '';

function renderMovies() {
  // 현재 조건에 맞는 영화 필터링
  const movieListToShow = movieList.results.filter(movie => {
    if (!movie.overview) return false;

    if (selectedGenreId && !movie.genre_ids.includes(selectedGenreId)) return false;

    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      const inTitle = movie.title?.toLowerCase().includes(keyword);
      if (!inTitle) return false;
    }

    return true;
  });

  // 한 번에 보여줄 영화
  const nextMovies = movieListToShow.slice(currentIndex, currentIndex + moviesPerPage);

  // 영화 목록
  nextMovies.forEach(movie => {
    const col = document.createElement('div');
    col.classList.add('col-3', 'custom-col-margin');
  
    //쿼리
    const link = document.createElement('a');
    link.href = `movieInfo.html?id=${movie.id}`;
    link.style.textDecoration = 'none';
    link.style.color = 'inherit';
    link.style.display = 'block';
  
    //영화 목록 리스트
    const card = document.createElement('div');
    card.classList.add('card', 'custom-movie-list');
    card.style.width = '18rem';
    card.style.cursor = 'pointer';
  
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
  
    
    link.appendChild(card);
    col.appendChild(link);
    row.appendChild(col);
  });
  
  currentIndex += moviesPerPage;
  
  const remaining = movieListToShow.length - currentIndex;
  renderBtn.style.display = remaining > 0 ? 'block' : 'none';
  
}


function clearMovies() {
  row.innerHTML = '';
  currentIndex = 0;
}

document.querySelectorAll('.custom-category-btn-pink-outline').forEach(button => {
  button.addEventListener('click', () => {
    const genreName = button.dataset.genre;//data-genre의 값을 가져옴
    const genreObj = genres.find(g => g.name === genreName);
    if (!genreObj) return;

    const genreId = genreObj.id;

    document.querySelectorAll('.custom-category-btn-pink-outline').forEach(btn =>
      btn.classList.remove('custom-category-btn-pink-outline-a')
    );

    if (selectedGenreId === genreId) {
      selectedGenreId = null;
    } else {
      selectedGenreId = genreId;
      button.classList.add('custom-category-btn-pink-outline-a');
    }

    //선택 장르 바뀌면 지우고
    clearMovies();
    //다시 렌더링
    renderMovies();
  });
});

renderBtn.addEventListener('click', () => {
  renderMovies();
});

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchKeyword = searchInput.value.trim();
  clearMovies();
  renderMovies();
});

window.onload = () => {
  renderMovies();

  const path = window.location.pathname;
  if (path.includes("search.html")) {
    const searchNavItem = document.querySelector(".custom-headerItem1");
    if (searchNavItem) {
      searchNavItem.classList.add("custom-headerItem1-a");
    }
  }
};

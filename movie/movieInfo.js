import {movieList} from './movieList.js';

import {genres} from './genres.js'

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = parseInt(params.get("id")); // URL에서 영화 ID 가져옴

    if (movieId) {
        const movie = movieList.results.find(m => m.id === movieId);

        if (movie) {
            document.querySelector(".background-poster-id").style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')`;
            document.querySelector(".title").textContent = movie.title;
            document.querySelector(".release-date").textContent = `개봉일: ${movie.release_date}`;
            document.querySelector(".overview").textContent = movie.overview;
            // document.querySelector(".vote").textContent = `평점: ${movie.vote_average}`;
            document.querySelector(".poster").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            const genreNames = movie.genre_ids
                .map(id => {
                    const genre = genres.find(g => g.id === id);
                    return genre ? genre.name : null;
                })
                .filter(name => name !== null);

            const genreContainer = document.querySelector(".genre");

            genreContainer.innerHTML = genreNames
                .map(name => `<span class="genre-badge">${name}</span>`)
                .join(" ");
        } else {
            document.querySelector(".title").textContent = "해당 영화 정보를 찾을 수 없습니다.";
        }
    } else {
        document.querySelector(".title").textContent = "영화 ID가 제공되지 않았습니다.";
    }

    const path = window.location.pathname;
    if (path.includes("movieInfo.html")) {
        const movieNavItem = document.querySelector(".custom-headerItem2");
        if (movieNavItem) {
            movieNavItem.classList.add("custom-headerItem2-a");
        }
    }
};

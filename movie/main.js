import {movieList} from './movieList.js';

window.onload = function () {
    const container = document.getElementById("image-container");

    const poster = movieList.results.filter(movie => movie.poster_path);

    const shuffledPosters = shuffle([...poster]);

    const imageSources = shuffledPosters.slice(0, 24).map(movie => 
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    );


    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    for (let i = 0; i < imageSources.length; i++) {
        const img = document.createElement('img');
        const src = imageSources[i];

        const size = Math.floor(Math.random() * 100) + 50;
        const left = Math.floor(Math.random() * (containerWidth - size));
        const top = Math.floor(Math.random() * (containerHeight - size));

        img.src = src;
        img.className = 'random-img'; //classList.add
        img.style.width = `${size}px`;
        img.style.height = `auto`;
        img.style.left = `${left}px`;
        img.style.top = `${top}px`;

        container.appendChild(img);
    }

    function shuffle(array) {
        for (let i = array.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};
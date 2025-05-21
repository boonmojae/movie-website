window.onload = function () {
    const row = document.querySelector('.row');

    movieList.results.forEach(movie => {
        const col = document.createElement('div');
        col.classList.add('col-3');
        col.classList.add('custom-col-margin');


        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('custom-movie-list');//공백 들어가면 안됨
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

        if (!movie.overview) return;
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
     
};
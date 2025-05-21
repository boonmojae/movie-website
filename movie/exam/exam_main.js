//main page 랜덤 이미지


//html과 이미지 등 모든 요소가 완전히 로드된 다음 실행
window.onload = function () {
    
    //이미지가 들어갈 공간 가져오기
    const container = document.getElementById("image-container");

    //포스터 있는 영화만 필터링
    const poster = movieList.results.filter(movie => movie.poster_path);

    //포스터 목록 무작위로 섞기
    //shuffle() => 무작위로 순서를 만들어 중복 없이 랜덤하게 사용
    const shuffledPosters = shuffle([...poster]);

    //섞여있는 shuffledPosters 배열에서 앞 26개를 선택
    //slice => 0 ~ 25
    const imageSources = shuffledPosters.slice(0, 26).map(movie =>
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    );

    //container의 가로.세로 크기 가져오기
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    //랜덤 크기 정하기
    for (let i = 0; i < imageSources.length; i++) {
        const img = document.createElement('img');
        const src = imageSources[i];

        const size = Math.floor(Math.random() * 100) + 50; // 50~150px
        const left = Math.floor(Math.random() * (containerWidth - size));
        const top = Math.floor(Math.random() * (containerHeight - size));

        // Math.random() → 0 이상 1 미만의 랜덤한 소수 생성 (예: 0.712)
        // * 100 → 0 ~ 99.999...
        // Math.floor() → 소수점 버림 → 0 ~ 99
        // + 50 → 최종 결과는 50 ~ 149 사이의 정수
        // 📌 이유:
        // → 우리는 너무 작은 크기(0~49)는 보기 어려우니까,
        // 최소 50px, 최대 149px의 이미지 크기를 원한 거예요!


        //container안에서 랜덤 위치 정하기
        img.src = src;
        img.className = 'random-img';
        //classList.add와 다름
        img.style.width = `${size}px`;
        img.style.height = 'auto';
        img.style.left = `${left}px`;
        img.style.top = `${top}px`;

        container.appendChild(img);
    }

    //Fisher-Yates 알고리즘이라는 공식적인 랜덤 셔플
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

};
window.onload = () => {
    // 현재 경로가 about.html일 경우, 메뉴 강조
    const path = window.location.pathname;
    if (path.includes("about.html")) {
        const aboutNavItem = document.querySelector(".custom-headerItem3");
        if (aboutNavItem) {
            aboutNavItem.classList.add("custom-headerItem3-a");
        }
    }

    // 마우스 따라 별 생성
    const main = document.querySelector("main");
    let lastSpawnTime = 0;

    main.addEventListener("mousemove", (e) => {
        const now = Date.now();
        if (now - lastSpawnTime < 30) return;
        lastSpawnTime = now;

        const star = document.createElement("div");
        star.className = "star";

        const rect = main.getBoundingClientRect();
        star.style.left = `${e.clientX - rect.left}px`;
        star.style.top = `${e.clientY - rect.top}px`;

        main.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 1000);
    });

    // 파이 차트 생성
    const chartCanvas = document.getElementById("pie-chart");
    if (chartCanvas) {
        new Chart(chartCanvas, {
            type: 'pie',
            data: {
                labels: ["SF", "Adventure", "Action"],
                datasets: [{
                    label: "Favorite movie genre",
                    backgroundColor: ["rgb(255, 74, 246)", "rgb(98, 255, 74)", "rgb(74, 228, 255)"],
                    data: [40, 33, 22]
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Favorite movie genre'
                }
            }
        });
    }

};




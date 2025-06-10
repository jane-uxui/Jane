document.addEventListener('DOMContentLoaded', function () {
    const logo = document.getElementById('logo');
    const initialFontSize = parseInt(window.getComputedStyle(logo).fontSize);
    const minFontSize = 30;

    let initialRect = logo.getBoundingClientRect();
    let initialTop = initialRect.top + window.scrollY;

    function onScroll() {
        const scrollY = window.scrollY;
        const stickPoint = window.innerHeight * 0.03;

        // 폰트 크기 계산
        const newFontSize = Math.max(initialFontSize - scrollY * 0.5, minFontSize);
        logo.style.fontSize = newFontSize + 'px';

        // 로고의 현재 top(스크롤 반영)
        const logoCurrentTop = initialTop - scrollY;

        // 두 조건을 모두 만족할 때만 고정
        if (newFontSize <= minFontSize && logoCurrentTop <= stickPoint) {
            logo.classList.add('logo-fixed');
            logo.style.fontSize = null; // 클래스에서 30px 적용
            logo.style.transform = null;
        } else {
            logo.classList.remove('logo-fixed');
            logo.style.transform = 'translate(-50%, -50%)';
        }

        // 스크롤 맨 위로 올리면 초기화
        if (scrollY === 0) {
            logo.classList.remove('logo-fixed');
            logo.style.fontSize = initialFontSize + 'px';
            logo.style.transform = 'translate(-50%, -50%)';
        }
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', function () {
        initialRect = logo.getBoundingClientRect();
        initialTop = initialRect.top + window.scrollY;
        onScroll();
    });
    onScroll();
});

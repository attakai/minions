// loader
const loader = document.getElementById('loader');
setTimeout(() => {
    loader.classList.add('loaded'); // loaderにloaded追加　2000ミリ秒後
    setTimeout(() => {
        loader.style.display = "none"; // loaderにdisplay: none; 2000+1000ミリ秒後
    }, 1000)
}, 2000);

const hamburger = document.querySelector('.hamburger');
const stop1 = document.querySelector('.gradientStop1');
const stop2 = document.querySelector('.gradientStop2');

hamburger.addEventListener('mouseover', function () {
    stop1.setAttribute('offset', '20%');
});
hamburger.addEventListener('mouseout', function() {
    stop1.setAttribute('offset', '85%');
});

const otherCharacters = document.querySelector('.otherCharacters');

otherCharacters.addEventListener('wheel', (event) => {
    const maxScrollLeft = otherCharacters.scrollWidth - otherCharacters.clientWidth;

    // 右端か左端に達していない場合にのみ preventDefault を呼び出す
    if (otherCharacters.scrollLeft !== maxScrollLeft && otherCharacters.scrollLeft !== 0) {
        event.preventDefault(); // デフォルトの縦スクロールを防ぐ
    }

    otherCharacters.scrollLeft += event.deltaY; // 横スクロールする
});

const otherCharactersCards = document.querySelectorAll(".otherCharacters li");

otherCharactersCards.forEach(function(card) {
    card.addEventListener('mouseenter', function () {
        const subCardh3 = card.querySelector('.desc h3');
        subCardh3.classList.add('animate');
    });

    card.addEventListener('mouseleave', function () {
        const subCardh3 = card.querySelector('.desc h3');
        subCardh3.classList.remove('animate');
    });

    card.addEventListener('mouseenter', function () {
        const subCardp = card.querySelector('.desc p');
        subCardp.classList.add('animate');
    });

    card.addEventListener('mouseleave', function () {
        const subCardp = card.querySelector('.desc p');
        subCardp.classList.remove('animate');
    });
});

// あらすじ
const prologueTexts = document.querySelectorAll('#prologue p span');
const prologueArea = document.getElementById('prologue');
const prologueImage = document.querySelector('#prologue .image');
const prologueImageTop = prologueImage.getBoundingClientRect().top + window.pageYOffset;
const prologueImageBottom = prologueImage.getBoundingClientRect().bottom;
let currentIndex = 0;
let accumulatedScroll = 0;
let isSnapped = false;

// 各spanに対応する背景スタイルを設定
const backgrounds = [
    'url(image/arasuji_1.jpg)', // 1つ目のspanに対応する背景
    'url(image/arasuji_2.jpg)', // 2つ目のspanに対応する背景
    'url(image/arasuji_3.jpg)', // 3つ目のspanに対応する背景
    'url(image/arasuji_4.jpg)', // 4つ目のspanに対応する背景
    'url(image/arasuji_5.jpg)', // 5つ目のspanに対応する背景
    'url(image/arasuji_6.jpg)', // 6つ目のspanに対応する背景
    'url(image/arasuji_7.jpg)', // 7つ目のspanに対応する背景
    // 必要に応じて追加
];

// スクロールイベントリスナー
window.addEventListener('scroll', function() {
    if (window.scrollY >= prologueImageTop - 60 && !isSnapped) {
        // スナップ処理を行う
        window.scrollTo({
            top: prologueImage.offsetTop,
            behavior: 'smooth'
        });
        isSnapped = true;
        document.body.style.overflowY = 'hidden';
    } else if (window.scrollY < prologueImageTop - 60) {
        document.body.style.overflowY = 'auto';
        isSnapped = false;
    }
    if (window.scrollY >= prologueImageTop - 300) {
        prologueArea.classList.add('show');
    } else {
        prologueArea.classList.remove('show')
    }
});

// ホイールイベントリスナー
let isScrolling = false;

window.addEventListener('wheel', function(event) {
    if (isSnapped) {
        accumulatedScroll += event.deltaY;

        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                if (Math.abs(accumulatedScroll) >= 100) {
                    if (accumulatedScroll > 0 && currentIndex < prologueTexts.length - 1) {
                        currentIndex++;
                    } else if (accumulatedScroll < 0 && currentIndex > 0) {
                        currentIndex--;
                    }

                    // すべてのspanを非表示にする
                    prologueTexts.forEach(text => text.style.display = 'none');
                    // 現在のインデックスのspanを表示
                    prologueTexts[currentIndex].style.display = 'inline';

                    // 現在のspanに対応する背景を設定
                    if (backgrounds[currentIndex]) {
                        prologueImage.style.backgroundImage = backgrounds[currentIndex];
                    }

                    // 最初のspanまたは最後のspanが表示されている場合、overflowYをautoに設定
                    if (currentIndex === 0 || currentIndex === prologueTexts.length - 1) {
                        document.body.style.overflowY = 'auto';
                    } else {
                        document.body.style.overflowY = 'hidden';
                    }

                    // スクロール量をリセット
                    accumulatedScroll = 0;
                }
                isScrolling = false;
            });
        }
    }
});

// 出現させるぞー！
const charactersMain = document.getElementById('charactersMain');
document.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    if (scrollY >= charactersMain.offsetTop - 300) {
        charactersMain.classList.add('show');
    } else {
        charactersMain.classList.remove('show');
    }
});

const charactersSub = document.getElementById('charactersSub');
document.addEventListener('scroll', function() {
    const otherCharacters = document.querySelectorAll('.otherCharacters li');
    if (scrollY >= charactersSub.offsetTop - 300) {
        charactersSub.classList.add('show');
        otherCharacters.forEach(function(otherCharacter, index) {
            setTimeout(function() {
                otherCharacter.classList.add('show');
            }, index * 50); 
        });
    } else {
        charactersSub.classList.remove('show');
        otherCharacters.forEach(function(otherCharacter, index) {
            setTimeout(function() {
                otherCharacter.classList.remove('show');
            }, index * 150); 
        });
    }
})

const prologueBg = document.querySelector('#prologue .image');
document.addEventListener('scroll', function() {
    if (scrollY >= prologueBg.offsetTop - 300) {
        prologueBg.classList.add('show');
    } else {
        prologueBg.classList.remove('show');
    }
});

const collabo = document.getElementById('collabo');
document.addEventListener('scroll', function() {
    if (scrollY >= collabo.offsetTop - 300) {
        collabo.classList.add('show');
    } else {
        collabo.classList.remove('show');
    }
});
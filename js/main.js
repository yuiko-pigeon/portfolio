
//gsapでハンバーガーメニューをふわっと出す  
const tl = gsap.timeline({ paused: true });

tl.fromTo(".p-menu", { 
    autoAlpha: 0,
    right: "-100%"},//p-menuの挙動に合わせる
    {
    autoAlpha: 1,
    duration: 1.5,
    backgroundColor: "#ffffff",
    right: "0%"
    });

//hamburgerメニューtoggle
const hamburger = document.querySelector('#js-hamburger');
const hamburgerClose = document.querySelector('#js-hamburgerClose');
const nav = document.querySelector('#js-nav');
const fix = document.querySelector('#js-wrapper');

let menuOpen = false;

hamburger.addEventListener('click',function(){
  if(!menuOpen){
    nav.classList.add('open');
    fix.classList.add('fix');
    tl.play().timeScale(1);
    
    menuOpen = true;
  }
});

hamburgerClose.addEventListener('click',function(){
  if(menuOpen){
    nav.classList.remove('open');
    fix.classList.remove('fix');
    tl.timeScale(1);
    tl.reverse();
    menuOpen = false;
  }
});

//gsap mainvisual
gsap.to(".p-hero__background", { 
    backgroundColor: "rgba(188, 186, 186, 0.8)",
    duration: 3, 
    delay: 1,
     });

console.log("GSAP running", document.querySelector("#js-title-hero"));
gsap.fromTo("#js-title-hero",{
  y : 100,
  autoAlpha: 0,
}, {
    y :0,
    duration: 5,
    //delay: 5,
    ease : "power4.out",
    autoAlpha: 1,
    });

//スクロールで要素をふわっと
document.addEventListener("DOMContentLoaded", function () {
    function onScroll() {
      document.querySelectorAll(".p-slide__in").forEach(function (element) {
        const sectionTop = element.getBoundingClientRect().top + window.scrollY;
        const windowBottom = window.scrollY + window.innerHeight;
  
        if (element.classList.contains("is-animated")) return; // すでにアニメーション済みなら挙動をスキップ
  
        if (windowBottom > sectionTop + 100) {

  console.log("アニメーション実行", element);
          gsap.to(element,{
            
              y: 0,
              delay: 0.5,
              duration: 1,
              autoAlpha: 1,
              ease: "power4.out"
            }
          );
          element.classList.add("is-animated");
        }
      });
    }
  
    onScroll();
    window.addEventListener("scroll", onScroll);
  });

//モーダル
  document.addEventListener('DOMContentLoaded', () => {

  console.log('DOMContentLoaded 発火！'); // ← これを入れて確認！
  const modalElement = document.querySelector('.p-modal__portfolio');

  let swiperInstance = null;

  document.querySelectorAll('.js-open-modal').forEach((item) => {
    item.addEventListener('click', () => {

    console.log('クリックされました', item.dataset.index);
      const idx = Number(item.getAttribute('data-index'));
      openModal(idx);
    });
  });
//ポートフォリオデータ
  const portfolioData = [
    {
      img: 'picture/noimage.jpg',
      title: '有限会社らきカンパニー',
    },
    {
      img: '/picture/noimage.jpg',
      title: '株式会社ここホーム',
    },
    {
      img: '/picture/noimage.jpg',
      title: '宮野農園',
    },
    {
      img: 'picture/noimage.jpg',
      title: 'Portfolio 4',
    },
    {
      img: '/picture/noimage.jpg',
      title: 'Portfolio 4',
    },
    {
      img: 'picture/noimage.jpg',
      title: 'Portfolio 4',
    },
  ];

//modal開閉
  document.querySelectorAll('.p-grid__cell').forEach((item, idx) => {
    console.log('クリックイベント登録', item); // ← 追加
    console.log(document.querySelectorAll('.p-grid__cell'));
    item.addEventListener('click', () => {
      console.log('クリックされました', idx);  // ここを追加
      openModal(idx);
    });
  });

  
//modal内にスライド

function openModal(startIndex) {
  console.log('モーダルを開く処理に入りました！', startIndex);
    const wrapper = document.querySelector('.swiper-wrapper');
    wrapper.innerHTML = ''; // 前回分をクリア

    portfolioData.forEach(data => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.innerHTML = `<img src="${data.img}" alt="${data.title}"><h3>${data.title}</h3>`;
      wrapper.append(slide);
    });
    modalElement.classList.add('is-open');
 
//Swiperのインスタンスをグローバル変数 swiperInstance として管理し、モーダルを閉じる際に破棄

      if (swiperInstance)swiperInstance.destroy(true,true);
      
      swiperInstance = new Swiper(".swiper", {
        loop: true,
        initialSlide: startIndex,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
}
//modal閉じ処理
document.querySelector('.p-modal__close').addEventListener('click', () => {
  modalElement.classList.remove('is-open');
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
});
  });

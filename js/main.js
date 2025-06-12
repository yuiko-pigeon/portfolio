gsap.registerPlugin(ScrollTrigger,ScrollSmoother,ScrollToPlugin)

//スムーススクロール
ScrollSmoother.create({
  smooth: 1, // スクロールのスムージング時間（秒）
  effects: true, // スクロール効果を有効にする
  smoothTouch: 0.5, // タッチデバイスでのスムージング時間
});


//gsapでハンバーガーメニューをふわっと出す  
const tl = gsap.timeline({ paused: true });

tl.fromTo(".p-menu", { 
    autoAlpha: 0,
    right: "-100%",
    },//p-menuの挙動に合わせる
    {
    autoAlpha: 1,
    duration: 1.5,
    right: "0%",
    });

//hamburgerメニューtoggle
const hamburger = document.querySelector('#js-hamburger');
const hamburgerClose = document.querySelector('#js-hamburger-close');
const closeButton = document.querySelector('#js-close-button');
const nav = document.querySelector('#js-nav');
const fix = document.querySelector('#js-wrapper');
const menuClose =document.querySelectorAll('.js-menu-close');
const scrollFix =document.querySelector('.js-fix');

tl.eventCallback("onComplete", () => {
  hamburger.style.borderRadius = '0';
});

tl.eventCallback("onReverseComplete", () => {
  hamburger.style.borderRadius = '50%';
});


let menuOpen = false;

hamburger.addEventListener('click',function(){
  if(!menuOpen){
    nav.classList.add('open');
    fix.classList.add('fix');
    scrollFix.classList.add('fix');
    hamburgerClose.style.borderRadius = '0'; 
    closeButton.classList.add('is-appear');
    tl.play().timeScale(1);
    
    ScrollSmoother.get().paused(true);

    menuOpen = true;
  }
});

hamburgerClose.addEventListener('click',function(){
  if(menuOpen){
    nav.classList.remove('open');
    fix.classList.remove('fix');
    scrollFix.classList.remove('fix');
    hamburger.style.borderRadius = '50%'; // ← 明示的に指定
    closeButton.classList.remove('is-appear');
    
    tl.timeScale(1);
    tl.reverse();

    ScrollSmoother.get().paused(false); 

    menuOpen = false;
  }
});

menuClose.forEach(function(close){
  close.addEventListener('click',function(){
    if(menuOpen){
      nav.classList.remove('open');
      fix.classList.remove('fix');
      scrollFix.classList.remove('fix');
      hamburger.style.borderRadius = '50%'; // ← 明示的に指定
      closeButton.classList.remove('is-appear');
      
      tl.timeScale(1);
      tl.reverse();

      ScrollSmoother.get().paused(false); 

      menuOpen = false;
    }
  });
});

//GSAPでスムーズスクロール
gsap.utils.toArray('a[href^="#"]').forEach(function(a) {
  a.addEventListener("click", function(e) {
    e.preventDefault();
    const target = a.getAttribute("href");
    gsap.to( window, {
      duration: 1,
      ease: 'power4.out',
      scrollTo: {
        y: target,
        autoKill: false
      }
    });
  });
}); //HTMLで<a herf="#">があるとエラーが出るので他と同様にtopなどのid名をつけて最上部に飛ばす

//gsap mainvisual
gsap.to(".p-hero__background", { 
    backgroundColor: "rgba(188, 186, 186, 0.63)",
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
              duration: 2,
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
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded 発火！');
    
    // 要素の取得
    const modalElement = document.querySelector('.p-modal__portfolio');
    const closeButton = document.querySelector('.p-modal__close');
    let swiperInstance = null;
  
    console.log('modalElement:', modalElement);
    console.log('closeButton:', closeButton);
  
    // モーダルデータ
    const portfolioDataList = [
      // hamburger (data-index="0")
      [
        {
          img: 'picture/hamburger.webp',
          title: 'Hamburger(架空)',
        },
        {
          img: 'picture/hamburger-discription.webp',
          title: 'Hamburger(架空)の詳細',
        },
      ],
      // portfolio (data-index="1")
      [
        {
          img: 'picture/portfolio.webp',
          title: 'Portfolio(架空)',
        },
        {
          img: 'picture/portfolio-discription.webp',
          title: 'Portfolio(架空)の詳細',
        },
      ],
    ];
  
    // =================================
    // モーダルを開く処理
    // =================================
    function openModal(startIndex) {
      console.log('モーダルを開く処理開始:', startIndex);
      
      // データが存在するかチェック
      if (!portfolioDataList[startIndex]) {
        console.error('指定されたインデックスのデータが存在しません:', startIndex);
        return;
      }
  
      // ScrollSmootherを停止
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.paused(true);
  
      // スライドコンテンツを作成
      const wrapper = document.querySelector('.swiper-wrapper');
      if (!wrapper) {
        console.error('swiper-wrapper が見つかりません');
        return;
      }
      
      wrapper.innerHTML = ''; // 前回分をクリア
  
      const portfolioData = portfolioDataList[startIndex];
      portfolioData.forEach(data => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = `
          <img src="${data.img}" alt="${data.title}" style="width: 100%; height: auto;">
          <h3 style="text-align: center; margin-top: 10px;">${data.title}</h3>
        `;
        wrapper.appendChild(slide);
      });
  
      // 既存のSwiperインスタンスを破棄
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
  
      // モーダルを表示
      modalElement.classList.remove('is-close'); // is-closeクラスを削除
      modalElement.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // スクロール無効化
  
      // Swiperを初期化（少し遅延させる）
      setTimeout(() => {
        swiperInstance = new Swiper(".swiper", {
          loop: false,
          initialSlide: 0,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          slidesPerView: 1,
          autoHeight: true,
          preventInteractionOnTransition: true,
          on: {
            init: function() {
              console.log('Swiper 初期化成功！');
              this.update();
              this.slideTo(0, 0);
            },
          },
        });
      }, 50); // 50ms後に初期化
    }
  
    // =================================
    // モーダルを閉じる処理
    // =================================
    function closeModal() {
      console.log('モーダルを閉じる処理開始');
      
      // モーダルを非表示
      modalElement.classList.remove('is-open');
      document.body.style.overflow = ''; // スクロール有効化
  
      // アニメーション完了後にクリーンアップ
      setTimeout(() => {
        // Swiperインスタンスを破棄
        if (swiperInstance) {
          swiperInstance.destroy(true, true);
          swiperInstance = null;
        }
        
        // スライドコンテンツをクリア
        const wrapper = document.querySelector('.swiper-wrapper');
        if (wrapper) {
          wrapper.innerHTML = '';
        }
        
        // ScrollSmootherを再開
        const smoother = ScrollSmoother.get();
        if (smoother) smoother.paused(false);
        
      }, 400); // CSSのtransition時間と合わせる
    }
  
    // =================================
    // イベントリスナーの設定
    // =================================
    
    // モーダルを開くトリガー
    document.querySelectorAll('.js-open-modal').forEach((item) => {
      console.log('クリックイベント登録:', item);
      
      item.addEventListener('click', (e) => {
        e.preventDefault(); // デフォルトの動作を防ぐ
        
        const index = parseInt(item.getAttribute('data-index'), 10);
        console.log('クリックされました。インデックス:', index);
        
        if (isNaN(index)) {
          console.error('data-index が正しく設定されていません:', item);
          return;
        }
        
        openModal(index);
      });
    });
  
    // 閉じるボタンのイベント
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    } else {
      console.error('閉じるボタンが見つかりません');
    }
  
    // 背景クリックで閉じる
    if (modalElement) {
      modalElement.addEventListener('click', (e) => {
        // モーダルの背景部分をクリックした場合のみ閉じる
        if (e.target === modalElement) {
          closeModal();
        }
      });
    }
  
    // ESCキーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalElement.classList.contains('is-open')) {
        closeModal();
      }
    });
  
    console.log('モーダル機能の初期化完了');
  });
//モーダル
//   document.addEventListener('DOMContentLoaded', () => {
//       console.log('DOMContentLoaded 発火！'); // ← これを入れて確認！
  
//     const modalElement = document.querySelector('.p-modal__portfolio');
//     let swiperInstance = null;

//       console.log('modalElement:', modalElement);

//     document.querySelectorAll('.js-open-modal').forEach((item) => {
//     item.addEventListener('click', () => {

//       console.log('クリックされました', item.dataset.index);
//       console.log('クリックイベント登録:', item);

      
//     ScrollSmoother.get().paused(true);

//     const idx = Number(item.getAttribute('data-index'));
//     openModal(idx);


//     });
//   });

// //モーダル内に２枚ずつカードを配置
//   const portfolioDataList = [
//     //hamburger
//     [
//       {
//         img: 'picture/hamburger.webp',
//         title: 'Hamburger(架空)',
//       },
//       {
//         img: 'picture/hamburger-discription.webp',
//         title: 'Hamburger(架空)の詳細',
//       },
//     ],
//     //portfolio
//     [
//       {
//         img: 'picture/portfolio.webp',
//         title: 'Portfolio(架空)',
//       },
//       {
//         img: 'picture/portfolio-discription.webp',
//         title: 'Portfolio(架空)の詳細',
//       },
//     ],
//   ];

// //modal開閉
//   // document.querySelectorAll('.p-grid__cell').forEach((item,index) => {
//   //   console.log('クリックイベント登録', item); // ← 追加
//   //   console.log(document.querySelectorAll('.p-grid__cell'));
//   //   item.addEventListener('click', () => {
//   //     console.log('クリックされました', index);  // ここを追加
//   //     openModal(index);
//   //   });
//   // });

  
// //modal内にスライド

//   function openModal(startIndex) {
//     console.log('モーダルを開く処理に入りました！', startIndex);
    
//     const wrapper = document.querySelector('.swiper-wrapper');
//     wrapper.innerHTML = ''; // 前回分をクリア

//     const portfolioData = portfolioDataList[startIndex]; // ←ここを変更

//     portfolioData.forEach(data => {
//       const slide = document.createElement('div');
//       slide.classList.add('swiper-slide');
//       slide.innerHTML = `<img src="${data.img}" alt="${data.title}"><h3>${data.title}</h3>`;
//       wrapper.append(slide);
//     });
//     modalElement.classList.add('is-open');

//     const close = document.querySelector('.p-modal__portfolio');

//     if(close.classList.contains("is-close")){
//       close.classList.remove('is-close');
//     }
  
 
// //Swiperのインスタンスをグローバル変数 swiperInstance として管理し、モーダルを閉じる際に破棄

//       if (swiperInstance)swiperInstance.destroy(true,true);
      
//       swiperInstance = new Swiper(".swiper", {
//         loop: false, // ループをオフ（必要に応じて）
//         initialSlide: 0, // 最初にスライドを0に
//         pagination: {
//           el: '.swiper-pagination',
//           clickable: true,
//         },
//         navigation: {
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         },
//         slidesPerView: 1, // 1枚ずつ表示
//         autoHeight: true, // 高さ自動調整
//         preventInteractionOnTransition: true, // トランジション中の操作防止
//         on: {
//           init:function(){
//             console.log('Swiper 初期化成功！');
//             modalElement.classList.add('is-open');
//             this.update();
//             this.slideTo(0, 0); // 強制的に1枚目に
//           },
//         },
//       });
// }
// //modal閉じ処理
// document.querySelector('.p-modal__close').addEventListener('click', () => {
//   modalElement.classList.remove('is-open');

//   // 一旦閉じるアニメーションを開始（opacity, scale）
//   setTimeout(() => {
//     modalElement.classList.add('is-close'); // ← 0.5秒後に追加して実際に非表示に
//   }, 500); // ここでCSSと合わせて遅延（transitionと同じ時間）

//   if (swiperInstance) {
//     swiperInstance.destroy(true, true);
//     swiperInstance = null;

//   }
//   const smoother = ScrollSmoother.get();
//       if (smoother) smoother.paused(false); // スクロールを再開
// });


//   });

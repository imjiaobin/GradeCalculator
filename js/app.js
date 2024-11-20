let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

// fromTo():
// 第一個參數: 要控制的對象
// 第二個參數: duration
// 第三個參數: 控制對象的原始狀態
// 第四個參數: 控制對象的結束狀態
// 第五個參數: 提早or延遲跑的時間(負值為提早)
//            這邊刻意設定第二個和第三個重疊

// 動畫控制
// 第一個from : 圖片上下打開 (heith)
// 第二個from : 圖片左右撐開到滿版, 並做到靠近的效果
// 第三個from : 控制slider完全看不到再從最左邊滑到右邊
// 第四個from : 讓整個動畫wrapper消失 (但仍未在葉面上消失, 會導致畫面按鍵無法點擊)
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  ).fromTo(animation, 0.5, { opacity:1 }, { opacity:0 })

window.setTimeout(()=>{
    animation.style.pointerEvents = "none";
},2500); // 1+1.2+0.3 秒

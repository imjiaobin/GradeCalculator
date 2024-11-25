// 功能包含 : 
    // 1. 進場動畫 
    // 2. 防止form的提交後刷新頁面
    // 3. 計算GPA
    // 4. 增行

/* ------------------------ CODE START ----------------------------*/

// #功能 1: 進場動畫
let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();
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
  )
  .fromTo(animation, 0.5, { opacity: 1 }, { opacity: 0 });

window.setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500); // 1+1.2+0.3 秒

/*--------------------------------------------------------------------------------------------------*/ 

/* #功能 2: 防止form的提交後刷新頁面 => enter 和 form submit */
// 如果是 enter被點下, 就會觸發preventDefault
document.addEventListener("keypress", (e) => {
  // console.log(e) 看一下Enter 的 key code
  if ((e.key = "Enter")) {
    e.preventDefault();
  }
});
// 防止button的提交動作
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});


/*--------------------------------------------------------------------------------------------------*/ 

// #功能 3: GPA計算 => 加權平均(取道小數第二位) => (學分 * 加權分級) / 總學分

// 加權分級 input事件綁定
let allSelects = document.querySelectorAll("select");
allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    // console.log(e.target) // 是否選到<select>
    // console.log(e.target.value); // 每次select下去的標籤的值 A+, A, A-
    setGPA(); // 計算成績
    changeGradeColor(e.target); // 更改顏色
  });
});
  // 學分 input事件綁定
let credits = document.querySelectorAll(".course-credits");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});
// 加權分級 select 的 option顏色變更
function changeGradeColor(target) {
  // 傳入 標籤

  if (target.value == "A+" || target.value == "A" || target.value == "A-") {
    target.style.background = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B+" ||
    target.value == "B" ||
    target.value == "B-"
  ) {
    target.style.background = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C+" ||
    target.value == "C" ||
    target.value == "C-"
  ) {
    target.style.background = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D+" ||
    target.value == "D" ||
    target.value == "D-"
  ) {
    target.style.background = "red";
    target.style.color = "black";
  } else {
    target.style.background = "white";
  }
}
// 計算GPA 
  // 成績轉換
function convertor(grade) {
  switch (grade) {
    case "A+":
      return 4.5;
    case "A":
      return 4.0;
    case "A-":
      return 3.7;

    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;

    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;

    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;

    case "E":
      return 0.0;

    default:
      return 0;
  }
}
  // 計算GPA 
function setGPA() {
  let formlength = document.querySelectorAll("form").length; // 取行數
  let credits = document.querySelectorAll(".course-credits"); // 取學分
  let selects = document.querySelectorAll("select"); // 取加權
  let sum = 0; // 計算分子
  let creditSum = 0; // 計算分母

  // 計算分母
  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  // 計算分子
  for (let i = 0; i < formlength; i++) {
    if (!isNaN(credits[i].value)) {
      sum += credits[i].value * convertor(selects[i].value);
    }
  }
  // 計算結果
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditSum).toFixed(2);
  }

  document.getElementById("result-gpa").innerText = result;
}


/*--------------------------------------------------------------------------------------------------*/ 
// #功能 4: 增行 => 新增成績輸入行
let addLint = document.querySelector(".add-lint-button");

addLint.addEventListener("click",()=>{
  console.log("觸發曾行", addLint)
  let newLint = document.createElement("form");
  let newDiv= document.createElement("div");
  newDiv.classList.add("grader");

  // 課程分類 欄位
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type","text");
  newInput1.setAttribute("list","opt");
  newInput1.setAttribute("placeholder","課程分類");
  newInput1.classList.add("course-type");

  // 課程代號 欄位
  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type","text");
  newInput2.setAttribute("placeholder","課程代號");
  newInput2.classList.add("course-number");

  // 課程代號 欄位
  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type","number");
  newInput3.setAttribute("placeholder","學分");
  newInput3.classList.add("course-credits");
  newInput3.setAttribute("max","6");
  newInput3.setAttribute("min","0");
  newInput3.addEventListener("change",()=>{
    setGPA();
  });

  // 加權分級 欄位
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);
  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  newSelect.addEventListener("change",(e)=>{
    setGPA();
    changeGradeColor(e.target);
  })

  // 垃圾桶 按鈕
  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newIcon = document.createElement("i");
  newIcon.classList.add("fas");
  newIcon.classList.add("fa-trash");
  newButton.appendChild(newIcon);

  // 新增欄位
  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);

  newLint.appendChild(newDiv);
  document.querySelector(".all-inputs").appendChild(newLint);

  // 製作新增行的動畫
  newLint.style.animation = "scaleUp 0.3s ease forwards";
})

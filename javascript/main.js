let goToTop = document.getElementById("go-top");
let ads = document.querySelector(".ads");
window.onscroll = function () {
  let nav = document.querySelector("nav");
  if (document.documentElement.scrollTop > 100) {
    nav.classList.add("window-nav");
    goToTop.classList.add("hide");
    ads.classList.add("hide");
  } else {
    nav.classList.remove("window-nav");
    goToTop.classList.remove("hide");
    ads.classList.remove("hide");
  }
};

// ---------------General----------------
function item() {
  fetch("../json/courses.json")
    .then((res) => res.json())
    .then((data) => {
      let e = "";
      for (let j = 0; j < 3; j++) {
        e += `
      <div class="product">
        <div class="hot">
          <i class="fa-solid fa-fire"></i>
          <span>Hot</span>
        </div>
        <img src="${data[j].image}" alt="course1" />
        <div class="info">
          <h4>${data[j].name}</h4>
          <a href="./register.html" class="btn" target="_blank">Đăng kí</a>
        </div>
      </div>`;
      }
      let items = document.getElementById("items");
      if (items != null) items.innerHTML = e;
    });
}

// ---------------Go to top--------------
goToTop.onclick = function () {
  let timer = setInterval(function () {
    document.documentElement.scrollTop -= 50;
    if (document.documentElement.scrollTop <= 0) clearInterval(timer);
  }, 10);
};

let ques = document.querySelectorAll(".questions .question");
let icon = document.querySelectorAll(".question i");
for (let i = 0; i < ques.length; i++) {
  ques[i].onclick = function () {
    ques[i].classList.toggle("open");
    if (icon[i].className === "fa-solid fa-caret-right")
      icon[i].className = "fa-solid fa-caret-down";
    else icon[i].className = "fa-solid fa-caret-right";
  };
}

// Slide comment

let container_cmt = document.querySelector(".container-comment");
let box_show = document.querySelector(".box-show");
let list_box = document.querySelectorAll(".box");

let btn_right = document.querySelector(".btn-right");
let btn_left = document.querySelector(".btn-left");

function make_slide(slide_quantily) {
  let width_box = container_cmt.offsetWidth / slide_quantily;
  let width_all_box = width_box * list_box.length;
  box_show.style.width = `${width_all_box}px`;

  for (let i = 0; i < list_box.length; i++) {
    list_box[i].style.marginRight = "20px";
    list_box[i].style.width = `${width_box}px`;
  }

  let count = 0;
  let remain = width_all_box - width_box * slide_quantily;
  btn_right.onclick = function () {
    count += width_box;
    if (count > remain) count = 0;
    box_show.style.transform = `translate(${-count}px)`;
  };

  btn_left.onclick = function () {
    count -= width_box;
    if (count < 0) count = remain;
    box_show.style.transform = `translate(${-count}px)`;
  };
}

window.addEventListener("load", function () {
  if (window.innerWidth > 1366) make_slide(3);
  else if (window.innerWidth < 850 && window.innerWidth > 700) make_slide(2);
  else if (window.innerWidth < 500) make_slide(1);
});

// ===============Register=================
let big_img = document.querySelector(".img > img");
let small_imgs = document.querySelectorAll(".thumb > img");
for (let i = 0; i < small_imgs.length; i++) {
  small_imgs[i].onclick = function () {
    big_img.style.opacity = "0";
    big_img.style.transform = "scale(1.1)";
    for (let j = 0; j < small_imgs.length; j++)
      small_imgs[j].classList.remove("active");
    small_imgs[i].classList.add("active");
    setTimeout(function () {
      big_img.src = small_imgs[i].src;
      big_img.style.opacity = "1";
      big_img.style.transform = "scale(1)";
    }, 200);
  };
}

// ===============MObile====================

function nav() {
  let bar = document.querySelector(".bars");
  let nav_list = document.querySelector("nav .list");
  let nav_icon = document.querySelector(".bars > i");
  bar.onclick = function () {
    nav_list.classList.toggle("block");
    if (nav_icon.className === "fa-solid fa-bars")
      nav_icon.className = "fa-solid fa-xmark";
    else nav_icon.className = "fa-solid fa-bars";
  };
}

window.onload = () => {
  nav();
  icd();
  item();
};

// ==============Slide-show===========
function icd() {
  let slider_content = document.querySelector(".slider-content");
  let slider_imgs = document.querySelectorAll(".slider-content > img");
  let length_silder_imgs = slider_imgs.length;
  let count = 0;

  let h = "";
  for (let i = 0; i < length_silder_imgs; i++) {
    h += `<i class="fa-solid fa-circle" id="${i}"></i>`;
  }
  let circle_button = document.querySelector(".show-button");
  circle_button.innerHTML = h;

  let circles = document.querySelectorAll(".show-button > i");
  let run_slider = (count) => {
    let width_img = slider_imgs[0].offsetWidth;
    slider_content.style.transform = `translateX(${-width_img * count}px)`;
    for (let m of circles) {
      m.classList.remove("active");
    }
    circles[count].classList.add("active");
  };
  for (let k = 0; k < circles.length; k++) {
    circles[k].onclick = function () {
      let check = this.getAttribute("id");
      count = check;
      run_slider(count);
    };
  }

  let slider_btn_right = document.querySelector(".b-right");
  let slider_btn_left = document.querySelector(".b-left");
  slider_btn_right.onclick = function () {
    count++;
    if (count === length_silder_imgs) count = 0;
    run_slider(count);
  };

  slider_btn_left.onclick = function () {
    count--;
    if (count < 0) count = length_silder_imgs - 1;
    run_slider(count);
  };

  setInterval(() => {
    count++;
    if (count === length_silder_imgs) count = 0;
    run_slider(count);
  }, 2000);
}
$(document).ready(() => {
  $.getJSON("../json/courses.json", function (data) {
    $("#kw").keyup(function () {
      let t = $(this).val().trim().toLowerCase();
      let h = "";
      for (let c of data) {
        if (c.name.trim().toLowerCase().indexOf(t) >= 0) {
          h += `
                <li><a href="javascript:;">${c.name}</a></li>
                  `;
        }
      }
      $(".sub-search").html(h);
      if (t === "") $(".sub-search").html("");
    });
    $(".sub-search").on("click", "a", function () {
      $("#kw").val($(this).text());
      $(".sub-search").html("");
    });
  });
});

let zoom = document.querySelector('.img > img')
let show_lightbox = document.querySelector('.lightbox')
let show_img = document.querySelector('.lightbox > img')
let btn_close = document.querySelector('.close')

zoom.onclick = function() {
    show_img.src = zoom.src;
    show_lightbox.classList.add('hide');
    btn_close.classList.add('hide')
}
let out = document.querySelector('.lightbox > div')
out.onclick = () => {
  show_lightbox.classList.remove('hide')
  btn_close.classList.remove('hide')
}
btn_close.addEventListener('click', () => {
  show_lightbox.classList.remove('hide')
  btn_close.classList.remove('hide')
})
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
window.onload() = () => {
    nav();
}
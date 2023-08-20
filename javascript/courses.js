function course() {
  fetch("../json/courses.json")
    .then((res) => res.json())
    .then((data) => {
      let co = "";
      for (let i of data) {
        co += `
        <div class="product">
          <img src="${i.image}" alt="course1" />
          <div class="info">
            <h4>${i.name}</h4>
            <a href="#" class="btn">Đăng kí</a>
          </div>
        </div>
            `;
      }
      let m = document.getElementById("products");
      if (m != null) m.innerHTML = co;
    });
}
function shared() {
  let key = document.getElementById("kw");
  if (key != null) {
    key = key.value.trim().toLowerCase();
    let products = document.querySelectorAll("div.products > div.product");
    for (let i = 0; i < products.length; i++) {
      let h4 = products[i].querySelector(".info > h4").innerText.toLowerCase();
      if (h4.indexOf(key) < 0) {
        products[i].style.display = "none";
      } else {
        products[i].style.display = "block";
      }
    }
  }
}

let search = document.getElementById("search");
document.addEventListener("keydown", function (e) {
  if (e.which === 13) {
    shared();
  }
});
function tim() {
  search.onclick = function () {
    shared();
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
  course();
  tim();
};

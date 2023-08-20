function teachers() {
  fetch("../json/team.json")
    .then((res) => res.json())
    .then((data) => {
      let n = "";
      for (let k of data) {
        n += `
        <div class="teacher">
          <div><img src="${k.image}" alt="teacher1" /></div>
          <div>
            <h3>${k.name}</h3>
            <span>${k.subject}</span>
          </div>
  
          <div class="teacher-social">
            <a href="https://www.facebook.com/TruongDaiHocMo" target="_blank"
              ><i class="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.facebook.com/TruongDaiHocMo" target="_blank"
              ><i class="fa-brands fa-instagram"></i
            ></a>
            <a href="https://www.facebook.com/TruongDaiHocMo" target="_blank">
              <i class="fa-brands fa-telegram"></i
            ></a>
          </div>
        </div>
      `;
      }
      let o = document.getElementById("teachers");
      if (o != null) o.innerHTML = n;
    });
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

let yearTimer = null;
let programTimer = null;
let studentTimer = null;
window.onload = () => {
  nav();
  teachers();
  var year = document.getElementById("year");
  var program = document.getElementById("program");
  var student = document.getElementById("student");
  yearTimer = run(year, 5, 20, "year");
  programTimer = run(program, 5, 40, "program");
  studentTimer = run(student, 100000, 1000000, "student");
};

function run(element, step, max, name) {
  return setInterval(function () {
    let value = parseInt(element.innerText);
    if (value < max) {
      value += step;
      element.innerText = value;
    } else {
      if (name == "year") clearInterval(yearTimer);
      else if (name == "program") clearInterval(programTimer);
      else clearInterval(studentTimer);
    }
  }, 100);
}

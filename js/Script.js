// button for popups //
let startBtn = document.querySelector('.center #startbtn');
let closeBtn = document.querySelector(".choosePopUp #closeBtn");

let monthlyBtn = document.querySelector(".choosePopUp .choiceBtn #Monthly");
let monthlyCloseBtn = document.querySelector(".monthlyPopUp #monthlyCloseBtn")

let semiMonthlyBtn  = document.querySelector(".choosePopUp .choiceBtn #semiMonthly");
let semiMonthlyCloseBtn = document.querySelector(".semiMonthlyPopUp #semiMonthlyCloseBtn");

startBtn.addEventListener("click", () => {
    document.querySelector(".choosePopUp").classList.add("active");
});
closeBtn.addEventListener("click", () => {
    document.querySelector(".choosePopUp").classList.remove("active");
});

monthlyBtn.addEventListener("click", () => {
    document.querySelector(".monthlyPopUp").classList.add("active");
});
monthlyCloseBtn.addEventListener("click", () => {
    document.querySelector(".monthlyPopUp").classList.remove("active");
});

semiMonthlyBtn.addEventListener("click", () => {
    document.querySelector(".semiMonthlyPopUp").classList.add("active2");
});
semiMonthlyCloseBtn.addEventListener("click", () => {
    document.querySelector(".semiMonthlyPopUp").classList.remove("active2");
});
// ----- //

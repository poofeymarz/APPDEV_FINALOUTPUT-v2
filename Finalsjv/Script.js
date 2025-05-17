document.addEventListener("DOMContentLoaded", () => {
// Button for popups
let startBtn = document.querySelector('.center #startbtn');
let closeBtn = document.querySelector(".choosePopUp #closeBtn");

let monthlyBtn = document.querySelector(".choosePopUp .choiceBtn #Monthly");
let monthlyCloseBtn = document.querySelector(".monthlyPopUp #monthlyCloseBtn");

let semiMonthlyBtn = document.querySelector(".choosePopUp .choiceBtn #semiMonthly");
let semiMonthlyCloseBtn = document.querySelector(".semiMonthlyPopUp #semiMonthlyCloseBtn");

startBtn.addEventListener("click", () => {
  document.querySelector(".choosePopUp").classList.add("active");
});
closeBtn.addEventListener("click", () => {
  document.querySelector(".choosePopUp").classList.remove("active");
});

//------------CALENDAR -------//


  let workedDays = {};

  // limitations for months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const year = 2025;

  //list of holidays(auto 2days when clicked)
  const holidays2025 = {
    "2025-01-01": "New Year's Day",
    "2025-02-25": "EDSA People Power Revolution",
    "2025-04-09": "Araw ng Kagitingan",
    "2025-04-17": "Maundy Thursday",
    "2025-04-18": "Good Friday",
    "2025-05-01": "Labor Day",
    "2025-06-12": "Independence Day",
  };

  const monthSelect = document.getElementById("month");
  const yearSelect = document.getElementById("year");

  //for Month dropdown contents (jan -june)
  months.forEach((m, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.text = m;
    monthSelect.appendChild(option);
  });

  // for Year dropdown content
  const optionYear = document.createElement("option");
  optionYear.value = year;
  optionYear.text = year;
  yearSelect.appendChild(optionYear);

  // this for reflecting true calendar from jan - june in year 2025
  const today = new Date(); //gets todays date ah
  if (today.getFullYear() === 2025 && today.getMonth() >= 0 && today.getMonth() <= 5)
  {
    monthSelect.value = today.getMonth();
  } else {
    monthSelect.value = 0; // default to Jan if today outside range
  }
  yearSelect.value = year;

  //FUNCTION TO GEN CALENDAR
  function generateCalendar() {
    //clear old calendar
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    //get selected month and year
    const month = parseInt(monthSelect.value);
    const yearSelected = parseInt(yearSelect.value);

    //for total days each month
    const daysInMonth = new Date(yearSelected, month + 1, 0).getDate();
    //whcih date start on
    const startDay = new Date(yearSelected, month, 1).getDay();

    //weeks
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayNames.forEach((name) => {
      const header = document.createElement("div");
      header.className = "header";
      header.textContent = name;
      calendar.appendChild(header);
    });

    // Empty slots before the 1st day
    for (let i = 0; i < startDay; i++) {
      const empty = document.createElement("div");
      calendar.appendChild(empty);
    }

    // each Days
    for (let d = 1; d <= daysInMonth; d++) {
      const dayBox = document.createElement("div");
      dayBox.className = "day";
      dayBox.textContent = d;

      // structure (yyyy-mm-dd)
      const dateKey = `${yearSelected}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      //if holiday
      if (holidays2025[dateKey]) {
        dayBox.title = holidays2025[dateKey];
        // Auto-mark holidays visually if not already marked
        if (!workedDays[dateKey]) {
          workedDays[dateKey] = 2;
        }
      }
      //selected dates color
      if (workedDays[dateKey] === 1) {
        dayBox.classList.add("worked");
      } else if (workedDays[dateKey] === 2) {
        dayBox.classList.add("holiday");
      }

      //UI dates //1click = grn , 2click=red
      dayBox.addEventListener("click", function () {
        const totalSelected = Object.keys(workedDays).length;

        // If not already selected and limit reached
        if (!workedDays[dateKey] && totalSelected >= 16) {
          alert("For SemiMonthly, you can only select up to 16 days.");
          return;
        }

        // Toggle between not selected → worked → holiday → not selected
        if (!workedDays[dateKey]) {
          workedDays[dateKey] = 1;
          dayBox.classList.add("worked");
          dayBox.classList.remove("holiday");
        } else if (workedDays[dateKey] === 1) {
          workedDays[dateKey] = 2;
          dayBox.classList.remove("worked");
          dayBox.classList.add("holiday");
        } else {
          delete workedDays[dateKey];
          dayBox.classList.remove("worked", "holiday");
        }
      });

      calendar.appendChild(dayBox);
    }
  }


  //CALCULATION FUCTION (dito niyo add) (change niyo nalang pang try ko lang kasi yan if nagana calendar)
  function calculatePay() {
    const rate = parseFloat(document.getElementById("rate").value);
    if (isNaN(rate)) {
      alert("Please enter a valid daily rate.");
      return;
    }

    let totalPay = 0;
    let workedCount = 0;
    let holidayCount = 0;

    for (let day in workedDays) {
      if (workedDays[day] === 1) {
        totalPay += rate;
        workedCount++;
      } else if (workedDays[day] === 2) {
        totalPay += rate * 2;
        holidayCount++;
      }
    }

    document.getElementById("result").textContent =
      `Normal Days: ${workedCount}, Holidays: ${holidayCount}, Total Pay: ₱${totalPay.toFixed(2)}`;
  }

  // Generate calendar on page load and when month/year changes
  generateCalendar();
  monthSelect.addEventListener("change", generateCalendar);
  yearSelect.addEventListener("change", generateCalendar);

});







/*
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


// ====================== COMPUTATION LOGIC =====================
/*
// Semi-Monthly Computation
var philHealth = 0.025;
var sss = 0.075;
var pagIbig = 100;
var minimum = 214.83;
var netIncome;
var grossIncome;
let workHours;

function semiMonthly() {
var usrName = document.getElementById("name").value;
var workHours = Number(document.getElementById("hours").value);
var workDays = Number(document.getElementById("semiDays").value);
var workLate = Number(document.getElementById("lates").value);
var workAbsent = Number(document.getElementById("absent").value);

var absentHours = workAbsent * 9;
var ttlLoss = absentHours + workLate;
var totalDays = workDays - workAbsent; // If you want to show the total working days
var totalHours = workHours - (absentHours + workLate); // If you want to show the total hours

grossIncome = ((workHours - ttlLoss) * minimum).toFixed(2);
console.log(grossIncome);

console.log(usrName);
console.log(totalHours); // For hours
console.log(totalDays); // For days
console.log(workLate);
console.log(workAbsent);
}

document.getElementById("semiComputeBtn").onclick = semiMonthly;
*/

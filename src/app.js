const card = document.querySelectorAll(".dashboard__card");
const jsonData = document.querySelectorAll(".dashboard__jsonData");
const jsonPre = document.querySelectorAll(".dashboard__jsonPrev");
const dailyBtn = document.querySelector(".daily");
const weeklyBtn = document.querySelector(".weekly");
const monthlyBtn = document.querySelector(".monthly");

// function to fetch data from json
async function fetchedData() {
  // using try
  const response = await fetch("data.json");
  const data = await response.json();
  showDefaultData(data);

  // when click on daily button
  dailyBtn.addEventListener("click", (e) => {
    handleFetchedData(data, "Yesterday");
    handelActive(dailyBtn, weeklyBtn, monthlyBtn);
  });
  // weekly
  weeklyBtn.addEventListener("click", (e) => {
    handleFetchedData(data, "Weekly");
    handelActive(weeklyBtn, dailyBtn, monthlyBtn);
  });
  //  monthly
  monthlyBtn.addEventListener("click", (e) => {
    handleFetchedData(data, "Monthly");
    handelActive(monthlyBtn, weeklyBtn, dailyBtn);
  });
}

fetchedData();

/**
 * ==== function to handel fetched data =====
 * @param {Array} data
 * @param {string} history
 */
function handleFetchedData(data, history) {
  card.forEach(() => {
    if (history == "Yesterday") {
      for (let i = 0; i < data.length; i++) {
        jsonData[i].textContent = `${data[i].timeframes.daily.current} ${
          data[i].timeframes.daily.current > 1 ? "hrs" : "hr"
        }`;
        jsonPre[i].textContent = `${history} - ${
          data[i].timeframes.daily.previous
        } ${data[i].timeframes.daily.previous > 1 ? "hrs" : "hr"}`;
      }
    } else if (history == "Weekly") {
      for (let i = 0; i < data.length; i++) {
        jsonData[i].textContent = `${data[i].timeframes.weekly.current} ${
          data[i].timeframes.weekly.current > 1 ? "hrs" : "hr"
        }`;
        jsonPre[i].textContent = `${history} - ${
          data[i].timeframes.weekly.previous
        } ${data[i].timeframes.weekly.previous > 1 ? "hrs" : "hr"}`;
      }
    } else if (history == "Monthly") {
      for (let i = 0; i < data.length; i++) {
        jsonData[i].textContent = `${data[i].timeframes.monthly.current} ${
          data[i].timeframes.monthly.current > 1 ? "hrs" : "hr"
        }`;
        jsonPre[i].textContent = `${history} - ${
          data[i].timeframes.monthly.previous
        } ${data[i].timeframes.monthly.previous > 1 ? "hrs" : "hr"}`;
      }
    }
  });
}
// function to show default data on load
/**
 *
 * @param {Array} data
 */
function showDefaultData(data) {
  for (let i = 0; i < data.length; i++) {
    jsonData[i].textContent = `${data[i].timeframes.daily.current}  ${
      data[i].timeframes.daily.current > 1 ? "hrs" : "hr"
    }`;
    jsonPre[i].textContent = `Yesterday - ${
      data[i].timeframes.daily.previous
    } ${data[i].timeframes.daily.previous > 1 ? "hrs" : "hr"}`;
  }
}

/**
 *
 * @param {DOM ELEMENT} current
 * @param {DOM ELEMENT} theprevious
 * @param {DOM ELEMENT} previous
 */
function handelActive(current, theprevious, previous) {
  current.classList.add("active");
  theprevious.classList.remove("active");
  previous.classList.remove("active");
}

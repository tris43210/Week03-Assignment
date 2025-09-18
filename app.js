console.log(`testtt`);

const cookieDisplay = document.getElementById(`cookie-amt`); //H1
const cookieCount = document.getElementById(`cps`); //H2
const cookieWrapper = document.querySelector(`.display`); //Group Div

let cookieInfo = {
  clicks: 0,
  cps: 1,
};

const savedClicks = JSON.parse(localStorage.getItem("clicks"));

if (cookieInfo.clicks !== null) {
  cookieInfo.clicks = JSON.parse(savedClicks);
  cookieDisplay.innerHTML = cookieInfo.clicks;
}

const incri = setInterval(function () {
  cookieInfo.clicks = cookieInfo.clicks + cookieInfo.cps;
  cookieDisplay.innerHTML = cookieInfo.clicks;
  localStorage.setItem(`clicks`, JSON.stringify(cookieInfo.clicks));
}, 1000);

//clearInterval(incri);

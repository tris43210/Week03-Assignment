console.log(`testtt`);

const cookieDisplay = document.getElementById(`cookie-amt`); //H1
const cookieCount = document.getElementById(`cps`); //H2
const cookieWrapper = document.querySelector(`.display`); //Group Div
const bigCookie = document.getElementById(`cookie`); // Cookie Img
const upgradeWrapper = document.querySelector(`.upgrade-wrappper`); // Upgrade Div

let cookieInfo = {
  clicks: 0,
  cps: 1,
};

//CPS Multiplier

const incri = setInterval(function () {
  cookieInfo.clicks = cookieInfo.clicks + cookieInfo.cps;
  cookieDisplay.innerHTML = cookieInfo.clicks;
  localStorage.setItem(`clicks`, JSON.stringify(cookieInfo.clicks));
}, 1000);

const savedClicks = JSON.parse(localStorage.getItem("clicks"));

// Clicking the Cookie

bigCookie.addEventListener(`click`, function () {
  cookieInfo.clicks++;
  console.log(cookieInfo.clicks);
  localStorage.setItem(`clicks`, cookieInfo.clicks);
});

// Apply Cookie Info

if (cookieInfo.clicks !== null) {
  cookieInfo.clicks = JSON.parse(savedClicks);
  cookieDisplay.innerHTML = cookieInfo.clicks;
}

//clearInterval(incri);

// Grab Upgrade Infomation

async function getUpgrades() {
  const getInfo = await fetch(
    `https://cookie-upgrade-api.vercel.app/api/upgrades`
  );
  console.log(getInfo);
  const getRes = await getInfo.json();
  console.log(getRes);
  return getRes;
}

// Make Divs, h3, and Buttons forEach Upgrade

async function upgradeBoxes() {
  const upgrades = await getUpgrades();
  upgrades.forEach(function (item, index) {
    const upgradeDiv = document.createElement(`div`);
    upgradeWrapper.appendChild(upgradeDiv);

    let names = document.createElement(`h3`);
    names.innerHTML = item.name;
    upgradeWrapper.appendChild(names);

    let upgradeButtons = document.createElement("button");
    upgradeButtons.innerHTML = `£${item.cost}`;
    upgradeWrapper.appendChild(upgradeButtons);
  });
}

upgradeBoxes();

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
  cookieDisplay.innerHTML = `Cookie Clicks: ${cookieInfo.clicks}`;
  localStorage.setItem(`clicks`, JSON.stringify(cookieInfo.clicks));
}, 1000);

// Returned from Storage

cookieInfo.clicks = JSON.parse(localStorage.getItem("clicks")) || 0;
cookieInfo.cps = JSON.parse(localStorage.getItem(`cps`)) || 1;

// Clicking the Cookie

bigCookie.addEventListener(`click`, function () {
  cookieInfo.clicks++;
  localStorage.setItem(`clicks`, cookieInfo.clicks);
});

// Grab Upgrade Infomation

async function getUpgrades() {
  const getInfo = await fetch(
    `https://cookie-upgrade-api.vercel.app/api/upgrades`
  );
  const getRes = await getInfo.json();
  console.log(getRes);
  return getRes;
}

// Make Divs, h3, and Buttons forEach Upgrade

async function upgradeBoxes() {
  const upgrades = await getUpgrades();
  upgrades.forEach(function (item) {
    const upgradeDiv = document.createElement(`div`);
    upgradeWrapper.appendChild(upgradeDiv);

    let names = document.createElement(`h3`);
    names.innerHTML = item.name;
    upgradeDiv.appendChild(names);

    let upgradeButtons = document.createElement("button");
    upgradeButtons.innerHTML = `£${item.cost}`;
    upgradeDiv.appendChild(upgradeButtons);

    let cpsIncrease = document.createElement(`p`);
    cpsIncrease.innerHTML = `CPS Muliplier ${item.increase}x`;
    upgradeDiv.appendChild(cpsIncrease);

    // Click Events For Each of the Buttons
    upgradeButtons.addEventListener(`click`, function () {
      if (cookieInfo.clicks >= item.cost) {
        cookieInfo.clicks -= item.cost;
        cookieInfo.cps += item.increase;
        localStorage.setItem("clicks", JSON.stringify(cookieInfo.clicks));
        localStorage.setItem(`cps`, JSON.stringify(cookieInfo.cps));
        cookieDisplay.innerHTML = `Cookie Clicks: ${cookieInfo.clicks}`;
        cookieCount.innerHTML = `CPS: Clicks Per Second: ${cookieInfo.cps}x`;
      } else if (cookieInfo.clicks < item.cost) {
        alert(`You cannot afford ${item.name}`);
      }
    });
  });
}

upgradeBoxes();

function resetGame() {
  cookieInfo = {
    clicks: 0,
    cps: 1,
  };
  localStorage.clear();
}

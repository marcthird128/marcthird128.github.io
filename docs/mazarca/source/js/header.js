// Adds header to the page
let date = new Date();
let isChristmas = (date.getMonth() === 0 || date.getMonth() === 1 || date.getMonth() === 11) ? true : false

const defaultHeader = `
    <nav>
        <div id="nav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 1024 1024">
                <path fill="white" d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8m0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8m0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8"/>
            </svg>
        </div>
    </nav>
    <div>
        <a href="https://maza64.xyz">
            <img class="logo" src="source/cookie.png" height="50px">
        </a>
    </div>
    <div>
        <a href="https://maza64.xyz">
            <img src="source/logo.png" height="35px">
        </a>
        <p class="splash" id="splash-text"></p>
    </div>
    <div style="flex-grow:1"></div>
    ${isChristmas ? `<div>
        <label class="checkbox-container">
            <input type="checkbox" id="snow-checkbox" checked>
            <div style="display: flex; gap: 3px;">
                <span class="checkmark"></span>
                <small>Snow</small>
            </div>
        </label>
    </div>` : ""}
    <div>
        <a href="https://discord.com/invite/R6nMUHe9DK" target="_blank">
            <img class="discord-social" src="source/discord.jpg" width="35px">
        </a>
    </div>
    <div>
        <a href="https://reddit.com/r/MazarcaSMP" target="_blank">
            <img class="reddit-social" src="source/reddit.jpg" height="35px">
        </a>
    </div>
`;
const headerElement = document.createElement("header");
headerElement.innerHTML = defaultHeader;
document.getElementsByTagName("main")[0].before(headerElement);
console.log("Header added successfully!");

// Fetch motd text
fetch("source/data/splash.json")
.then(obj => obj.text())
.then(res = function(res) {
    let parsed = JSON.parse(res);
    if (parsed.enabled) {
        var newDate = new Date()
        let motdElement = document.getElementById("splash-text");
        let index = newDate.getDate() - 1;
        // Math.floor(Math.random() * (parsed.values.length));
        console.log("Current splash text is", `'${parsed.values[index]}'`, "with index of", index);
        motdElement.innerText = parsed.values[index];
    } else { console.log("Splash texts are disabled") };
});

// Snow toggle
document.addEventListener("DOMContentLoaded", () => {
    if (isChristmas) {
        const snowCheckbox = document.getElementById("snow-checkbox");
        const snowCanvas = document.getElementById("snow-canvas");
        const savedSnowState = sessionStorage.getItem("snowEnabled");
        if (savedSnowState !== null) {
            const isChecked = savedSnowState === "true";
            snowCheckbox.checked = isChecked;
            if (snowCanvas) {
                snowCanvas.style.display = isChecked ? "block" : "none";
            };
        } else {
            snowCheckbox.checked = true;
            if (snowCanvas) {
                snowCanvas.style.display = "block";
            };
        };
        snowCheckbox.addEventListener("change", () => {
            const isChecked = snowCheckbox.checked;
            sessionStorage.setItem("snowEnabled", isChecked);
            if (snowCanvas) {
                snowCanvas.style.display = isChecked ? "block" : "none";
            };
        });
    };
});
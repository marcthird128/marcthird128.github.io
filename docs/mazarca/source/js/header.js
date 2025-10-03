// adds header to the page

const defaultHeader = '<nav><div id="nav-btn"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 1024 1024"><path fill="white" d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8m0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8m0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8"/></svg></div></nav><div><a href="https://maza64.xyz"><img class="logo" src="source/cookie.png"></a></div><div><a href="https://maza64.xyz"><img src="source/logo.png" height="35px"></a><p class="splash" id="splash-text"></p></div><div style="flex-grow:1"></div><div><a href="https://discord.com/invite/R6nMUHe9DK" target="_blank"><img class="discord-social" src="source/discord.jpg" width="35px"></a></div><div><a href="https://reddit.com/r/MazarcaSMP" target="_blank"><img class="reddit-social" src="source/reddit.jpg" height="35px"></a></div>';
const headerElement = document.createElement("header");
headerElement.innerHTML = defaultHeader;
document.getElementsByTagName("main")[0].before(headerElement);
console.log("Header added successfully!");

// fetch motd text
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
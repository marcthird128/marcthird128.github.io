// adds header to the page

const pagesFilenames = ["index", "gallery", "news", "status", "slimefun"];
const pagesNames = ["Home", "Gallery", "News", "Status", "SF Help"];
const defaultHeader1 = '<nav><div><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 1024 1024"><path fill="white" d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8m0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8m0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8"/></svg></div>';
let navMenu = '<div class="nav">';
const defaultHeader2 = '<div><a href="https://maza64.xyz"><img class="logo" src="source/cookie.png"></a></div><div><a href="https://maza64.xyz"><span class="title-text">Mazarca SMP</span></a></div><div style="flex-grow:1"></div><div><a href="https://discord.com/invite/R6nMUHe9DK" target="_blank"><img class="discord-social" src="source/discord.jpg" width="35px"></a></div><div><a href="https://reddit.com/r/MazarcaSMP" target="_blank"><img class="reddit-social" src="source/reddit.jpg" height="35px"></a></div>';
let currentLink = "";
for (let i = 0; i < pagesFilenames.length; i++) {
    if (pagesFilenames[i]+".html" == document.location.pathname.split("/").at(-1)) {
        currentLink = `<a class="active"><img src="source/${pagesFilenames[i]}.png" width="20px">${pagesNames[i]}</a>`;
    } else {
        currentLink = `<a href="${pagesFilenames[i]}.html"><img src="source/${pagesFilenames[i]}.png" width="20px">${pagesNames[i]}</a>`;
    }
    navMenu = navMenu + currentLink;
}
const headerElement = document.createElement("header");
headerElement.innerHTML = defaultHeader1 + navMenu + "</nav>" + defaultHeader2;
document.getElementsByTagName("main")[0].before(headerElement);
console.log("Header added successfully!");
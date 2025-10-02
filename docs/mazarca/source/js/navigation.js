// site navigation

// generate dropdown menu
const pagesFilenames = ["index", "gallery", "news", "status", "slimefun"];
const pagesNames = ["Home", "Gallery", "News", "Status", "SF Help"];
let navMenu = "";
let currentLink = "";
for (let i = 0; i < pagesFilenames.length; i++) {
    if (pagesFilenames[i]+".html" == document.location.pathname.split("/").at(-1)) {
        currentLink = `<a class="active"><img src="source/${pagesFilenames[i]}.png" width="20px">${pagesNames[i]}</a>`;
    } else {
        currentLink = `<a href="${pagesFilenames[i]}.html"><img src="source/${pagesFilenames[i]}.png" width="20px">${pagesNames[i]}</a>`;
    }
    navMenu = navMenu + currentLink;
}
const divNav = document.createElement("div");
divNav.className = "nav";
divNav.innerHTML = navMenu;
document.getElementsByTagName("main")[0].after(divNav);
console.log("Dropdown menu generated successfully!")

// navigation logic
const navBtn = document.getElementById("nav-btn");
navBtn.addEventListener("mouseover", () => divNav.style.display = "block");
divNav.addEventListener("mouseover", () => divNav.style.display = "block");
navBtn.addEventListener("mouseout", () => divNav.style.display = "none");
divNav.addEventListener("mouseout", () => divNav.style.display = "none");

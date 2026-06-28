// Generate dropdown menu
const links = [
    { href: "index.html", name: "Home" },
    { href: "gallery.html", name: "Gallery" },
    { href: "news.html", name: "News" },
    { href: "messages.html", name: "Message" },
    { href: "slimefun.html", name: "SF Help" },
    { href: "recipes.html", name: "Recipes" }
];
const divNav = document.createElement("div");
divNav.className = "nav";
links.forEach(link => {
    const navLink = document.createElement("a");
    navLink.href = link.href;
    navLink.innerHTML = `<img src="source/icons/${link.href.split(".")[0]}.png" width="20">${link.name}`;
    const pageName = `${location.pathname.split("/").at(-1)}`;
    if (pageName == link.href || pageName == "") {
        navLink.className = "active";
    }
    divNav.appendChild(navLink);
});
document.body.appendChild(divNav);
console.log("Dropdown menu generated successfully!")

// Set menu show/hide logic
const navBtn = document.getElementById("nav-btn");
navBtn.addEventListener("mouseover", () => divNav.style.display = "block");
divNav.addEventListener("mouseover", () => divNav.style.display = "block");
navBtn.addEventListener("mouseout", () => divNav.style.display = "none");
divNav.addEventListener("mouseout", () => divNav.style.display = "none");

// will only display screenshots that are added to source/data/screenshots.js!

fetch("source/data/screenshots.json")
.then(obj => obj.text())
.then(imgData => display(JSON.parse(imgData)))
.catch(err => noDisplay(err));

function display(imgData) {
    const screenshots = document.getElementsByTagName("main")[0];
    const path = imgData.path;
    const numberOfImages = imgData.images.length;
    for (let i=0; i<Math.ceil(numberOfImages/3); i++) {
        console.log("row", i);
        let imageRow = document.createElement("div");
        imageRow.className = "image-row";
        let stop = 3*i+3;
        if (numberOfImages < stop) { stop = 3*i+numberOfImages%3 };
        for (let j=3*i; j<stop; j++) {
            console.log("image", j);
            const imageContainer = document.createElement("div");
            imageContainer.className = "image-container";
            const image = document.createElement("img");
            image.setAttribute("src", path + imgData.images[j].name);
            image.setAttribute("alt", imgData.images[j].name);
            image.setAttribute("width", "100%");
            image.setAttribute("onclick", "openInNewTab('" + path + imgData.images[j].name + "')");
            imageContainer.appendChild(image);
            const imageFooter = document.createElement("div");
            imageFooter.className = "image-footer";
            const serverName = document.createElement("small");
            serverName.innerText = "Server: " + imgData.images[j].server;
            imageFooter.appendChild(serverName);
            const descText = document.createElement("p");
            descText.innerText = imgData.images[j].desc;
            imageFooter.appendChild(descText);
            imageContainer.appendChild(imageFooter);
            imageRow.appendChild(imageContainer);
        };
        screenshots.appendChild(imageRow);
    };
};

function noDisplay(err) {
    const screenshots = document.getElementsByTagName("main")[0];
    console.warn("Cannot display images!", err);
    const sorry = document.createElement("p");
    sorry.className = "text-center";
    sorry.innerText = "Failed to display :(";
    screenshots.appendChild(sorry);
};

function openInNewTab(filePath) { window.open("https://maza64.xyz/mazarca/" + filePath, "_blank") };
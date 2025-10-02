fetch("source/data/ips.json")
.then(obj => obj.text())
.then(ips => display(ips))
.catch(err => noDisplay(err));

function display(ips) {
    const ipHeading = document.getElementById("ip-heading");
    const ipTable = document.createElement("table");
    try {
        ips = JSON.parse(ips);
        for (let i = 0; i < ips.length; i++) {
            const ipContainer = document.createElement("tr");
            const addressContainer = document.createElement("td");
            const descContainer = document.createElement("td");
            const ipAddress = document.createElement("code");
            const ipDesc = document.createElement("small");
            ipAddress.setAttribute("onclick", "select(this)");
            ipAddress.innerText = Object(ips[i]).address;
            ipDesc.innerText = Object(ips[i]).desc;
            addressContainer.appendChild(ipAddress);
            descContainer.appendChild(ipDesc);
            ipContainer.appendChild(addressContainer);
            ipContainer.appendChild(descContainer);
            ipTable.appendChild(ipContainer);
        };
    } catch (err) {
        noDisplay(err);
        return;
    };
    ipHeading.style.marginBottom = "0px";
    let note = document.createElement("small");
    note.innerText = "click to copy";
    ipHeading.after(note);
    note.after(ipTable);
    console.log("IP list fetched and displayed successfully!");
};

function noDisplay(err) {
    const ipHeading = document.getElementById("ip-heading");
    console.warn("Cannot display IP list!", err);
    let message = document.createElement("p");
    message.className = "indented";
    message.innerText = "Failed to display IP list :(";
    ipHeading.after(message);
};
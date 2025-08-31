fetch("source/data/ips.json")
.then(obj => obj.text())
.then(ips => display(ips))
.catch(err => sorry(err));

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
        sorry(err);
        return;
    };
    ipHeading.style.marginBottom = "0px";
    let note = document.createElement("small");
    note.innerText = "click to copy";
    ipHeading.after(note);
    note.after(ipTable);
};

function sorry(err) {
    const ipHeading = document.getElementById("ip-heading");
    console.warn(`Cannot display IP list! ${err}`);
    let sorry = document.createElement("p");
    sorry.className = "indented";
    sorry.innerText = "Sorry, IP list is unavailable :(";
    ipHeading.after(sorry);
};
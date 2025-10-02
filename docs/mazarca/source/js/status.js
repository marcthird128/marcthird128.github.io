const timer = document.getElementById("timer");
const reportBtn = document.getElementById("report-offline");
let link = "";
timer.innerText = "Fetching data... Please wait";

var newDate = new Date();
Date.prototype.today = function() {
    return ((this.getDate() < 10)?"0":"") + this.getDate() + "/" + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "/" + this.getFullYear();
};
Date.prototype.timeNow = function() {
    return ((this.getHours() < 10)?"0":"") + this.getHours() + ":" + ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ":" + ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

function getPing(address, output) {
    output.style.color = "gray";
    setInterval(async () => {
        let online = await async function() {
            let cache_preventer = btoa(Date.now() + "_" + Math.random());
            let url = address + "?" + cache_preventer;
            let resolve;
            fetch(url).then((v) => { resolve(true) }, (v) => { resolve(false) });
            return new Promise((res) => { resolve = res });
        };
        var newDate = new Date();
        currentTime = ((newDate.getHours() < 10)?"0":"") + newDate.getHours() + ":" + ((newDate.getMinutes() < 10)?"0":"") + newDate.getMinutes() + ":" + ((newDate.getSeconds() < 10)?"0":"") + newDate.getSeconds();
        if (online) {
            console.log(`[Status Check ${currentTime}] ${address} is up`);
            output.style.color = "#00AA00";
            output.style.textShadow = "0px 0px 10px #00AA0060";
            output.innerText = "Online";
            reportBtn.style.display = "none";
        } else {
            console.log(`[Status Check ${currentTime}] ${address} is down`);
            output.style.color = "#AA0000";
            output.style.textShadow = "0px 0px 10px #AA000060";
            output.innerText = "Offline";
            reportBtn.style.display = "block";
        };
        timer.innerText = `Checking every 3 seconds. Last checked at ${currentTime}`;
    }, 3000);
};

getPing("https://eagler.maza64.xyz", document.getElementById("mazarca-status"));
getPing("https://www.eaglercraft.com", document.getElementById("eagler-status"));
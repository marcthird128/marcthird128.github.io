const timer = document.getElementById("timer");
timer.innerText = "Fetching data... Please wait";

Date.prototype.today = function() {
    return ((this.getDate() < 10)?"0":"") + this.getDate() + "/" + (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) + "/" + this.getFullYear();
};
Date.prototype.timeNow = function() {
    return ((this.getHours() < 10)?"0":"") + this.getHours() + ":" + ((this.getMinutes() < 10)?"0":"") + this.getMinutes() + ":" + ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

function getPing(host, output) {
    output.style.color = "gray";
    setInterval(async () => {
        let online = await (async () => {
            let cache_preventer = btoa(Date.now() + "_" + Math.random());
            let url = `https://${host}.maza64.xyz?${cache_preventer}`;
            try {
                const response = await fetch(url);
                if (response.status === 401 || (response.status >= 200 && response.status < 300)) {
                    return true;
                };
                return false;
            } catch (error) {
                return false;
            };
        })();
        var newDate = new Date();
        currentTime = newDate.timeNow();
        if (online) {
            console.log(`[Status Check ${currentTime}] ${host} is up`);
            output.style.color = "#00AA00";
            output.style.textShadow = "0px 0px 10px #00AA0060";
            output.innerText = "Online";
            document.getElementById(host+"-report-offline").style.display = "none";
        } else {
            console.log(`[Status Check ${currentTime}] ${host} is down`);
            output.style.color = "#AA0000";
            output.style.textShadow = "0px 0px 10px #AA000060";
            output.innerText = "Offline";
            document.getElementById(host+"-report-offline").style.display = "block";
        };
        timer.innerText = `Checking every 3 seconds. Last checked at ${currentTime}`;
    }, 3000);
};

getPing("raspberrypi", document.getElementById("raspberrypi-status"));
getPing("oldlaptop", document.getElementById("oldlaptop-status"));
getPing("oldpc", document.getElementById("oldpc-status"));
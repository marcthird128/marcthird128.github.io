// Fetches last announcement from source/data/news.yml
// and puts it in a pop-up box
fetch("source/data/news.yml")
.then((res) => res.text())
.then((data) => {
    if (sessionStorage.getItem("isLatestClosed") === "true") {
        return;
    };
    const yamlScript = document.createElement("script");
    yamlScript.src = "source/js/min/js-yaml.min.js";
    const markedScript = document.createElement("script");
    markedScript.src = "source/js/min/marked.min.js";
    Promise.all([
        new Promise((resolve, reject) => {
            yamlScript.onload = resolve;
            yamlScript.onerror = () => reject(new Error("Failed to load js-yaml.js"));
            document.body.appendChild(yamlScript);
        }),
        new Promise((resolve, reject) => {
            markedScript.onload = resolve;
            markedScript.onerror = () => reject(new Error("Failed to load marked.js"));
            document.body.appendChild(markedScript);
        })
    ]).then(() => {
        const parsed = jsyaml.loadAll(data);
        let latest = parsed[parsed.length-1];
        const [day, month, year] = latest.date.split('-').map(Number);
        const latestDate = new Date(year, month - 1, day);
        if (isNaN(latestDate)) {
            console.warn(`Invalid date: ${latest.date}. Expected DD-MM-YYYY format.`);
            return;
        };
        const now = new Date();
        const diffTime = Math.abs(now - latestDate);
        const daysAgo = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        console.log("Latest announcement was", daysAgo, "days ago.")
        if (daysAgo > 10) {
            return;
        };
        let latestContainer = document.createElement("div");
        latestContainer.className = "latest-announcement";
        latestContainer.innerHTML = `
            <div class="latest-header">
                <h3>Latest news:</h3>
                <span id="latest-close">&times;</span>
            </div>
            <small>
                ${latestDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}
            </small>
            <div class="latest-content">${marked.parse(latest.content)}</div>
        `;
        document.body.append(latestContainer);
        const closeBtn = document.getElementById("latest-close");
        closeBtn.addEventListener("click", () => {
            latestContainer.remove();
            sessionStorage.setItem("isLatestClosed", "true");
        });
    });
})
.catch(err => {
    console.warn("Failed to load latest announcement!", err);
});

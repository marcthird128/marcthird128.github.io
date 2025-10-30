const newsContainer = document.getElementById("news-container");fetch("source/data/news.json")
.then(res => res.json())
.then(data => {
    for (let i = 0; i < data.length-1; i++) {
        const a = data[i];
        let details = document.createElement("details");
        details.className = "announcement";
        let summary = document.createElement("summary");
        summary.innerHTML = `<i>${a.date}</i>`;
        let content = document.createElement("div");
        content.innerHTML = a.content;
        let hr = document.createElement("hr");
        hr.size = "2px";
        details.appendChild(summary);
        details.appendChild(content);
        newsContainer.appendChild(details);
        newsContainer.appendChild(hr);
    }
    let latest = data[data.length-1];
    let details = document.createElement("details");
    details.className = "announcement";
    details.open = "true";
    let summary = document.createElement("summary");
    summary.innerHTML = `<i>${latest.date}</i><span style="color: #FF5555"> - latest</span>`;
    let content = document.createElement("div");
    content.innerHTML = latest.content;
    details.appendChild(summary);
    details.appendChild(content);
    newsContainer.appendChild(details);
})
.catch(err => {
    console.warn("Error loading announcements:", err);
    newsContainer.innerHTML = '<p class="text-center">Failed to load announcements</p>';
});
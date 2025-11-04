// fetches from a .yml file and parses Markdown content using marked.js

const newsContainer = document.getElementById("news-container");
fetch("source/data/news.yml")
.then(res => res.text())
.then(data => {
    const parsed = jsyaml.loadAll(data);
    for (let i = 0; i < parsed.length-1; i++) {
        const a = parsed[i];
        let details = document.createElement("details");
        details.className = "announcement";
        let summary = document.createElement("summary");
        summary.innerHTML = `<i>${formatDate(a.date)}</i>`;
        let content = document.createElement("div");
        content.innerHTML = marked.parse(a.content);
        let hr = document.createElement("hr");
        hr.size = "2px";
        details.appendChild(summary);
        details.appendChild(content);
        newsContainer.appendChild(details);
        newsContainer.appendChild(hr);
    };
    let latest = parsed[parsed.length-1];
    let details = document.createElement("details");
    details.className = "announcement";
    details.open = "true";
    let summary = document.createElement("summary");
    summary.innerHTML = `<i>${formatDate(latest.date)}</i><span style="color: #FF5555"> - latest</span>`;
    let content = document.createElement("div");
    content.innerHTML = marked.parse(latest.content);
    details.appendChild(summary);
    details.appendChild(content);
    newsContainer.appendChild(details);
})
.catch(err => {
    console.warn("Error loading announcements:", err);
    newsContainer.innerHTML = '<p class="text-center">Failed to load announcements</p>';
});

function formatDate(dateStr) {
    const [day, month, year] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date)) { console.warn(`Invalid date: ${dateStr}. Expected DD-MM-YYYY format`) };
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};
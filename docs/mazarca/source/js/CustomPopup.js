class CustomPopup extends HTMLElement {
    constructor() {
        super();

        this.style.display = "none";

        const stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.href = "source/css/custom-popup.css";

        new Promise((resolve, reject) => {
            stylesheet.onload = resolve;
            stylesheet.onerror = () => reject(new Error("Failed to load custom-popup.css"));
            document.head.appendChild(stylesheet);
        }).then(() => {
            const forId = this.getAttribute("for");

            if (forId) {
                let shutter = document.createElement("div");
                shutter.className = "popup-shutter";
                shutter.setAttribute("onclick", "this.style.display = 'none'");

                let container = document.createElement("div");
                container.className = "popup-container";
                container.innerHTML = this.innerHTML + `<center><small>Click anywhere to close</small></center>`;
                container.addEventListener("click", (event) => {
                    event.stopPropagation();
                });

                shutter.appendChild(container);
                document.body.appendChild(shutter);

                const forElement = document.getElementById(forId);
                forElement.addEventListener("click", () => {
                    shutter.style.display = "block";
                });

                this.remove();
            } else {
                console.warn("Found unassigned <popup-content> block!")
            };
        });
    };
};

customElements.define("popup-content", CustomPopup);
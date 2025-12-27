if (date.getMonth() === 0 || date.getMonth() === 1 || date.getMonth() === 11) {
    const snowCheckbox = document.getElementById("snow-checkbox");
    if (!snowCheckbox) {
        console.warn("Snow checkbox not found. Skipping snow effect.");
        exit();
    };
    snowCheckbox.parentElement.style.display = "block";

    const canvas = document.createElement("canvas");
    canvas.id = "snow-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const savedState = sessionStorage.getItem("snowEnabled");
    const isChecked = savedState === null ? true : savedState === "true";

    snowCheckbox.checked = isChecked;
    canvas.style.display = isChecked ? "block" : "none";

    class Snowflake {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.radius = Math.random() * 3 + 1;
            this.speed = Math.random() * 2 + 1;
            this.wind = Math.random() * 2 - 1;
        };

        update() {
            this.y += this.speed;
            this.x += this.wind;

            if (this.y > canvas.height) {
                this.y = Math.random() * -10;
                this.x = Math.random() * canvas.width;
            };
        };

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fill();
        };
    };

    const snowflakes = [];
    const snowflakeCount = 100;

    for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push(new Snowflake());
    };

    let animationId = null;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snowflakes.forEach((flake) => {
            flake.update();
            flake.draw();
        });

        animationId = requestAnimationFrame(animate);
    };

    function startAnimation() {
        if (!animationId) {
            animationId = requestAnimationFrame(animate);
        };
    };

    function stopAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        };
    };

    if (isChecked) {
        startAnimation();
    };

    snowCheckbox.addEventListener("change", () => {
        const checked = snowCheckbox.checked;
        sessionStorage.setItem("snowEnabled", checked);
        if (checked) {
            canvas.style.display = "block";
            startAnimation();
        } else {
            canvas.style.display = "none";
            stopAnimation();
        };
    });

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};
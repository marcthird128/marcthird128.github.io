let date = new Date();
if (date.getMonth() == 0 || date.getMonth() == 1 || date.getMonth() == 11) {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snowflakes.forEach(flake => {
            flake.update();
            flake.draw();
        });

        requestAnimationFrame(animate);
    };

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animate();
};
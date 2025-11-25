const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5 + 1.5;
        this.alpha = Math.random();
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;

        const r = 255;
        const g = 120 + Math.random() * 60;
        const b = 180 + Math.random() * 60;

        this.color = `rgba(${r}, ${g}, ${b}, `;
    }

    update() {
        this.alpha += this.twinkleSpeed;
        if (this.alpha >= 1 || this.alpha <= 0.3) this.twinkleSpeed *= -1;

        this.x += this.vx;
        this.y += this.vy;

        if (
            this.x < 0 || this.x > canvas.width ||
            this.y < 0 || this.y > canvas.height
        ) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ")";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255,200,255,0.9)";
        ctx.fill();
    }
}

const stars = Array.from({ length: 150 }, () => new Star());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
        star.update();
        star.draw();
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

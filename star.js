const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const stars = [];

for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 1,
        alpha: Math.random(),
        tw: (Math.random() * 0.015 + 0.005),
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let s of stars) {
     
        s.alpha += s.tw;
        if (s.alpha > 1 || s.alpha < 0.3) s.tw *= -1;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,140,200,${s.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(255,200,255,0.9)";
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

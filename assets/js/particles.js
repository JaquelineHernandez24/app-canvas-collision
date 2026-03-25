const canvasP = document.getElementById("particles");
const ctxP = canvasP.getContext("2d");

canvasP.width = window.innerWidth;
canvasP.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * canvasP.width,
        y: Math.random() * canvasP.height,
        dx: Math.random() - 0.5,
        dy: Math.random() - 0.5
    });
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctxP.clearRect(0,0,canvasP.width,canvasP.height);

    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        ctxP.fillStyle = "rgba(56,189,248,0.5)";
        ctxP.beginPath();
        ctxP.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctxP.fill();
    });
}

animateParticles();
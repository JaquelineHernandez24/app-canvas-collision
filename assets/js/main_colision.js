const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.baseColor = color; // color original
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = (Math.random() * 2 - 1) * this.speed;
        this.dy = (Math.random() * 2 - 1) * this.speed;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.lineWidth = 2;

        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        context.stroke();

        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        // Rebote solo con paredes
        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx *= -1;
        }

        if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
            this.dy *= -1;
        }

        this.posX += this.dx;
        this.posY += this.dy;

        this.draw(context);
    }
}

// 🔹 Crear N círculos
const N = 10;
let circles = [];

for (let i = 0; i < N; i++) {
    let radius = Math.random() * 30 + 20;
    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;

    circles.push(
        new Circle(x, y, radius, "blue", i + 1, 2)
    );
}

// 🔹 Detección de colisiones
function detectarColisiones() {
    // Resetear colores
    circles.forEach(c => c.color = c.baseColor);

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            let c1 = circles[i];
            let c2 = circles[j];

            let dx = c1.posX - c2.posX;
            let dy = c1.posY - c2.posY;

            let distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia <= (c1.radius + c2.radius)) {
                // 🔴 Colisión → cambiar color
                c1.color = "red";
                c2.color = "red";
            }
        }
    }
}

// 🔹 Animación
function update() {
    requestAnimationFrame(update);

    ctx.clearRect(0, 0, window_width, window_height);

    detectarColisiones();

    circles.forEach(c => c.update(ctx));
}

update();
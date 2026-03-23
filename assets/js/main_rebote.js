function detectarColisiones() {
    // Resetear colores
    circles.forEach(c => c.color = c.baseColor);

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            let c1 = circles[i];
            let c2 = circles[j];

            let dx = c2.posX - c1.posX;
            let dy = c2.posY - c1.posY;

            let distancia = Math.sqrt(dx * dx + dy * dy);
            let sumaRadios = c1.radius + c2.radius;

            if (distancia < sumaRadios) {

                // 🔴 Cambiar color al colisionar
                c1.color = "red";
                c2.color = "red";

                // 🔥 NORMALIZAR VECTOR
                let nx = dx / distancia;
                let ny = dy / distancia;

                // 🔥 VELOCIDAD RELATIVA
                let dvx = c1.dx - c2.dx;
                let dvy = c1.dy - c2.dy;

                // 🔥 PRODUCTO PUNTO
                let impacto = dvx * nx + dvy * ny;

                // Evitar que se "pegue"
                if (impacto > 0) continue;

                // 🔥 REBOTE (simple)
                let impulso = impacto;

                c1.dx -= impulso * nx;
                c1.dy -= impulso * ny;

                c2.dx += impulso * nx;
                c2.dy += impulso * ny;

                // 🔥 SEPARAR LOS CÍRCULOS (MUY IMPORTANTE)
                let overlap = sumaRadios - distancia;

                c1.posX -= (overlap / 2) * nx;
                c1.posY -= (overlap / 2) * ny;

                c2.posX += (overlap / 2) * nx;
                c2.posY += (overlap / 2) * ny;
            }
        }
    }
}
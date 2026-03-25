const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");

canvas1.width = 300;
canvas1.height = 180;

let circles1 = [];
const colores = ["#22c55e", "#3b82f6"];

function initMovimiento() {
    circles1 = [];
    let n = slider.value;

    for (let i = 0; i < n; i++) {
        circles1.push({
            x: Math.random()*280,
            y: Math.random()*160,
            dx:(Math.random()-0.5)*3,
            dy:(Math.random()-0.5)*3,
            r:15,
            color: colores[i%2],
            id:i+1
        });
    }
}

function draw(ctx,c){
    ctx.beginPath();
    ctx.shadowColor = c.color;
    ctx.shadowBlur = 20;

    ctx.fillStyle = c.color;
    ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.fillStyle="white";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.fillText(c.id,c.x,c.y);
}

function animate1(){
    requestAnimationFrame(animate1);
    ctx1.clearRect(0,0,300,180);

    circles1.forEach(c=>{
        if(c.x<0||c.x>300)c.dx*=-1;
        if(c.y<0||c.y>180)c.dy*=-1;

        c.x+=c.dx;
        c.y+=c.dy;

        draw(ctx1,c);
    });
}

slider.oninput = ()=>{
    valor.textContent = slider.value;
    initMovimiento();
};

initMovimiento();
animate1();
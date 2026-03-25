const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

canvas2.width = 300;
canvas2.height = 180;

let circles2 = [];

function initColision(){
    circles2=[];
    for(let i=0;i<slider.value;i++){
        circles2.push({
            x:Math.random()*280,
            y:Math.random()*160,
            dx:(Math.random()-0.5)*3,
            dy:(Math.random()-0.5)*3,
            r:15,
            base:"#3b82f6",
            hit:"#f43f5e",
            color:"#3b82f6",
            id:i+1
        });
    }
}

function detectar(){
    circles2.forEach(c=>c.color=c.base);

    for(let i=0;i<circles2.length;i++){
        for(let j=i+1;j<circles2.length;j++){
            let dx=circles2[i].x-circles2[j].x;
            let dy=circles2[i].y-circles2[j].y;
            let dist=Math.sqrt(dx*dx+dy*dy);

            if(dist<30){
                circles2[i].color=circles2[i].hit;
                circles2[j].color=circles2[j].hit;
            }
        }
    }
}

function animate2(){
    requestAnimationFrame(animate2);
    ctx2.clearRect(0,0,300,180);

    circles2.forEach(c=>{
        if(c.x<0||c.x>300)c.dx*=-1;
        if(c.y<0||c.y>180)c.dy*=-1;

        c.x+=c.dx;
        c.y+=c.dy;
    });

    detectar();
    circles2.forEach(c=>draw(ctx2,c));
}

slider.oninput = initColision;

initColision();
animate2();
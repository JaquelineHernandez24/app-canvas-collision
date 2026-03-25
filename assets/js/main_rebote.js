const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");

canvas3.width = 300;
canvas3.height = 180;

let circles3 = [];

function initRebote(){
    circles3=[];
    for(let i=0;i<slider.value;i++){
        circles3.push({
            x:Math.random()*280,
            y:Math.random()*160,
            dx:(Math.random()-0.5)*3,
            dy:(Math.random()-0.5)*3,
            r:15,
            base:"#22c55e",
            hit:"#f43f5e",
            color:"#22c55e",
            id:i+1
        });
    }
}

function rebote(){
    circles3.forEach(c=>c.color=c.base);

    for(let i=0;i<circles3.length;i++){
        for(let j=i+1;j<circles3.length;j++){
            let c1=circles3[i];
            let c2=circles3[j];

            let dx=c2.x-c1.x;
            let dy=c2.y-c1.y;
            let dist=Math.sqrt(dx*dx+dy*dy);

            if(dist<30){
                c1.color=c1.hit;
                c2.color=c2.hit;

                [c1.dx,c2.dx]=[c2.dx,c1.dx];
                [c1.dy,c2.dy]=[c2.dy,c1.dy];
            }
        }
    }
}

function animate3(){
    requestAnimationFrame(animate3);
    ctx3.clearRect(0,0,300,180);

    circles3.forEach(c=>{
        if(c.x<0||c.x>300)c.dx*=-1;
        if(c.y<0||c.y>180)c.dy*=-1;

        c.x+=c.dx;
        c.y+=c.dy;
    });

    rebote();
    circles3.forEach(c=>draw(ctx3,c));
}

slider.oninput = initRebote;

initRebote();
animate3();
let img = new Image();
img.src = 'hoho.png';
//img.src = "981F5D456F.jpeg"
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.globalCompositeOperation="lighter";
const backgroundColor = "#000"

let p0 = {x:200,y:0}
let p1 = {x:400,y:300}
let p2 = {x:-100,y:50}
let p3 = {x:200,y:350}


class Pixel{
    constructor(data){
        this.x = data.x
        this.y = data.y
        this.r = data.r
        // this.g = data.g
        // this.b = data.b
        // this.a = data.a
        this.rand = 0.0001+Math.random()

        this.posX = data.x
        this.posY =  data.y-300
        this.radius = 40*Math.random()
        //旋转
        this.angle = 360*Math.random()
        this.t = 0
        this.add = this.rand/100
        this.cubeArr = [
            {x:this.posX,y:this.posY},
            pointOffset(p1,30),
            pointOffset(p2,55),
            pointOffset(p3)
            ]

        return this
    }
    move(x,y){
        //let gray = (p.r+p.g+p.b)/3
        //ctx.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + (this.a / 255) + ')';
        this.t += this.add
        if(this.t>2) this.t=0
        ctx.fillStyle = '#a24a2c';
        let p = cubeBezier(...this.cubeArr, this.t)
        ctx.fillRect(p.x, p.y, 2, 2);
    }

}


let getPixels = (step=1)=>{
    let w = 400
    let h = 400
    let pixels =  ctx.getImageData(0, 0, w, h).data;
    let pixArr = []
    for(let x=1;x<=400;x+=step){
        for(let y=1;y<=400;y+=step){
            let pos = (x+y*400)*4
            let r = pixels[pos]
            let g = pixels[pos+1]
            let b = pixels[pos+2]
            let a = pixels[pos+3]
            let thisPix = {x,y,r,g,b,a}
            let threeClolor = r+g+b
            let gray = threeClolor==0?0:threeClolor/3
            //console.log(thisPix,gray)
            if(a>100&&gray<100){
                //console.log(r,g,b,a,gray)
                pixArr.push(new Pixel(thisPix))
            }
        }
    }
    return pixArr
}


let particles = []
img.onload = function() {
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    particles= getPixels(3)
    clearScreen()
    console.log(particles.length)
    ctx.fillStyle = "red"
    ctx.fillRect(p0.x, p0.y, 4, 4);
    ctx.fillRect(p1.x, p1.y, 4, 4);
    ctx.fillRect(p2.x, p2.y, 4, 4);
    ctx.fillRect(p3.x, p3.y, 4, 4);
    ctx.fillStyle = "blue"
    drawBezier(p0,p1,p2,p3)
    setTimeout(animate,300);
};


function animate()
{
    clearScreen()
    ctx.fillStyle="#000"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    particles.forEach(p=>{
        p.move()
    })
    requestAnimationFrame(animate);
}


/*
TOOL
 */
function pointOffset(pos,coefficient=5) {
    let x = pos.x+(Math.random()-0.5)*coefficient
    let y = pos.y+(Math.random()-0.5)*coefficient
    return {x,y}
}

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function cubeBezier(p0, c0, c1, p1, t) {
    //var p = new Point();
    var nt = (1 - t);
    let x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
    let y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;
    return {x,y};
}

function drawBezier(p0, p1, p2, p3) {
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    ctx.stroke();
}

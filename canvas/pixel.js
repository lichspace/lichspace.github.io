let img = new Image();
img.src = 'hoho.png';
//img.src = "981F5D456F.jpeg"
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.globalCompositeOperation="lighter";
const gravity = 9.8

class Pixel{
    constructor(data){
        this.x = data.x
        this.y = data.y
        this.r = data.r
        this.g = data.g
        this.b = data.b
        this.a = data.a
        this.rand = Math.random()

        this.posX = data.x
        this.posY =  data.y-2*canvas.width/2
        this.radius = 40*Math.random()
        this.vx = 2*this.rand//初始速度
        this.bottom = canvas.height
        //旋转
        this.angle = 360*Math.random()

        this.stop = 0
        //console.log(this.bottom)
        return this
    }
    move(x,y){
        if(this.stop) {
            ctx.fillRect(this.x, this.y, 1, 1);
            return
        }
        //let gray = (p.r+p.g+p.b)/3
        ctx.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + (this.a / 255) + ')';
        //ctx.fillStyle = 'yellow';
        let diffx = x-this.posX
        let diffy = y-this.posY
        this.vx += this.rand
        this.posY+= this.vx/10
        this.posX += diffx/100
        //var pos = this.circle()
        if(this.posY>this.bottom){
            this.posX = this.x
            this.posY = this.y
            this.stop = 1
        }
        ctx.fillRect(this.posX, this.posY, 1, 1);
    }

    circle(){
        this.angle += 5
        let x = this.posX//+this.radius*Math.sin(this.angle*Math.PI/180)
        let y = this.posY//+this.radius*Math.cos(this.angle*Math.PI/180)
        return {x,y}
    }
}

class Mainmove{
    constructor(data){
        this.x = canvas.width/2
        this.y = 0
        this.vx = 2//初始速度
        this.radius = 10
    }

    move(){
        this.vx +=0.2
        this.y+=this.vx
        this.x += 5*Math.sin(this.y*Math.PI/180);
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, 5, 5);
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
let head = new Mainmove()
img.onload = function() {
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    particles= getPixels(1)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(particles.length)
    setTimeout(animate,300);
};


function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    head.move()
    particles.forEach(p=>{
        p.move(head.x,head.y)
    })

    requestAnimationFrame(animate);
}

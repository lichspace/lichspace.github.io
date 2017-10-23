let img = new Image();
img.src = 'hoho.png';
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
const gravity = 9.8

class Pixel{
    constructor(data){
        this.x = data.x
        this.y = data.y
        this.r = data.r
        this.g = data.g
        this.b = data.b
        this.a = data.a
        this.posY =  data.y
        this.vx = 2//初始速度
        this.bottom = canvas.height - data.y*Math.random()/100
        //console.log(this.bottom)
        return this
    }
    move(){
        ctx.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + (this.a / 255) + ')';
        //let gray = (p.r+p.g+p.b)/3
        this.vx +=3*Math.random()
        this.posY+=this.vx
        if(this.posY>this.bottom) this.posY = this.bottom
        ctx.fillRect(this.x, this.posY, 2, 2);
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
    //console.log(pixels,pixArr)
    return pixArr
}


let particles = []
img.onload = function() {
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    particles= getPixels(1)
    console.log(particles.length)
    setTimeout(animate,1500);
};


function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p=>{
        p.move()
    })
    requestAnimationFrame(animate);
}

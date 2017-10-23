var img = new Image();
img.src = 'hoho.png';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

class Pixel{
    constructor(data){
        this.x = data.x
        this.y = data.y
        this.r = data.r
        this.g = data.g
        this.b = data.b
        this.a = data.a
        this.change =  0
        this.speed = 4*(Math.random()*14+1)
        return this
    }
    move(){
        ctx.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + (this.a / 255) + ')';
        //var gray = (p.r+p.g+p.b)/3
        //ctx.fillStyle = 'rgba(' + gray + ',' + gray + ',' + gray + ',' + (p.a / 255) + ')';
        this.y+=this.speed
        ctx.fillRect(this.x, this.y, 1, 1);
    }
}



var getPixels = (step=1)=>{
    var w = 400
    var h = 400
    var pixels =  ctx.getImageData(0, 0, w, h).data;
    var pixArr = []
    for(var x=1;x<=400;x+=step){
        for(var y=1;y<=400;y+=step){
            var pos = (x+y*400)*4
            var r = pixels[pos]
            var g = pixels[pos+1]
            var b = pixels[pos+2]
            var a = pixels[pos+3]
            var thisPix = {x,y,r,g,b,a}
            var threeClolor = r+g+b
            var gray = threeClolor==0?0:threeClolor/3
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


var particles = []
img.onload = function() {
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    particles= getPixels(1)
    console.log(particles.length)
    //render(particles,3)
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

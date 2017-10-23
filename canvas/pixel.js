var img = new Image();
img.src = '981F5D456F.jpeg';
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
        return this
    }
    move(){
        this.x++
        ctx.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + (this.a / 255) + ')';
        //var gray = (p.r+p.g+p.b)/3
        //ctx.fillStyle = 'rgba(' + gray + ',' + gray + ',' + gray + ',' + (p.a / 255) + ')';
        ctx.fillRect(this.x, this.y, 1, 1);
    }
}



var getPixels = (step=1)=>{
    var w = 400
    var h = 400
    var pixels =  ctx.getImageData(0, 0, w, h).data;
    var pixArr = []
    for(var x=0;x<=400;x+=step){
        for(var y=0;y<=400;y+=step){
            var pos = (x+y*400)*4
            pixArr.push(new Pixel({x,y,r:pixels[pos],g:pixels[pos+1],b:pixels[pos+2],a:pixels[pos+3]}))
        }
    }
    //console.log(pixels,pixArr)
    return pixArr
}

var decrease  = (data)=>{

}


var render = (data,size=1)=>{
    ctx.clearRect(0,0,400,400)
    console.log(data[0].r)
    data.forEach(p=>{
        ctx.fillStyle = 'rgba(' + p.r + ',' + p.g + ',' + p.b + ',' + (p.a / 255) + ')';
        //var gray = (p.r+p.g+p.b)/3
        //ctx.fillStyle = 'rgba(' + gray + ',' + gray + ',' + gray + ',' + (p.a / 255) + ')';
        ctx.fillRect(p.x, p.y, size, size);
    })
}

var particles = []
img.onload = function() {
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    particles= getPixels(2)
    //render(particles,3)
    animate(particles);
};


function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p=>{
        p.move()
    })
    requestAnimationFrame(animate);
}

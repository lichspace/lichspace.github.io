var showall = document.querySelector('.description')
showall&&showall.addEventListener('click',function(e){
    this.classList.toggle('open')
},false)
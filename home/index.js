let $ = selector => document.querySelector(selector)
let render = data=>{
    let html = ''
    Object.keys(data).map(v=>{
        html+=`<h3>${v}</h3>`+data[v].map(v=>`<li><a href="${v.url}" target="_blank">${v.title}</a></li>`).join('')
    })
    $('#root').innerHTML = html
}

fetch('./home/data.json')
.then(function(response) {
    return response.json();
})
.then(function(json) {
    console.log(json);
    render(json)
});
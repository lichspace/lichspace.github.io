/**
 * Created by tangent on 2017/8/5.
 */
require('./novel.scss')

//dom ready
document.addEventListener('DOMContentLoaded',function(){
    require('./js/home.js')


    //工具栏翻页
    var scroolTop = 0;
    window.onscroll = function(){
        var tool = document.querySelector('#tools')
        if(!tool) return;

        if(document.body.scrollTop>scroolTop){
            tool.classList.remove('show')
        }else{
            tool.classList.add('show')
        }
        scroolTop = document.body.scrollTop
    }

}, false);







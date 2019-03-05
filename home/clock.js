document.addEventListener('DOMContentLoaded', () => {
    var date = new Date();
    var until = new Date('2020-01-01 00:00:00');
    // 计算时会发生隐式转换，调用valueOf()方法，转化成时间戳的形式
    var days = (until - date)/1000/3600/24;
    console.log(days)
    new FlipDown(Date.now()/1000+days*24*3600).start()
});

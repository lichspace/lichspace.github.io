/*!
 *  Howler.js Radio Demo
 *  howlerjs.com
 *
 *  (c) 2013-2017, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

/*

一人饮酒醉.mp3                  又见溜溜的她.mp3                平凡之路.mp3                    梅花三弄.mp3
丑八怪.mp3                      外婆的澎湖湾.MP3                我们不一样.mp3                  爱.mp3
东北人都是活雷锋.mp3            大王叫我来巡山.mp3              我们好像在哪见过.mp3            笑红尘.mp3
倍儿爽.mp3                      大花轿.mp3                      最炫小苹果.mp3                  雨花石.mp3
凉凉.mp3                        女儿情.mp3                      朋友.mp3                        青春修炼手册.mp3

 */

var data = [
    {src: '一人饮酒醉.mp3', howl: null},
    {src: '又见溜溜的她.mp3', howl: null},
    {src: '平凡之路.mp3', howl: null},
    {src: '梅花三弄.mp3', howl: null},
    {src: '丑八怪.mp3', howl: null},
    {src: '外婆的澎湖湾.mp3', howl: null},
    {src: '我们不一样.mp3', howl: null},
    {src: '爱.mp3', howl: null},
    {src: '东北人都是活雷锋.mp3', howl: null},
    {src: '大王叫我来巡山.mp3', howl: null},
    {src: '我们好像在哪见过.mp3', howl: null},
    {src: '笑红尘.mp3', howl: null},
    {src: '倍儿爽.mp3', howl: null},
    {src: '大花轿.mp3', howl: null},
    {src: '最炫小苹果.mp3', howl: null},
    {src: '雨花石.mp3', howl: null},
    {src: '凉凉.mp3', howl: null},
    {src: '女儿情.mp3', howl: null},
    {src: '朋友.mp3', howl: null},
    {src: '青春修炼手册.mp3', howl: null},
]
var index = 0;
var ui = {
    playing: function () {
        $('.station .playing').show()
        $('#waveform').show()
        $('.banner').addClass('bannerBomb')
    },
    stop: function () {
        $('.station .playing').hide()
        $('#waveform').hide()
        $('.banner').removeClass('bannerBomb')
    },
    showSongName: function () {
        //console.log(index)
        $('#title0').text(data[index].src)
    },
    next: function () {
        $('#title0').text('...............')
    }
}

var get_player = function (action) {
    data[index].howl&&data[index].howl.stop()
    if (action == 'next') index++
    var item = data[index]
    if (!item) return alert('没有歌曲了')
    if (item.howl) return item.howl
    item.howl = new Howl({
        src: ['./music/'+item.src]
    })
    item.howl.on('end', function () {
        ui.stop()
        //console.log('Finished!');
    });
    return item.howl;
}


$('.tools a').click(function (e) {
    e.preventDefault()
})

$('#start').click(function (e) {
    var sound = get_player()
    sound.play()
    ui.playing()
})

$('#pause').click(function (e) {
    var sound = get_player()
    sound.pause()
    ui.stop()
})

$('#next').click(function (e) {
    var sound = get_player('next')
    sound.play()
    ui.playing()
    ui.next()
})

$('#showsongname').click(ui.showSongName)

//---------------
var wave = new SiriWave({
    container: waveform,
    width: window.innerWidth,
    height: 200,
    cover: true,
    speed: 0.03,
    amplitude: 0.7,
    frequency: 2
});
wave.start();
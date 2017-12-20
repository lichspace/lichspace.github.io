/*!
 *  Howler.js Radio Demo
 *  howlerjs.com
 *
 *  (c) 2013-2017, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
var data = [
    {
        title: "who you",
        src: ['./music/1.mp3'],
        howl: null
    },
    {
        title: "大王叫我来巡山",
        src: ['./music/2.mp3'],
        howl: null
    },
    {
        title: "fantastic baby",
        src: ['./music/3.mp3'],
        howl: null
    }
]
var index = 0;
var ui = {
    playing: function () {
        $('.station .playing').show()
        $('#waveform').show()
    },
    stop: function () {
        $('.station .playing').hide()
        $('#waveform').hide()
    },
    showSongName: function () {
        //console.log(index)
        $('#title0').text(data[index].title)
    },
    next: function () {
        $('#title0').text('.................')
    }
}

var get_player = function (action) {
    if (action == 'next') index++
    var item = data[index]
    if (!item) return alert('没有歌曲了')
    if (item.howl) return item.howl
    item.howl = new Howl({
        src: item.src
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
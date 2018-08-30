/*!
 *  Howler.js Radio Demo
 *  howlerjs.com
 *
 *  (c) 2013-2017, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */



let data = [
    {src: '一人饮酒醉.mp3', howl: null}
]
let index = 0;
let ui = {
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

let get_player = function (action) {
    data[index].howl&&data[index].howl.stop()
    if (action === 'next') index++
    let item = data[index]
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

$('#start').click(function () {
    let sound = get_player()
    sound.play()
    ui.playing()
})

$('#pause').click(function () {
    let sound = get_player()
    sound.pause()
    ui.stop()
})

$('#next').click(function () {
    let sound = get_player('next')
    sound.play()
    ui.playing()
    ui.next()
})

$('#showsongname').click(ui.showSongName)

//---------------
let wave = new SiriWave({
    container: waveform,
    width: window.innerWidth,
    height: 200,
    cover: true,
    speed: 0.03,
    amplitude: 0.7,
    frequency: 2
});
wave.start();
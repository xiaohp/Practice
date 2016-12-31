// 实现一个 HTML5 音乐播放器

var log = function(){
    console.log.apply(console, arguments)
}

/*
视频和音频标签和配套的 JS API 是新加入的功能
以前的话只能依赖 flash, 现在有 video 和 audio


带控制器的音频标签, 不同浏览器有不同的文件格式要求
所以用 2 个 source 标签指定不同的音频格式
<audio id='id-audio-player' controls="controls">
  <source src="audio.ogg">
  <source src="audio.mp3">
</audio >

audio 基本操作如下
var a = document.querySelector('#id-audio-player')
a.play()
a.pause()
a.autoplay
a.src
a.volume
a.duration
a.currentTime = 1
*/

/*
实现播放器的基本界面(不要求 css, 只写 html 即可)
    0, 页面中添加一个 audio 标签, 设置一个 音乐文件（最好取名 1.mp3）
    1, 页面中添加 2 个按钮分别是(播放 暂停)
    3, 给 2 个按钮分别绑定上播放和暂停 audio 的事件
*/

var a = document.querySelector("#id-audio-player")
var playlist = document.querySelector(".playlist")

var bindButtons = function() {
    var playButton = document.querySelector("#id-button-play")
    playButton.addEventListener('click', function(){
        a.play()
        duration.innerHTML = Math.floor(a.duration)
    })

    var pauseButton = document.querySelector("#id-button-pause")
    pauseButton.addEventListener('click', function(){
        a.pause()
    })

    var nextButton = document.querySelector("#id-button-next")
    nextButton.addEventListener('click', function(){
        play(1)
    })

    var previousButton = document.querySelector("#id-button-previous")
    previousButton.addEventListener('click', function(){
        play(-1)
    })
}

/*
加入当前时间和总时间显示
    0, 页面中添加 2 个 span 标签分别用来显示当前时间和总时间
    1, 总时间根据上课资料很好得到
    2, 当前时间是一个动态变化的数据, 最简单的方式是设置一个 setInterval 定时器
        来定时(比如 1s)把 audio 的 currentTime 更新到界面中
*/
// var zfill = function(n, width) {
//     var s = String(n)
//     for (var i = s.length; i < width; i++) {
//         s = '0' + s
//     }
//     return s
// }


var currentTime = document.querySelector("#id-span-currentTime")
var duration = document.querySelector("#id-span-duration")

setInterval(function(){
    var currentTime = a.currentTime
    currentTime.innerHTML = Math.floor(currentTime)
    var progressInput = document.querySelector("#id-input-progress")
    progressInput.value = currentTime / a.duration * 100
    // console.log('时间到')
}, 1000)

/*
实现播放列表
    0, 在目录中放 3 首歌 1.mp3 2.mp3 3.mp3
    1, 界面中显示 3 个 div, 在 data-path 属性中 存储 1.mp3 这样的文件名
    2, 给 3 个 div 绑定 click 事件, 在点击的时候切换 audio 的 src 属性
    3, 需要注意的是, 你切换 audio.src 后调用 audio.play() 是无效的
        因为浏览器需要一定的时间加载音乐文件, 你必须等待加载完成后才能播放
        audio 标签有一个 canplay 事件, 会在加载结束后触发
        在这个事件中调用播放函数即可解决问题
*/

var bindList = function() {
    var songs = document.querySelectorAll(".song")

    for (var i = 0; i < songs.length; i++) {
        var song = songs[i]
        song.addEventListener('click', function(event){
            var self = event.target
            a.src = self.dataset.path
            var index = self.id.slice(5)
            playlist.dataset.active = index
        })
    }

    a.addEventListener('canplay', function(event){
        a.play()
        duration.innerHTML = Math.floor(a.duration)
        changeTitle()
    })
}

/*

实现循环播放列表
    0, 用一个数组存储所有的音乐路径
    1, audio 标签有一个 ended 事件, 会在播放结束后触发
        用这个事件实现播放结束自动播放下一首
*/

var list = [
    "1.mp3",
    "2.mp3",
    "3.mp3",
]

var play = function(offset) {
    var number = list.length
    var index = parseInt(playlist.dataset.active)
    var nextIndex = (index + offset + number) % number
    // log('number ', number, 'index ', index, 'nextIndex ', nextIndex)
    a.src = list[nextIndex]
    playlist.dataset.active = nextIndex
}

var playNext = function() {
    play(1)
}

var playPrevious = function() {
    play(-1)
}

var binPlayRepeat = function() {
    a.addEventListener('ended', function(event){
        playNext()
    })
}

var changeTitle = function() {
    var title = document.querySelector('#id-h1-title')
    var index = playlist.dataset.active
    var songs = document.querySelectorAll('.song')
    var song = songs[index]
    var songName = song.innerHTML
    title.innerHTML = songName
    // log('index ', index, 'song ',song)
}

var bindVolume = function() {
    var volumeInput = document.querySelector("#id-input-volume")
    volumeInput.addEventListener('change', function(event){
        var value = event.target.value
        a.volume = value / 100
    })
}

var bindProgress = function() {
    var progressInput = document.querySelector("#id-input-progress")
    progressInput.addEventListener('change', function(event){
        var value = event.target.value
        var duration = a.duration
        a.currentTime = value * duration / 100
    })
}

var __main = function() {
    bindButtons()
    bindList()
    binPlayRepeat()
    bindVolume()
    bindProgress()
}
__main()

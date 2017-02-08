// 实现一个 HTML5 音乐播放器
var log = function(){
    console.log.apply(console, arguments)
}

var a = document.querySelector("#id-audio-player")
var playlist = document.querySelector(".playlist")

// 绑定按钮事件
var bindButtons = function() {
    var playButton = document.querySelector("#id-button-play")
    playButton.addEventListener('click', function(){
        if (a.paused) {
            a.play()
            playButton.classList.remove("play")
            playButton.classList.add("pause")
            duration.innerHTML = secondToMinute(a.duration)
        } else {
            a.pause()
            playButton.classList.remove("pause")
            playButton.classList.add("play")
        }

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


// 时间处理函数，把播放秒数转为分秒显示
var secondToMinute = function(time) {
    var time = Math.round(time)
    var minute = Math.floor(time / 60)
    var second = time - minute * 60
    if (second < 10) {
        second = '0' + second
    }
    var res = `${minute}:${second}`
    return res
}

var duration = document.querySelector("#id-span-duration")
// 绑定播放列表事件，点击列表切换歌曲
var bindList = function() {
    var songs = document.querySelectorAll(".song")
    for (var i = 0; i < songs.length; i++) {
        var song = songs[i]
        song.addEventListener('click', function(event){
            // 获取点击 ID
            var self = event.target
            var index = self.id.slice(5)
            // 切换音乐和封面
            a.src = list[index]
            playlist.dataset.active = index
            var cover = document.querySelector(".cover")
            cover.src = coverList[index]
        })
    }
    // 加载音乐文件后，播放音乐，显示总时长，显示标题
    a.addEventListener('canplay', function(event){
        a.play()
        duration.innerHTML = secondToMinute(a.duration)
        changeTitle()
        var playButton = document.querySelector("#id-button-play")
        playButton.classList.remove("play")
        playButton.classList.add("pause")
    })
}
// 播放列表数组, 存储文件路径
var list = [
    "1.mp3",
    "2.mp3",
    "3.mp3",
]

var coverList = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
]

var play = function(offset) {
    var number = list.length
    var index = parseInt(playlist.dataset.active)
    var nextIndex = (index + offset + number) % number
    a.src = list[nextIndex]
    var cover = document.querySelector(".cover")
    cover.src = coverList[nextIndex]
    playlist.dataset.active = nextIndex
}
// 播放下一首
var playNext = function() {
    play(1)
}
// 播放上一首
var playPrevious = function() {
    play(-1)
}

// 歌曲结束后自动播放下一首
var binPlayRepeat = function() {
    a.addEventListener('ended', function(event){
        playNext()
    })
}

// 改变播放歌曲标题
var changeTitle = function() {
    var title = document.querySelector('#id-h3-title')
    var index = playlist.dataset.active
    var songs = document.querySelectorAll('.song')
    var song = songs[index]
    var songName = song.innerHTML
    title.innerHTML = songName
}

// 绑定音量控制
var bindVolume = function() {
    var volumeInput = document.querySelector("#id-input-volume")
    volumeInput.addEventListener('change', function(event){
        var value = event.target.value
        a.volume = value / 100
    })
}

var bindProgress = function() {
    // 拖动进度条控制播放进度
    var progressInput = document.querySelector("#id-input-progress")
    progressInput.addEventListener('change', function(event){
        var value = event.target.value
        var duration = a.duration
        a.currentTime = value * duration / 100
    })
    // 进度条随着播放进度滚动
    var currentTime = document.querySelector("#id-span-currentTime")
    var duration = document.querySelector("#id-span-duration")
    setInterval(function(){
        currentTime.innerHTML = secondToMinute(a.currentTime)
        progressInput.value = a.currentTime / a.duration * 100
    }, 1000)
}

var __main = function() {
    bindButtons()
    bindList()
    binPlayRepeat()
    bindVolume()
    bindProgress()
}
__main()

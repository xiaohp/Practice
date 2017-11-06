var playImg = function(offset) {
    var slide =document.querySelector('.slide-container')
    // 得到图片总数和当前图片下标
    var numberOfImgs = parseInt(slide.dataset.imgs)
    var activeIndex = parseInt(slide.dataset.active)
    var nextIndex = (activeIndex + offset + numberOfImgs) % numberOfImgs
    // 设置 slide 节点的 data-active
    slide.dataset.active = nextIndex
    // 切换图片
    var className = 'img-active'
    removeClassAll(className)
    var img = document.querySelectorAll('.slide-image')[nextIndex]
    img.classList.add(className)
    // 改变指示器
    var indiClassName = 'indicator-active'
    removeClassAll(indiClassName)
    var indi = document.querySelectorAll('.slide-indi')[nextIndex]
    indi.classList.add(indiClassName)
}

var playNext = function() {
    playImg(1)
}

var playPrevious = function() {
    playImg(-1)
}

var bindEventSlide = function() {
    var selector = '.slide-button'
    bindAll(selector, 'click', function(event){
        var target = event.target
        if (target.classList.contains('button-next')) {
            playNext()
        } else if (target.classList.contains('button-previous')) {
            playPrevious()
        }
    })
}

// 实现轮播图的小圆点切换显示
var bindEventIndicator = function() {
    var selector = '.slide-indi'
    bindAll(selector, 'mouseover', function(event){
        var target = event.target
        var slide = target.closest('.slide-container')
        // 得到图片总数和当前图片下标
        var numberOfImgs = parseInt(slide.dataset.imgs)
        var activeIndex = parseInt(slide.dataset.active)
        // 得到下一张图片下标
        var index = target.id.slice(8)
        slide.dataset.active = index
        // 删除当前图片的 class 给下一张图片加上 class
        var className = 'img-active'
        removeClassAll(className)
        var img = document.querySelectorAll('.slide-image')[index]
        img.classList.add(className)
        // 改变指示器
        var indiClassName = 'indicator-active'
        removeClassAll(indiClassName)
        var indi = document.querySelectorAll('.slide-indi')[index]
        indi.classList.add(indiClassName)
    })
}


// 使用定时器实现轮播图的自动播放
var timePlay = function() {
    var auto = setInterval(function(){
        playNext()
    }, 1000)
    var slide = document.querySelector(".slide-container")
    slide.addEventListener('mouseover', function(){
        clearInterval(auto)
    })
    slide.addEventListener('mouseout', function(){
        auto = setInterval(function(){
            playNext()
        }, 1000)
    })
}

var __main = function() {
    bindEventSlide()
    bindEventIndicator()
    timePlay()
}

__main()

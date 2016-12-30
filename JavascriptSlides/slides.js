/*
实现轮播图，使用按钮切换上一张和下一张
    1, 添加一个 上一张 按钮(不需要设置它的 css)
    2, 给它绑定一个 click 事件
    3, 在 click 的时候, 根据上课中 下一张 按钮的事件响应来实现 上一张 的功能
*/
var playImg = function(offset) {
    var slide =document.querySelector('.gua-slide')
    // 得到图片总数和当前图片下标
    var numberOfImgs = parseInt(slide.dataset.imgs)
    var activeIndex = parseInt(slide.dataset.active)

    var nextIndex = (activeIndex + offset + numberOfImgs) % numberOfImgs
    // 设置 slide 节点的 data-active
    slide.dataset.active = nextIndex
    var imgSelector = '#id-guaimage-' + String(nextIndex)
    var indiSelector = '#id-indi-' + String(nextIndex)
    // 切换图片
    var className = 'gua-active'
    removeClassAll(className)
    var img = e(imgSelector)
    img.classList.add(className)
    // 改变指示器
    var indiClassName = 'gua-white'
    removeClassAll(indiClassName)
    var indi = e(indiSelector)
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
        if (target.classList.contains('gua-slide-next')) {
            playNext()
        } else if (target.classList.contains('gua-slide-previous')) {
            playPrevious()
        }
    })
}


// 上实现轮播图的小圆点切换显示，在 下一张/上一张 按钮的事件处理函数中也给对应 index 的小圆点加上相应的 class

var bindEventIndicator = function() {
    var selector = '.gua-slide-indi'
    bindAll(selector, 'mouseover', function(event){
        var target = event.target
        var slide = target.closest('.gua-slide')
        // 得到图片总数和当前图片下标
        var numberOfImgs = parseInt(slide.dataset.imgs)
        var activeIndex = parseInt(slide.dataset.active)
        var index = target.id.slice(8)
        slide.dataset.active = index
        var imgSelector = '#id-guaimage-' + String(index)
        // 删除当前图片的 class 给下一张图片加上 class
        var className = 'gua-active'
        removeClassAll(className)
        var img = e(imgSelector)
        img.classList.add(className)

        // 改变指示器
        var indiSelector = '#id-indi-' + String(index)
        var indiClassName = 'gua-white'
        removeClassAll(indiClassName)
        var indi = e(indiSelector)
        indi.classList.add(indiClassName)
    })
}

/*
使用定时器实现轮播图的自动播放
    1, 把 下一张 功能做成一个函数 playNext()
    2, 使用 setInterval 函数来实现定时触发功能, 例子如下
*/
var timePlay = function() {
    var auto = setInterval(function(){
        playNext()
    }, 1000)
    var slide = document.querySelector(".gua-slide")
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

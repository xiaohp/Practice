var play = function(offset) {
    var activeIndex = $('.slide-images').data('active')
    var numberOfImgs = $('.slide-images').data('imgs')

    var i = (activeIndex + numberOfImgs + offset) % numberOfImgs
    $('.slide-images').data('active', i)
    // 改变图片
    var currentImg = $('.slide-img-active')
    currentImg.fadeOut()
    currentImg.removeClass('slide-img-active')
    var active = $($('.slide-img')[i])
    active.addClass('slide-img-active')
    active.fadeIn()
    // 改变指示器
    $('.indicator-active').removeClass('indicator-active')
    var activeIndicator = $($('.slide-indicator')[i])
    activeIndicator.addClass('indicator-active')
}

var playPrev = function() {
    play(-1)
}

var playNext = function() {
    play(1)
}

var bindButton = function() {
    $('.slide-button').on('click', function(event) {
        var button = $(event.target)
        if (button.hasClass('slide-button-left')) {
            playPrev()
        } else {
            playNext()
        }
    })
}

var playMouse = function(index) {
    var i = index - 1
    $('.slide-images').data('active', i)
    var currentImg = $('.slide-img-active')
    currentImg.fadeOut()
    currentImg.removeClass('slide-img-active')

    var active = $($('.slide-img')[i])
    active.addClass('slide-img-active')
    active.fadeIn()
    // 改变指示器
    $('.indicator-active').removeClass('indicator-active')
    var activeIndicator = $($('.slide-indicator')[i])
    activeIndicator.addClass('indicator-active')
}

var bindIndicator = function() {
    $('.slide-indicator').on('mouseover', function(event) {
        var value = $($(event.target)).text()
        playMouse(value)
    })
}

var timePlay = function() {
    var auto = setInterval(function() {
        playNext()
    }, 2000)
    var slide = document.querySelector(".slide-container")
    slide.addEventListener('mouseover', function() {
        clearInterval(auto)
    })
    slide.addEventListener('mouseout', function() {
        auto = setInterval(function() {
            playNext()
        }, 2000)
    })
}

var __main = function() {
    bindButton()
    bindIndicator()
    timePlay()
}

__main()

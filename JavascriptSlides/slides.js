// 2016/12/18
//
// 此为第 12 课的作业
// 在上课代码的基础上完成下面的功能
// 有不会实现的效果完全没关系, 讨论或者跳过
// 尽力能做多少做多少, 不懂早点问, 不要闷头造车浪费时间


/*
作业 1
实现标签页效果, 步骤如下(标签页效果就是 chrome 浏览器的多页面效果)
    0, 假设一共有 3 个标签页
    1, 用 3 个 button 当做标签切换的按钮(加上 class)
    2, 用 3 个 div 来显示内容(加上 class), 并且加上隐藏显示的样式(默认不显示)
    3, 给这 3 个 button 添加 data-index 属性来标记他们代表的 div
    4, 给 3 个 button 绑定 click 事件, 点击的时候让它们所代表的 div 显示(加上某个 class)
        并且把之前显示的 div 隐藏掉(删掉那个用于显示的 class)
*/
var bindTabs = function() {
    var buttons = document.querySelectorAll('.switch')
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i]
        button.addEventListener('click', function(event){
            var target = event.target
            var index = target.dataset.index
            var tab = target.parentElement
            var tabContents = tab.querySelectorAll('.tabContent')
            var activeTab = tabContents[index]
            removeClassAll('tabActive')
            activeTab.classList.add('tabActive')
            // log('按钮点击到的 index ', activeTab)
        })
    }
}
bindTabs()
/*
作业 2
点击切换图片的相册
    0, 相册分上下两栏, 上面用来显示当前的大图, 下面用来显示一排缩略图
        当用户点击下面的缩略图的时候, 上面的大图切换为被点击的缩略图
    1, 先写出 html, 假设有 3 张图片, 上面是一个 img 标签, 下面是 3 个 img 标签
    2, 给下面的 img 标签绑定上 click 事件
    3, 通过 img.src 这个属性来读取/设置 img 标签的图片, 这样就能实现功能了
*/
var bindGallery = function() {
    var indicateImgs = document.querySelectorAll('.indicateImg')
    for (var i = 0; i < indicateImgs.length; i++) {
        var indicateImg = indicateImgs[i]
        indicateImg.addEventListener('click', function(event){
            var target = event.target
            var index = target.dataset.index
            var bigpicture = document.querySelector('.bigpicture')
            bigpicture.src = `galleryImages/${index}.jpg`
            // log('click')
        })
    }
}
bindGallery()
/*
作业 3
切换皮肤（主题）功能
    0, 不同的皮肤就是不同的 css, 换肤就是切换 css 文件, 假设我们做 2 套皮肤切换
    1, 最简单方便的换肤方式是把两套皮肤写在 2 个 css 文件中
    2, 页面中添加 2 个按钮用于切换 2 套皮肤
    3, 点击按钮的时候在 head 中添加一个 link 标签(引用 css)
        并且需要删除之前皮肤的 link 标签
    4, 如果不明白就等答案
*/
var themeChange = function() {
    var light = document.querySelector('.lightmode')
    var dark = document.querySelector('.darkmode')
    var theme = document.querySelector('.theme')
    theme.addEventListener('click', function(event){
        var target = event.target
        var link = document.querySelector('link')
        if (target.classList.contains('lightmode')) {
            link.href = 'light.css'
        } else if (target.classList.contains('darkmode')) {
            link.href = 'dark.css'
        }
    })
}
themeChange()
/*
作业 4
实现轮播图 上一张 按钮
    0, 在上课代码的基础上实现这个功能
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
bindEventSlide()
/*
作业 5
在上课代码的基础上实现轮播图的小圆点切换显示
    0, 在上课代码的基础上实现这个功能
    1, 在 下一张/上一张 按钮的事件处理函数中也给对应 index 的小圆点加上相应的 class
    2, 如果有问题, 可以在群里讨论
// */
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

bindEventIndicator()

/*
作业 6
使用定时器实现轮播图的自动播放（等我的资料）
    0, 在上课代码的基础上实现这个功能
    1, 把 下一张 功能做成一个函数 playNext()
    2, 使用 setInterval 函数来实现定时触发功能, 例子如下

这个函数接受两个参数
第一个参数是一个函数
第二个函数是一个以毫秒为单位的数字
下面的代码会每 1000 毫秒(1 秒)执行一次第一个参数提供的函数(也就是输出 时间到 )
setInterval(function(){
    console.log('时间到')
}, 1000)
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
timePlay()

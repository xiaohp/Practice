var detectZoom = function(){ 
    var ratio = 0
    var screen = window.screen
    var ua = navigator.userAgent.toLowerCase()

    if( ~ua.indexOf('firefox') ){
        if( window.devicePixelRatio !== undefined ){
            ratio = window.devicePixelRatio
        }
    }
    else if( ~ua.indexOf('msie') ){    
        if( screen.deviceXDPI && screen.logicalXDPI ){
            ratio = screen.deviceXDPI / screen.logicalXDPI
        }
    }
    else if( window.outerWidth !== undefined && window.innerWidth !== undefined ){
        ratio = window.outerWidth / window.innerWidth
    }

    if( ratio ){
        ratio = Math.round( ratio * 100 )
    }

    // 360安全浏览器下的innerWidth包含了侧边栏的宽度
    if( ratio !== 100 ){
        if( ratio >= 95 && ratio <= 105 ){
            ratio = 100;
        }
    }

    return ratio
};


var container = $('.detect-container')
var timer = setInterval(function(){
    var ratio = detectZoom()
    if (ratio == 100) {
        container.hide()
    }
    if( ratio < 100 || ratio > 100){
        container.show()
    } 
})
 
var bindEvent = function(){
    $('.detect-close').on('click', function(e){
        clearInterval(timer)
        container.hide()
    })
}


$(document).ready(function(){
    bindEvent()
})

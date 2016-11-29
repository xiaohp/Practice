var log = function() {
    console.log.apply(console, arguments)
}

var Options1 = function(options) {
    /*
    options 是一个包含 string 的数组
    本函数对每个 string 生成一个复选框和文本
    append 到 body 中
    示意图如下

    +-+
    | | string
    +-+

    */
    for (var i = 0; i < options.length; i++) {
        var t = `
            <div class="checks">
                <input type="checkbox">${options[i]}
            </div>`
        $('body').append(t)
    }
}

arr = ['做饭', '睡觉',]
// log('15-1加载完成')
// Options1(arr)

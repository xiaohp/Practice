

var log = function() {
    console.log.apply(console, arguments)
}

var Options2 = function(options) {
    /*
    options 是一个包含 string 的数组
    本函数对每个 string 生成一个复选框和文本
    append 到 body 中
    多了 2 个按钮
    全选 和 反选
    */
    for (var i = 0; i < options.length; i++) {
        var t = `
            <div class='checks'>
                <input class="check" type="checkbox">${options[i]}
            </div>`
        $('body').append(t)
    }

    var button = `
        <button class="select selectAll">全选</button>
        <button class="select selectInverse">反选</button>`
    $('body').append(button)

    $('.selectAll').on('click', function(event){
        $('.check').each(function(index, element){
            $(element).attr('checked', 'checked')
        })
    })

    $('.selectInverse').on('click', function(event){
        $('.check').each(function(index, element){
            if ($(element).attr('checked')) {
                $(element).removeAttr('checked')
            } else {
                $(element).attr('checked', 'checked')
            }

        })
    })
}

// arr = ['做饭','睡觉', '学习',]
// log('15-1加载完成')
// Options2(arr)

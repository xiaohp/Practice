

var log = function() {
    console.log.apply(console, arguments)
}

var Options3 = function(options) {
    /*
    options 是一个包含如下 object 的数组
    text 是文本描述
    checked 是布尔值, 表示是否打勾
    {
        'text': 'string',
        'checked': true,
    }
    要求在初始化的时候要按照相应的值对相应的复选框打勾
    */
    for (var i = 0; i < options.length; i++) {
        var t = `
            <div class='checks'>
                <input class="check" type="checkbox">${options[i].text}
            </div>`
        $('body').append(t)
        
    }

    var button = `
        <button class="select selectAll">全选</button>
        <button class="select selectInverse">反选</button>`
    $('body').append(button)



    $('.selectAll').on('click', function(event){
        $('.check').each(function(index, element){
            $(element).attr('checked', true)
        })
    })

    $('.selectInverse').on('click', function(event){
        $('.check').each(function(index, element){
            if ($(element).attr('checked')) {
                $(element).attr('checked', false)
            } else {
                $(element).attr('checked', true)
            }

        })
    })
}

obj = [
    {'text': '做饭',
    'checked': false,},
    {'text': '学习',
    'checked': true,},
    {'text': '睡觉',
    'checked': true,},
    ]

log('15-3加载完成')
Options3(obj)

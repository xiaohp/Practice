var log = function() {
    console.log.apply(console, arguments)
}

var Options = function(options) {
    for (var i = 0; i < options.length; i++) {
        var t = `
            <div class='checks'>
                <label><input class="check" type="checkbox">${options[i].text}</label>
            </div>`
        $('body').append(t)

    }

    var button = `
        <button class="select selectAll">全选</button>
        <button class="select selectInverse">反选</button>`
    $('body').append(button)



    $('.selectAll').on('click', function(event) {
        $('.check').each(function(index, element) {
            $(element).attr('checked', true)
        })
    })

    $('.selectInverse').on('click', function(event) {
        $('.check').each(function(index, element) {
            if ($(element).attr('checked')) {
                $(element).attr('checked', false)
            } else {
                $(element).attr('checked', true)
            }

        })
    })
}


var __main = function() {
    obj = [{
            'text': '做饭',
            'checked': false,
        },
        {
            'text': '学习',
            'checked': true,
        },
        {
            'text': '睡觉',
            'checked': true,
        },
    ]

    Options(obj)
}
__main()

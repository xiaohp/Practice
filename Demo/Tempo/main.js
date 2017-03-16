
var data = [
    {
        'name': 'Alex',
        'group': '高级会员',
        'state': 0,
        'state_text': '正常'
    },
    {
        'name': 'Leonard',
        'group': '普通会员',
        'state': 1,
        'state_text': '黑名单'
    }
]

for (var i = 0; i < data.length; i++) {
    let d = data[i]
    if (d.state == 0) {
        d["state_class"] = 'normal'
    } else if (d.state == 1) {
        d["state_class"] = 'block'
    }
    console.log(d)
}


console.log('debug-------------', data)

var member_data = Tempo.prepare('member', { 'escape': false })
member_data.render(data)

// 自定义 log 函数
var log = function() {
    console.log.apply(console, arguments)
}


// 给 add button 绑定添加 todo 事件
var addButton = document.querySelector('#id-button-add')
addButton.addEventListener('click', function(){
    // 获得 input.value
    var todoInput = document.querySelector('#id-input-todo')
    var todo = todoInput.value
    // 新添加的 todo 为未完成状态
    insertTodo(todo, false)
    saveTodos()
})

var insertTodo = function(todo, done) {
    // 添加到 container 中
    var todoContainer = document.querySelector('#id-div-container')
    var t = templateTodo(todo, done)
    // 这个方法用来添加元素更加方便, 不需要 createElement
    todoContainer.insertAdjacentHTML('beforeend', t);
}

var templateTodo = function(todo, done) {
    var status = ''
    if (done) {
        status = 'done'
    }
    var t = `
        <div class='todo-cell ${status}'>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <span contenteditable='true' class='todo-content'>${todo}</span>
        </div>
    `
    return t
}

var todoContainer = document.querySelector('#id-div-container')

// 通过 event.target 的 class 检查点击的是什么
todoContainer.addEventListener('click', function(event){
    log('container click', event, event.target)
    var target = event.target
    if(target.classList.contains('todo-done')) {
        log('done')
        // 给 todo div 开关一个状态 class
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
        saveTodos()
    } else if (target.classList.contains('todo-delete')) {
        // log('delete')
        var todoDiv = target.parentElement
        todoDiv.remove()
        saveTodos()
    }
})
// 辅助函数开关元素的某个 class
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}
// 编辑 todo 时，失去焦点保存
todoContainer.addEventListener('blur', function(event){
    log('container blur', event, event.target)
    var target = event.target
        if (target.classList.contains('content')) {
            log('blur')
            saveTodos()
        }
})
// 保存数组到 localStorage
var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}
// 保存 todo 列表
var saveTodos = function() {
    var contents = document.querySelectorAll('.todo-content')
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            'done': done,
            'content': c.innerHTML,
        }
        // 添加到数组中
        todos.push(todo)
    }
    // 保存数组
    save(todos)
}
// 从 localStorage 读取数据
var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}
// 将 todo 列表添加到页面
var loadTodos = function() {
    var todos = load()
    log('load todos', todos)
    // 添加到页面中
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        insertTodo(todo.content, todo.done)
    }
}

loadTodos()

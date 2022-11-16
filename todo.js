function onPageLoaded() {
    const todoInput = document.querySelector('.js-todo-input');
    const todoList = document.querySelector('.js-todo-list');
    const todoSave = document.querySelector('.js-btn-save');
    const todoClear = document.querySelector('.js-btn-clear');

    //create todoItem
    function createTodo() {
        //text part
        const todoLi = document.createElement('li');
        const todoTextSpan = document.createElement('span');
        const newTodoText = todoInput.value;

        todoTextSpan.classList.add('todo-item__text');
        if (newTodoText.trim() == '') {
            return;
        } else {
            todoTextSpan.append(newTodoText);
        }
        todoLi.classList.add('todo-item');

        //delete btn
        const todoDeleteBtn = document.createElement('button');
        const todoDeleteBtnIcon = document.createElement('i');

        todoDeleteBtn.classList.add('todo-item__btn', 'btn_trash', 'js-btn-trash');
        todoDeleteBtnIcon.classList.add('icon-trash');
        todoDeleteBtn.appendChild(todoDeleteBtnIcon);

        //create list
        todoList.appendChild(todoLi).append(todoTextSpan, todoDeleteBtn);
        todoInput.value = '';
        listenDeleteTodo(todoDeleteBtn);
    }

    //delete list item
    function listenDeleteTodo(element) {
        element.addEventListener('click', (event) => {
           element.parentElement.remove();
           event.stopPropagation();
        });
    }

    //create after press ENTER key
    todoInput.addEventListener('keypress', (keyPressed) => {
        const keyEnter = 13;

        if (keyPressed.which == keyEnter) {
            createTodo();
        }
    });

    //check state after click list item
    function onClickTodo(event) {
        console.log(event.target.className);
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('is-checked');
        }
    }
    todoList.addEventListener('click', onClickTodo);

    //save and clear localStorage with todos
    todoSave.addEventListener('click', () => {
        localStorage.setItem('todos', todoList.innerHTML);
    });

    todoClear.addEventListener('click', () => {
        todoList.innerHTML = "";
        localStorage.removeItem('todos', todoList.innerHTML);
    });

    //load todos from storage for another window
    function loadTodos() {
        const data = localStorage.getItem('todos');

        if (data) {
            todoList.innerHTML = data;
        }

        const todoDeleteButtons = document.querySelectorAll('.js-btn-trash');
        for (const button of todoDeleteButtons) {
            listenDeleteTodo(button);
        }
    }

    loadTodos();
}

document.addEventListener('DOMContentLoaded', onPageLoaded);
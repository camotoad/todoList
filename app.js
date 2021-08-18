//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const errorText = document.querySelector('.error-text');

//event listeners
document.addEventListener("DOMContentLoaded", loadTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', buttonCheck);
filterOption.addEventListener('click', filterTodo);


//functions
function resetText(){
    todoInput.value = '';
    errorText.innerHTML = '';
    errorText.style.display = 'none';
}

function errtxt(text){
    errorText.style.display = 'block';
    errorText.innerHTML = '<i class="fa fa-times-circle"></i>' + text;
}

function addTodo(event){
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add('completed-btn');
    
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';
    deleteButton.classList.add('delete-btn');

    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);

    saveTodos(todoInput.value);

    resetText();
}

function buttonCheck(event){
    const item = event.target;
    const todo = item.parentElement;

    switch(item.classList[0]){
        case 'delete-btn':
            deleteTodos(todo);
            todo.remove();
            console.log('deleted ' + item);      
            break;
        case 'completed-btn':
            console.log('completed ' + item)
            todo.classList.toggle('completed');       
            break;
    } 
}

function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'incomplete':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            default:
                break;
        }
    });
}

function loadTodos(){
    resetText();

    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"> </i>';
        completedButton.classList.add('completed-btn');
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';
        deleteButton.classList.add('delete-btn');

        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);
    })
}

function saveTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
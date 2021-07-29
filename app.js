const db = require('mongoose').model('todo');

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
    
    const newEntry = new db({
        item: todoInput.value,
        status: false
    });

    newEntry.save((err) => {
        if(err){
            errtxt(err);
        } else {
            todoDiv.appendChild(newTodo);
            todoDiv.appendChild(completedButton);
            todoDiv.appendChild(deleteButton);
            todoList.appendChild(todoDiv);
        }
    });

    resetText();
}

function buttonCheck(event){
    const item = event.target;
    const todo = item.parentElement;

    switch(item.classList[0]){
        case 'delete-btn':
            //console.log(todo.childNodes[0].innerText);
            db.findOneAndDelete({item : todo.childNodes[0].innerText }, function(err, item){
                if(err){ 
                    errtxt(err);
                } else {
                todo.remove();
                console.log('deleted ' + item);
                }
            });       
            break;
        case 'completed-btn':
            db.findOneAndUpdate({ item : todo.childNodes[0].innerText }, { status : true} , {upsert: true}, 
                function(err, item){
                    if(err){
                        errtxt(err);
                    } else {
                        console.log('completed ' + item)
                        todo.classList.toggle('completed');
                    }
            });           
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

    db.find({}, function(err, items) {
        if(err){
            errtxt(err);
        } else {
            items.forEach((item) => {
                const todoDiv = document.createElement('div');
                todoDiv.classList.add('todo');

                const newTodo = document.createElement('li');
                newTodo.innerText = item.item;
                newTodo.classList.add('todo-item');
                todoDiv.appendChild(newTodo);

                const completedButton = document.createElement('button');
                completedButton.innerHTML = '<i class="fas fa-check"> </i>';
                completedButton.classList.add('completed-btn');
                todoDiv.appendChild(completedButton);

                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';
                deleteButton.classList.add('delete-btn');
                todoDiv.appendChild(deleteButton);

                todoList.appendChild(todoDiv);

                if(item.status){
                    todoDiv.classList.toggle('completed');
                }
            });
        }
    })
}
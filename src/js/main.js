import '../scss/styles.scss'

import * as bootstrap from 'bootstrap'

import { DBService } from '../../services/db-service'

import { Manager } from '../../model/manager'

import { Todo } from '../../model/todo'

document.querySelector('form').addEventListener('submit', ()=>addTodo());

document.getElementById('orderAZ').addEventListener('click', ()=>orderByTitle());
document.getElementById('orderDate').addEventListener('click', ()=>orderByDate());

let manager;

DBService.getAllTodos().then(todos => {
    manager = new Manager(todos);
    render();
})

const showButton = document.getElementById("showDialog");

const newShowDialog = document.getElementById("newShowDialog");

const confirmBtn = newShowDialog.querySelector("#confirmBtn");

const cancelButton = newShowDialog.querySelector('#cancelButton')

showButton.addEventListener("click", () => {
  newShowDialog.showModal();
});

cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    newShowDialog.close(); 
});

function render(){
    
    const todoContainer=document.getElementById('todo-container'); 
    todoContainer.innerHTML= '';

    const row = document.createElement('div');
    row.classList.add('row');

    for (let i = 0; i < manager.todoArray.length; i++) {

        const todo = manager.todoArray[i];

        const div=document.createElement('div');
        div.classList.add('card');
        const column = document.createElement('div');
        column.classList.add('col');
        div.style = 'width: 20rem';

        if(todo.isCompleted){
            // div.classList.add('todo-completed');
            div.classList.add('compShad')
            // div.style.boxShadow='0px 9px 42px -6px #71967b';
        } else {
            div.classList.add('uncompShad')
            // div.style.boxShadow= '0px 9px 35px -6px #967171';
        }

        const divBody = document.createElement('div');
        divBody.classList.add('card-body');

        const titleStrong=document.createElement('h5');
        const titleNode=document.createTextNode(todo.title);
        titleStrong.classList.add('card-title');

        titleStrong.appendChild(titleNode);
        divBody.appendChild(titleStrong);
        
        const [dateNoTime] = todo.creationDate.toISOString().split('T')

        const dateSpan=document.createElement('span');
        const dateNode=document.createTextNode('Creation date:' + ' ' + dateNoTime);
        dateSpan.classList.add('card-text'); // data

        dateSpan.appendChild(dateNode);
        divBody.appendChild(dateSpan);

        const completeBtn = document.createElement('button');
        const completeNode = document.createTextNode( todo.isCompleted ? 'Uncomplete' : 'Completed');
        completeBtn.classList.add('btn', 'btn-primary');
        completeBtn.type = 'button';
        completeBtn.addEventListener('click', () => {

            const modifiedTodo = {...todo};

            if (modifiedTodo.isCompleted === true) {
                modifiedTodo.isCompleted = false;
            } else {
                modifiedTodo.isCompleted = true;
            }

            // modifiedTodo.isCompleted = !modifiedTodo.isCompleted;

            DBService.updateTodo(modifiedTodo).then(res => {
                manager.changeCompleteStatus(i);
                render();
            })

            
            // StorageService.saveData(manager.todoArray);
            
        });
        // completeBtn.addEventListener('mouseover', () => div.style.borderWidth = '3px');
        // completeBtn.addEventListener('mouseleave', () => div.style.borderWidth = '1px');

        completeBtn.appendChild(completeNode);
        divBody.appendChild(completeBtn);


        const deleteBtn = document.createElement('button');
        const deleteNode = document.createTextNode('Delete');
        deleteBtn.classList.add('btn', 'btn-primary');
        deleteBtn.type = 'button';
        deleteBtn.addEventListener('click', () => {

            DBService.deleteTodo(todo.id).then(() => {
                manager.deleteTodo(i);
                render();
            });
            
            
            // StorageService.saveData(manager.todoArray);
            
        });
        // completeBtn.addEventListener('mouseover', () => div.style.borderWidth = '3px');
        // completeBtn.addEventListener('mouseleave', () => div.style.borderWidth = '1px');

        deleteBtn.appendChild(deleteNode);
        divBody.appendChild(deleteBtn);

        div.appendChild(divBody);

        // const detailBtn = document.createElement('button');
        // const detailBtnNode = document.createTextNode('dettaglio');
        // detailBtn.addEventListener('click', () => {
        //     sessionStorage.setItem('selectedTodo', JSON.stringify(todo));
        //     window.location.href = './detail.html';
        // });

        // detailBtn.appendChild(detailBtnNode);
        // div.appendChild(detailBtn);

        column.appendChild(div);
        row.appendChild(column);
        todoContainer.appendChild(row);
    }
}

function orderByTitle(){
    manager.orderTodosByTitle();
    render();
}

function orderByDate(){
    manager.orderTodosByDate();
    render();
}

function addTodo(){
    const input = document.getElementById('title')
    const newTodoTitle = input.value;
    if(newTodoTitle.trim() !== ''){

        const newTodo = new Todo(newTodoTitle, false, new Date());

        DBService.saveTodo(newTodo).then(res => {
            manager.addTodo(res);
            input.value = '';
            render();
        })
    }
}


function changeHeader(){
    document.querySelector('h1').innerHTML='lo sapevo che non avresti resistito!!!'
}

const words = [
    "Manager",
    "Organizer",
    "Planner",
    "Arranger",
    "Mastermind",
    "Maker",
    "Builder",
    "Creator",
    "Formulator",
    "Architect"
];


setInterval(changeText, 3500);

function changeText() {
    const changingElement = document.querySelector(".changingText");
    const randomIndex = Math.floor(Math.random() * words.length);
    changingElement.textContent = words[randomIndex];
}

changeText();
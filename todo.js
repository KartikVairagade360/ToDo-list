let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


console.log('Working');

function addTaskToDOM(task) {
    const li = document.createElement('li');
  
    li.innerHTML = `
      <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} 
      class="custom-checkbox">
      <label for="${task.id}">${task.text}</label>
      <img src="https://cdn-icons-png.flaticon.com/128/484/484662.png" class="delete" data-id="${task.id}" onclick= "deleteTask(${task.id})"/>
    `;
  
    tasksList.append(li);  
}

function renderList () {
    console.log("renderlist");
    tasksList.innerHTML = '';

    for (let i = 0; i <tasks.length; i++ ) {
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function toggleTask (taskId) {
    const task = tasks.filter(function(taskInput){
        return task.id == taskId
});

if (task.length > 0){
    const CurrentTask = task[0];
    
    CurrentTask.done = !CurrentTask.done;
    renderList();
    showNotification('Task toggled successfully');
    return;
}

showNotification('could not toggle the task');
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id != taskId
    })

    tasks = [...newTasks];
    renderList();
    showNotification('Task delete successfully');
}

function addTask (task) {
    if (task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress (e){
    if(e.key =='Enter'){
        const text = e.target.value;
        console.log('text',text);

        if(!text){
            showNotification('task text can not be empty');
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }

        e.target.value = '';
        addTask(task);
    }
}

function handleClickListener(e){
    const target = e.target;
    console.log(target);

    if (target.className == 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className == 'custom-checkbox'){
        const taskId = target.dataset.id;
        toggleTask(taskId);
        return;
    }
}

addTaskInput.addEventListener('keyup',handleInputKeypress);
document.addEventListener('click', handleClickListener);
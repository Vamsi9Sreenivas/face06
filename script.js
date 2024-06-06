document.getElementById('addBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const errorMsg = document.getElementById('errorMsg');
    
    if (taskText === "" || taskText === "error" || taskText === "null") {
        errorMsg.textContent = "Task couldn't be updated. Try again.";
        errorMsg.style.display = 'block';
    } else {
        errorMsg.style.display = 'none';
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <input type="checkbox" class="completeCheck">
            <button class="editBtn">Edit</button>
        `;
        
        taskList.appendChild(taskItem);
        taskInput.value = "";
        
        taskItem.querySelector('.completeCheck').addEventListener('change', function() {
            handleTaskCompletion(taskItem);
        });

        taskItem.querySelector('.editBtn').addEventListener('click', function() {
            const newTaskText = prompt("Edit your task:", taskText);
            if (newTaskText !== null && newTaskText.trim() !== "") {
                taskItem.querySelector('span').textContent = newTaskText.trim();
            } else if (newTaskText === "") {
                errorMsg.textContent = "Task couldn't be updated. Try again.";
                errorMsg.style.display = 'block';
            }
        });
    }
}

function handleTaskCompletion(taskItem) {
    const taskList = document.getElementById('taskList');
    const completedTasks = taskList.querySelectorAll('.completed');
    
    if (taskItem.querySelector('.completeCheck').checked) {
        taskItem.classList.add('completed');
        taskList.appendChild(taskItem);
    } else {
        taskItem.classList.remove('completed');
        taskList.insertBefore(taskItem, taskList.querySelector('.completed') || null);
    }

    updateCompletedTasksVisibility();
}

function updateCompletedTasksVisibility() {
    const taskList = document.getElementById('taskList');
    const completedTasks = taskList.querySelectorAll('.completed');

    completedTasks.forEach((task, index) => {
        if (index >= 4) {
            task.classList.add('hidden');
        } else {
            task.classList.remove('hidden');
        }
    });
}

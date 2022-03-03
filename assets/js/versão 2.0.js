const inputTask = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')
const tasksContainer = document.querySelector('.tasks-container')

const handleAddNewTask = () => {
    const inputTaskIsValid = validateInputTask()
    
    if(!inputTaskIsValid){
        inputTask.classList.add('error')
        return
    }

    /* Criação da Div que engloba os items*/
    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-container')

    /* Criação do Parágrafo*/
    const taskContent = document.createElement('p')
    taskContent.innerText = inputTask.value

    /* Evento de Click no parágrafo */
    taskContent.addEventListener('click', () => handleCompleteTask(taskContent))

    /* Criação do Ícone da Lixeira */
    const deleteItem = document.createElement('span')
    deleteItem.classList.add('material-icons')
    deleteItem.innerText = 'delete'

    /* Evento de Click no ícone da Lixeira */
    deleteItem.addEventListener('click', () => handleDeleteTask(deleteItem))

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)
    tasksContainer.appendChild(taskItemContainer)

    /*Limpando Input ao adicionar uma tarefa*/
    inputTask.value = ''
    inputTask.focus()

    /* Adicionar tarefa ao LocalStorage */
    addTaskToLocalStorage()
}

const addTaskToLocalStorage = () => {
    const tasks = tasksContainer.childNodes

    for (let task of tasks) {
        const key = task.firstChild.innerText
        localStorage.setItem(key, task.parentNode.innerHTML.toString())
    }
}

const removeTaskToLocalStorage = (deleteItem) => {
    const tasks = tasksContainer.childNodes

    for (let task of tasks) {
        const currentTaskIsBeingDeleted = task.lastChild.isSameNode(deleteItem)
        if (currentTaskIsBeingDeleted) {
            const key = task.firstChild.innerText
            localStorage.removeItem(key)
        }
    }
}

const loadTasksFromLocalStorage = () => {    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let value = localStorage.getItem(key)
       
        tasksContainer.innerHTML = value
    }
}

const validateInputTask = () => {
    return inputTask.value.trim().length > 0
}

const handleInputTaskFocus = () => {
    inputTask.classList.remove('error')
    inputTask.value = ''
}

const handleCompleteTask = (taskContent) => {
    const tasks = tasksContainer.childNodes

    for (let task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle('complete-task')
        }
    }
}   

const handleDeleteTask = (deleteItem) => {
    const tasks = tasksContainer.childNodes

    for (let task of tasks) {
        const currentTaskIsBeingDeleted = task.lastChild.isSameNode(deleteItem)
        if (currentTaskIsBeingDeleted) {
            tasksContainer.removeChild(task)
        }
    }

    removeTaskToLocalStorage()
}

loadTasksFromLocalStorage()
addTaskButton.addEventListener('click', () => handleAddNewTask())
inputTask.addEventListener('focus', () => handleInputTaskFocus())
inputTask.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        handleAddNewTask()
        return
    }
})
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
    deleteItem.addEventListener('click', () => removeTaskToLocalStorage(deleteItem))
    deleteItem.addEventListener('click', () => handleDeleteTask(deleteItem))

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)
    tasksContainer.appendChild(taskItemContainer)

    /*Limpando Input ao adicionar uma tarefa*/
    inputTask.value = ''
    inputTask.focus()

    /* Teste */
    addTaskToLocalStorage(taskItemContainer)
}

const addTaskToLocalStorage = (taskItemContainer) => {
    const totalItems = tasksContainer.childNodes.length

    for (let i = 0; i < totalItems; i++) {
        localStorage.setItem('task'.concat(i), taskItemContainer)
    }
}

const removeTaskToLocalStorage = (deleteItem) => {
    const tasks = tasksContainer.childNodes

    for (let i in tasks) {
        const currentTaskIsBeingDeleted = tasks[i].lastChild === deleteItem
        if (currentTaskIsBeingDeleted) {
            localStorage.removeItem('task'.concat(i))
        }
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
        const currentTaskIsBeingClicked = task.firstChild === taskContent
        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle('confirm-task')
        }
    }
}   

const handleDeleteTask = (deleteItem) => {
    const tasks = tasksContainer.childNodes

    for (let task of tasks) {
        const currentTaskIsBeingDeleted = task.lastChild === deleteItem
        if (currentTaskIsBeingDeleted) {
            tasksContainer.removeChild(task)
        }
    }

}

addTaskButton.addEventListener('click', () => handleAddNewTask())
inputTask.addEventListener('focus', () => handleInputTaskFocus())
inputTask.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        handleAddNewTask()
        return
    }
})

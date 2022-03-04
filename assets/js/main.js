const inputTask = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')
const tasksContainer = document.querySelector('.tasks-container')

const loadTasksFromLocalStorage = () => {
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'))

    if (!localStorageTasks) return

    for (let task of localStorageTasks) {
        /* Criação da Div que engloba os items*/
        const taskItemContainer = document.createElement('div')
        taskItemContainer.classList.add('task-container')

        /* Criação do Parágrafo*/
        const taskContent = document.createElement('p')
        taskContent.innerText = task.content
        if (task.isCompleted) taskContent.classList.add('complete-task')
        

        /* Evento de Click no parágrafo */
        taskContent.addEventListener('click', () => handleCompleteTask(taskContent))

        /* Criação do Ícone da Lixeira */
        const deleteItem = document.createElement('span')
        deleteItem.classList.add('material-icons')
        deleteItem.innerText = 'delete'
        
        /* Evento de Click no ícone da Lixeira */
        deleteItem.addEventListener('click', () => handleDeleteTask(taskContent))

        taskItemContainer.appendChild(taskContent)
        taskItemContainer.appendChild(deleteItem)
        tasksContainer.appendChild(taskItemContainer)
    }
}

const handleAddNewTask = () => {
    const inputTaskIsValid = validateInputTask()
    
    if(!inputTaskIsValid){
        return inputTask.classList.add('error')
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
    deleteItem.addEventListener('click', () => handleDeleteTask(taskContent))

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)

    tasksContainer.appendChild(taskItemContainer)

    /*Limpando Input ao adicionar uma tarefa*/
    inputTask.value = ''
    inputTask.focus()

    /* Adicionar tarefa ao LocalStorage */
    uptadeTasksFromLocalStorage()
}

const validateInputTask = () => inputTask.value.trim().length > 0


const handleInputTaskFocus = () => {
    inputTask.classList.remove('error')
    inputTask.value = ''
}

const handleCompleteTask = (taskContent) => {
    const tasks = tasksContainer.childNodes

    for (let task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild === taskContent
        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle('complete-task')
        }
    }

    uptadeTasksFromLocalStorage()
}   

const handleDeleteTask = (taskContent) => {
    const tasks = tasksContainer.childNodes

    for (let task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild === taskContent
        if (currentTaskIsBeingClicked) {
            tasksContainer.removeChild(task)
        }
    }

    uptadeTasksFromLocalStorage()
}

const uptadeTasksFromLocalStorage = () => {
    const tasks = tasksContainer.childNodes
    const tasksList = []

    for (let task of tasks) {
        const content = task.firstChild.innerText
        const isCompleted = task.firstChild.classList.contains('complete-task')
        const taskItem = {content, isCompleted}
        tasksList.push(taskItem)
    }

    localStorage.setItem('tasks', JSON.stringify(tasksList))
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
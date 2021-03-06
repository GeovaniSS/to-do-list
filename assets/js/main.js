const inputTask = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')
const tasksContainer = document.querySelector('.tasks-container')
const editTaskInputInModal = document.querySelector('#edit-task-input')

const loadTasksFromLocalStorage = () => {
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks'))

    if(!localStorageTasks) return

    for (let task of localStorageTasks) {
        const taskItemContainer = createTaskItemContainer()
        const taskItemContent = createTaskItemContent(task.content)
        const taskItemControls = createTaskItemControls()

        if (task.isCompleted) {
            taskItemContent.firstChild.setAttribute('checked', 'true')
            taskItemContent.lastChild.classList.add('completed')
        }

        taskItemContainer.appendChild(taskItemContent)
        taskItemContainer.appendChild(taskItemControls)
        tasksContainer.appendChild(taskItemContainer)
    }
}

const handleAddNewTask = () => {
    const inputTaskIsValid = validateInputElement(inputTask)
    
    /*Validação do Input Tarefa*/
    if(!inputTaskIsValid){
        return inputTask.classList.add('error')
    }

    /*Criação da tarefa*/
    const taskItemContainer = createTaskItemContainer()   
    const taskItemContent = createTaskItemContent(inputTask.value)
    const taskItemControls = createTaskItemControls()

    taskItemContainer.appendChild(taskItemContent)
    taskItemContainer.appendChild(taskItemControls)
    tasksContainer.appendChild(taskItemContainer)

    /*Limpando Input ao adicionar uma tarefa*/
    inputTask.value = ''
    inputTask.focus()

    /* Adicionar tarefa ao LocalStorage */
    updateTasksFromLocalStorage()   
}

const validateInputElement = (input) => input.value.trim().length > 0

const handleInputElementFocus = (input) => {
    input.classList.remove('error')
}

const createTaskItemContainer = () => {
    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item-container')

    return taskItemContainer
}

const createTaskItemContent = (taskDescription) => {
    const taskItemContent = document.createElement('div')
    taskItemContent.classList.add('task-item-content')

    const taskCheckBox = document.createElement('input')
    taskCheckBox.setAttribute('type', 'checkbox')
    taskCheckBox.setAttribute('id', taskDescription)

    const taskContent = document.createElement('label')
    taskContent.innerText = taskDescription
    taskContent.setAttribute('for', taskDescription)

    taskItemContent.appendChild(taskCheckBox)
    taskItemContent.appendChild(taskContent)

    taskCheckBox.addEventListener('change', () => handleCompleteTask(taskContent))

    return taskItemContent
}

const createTaskItemControls = () => {
    const taskItemControls = document.createElement('div')
    taskItemControls.classList.add('task-item-controls')

    const editItem = document.createElement('span')
    editItem.classList.add('material-icons')
    editItem.innerText = 'edit'

    const deleteItem = document.createElement('span')
    deleteItem.classList.add('material-icons')
    deleteItem.innerText = 'delete'

    taskItemControls.appendChild(editItem)
    taskItemControls.appendChild(deleteItem)

    editItem.addEventListener('click', () => handleEditTask(editItem))
    deleteItem.addEventListener('click', () => handleDeleteTask(deleteItem))

    return taskItemControls
}

const handleCompleteTask = (taskContent) => {
    const tasks = tasksContainer.childNodes

    for (let task of tasks) {
        const taskItemContent = task.firstChild
        const currentTaskIsBeingClicked = taskItemContent.lastChild === taskContent
        if (currentTaskIsBeingClicked) {
            taskItemContent.lastChild.classList.toggle('completed')
        } 
    }

    updateTasksFromLocalStorage()
}

const handleEditTask = (editItem) => {
    /*Abrindo o Modal de Editar Tarefa*/
    handleEditTaskModal()

    /*Removendo a classe error caso o input de editar tarefa a possua */
    editTaskInputInModal.classList.remove('error')

    const saveTaskButton = document.querySelector('.save-task-btn')
    const cancelEditTaskButton = document.querySelector('.cancel-task-btn')

    const tasks = tasksContainer.childNodes
    for (let task of tasks) {
        const taskItemContent = task.firstChild
        const taskItemControls = task.lastChild
        const currentTaskIsBeingEdited = taskItemControls.firstChild === editItem
        if (currentTaskIsBeingEdited) {
            editTaskInputInModal.value = taskItemContent.lastChild.innerText
        }
    }

    cancelEditTaskButton.onclick = () => handleEditTaskModal()
    saveTaskButton.onclick = () => updateTaskAfterEdit(editItem)
    editTaskInputInModal.onkeypress = (e) => {
        if (e.keyCode === 13) {
        updateTaskAfterEdit(editItem)
        return
    }}
}

const handleEditTaskModal = () => {
    const sTaskContainer = document.querySelector('section#container')
    const sModalContainer = document.querySelector('section#modal-container')
    const editTaskModalIsOpened = sModalContainer.style.display === 'block'

    if (!editTaskModalIsOpened) {
        sTaskContainer.style.display = 'none'
        sModalContainer.style.display = 'block'
    }
    else {
        sTaskContainer.style.display = 'block'
        sModalContainer.style.display = 'none'
    }
}

const updateTaskAfterEdit = (editItem) => {
    const editTaskInputIsValid = validateInputElement(editTaskInputInModal)

    /*Validação do Input Editar Tarefa*/
    if(!editTaskInputIsValid) {
        return editTaskInputInModal.classList.add('error')
    }

    const tasks = tasksContainer.childNodes
    for (let task of tasks) {
        const taskItemContent = task.firstChild
        const taskItemControls = task.lastChild
        const currentTaskIsBeingEdited = taskItemControls.firstChild === editItem
        if (currentTaskIsBeingEdited) {
            taskItemContent.firstChild.checked = false
            taskItemContent.lastChild.innerText = editTaskInputInModal.value
            taskItemContent.lastChild.classList.remove('completed')
        }
    }

    /*Fechando o Modal de Editar Tarefa*/
    handleEditTaskModal()

    /* Atualizar o conteúdo da tarefa no LocalStorage */
    updateTasksFromLocalStorage()
}

const handleDeleteTask = (deleteItem) => {
    const tasks = tasksContainer.childNodes
    
    for (let task of tasks) {
        const taskItemControls = task.lastChild
        const currentTaskIsBeingRemoved = taskItemControls.lastChild === deleteItem
        if (currentTaskIsBeingRemoved) {
            tasksContainer.removeChild(task)
        }
    }

    updateTasksFromLocalStorage()
}

const updateTasksFromLocalStorage = () => {
    const tasks = tasksContainer.childNodes
    const tasksList = []

    for (let task of tasks) {
        const taskItemContent = task.firstChild
        const content = taskItemContent.lastChild.innerText
        const isCompleted = taskItemContent.firstChild.checked
        const taskItem = {content, isCompleted}
        tasksList.push(taskItem)
    }

    localStorage.setItem('tasks', JSON.stringify(tasksList))
}

loadTasksFromLocalStorage()
addTaskButton.addEventListener('click', () => handleAddNewTask())
inputTask.addEventListener('focus', () => handleInputElementFocus(inputTask))
inputTask.addEventListener('keypress', (e) => {
    if(e.keyCode === 13) return handleAddNewTask()
})
editTaskInputInModal.addEventListener('focus', () => handleInputElementFocus(editTaskInputInModal))
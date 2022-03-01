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

    /* Criação do Ícone da Lixeira */
    const deleteItem = document.createElement('span')
    deleteItem.classList.add('material-icons')
    deleteItem.innerText = 'delete'

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)
    tasksContainer.appendChild(taskItemContainer)

    /*Limpando Input ao adicionar uma tarefa*/
    inputTask.value = ''
    inputTask.focus()

    const tasksContent = document.querySelectorAll('.task-container p')
    const deleteItems = document.querySelectorAll('.task-container span')
    completeTasks(tasksContent)
    deleteTasks(deleteItems)
}

const validateInputTask = () => {
    return inputTask.value.trim().length > 0
}

const handleInputTaskFocus = () => {
    inputTask.classList.remove('error')
    inputTask.value = ''
}

const completeTasks = (tasksContent) => { 
    tasksContent.forEach((el) => {
        el.onclick = () => { 
            el.classList.toggle('confirm-task')
        }
    })
}

const deleteTasks = (deleteItems) => {
    deleteItems.forEach((el) => {
        el.addEventListener('click', () => {
            el.parentNode.remove() //Remove o Elemento Pai (task-container)
        })
    })
}


addTaskButton.addEventListener('click', handleAddNewTask)
inputTask.addEventListener('focus', handleInputTaskFocus)
inputTask.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        handleAddNewTask()
        return
    }
})


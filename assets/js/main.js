const inputTask = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')
const tasksContainer = document.querySelector('.tasks-container')

const handleAddNewTask = () => {
    if(!validInputTask()){
        inputTask.classList.add('error')
        return
    }

    /* Criação da Div que engloba os items*/
    const taskContainer = document.createElement('div')
    taskContainer.classList.add('task-container')

    /* Criação do Parágrafo*/
    const taskContent = document.createElement('p')
    taskContent.innerText = inputTask.value

    /* Criação do Ícone da Lixeira */
    const taskDeleteIcon = document.createElement('span')
    taskDeleteIcon.classList.add('material-icons')
    taskDeleteIcon.innerText = 'delete'

    taskContainer.appendChild(taskContent)
    taskContainer.appendChild(taskDeleteIcon)
    tasksContainer.appendChild(taskContainer)

    /*Limpando Input ao adicionar uma tarefa*/
    inputTask.value = ''
    inputTask.focus()

    //const tasks = document.querySelectorAll('.task-container')
    const tasksContent = document.querySelectorAll('.task-container p')
    const tasksDeleteIcons = document.querySelectorAll('.task-container span')
    confirmTasks(tasksContent)
    removeTasks(tasksDeleteIcons)
}

const validInputTask = () => {
    return inputTask.value.trim().length !== 0
}

const inputTaskChange = () => {
    inputTask.classList.remove('error')
    inputTask.value = ''
}

const confirmTasks = (tasksContent) => { 
    for (let taskContent of tasksContent) {
        taskContent.onclick = () => {
            let confirmTask = taskContent.classList.contains('confirm-task')
       
            if (!confirmTask) {
                taskContent.classList.add('confirm-task')
                return
            }
    
            taskContent.classList.remove('confirm-task')
        }
    }
}

const removeTasks = (tasksDeleteIcons) => {
    tasksDeleteIcons.forEach((el) => {
        el.addEventListener('click', () => {
            el.parentNode.remove() //Remove o Elemento Pai (task-container)
        })
    })

   /*for (let taskDeleteIcon of tasksDeleteIcons) {
        taskDeleteIcon.addEventListener('click', (e) => {
            taskDeleteIcon.parentNode.remove()
        })
   }*/
}


addTaskButton.addEventListener('click', handleAddNewTask)
inputTask.addEventListener('focus', inputTaskChange)
inputTask.addEventListener('keydown', (e) => {
    if (e.keyCode !== 13) {
        return
    }
    handleAddNewTask()
})

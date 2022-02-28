const inputTarefa = document.querySelector('#input-tarefa')
const botãoAdicionarTarefa = document.querySelector('#adicionar-tarefa')
//let buttons;
//let tarefas;

botãoAdicionarTarefa.addEventListener('click', () => {
    if (inputTarefa.value === '') {
        window.alert('Adicione um tarefa')
    }
    else {   
        const listaDeTarefas = document.querySelector('.tarefas')

        listaDeTarefas.innerHTML += `
            <div class="task-control">
                <p>${inputTarefa.value}</p>
                <button class='delete'><span class="material-icons">delete</span></button>
            </div>
        `

        const tarefas = document.querySelectorAll('.task-control')
        const buttons = document.querySelectorAll('.delete')

        buttons.forEach((el, i) => {
            el.addEventListener('click', () => {
                listaDeTarefas.removeChild(tarefas[i])
                //el.parentNode.remove()
            })
        })
    }
})


const inputTarefa = document.querySelector('#input-tarefa')
const botãoAdicionarTarefa = document.querySelector('#adicionar-tarefa')
const listaDeTarefas = document.querySelector('#lista-de-tarefas')
let tarefas = []

botãoAdicionarTarefa.addEventListener('click', () => {
    if (inputTarefa.value === '') {
        window.alert('Adicione um tarefa')
    }
    else {   
        const tarefa = criarTarefa(inputTarefa) // {tag: 'li'}
        tarefas.push(tarefa)
        listaDeTarefas.appendChild(tarefa.nome)
    }
})

function criarTarefa(inputTarefa) {
    const li = document.createElement('li')
    const button = document.createElement('button')
    button.classList.add('remove-tarefa')
    li.innerText = `${inputTarefa.value}`
    button.innerText = 'Remover'
    li.appendChild(button)
    return {nome: li, remove: button} 
}

listaDeTarefas.addEventListener('click', (e) => {
    const el = e.target

    if (el.classList.contains('remove-tarefa')) {
        for (let i in tarefas) {
            const {nome, remove} = tarefas[i]
            remove.addEventListener('click', () => {
                listaDeTarefas.removeChild(nome)
            })
        }
    }
})


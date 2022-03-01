##LISTA DE TAREFAS## 
	- 1° Validar input - (OK)
	- 2° Criar tarefas - (OK)
	- 3° Apagar tarefas - (OK)
	- 4° ***Salvar tarefas com localStorage***
 
###Validar Input### (OK)
	- Se o input estiver vazio, adicionar uma classe error (OK)
	- Error (Borda vermelha e Placeholder Vermelho) (OK)
	- Se o input deixar de ser vazio, remover a classe error com o evento de focus
	(OK)

###Criar Tarefas### (OK)
	- Criar os elementos pelo JavaScript (OK)
	- Div, p e o ícone (OK)
	- Evento de clicar no botão adicionar (OK)
	- Evento de clicar no enter (OK)

###Concluir Tarefas###
	- 1° Forma 
		- Criar NodeLists com os tasksContent usando o querySelectorAll()
		- Usando o forEach para percorrer os tasksContent e adicionar um eventListener de click 
	- 2° Forma 
		- Criar um eventListener de Click depois que o tasksContent for criado 
		- Usar os métodos do DOM para encontrar o tasksContent que foi clicado

###Apagar Tarefas###
	- 1° Forma 
		- Criar NodeLists com os deleteItems usando o querySelectorAll()
		- Usando o forEach para percorrer os deleteItems e adicionar um eventListener de click 
	- 2° Forma 
		- Criar um eventListener de Click depois que o deleteItem for criado 
		- Usar os métodos do DOM para encontrar o deleteItem que foi clicado

### localStorage ###
	- Utilizar o localStorage para armazenar as tarefas que o usuário adicionou no armazenamento local do browser. 
	- Sempre que uma tarefa for adicionada no html, também iremos adicionar no localStorage -> setItem()
	- Sempre que uma tarefa for removida da página, também iremos remover do localStorage -> removeItem()

### ATENÇÃO ###
	- Eu estava errando na manipulação do DOM
	- Tome cuidado com os eventos
	- Não se preocupe se o código está grande
	- Crie da maneira mais detalhada possível 
	- Não copie o código

## APRENDIZADOS ##
	- Método trim() nas strings
	- O addEventListener pode trazer problemas com a adição e remoção de classes
	- parentNode / parentNode.remove()
	- childNodes, firstChild, lastChild
	- localStorage

<div class="task-control">
	<p>Ir na central de transporte do BRB</p>
	<div class="task-controls">
		<button id="change-task"><span class="material-icons">edit</span></button>
		<button id="remove-task"><span class="material-icons">delete</span></button>
	</div>
</div>

<div class="task-control">
	<p>Ir na central de transporte do BRB</p>
	<button id="remove-task"><span class="material-icons">delete</span></button>
</div>
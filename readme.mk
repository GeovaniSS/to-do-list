##LISTA DE TAREFAS## 
	- 1° Validar input - (OK)
	- 2° Criar tarefas - (OK)
	- 3° Apagar tarefas - (OK)
	- 4° ***Salvar tarefas com localStorage***
 
###Validar Input### (OK)
	- Se o input estiver vazio, adicionar uma classe error
	- Error (Borda vermelha e Placeholder Vermelho)
	- Se o input deixar de ser vazio, remover a classe error com o evento de change()

###Criar Tarefas### (OK)
	- Criar os elementos pelo JavaScript 
	- Div, p e o ícone 
	- Evento de clicar no botão adicionar
	- Evento de clicar no enter ***

###Apagar Tarefas###
	- Dentro da função que os items são criados, criar uma variável que vai armazenar a NodeList das divs e a NodeList dos botões
	- Criar um forEach para percorrer esses elementos e adicionar o evento de click nos botões 

### ATENÇÃO ###
	- Eu estava errando na manipulação do DOM
	- Tome cuidado com os eventos
	- Não se preocupe se o código está grande
	- Crie da maneira mais detalhada possível 
	- Não copie o código

## APRENDIZADOS ##
	- Método trim() nas strings
	- O addEventListener pode trazer problemas
	- parentNode / parentNode.remove()

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
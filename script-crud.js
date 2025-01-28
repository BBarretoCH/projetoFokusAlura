const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const tarefaEmAndamento = document.querySelector('.app__section-active-task-description');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas).trim());
}

function adicionarElementoTarefa(tarefa) {
    const li = document.createElement('li'); 
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.innerText = tarefa.descricao;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    const imagemTarefa = document.createElement('img');
    imagemTarefa.setAttribute('src', './imagens/edit.png');

    botao.append(imagemTarefa);
    li.append(svg, paragrafo, botao);

    botao.onclick = () => {
        const novaDescricao = prompt('Qual o novo nome da tarefa?');
        if (novaDescricao.trim()) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
            return;
        }
    }

    li.onclick = () => {
        tarefaEmAndamento.textContent = tarefa.descricao;
        const itemAtivo = ulTarefas.querySelector(".app__section-task-list-item-active");

        if (li.classList.contains("app__section-task-list-item-active")) {
            li.classList.remove("app__section-task-list-item-active");
            return;
        }

        itemAtivo?.classList.remove("app__section-task-list-item-active");
        li.classList.add("app__section-task-list-item-active");
    };
    
    return li;
}

function anexaTarefaNaLista (tarefa){
    const elementoTarefa = adicionarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    return;
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
})

formAdicionarTarefa.addEventListener('submit', function(evento){
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    anexaTarefaNaLista(tarefa);
    tarefas.push(tarefa);
    textarea.value = '';
    formAdicionarTarefa.classList.toggle('hidden');
    atualizarTarefas();
})

tarefas.forEach(tarefa => {
    anexaTarefaNaLista(tarefa);
});
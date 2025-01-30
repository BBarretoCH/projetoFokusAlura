const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const tarefaEmAndamento = document.querySelector('.app__section-active-task-description');
const btnRemovertodas = document.getElementById('btn-remover-todas');
const btnRemoverConcluidas = document.getElementById('btn-remover-concluidas');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function verificaSeClasseActiveExiste(li) {
    return li && li.classList && li.classList.contains("app__section-task-list-item-active");
}

function removeClasseActive(li) {
    li.classList.remove('app__section-task-list-item-active');
}

function adicionarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
    }

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

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
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
            return;
        }
    }

    li.onclick = () => {
        tarefaEmAndamento.textContent = tarefa.descricao;
        const itemAtivo = ulTarefas.querySelector(".app__section-task-list-item-active");

        if (verificaSeClasseActiveExiste(li)) {
            li.classList.remove("app__section-task-list-item-active");
            tarefaEmAndamento.textContent = ""; 
            return;
        }

        if (itemAtivo) {
            removeClasseActive(itemAtivo);
        }
    
        li.classList.add("app__section-task-list-item-active");
    };

    return li;
}

function anexaTarefaNaLista(tarefa) {
    const elementoTarefa = adicionarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value,
        completa: false 
    }
    anexaTarefaNaLista(tarefa);
    tarefas.push(tarefa);
    textarea.value = '';
    formAdicionarTarefa.classList.toggle('hidden');
    atualizarTarefas();
})

tarefas.forEach(tarefa => {
    anexaTarefaNaLista(tarefa);
})

document.addEventListener('focoFinalizado', () => {
    ulTarefas.querySelectorAll('li').forEach(li => {
        if (verificaSeClasseActiveExiste(li)) {
            removeClasseActive(li);
            li.classList.add('app__section-task-list-item-complete');
            li.querySelector('button').disabled = true;
            const tarefa = tarefas.find(t => t.descricao === li.querySelector('p').textContent);
            if (tarefa) {
                tarefa.completa = true; 
                atualizarTarefas();
            }
        }
    })
})

btnRemoverConcluidas.onclick = () => {
    ulTarefas.querySelectorAll('li').forEach(li => {
        if(li.classList.contains('app__section-task-list-item-complete')) {
            li.remove();
            if(tarefas.completa){
                t
            }
        }
    })
}

btnRemoverConcluidas.addEventListener('click', () => {
    document.querySelectorAll('.app__section-task-list-item-complete').forEach((item) => {
        item.remove();
    })
    tarefas = tarefas.filter(tarefa => !tarefa.completa);
    atualizarTarefas();
})

btnRemovertodas.addEventListener('click', () => {
    ulTarefas.querySelectorAll('li').forEach(item => {
        item.remove();
    })
    localStorage.removeItem('tarefas');
})
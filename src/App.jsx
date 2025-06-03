import React from 'react';
import TarefaItem from './components/TarefaItem';
import FormularioTarefa from './components/FormularioTarefa';
import { MagnifyingGlassIcon, PlusIcon } from '@phosphor-icons/react';

import './global.css';
import styles from './App.module.css';
import Modal from './components/Modal';
import RemoveAll from './components/RemoveAll';

const App = () => {
  const [tarefas, setTarefas] = React.useState([]);
  const [input, setInput] = React.useState('');
  const inputElement = React.useRef();
  const [tarefasPendentes, setTarefasPendentes] = React.useState(0);
  const [tarefasExibir, setTarefasExibir] = React.useState([]);
  const [filtroAtual, setFiltroAtual] = React.useState('todas');
  const [modalAddTarefa, setModalAddTarefa] = React.useState(false);
  const [modalRemoveAll, setModalRemoveAll] = React.useState(false);

  function adicionarTarefa() {
    const tarefaExistente = tarefas.find(
      (tarefa) => tarefa.nome.toLowerCase() === input.toLowerCase()
    );

    if (input.trim() && !tarefaExistente) {
      setTarefas([...tarefas, { nome: input, isConcluida: false }]);
      setInput('');
      inputElement.current.focus();
      fecharModal('add');
    }
  }

  function deletarTarefa({ target }) {
    if (tarefas.length === 1) {
      removerTodasTarefas();
    } else {
      const nomeTarefaSelecionada = target.parentElement.dataset.nome;
      const novasTarefas = tarefas.filter(
        (tarefa) => tarefa.nome !== nomeTarefaSelecionada
      );
      setTarefas(novasTarefas);
    }
  }

  function removerTodasTarefas() {
    setTarefas([]);
    localStorage.removeItem('tarefas');
    fecharModal('remove');
  }

  function handlePressEnter({ key }) {
    if (key === 'Enter') {
      adicionarTarefa();
    }
  }

  function handleChange({ target }) {
    setInput(target.value);
  }

  function handleCheckboxChange({ target }) {
    const nomeTarefaSelecionada = target.name;

    const novasTarefas = tarefas.map((tarefa) => {
      if (nomeTarefaSelecionada === tarefa.nome) {
        return { ...tarefa, isConcluida: !tarefa.isConcluida };
      } else {
        return tarefa;
      }
    });

    setTarefas(novasTarefas);
  }

  function atualizaStatusTarefa(statusNovo) {
    const novasTarefas = tarefas.map((tarefa) => ({
      ...tarefa,
      isConcluida: statusNovo,
    }));

    setTarefas(novasTarefas);
  }

  function filtrarTarefas({ target }) {
    setFiltroAtual(target.value);
  }

  function abrirModal(modal) {
    if (modal === 'add') {
      setModalAddTarefa(true);
    } else if (modal === 'remove') {
      setModalRemoveAll(true);
    }
  }

  function fecharModal(modal) {
    if (modal === 'add') {
      setModalAddTarefa(false);
    } else if (modal === 'remove') {
      setModalRemoveAll(false);
    }
  }

  React.useEffect(() => {
    if (tarefas.length) {
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    const pendentes = tarefas.filter((tarefa) => !tarefa.isConcluida);
    setTarefasPendentes(pendentes.length);
  }, [tarefas]);

  React.useEffect(() => {
    const tarefaLocalStorage = localStorage.getItem('tarefas');

    if (tarefaLocalStorage) {
      setTarefas(JSON.parse(tarefaLocalStorage));
    }
  }, []);

  React.useEffect(() => {
    let tarefasFiltradas = [];

    switch (filtroAtual) {
      case 'concluidas':
        tarefasFiltradas = tarefas.filter((tarefa) => tarefa.isConcluida);
        break;
      case 'pendentes':
        tarefasFiltradas = tarefas.filter((tarefa) => !tarefa.isConcluida);
        break;
      default:
        tarefasFiltradas = tarefas;
        break;
    }

    setTarefasExibir(tarefasFiltradas);
  }, [tarefas, filtroAtual]);

  React.useEffect(() => {
    modalAddTarefa && inputElement.current.focus();
  }, [modalAddTarefa]);

  return (
    <main>
      <h1 className={styles.title}>To Do List</h1>
      <div className={styles.searchWrapper}>
        <div className={styles.search}>
          <MagnifyingGlassIcon
            size={21}
            className={styles.searchIcon}
            color="#2976CD"
          />
          <input type="text" placeholder="Pesquisar tarefa..." />
        </div>
        <select onChange={filtrarTarefas}>
          <option value="todas">Todas</option>
          <option value="concluidas">Concluídas</option>
          <option value="pendentes">Pendentes</option>
        </select>
      </div>

      <p className={styles.pending}>
        Tarefas pendentes: <span>{tarefasPendentes}</span>
      </p>

      <ul className={styles.tarefaItemWrapper}>
        {tarefasExibir.map((tarefa) => (
          <TarefaItem
            key={tarefa.nome}
            tarefa={tarefa}
            onCheck={handleCheckboxChange}
            onDeletar={deletarTarefa}
          />
        ))}
      </ul>

      {/* <button onClick={() => atualizaStatusTarefa(true)}>
        Todas concluídas
      </button>
      <button onClick={() => atualizaStatusTarefa(false)}>
        Todas pendentes
      </button> */}

      <div className={styles.buttons}>
        <button
          className={styles.removeAllButton}
          onClick={() => abrirModal('remove')}
        >
          Remover todas as Tarefas
        </button>

        <button className={styles.addButton} onClick={() => abrirModal('add')}>
          <PlusIcon size={24} />
        </button>
      </div>

      {modalAddTarefa && (
        <Modal onCancelar={() => fecharModal('add')} title="Adicionar tarefa">
          <FormularioTarefa
            input={input}
            inputRef={inputElement}
            onChange={handleChange}
            onEnter={handlePressEnter}
            onAdicionar={adicionarTarefa}
            onCancelar={() => fecharModal('add')}
          />
        </Modal>
      )}

      {modalRemoveAll && (
        <Modal onCancelar={() => fecharModal('remove')} title="Remover tudo">
          <RemoveAll
            onAceitar={removerTodasTarefas}
            onCancelar={() => fecharModal('remove')}
          />
        </Modal>
      )}
    </main>
  );
};

export default App;

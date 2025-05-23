import React from 'react';
import TarefaItem from './TarefaItem';
import FormularioTarefa from './FormularioTarefa';

const App = () => {
  const [tarefas, setTarefas] = React.useState([]);
  const [input, setInput] = React.useState('');
  const inputElement = React.useRef();
  const [tarefasPendentes, setTarefasPendentes] = React.useState(0);
  const [tarefasExibir, setTarefasExibir] = React.useState([]);
  const [filtroAtual, setFiltroAtual] = React.useState('todas');

  function adicionarTarefa() {
    const tarefaExistente = tarefas.find(
      (tarefa) => tarefa.nome.toLowerCase() === input.toLowerCase()
    );

    if (input.trim() && !tarefaExistente) {
      setTarefas([...tarefas, { nome: input, isConcluida: false }]);
      setInput('');
      inputElement.current.focus();
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
        tarefasFiltradas = tarefas.filter(
          (tarefa) => !tarefa.isConcluida
        );
        break;
      default:
        tarefasFiltradas = tarefas;
        break;
    }

    setTarefasExibir(tarefasFiltradas);
  }, [tarefas, filtroAtual]);

  return (
    <div>
      <FormularioTarefa
        input={input}
        inputRef={inputElement}
        onChange={handleChange}
        onEnter={handlePressEnter}
        onAdicionar={adicionarTarefa}
        onRemover={removerTodasTarefas}
      />

      <select onChange={filtrarTarefas}>
        <option value="todas">Todas</option>
        <option value="concluidas">Concluídas</option>
        <option value="pendentes">Pendentes</option>
      </select>

      <ul>
        {tarefasExibir.map((tarefa) => (
          <TarefaItem
            key={tarefa.nome}
            tarefa={tarefa}
            onCheck={handleCheckboxChange}
            onDeletar={deletarTarefa}
          />
        ))}
      </ul>

      <p>Tarefas pendentes: {tarefasPendentes}</p>
      <button onClick={() => atualizaStatusTarefa(true)}>
        Todas concluídas
      </button>
      <button onClick={() => atualizaStatusTarefa(false)}>
        Todas pendentes
      </button>
    </div>
  );
};

export default App;

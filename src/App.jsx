import React from 'react';
import TarefaItem from './TarefaItem';
import FormularioTarefa from './FormularioTarefa';

const App = () => {
  const [tarefas, setTarefas] = React.useState([]);
  const [input, setInput] = React.useState('');
  const inputElement = React.useRef();

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
    const nomeTarefaSelecionada = target.parentElement.dataset.nome;
    const novasTarefas = tarefas.filter(
      (tarefa) => tarefa.nome !== nomeTarefaSelecionada
    );
    setTarefas(novasTarefas);
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

  return (
    <div>
      <FormularioTarefa
        input={input}
        inputRef={inputElement}
        onChange={handleChange}
        onEnter={handlePressEnter}
        onAdicionar={adicionarTarefa}
      />

      <ul>
        {tarefas.map((tarefa) => (
          <TarefaItem
            key={tarefa.nome}
            tarefa={tarefa}
            onCheck={handleCheckboxChange}
            onDeletar={deletarTarefa}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;

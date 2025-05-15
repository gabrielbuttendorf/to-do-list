import React from 'react';

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

  function teclouEnter({ key }) {
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
      <input
        type="text"
        value={input}
        ref={inputElement}
        onChange={handleChange}
        onKeyDown={teclouEnter}
      />
      <button onClick={adicionarTarefa}>Adicionar Tarefa</button>

      <ul>
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.nome}
            style={tarefa.isConcluida ? { textDecoration: 'line-through' } : null}
          >
            <input
              type="checkbox"
              name={tarefa.nome}
              checked={tarefa.isConcluida}
              onChange={handleCheckboxChange}
            />
            {tarefa.nome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

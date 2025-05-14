import React from 'react';

const App = () => {
  const [tarefas, setTarefas] = React.useState([]);
  const [input, setInput] = React.useState('');
  const inputElement = React.useRef();

  function adicionarTarefa() {
    const tarefaExistente = tarefas.find(
      (tarefa) => tarefa.toLowerCase() === input.toLowerCase()
    );

    if (input.trim() && !tarefaExistente) {
      setTarefas([...tarefas, input]);
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
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

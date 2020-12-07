
import React, { useState } from 'react';
import './App.css';

const ListItem = ({ onChange, onDelete, value }) => {
  let input;
  if (value.match(/ler/)|| value.match(/estudar/))
	{     
	 input=<input
        style={{ backgroundColor: 'blue', color: 'white'}}
        value={value}
        onChange={onChange}
      />
		} else
		{
			input=<input
        value={value}
        onChange={onChange}
      />
		}
  return (
    <div className="Item">

	{input}
      <button onClick={onDelete}>X</button>
    </div>
  );
};


const NewTaskInput = ({ onSubmit }) => {

  const [newItem, setNewItem] = useState('');

  function setNewTask({target}) {
    setNewItem(target.value);
  }

  function submit(e) {
    e.preventDefault();
    onSubmit(newItem);
  }

  return (
    <div className="Item">
      <form onSubmit={submit}>
        <input
          placeholder="Digite aqui suas tarefas do dia....."
          onChange={setNewTask}
        />
        <button type="submit">
          Add
        </button>
      </form>
    </div>
  )
};


const Lista = () => {
  const [tasks, setTasks] = useState([]);

  function addNewTask(task) {
    const itensCopy = Array.from(tasks);
    itensCopy.push({id: tasks.length, value: task});
    setTasks(itensCopy);
  }

  function updateTask({target}, index) {
    const itensCopy = Array.from(tasks);
    itensCopy.splice(index, 1, { id: index, value: target.value });
    setTasks(itensCopy);
  }

  function deleteTask(index) {
    const itensCopy = Array.from(tasks);
    itensCopy.splice(index, 1);
    setTasks(itensCopy);
	
  }

  return (
    <div className="App">
	
      <div className="App-cabecalho">
	  <h4>Dashboard</h4>
        <NewTaskInput onSubmit={addNewTask} />
        {tasks.map(({id, value}, index) => (
          <ListItem
            key={id}
            value={value}
            onChange={(event) => updateTask(event, index)}
            onDelete={() => deleteTask(index)}
          />
        ))}
      </div>
     
    </div>
  )
}

export default Lista;
import { useState } from 'react';
import { Header } from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Task 1 it is',
      day: '2/2/22',
      reminder: true,
    },
    {
      id: 2,
      text: 'Task 2 it is',
      day: '3/2/22',
      reminder: true,
    },
    {
      id: 3,
      text: 'Task 3 it is',
      day: '4/2/22',
      reminder: true,
    },
  ])

  //Add a task
  const addTask = (task) => {
    const id = Math.floor(Math.random()*1000) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks(
      tasks.filter((task) => task.id !==id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
      task.id === id ? {...task, reminder:!task.reminder} : task
      )
    )
  }

  return (
    <div className="container">
      <Header onAdd= {() => setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>
      { showAddTask && <AddTask onAdd= {addTask}/> }
      <Tasks tasks = {tasks} onDelete= {deleteTask} onToggle = {toggleReminder}/>
    </div>
  );
}

export default App;

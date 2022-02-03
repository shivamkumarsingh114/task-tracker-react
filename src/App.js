import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  //Fetch Tasks 
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  useEffect(()=> {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()   
  } ,[])

  //Add a task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(
      tasks.filter((task) => task.id !==id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    const updTask = {...data, reminder:!data.reminder}

    const res1 = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(updTask)
    })
    const data1 = await res1.json()

    setTasks(
      tasks.map((task) =>
      task.id === id ? {...task, reminder:data1.reminder} : task
      )
    )
  }

  return (
    <Router>
    <div className="container">
      <Header onAdd= {() => setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>
      <Routes>
        <Route path='/' element = {
          <>
            { showAddTask && <AddTask onAdd= {addTask}/> }
            <Tasks tasks = {tasks} onDelete= {deleteTask} onToggle = {toggleReminder}/>
          </>
        }/>
        <Route path='/about' element= {<About/>}/></Routes>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;

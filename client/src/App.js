import logo from './logo.svg';
import './App.css';

import {useState, useEffect} from "react"

function App() {
  const [allTasks, setAllTasks] = useState([])

  //Fetch all tasks
  useEffect(() => {
    fetch("/tasks")
    .then(r => {
      if(r.ok){
        return r.json()
        .then(tasks => {
          setAllTasks(tasks)
        })
      }
    })
  }, [])

  console.log(allTasks)
}

export default App;

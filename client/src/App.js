import logo from './logo.svg';
import './App.css';

import Page from './components/Page';
import { useState, useEffect } from 'react';

function App() {
  const [allTasks, setAllTasks] = useState([])

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

  return(
    <Page 
      allTasks={allTasks}
      setAllTasks={setAllTasks}
    />
  )
}

export default App;

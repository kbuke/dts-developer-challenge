import {useState, useEffect} from "react"

import Header from "./1.01-Header"
import ToDoProgress from "./1.02-ToDoProgress"
import ToDoList from "./1.03-ToDoList"

export default function Page(){
    //Show all tasks, completed tasks, tasks in progress and tasks not started 
    const [allTasks, setAllTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [tasksInProgress, setTasksInProgress] = useState([])
    const [notStartedTasks, setNotStartedTasks] = useState([])

    //Calculate task numbers
    const [numberOfTasks, setNumberOfTasks] = useState([])
    const [numberOfCompletedTasks, setNumberOfCompletedTasks] = useState([])
    const [numberOfInProgressTasks, setNumberOfInProgressTasks] = useState([])
    const [numberOfNotStartedTasks, setNumberOfNotStartedTasks] = useState([])

    //Show period of tasks (all, daily, weekly, monthly)
    const [taskPeriod, setTaskPeriod] = useState("All")

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

    //Calculate number of tasks whenever there is a change
    useEffect(() => {
        setNumberOfTasks(allTasks.length)
    }, [allTasks])

    console.log(`There are ${numberOfTasks} tasks in total`)
    console.log(allTasks)

    return(
        <div>
            <Header />

            <div>
                <ToDoProgress />
                <ToDoList 
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}

                    taskPeriod={taskPeriod}
                />
            </div>
        </div>
    )
}
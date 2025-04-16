import {useState, useEffect} from "react"

import Header from "./1.01-Header"
import ToDoProgress from "./1.02-ToDoProgress"
import ToDoList from "./1.03-ToDoList"

export default function Page({
    allTasks,
    setAllTasks
}){
    //Show all tasks, completed tasks, tasks in progress and tasks not started 
    const [completedTasks, setCompletedTasks] = useState([])
    const [tasksInProgress, setTasksInProgress] = useState([])
    const [notStartedTasks, setNotStartedTasks] = useState([])
    const [displayedTask, setDisplayedTask] = useState([])

    //Calculate task numbers
    const [numberOfTasks, setNumberOfTasks] = useState([])
    const [numberOfCompletedTasks, setNumberOfCompletedTasks] = useState([])
    const [numberOfInProgressTasks, setNumberOfInProgressTasks] = useState([])
    const [numberOfNotStartedTasks, setNumberOfNotStartedTasks] = useState([])

    //Show period of tasks (all, daily, weekly, monthly)
    const [taskPeriod, setTaskPeriod] = useState("All")
    //Set time period options
    const timeOptions = ["All", "Today", "This Week", "This Month", "Overdue"]

    //Show status of tasks
    const [taskStatus, setTaskStatus] = useState("All")
    //Set status options
    const statusOptions = ["All", "Complete", "Incomplete", "In Progress"]

    useEffect(() => {
        if (taskStatus === "All") {
            setDisplayedTask(allTasks)
        } else if (taskStatus === "Complete") {
            setDisplayedTask(allTasks.filter(task => task.task_status === "Complete"))
        } else if (taskStatus === "In Progress") {
            setDisplayedTask(allTasks.filter(task => task.task_status === "In Progress"))
        } else if (taskStatus === "Incomplete") {
            setDisplayedTask(allTasks.filter(task => task.task_status === "Incomplete"))
        }
    }, [allTasks, taskStatus])
    


    //Calculate number of tasks whenever there is a change
    useEffect(() => {
        setNumberOfTasks(allTasks.length)
    }, [allTasks])

    console.log(`There are ${numberOfTasks} tasks in total`)
    console.log(allTasks)

    return(
        <div>
            <Header />

            <div className="section--todo">
                <div className="row">
                    <ToDoProgress />
                    <ToDoList 
                        allTasks={displayedTask}
                        setAllTasks={setAllTasks}

                        taskPeriod={taskPeriod}
                        setTaskPeriod={setTaskPeriod}
                        timeOptions={timeOptions}

                        taskStatus={taskStatus}
                        setTaskStatus={setTaskStatus}
                        statusOptions={statusOptions}

                        numberOfTasks={numberOfTasks}
                    />
                </div>
            </div>
        </div>
    )
}
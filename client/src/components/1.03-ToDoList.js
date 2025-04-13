import { useState } from "react"

import AddTask from "./1.04-AddTask"

export default function ToDoList({
    allTasks, setAllTasks,
    taskPeriod, setTaskPeriod,
    timeOptions,
    taskStatus, setTaskStatus,
    statusOptions
}){
    const [addTask, setAddTask] = useState(false)

    //Render tasks based on period and status
    const renderTasks = (taskArray) => {
        const toDoList = taskArray.map((list, index) => (
            <div key={index}>
                <div>
                    <h3>{list.title}</h3>
                    <p>{list.task_description}</p>
                </div>

                <div>
                    <h5>Due Date:</h5>
                    <p>{list.due_date}</p>
                </div>

                <div>
                    <h5>Due Time:</h5>
                    <p>{list.due_time}</p>
                </div>
            </div>
        ))
        return toDoList
    }

    //Create containers for timing and status button
    const buttonConatiners = (typeText, buttonType, setButtonState) => {
        const timeButtons = buttonType.map((specificButton, index) => (
            <button
                key={index}
                onClick={() => setButtonState(specificButton)}
            >
                {specificButton}
            </button>
        ))

        return(
            <div>
                <h3>
                    {typeText}
                </h3>
                {timeButtons}
        </div>
        )
    }

    return(
        <section>
            <h1>To Do List</h1>

            {buttonConatiners("Tasks to be completed:", timeOptions, setTaskPeriod)}

            {buttonConatiners("Show Tasks that are:", statusOptions, setTaskStatus)}

            <button 
                onClick={() => setAddTask(true)}
            >
                Add New Task
            </button>

            {
                addTask?
                    <AddTask 
                        setAllTasks={setAllTasks}
                        statusOptions={statusOptions}
                        setAddTask={setAddTask}
                    />
                    :
                    null
            }

            {taskPeriod==="All" ?
                renderTasks(allTasks)
                :
                null
            }
        </section>
    )
}
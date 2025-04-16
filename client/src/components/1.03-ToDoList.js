import { useEffect, useState } from "react"

import AddTask from "./1.04-AddTask"

export default function ToDoList({
    allTasks, setAllTasks,
    taskPeriod, setTaskPeriod,
    timeOptions,
    taskStatus, setTaskStatus,
    statusOptions, numberOfTasks
}){
    const [addTask, setAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    console.log(allTasks)

    useEffect(() => {
        setTasks(allTasks.map(task => task))
    }, [allTasks])

    console.log(tasks)

    const todoDefaultImg = "https://images.unsplash.com/photo-1644329843491-99edfc83de04?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    //create task buttons
    const taskButtons = (buttonText, buttonType) => (
        <button className={`btn task__buttons task__buttons--${buttonType}`}>
            {buttonText}
        </button>
    )

    //Render tasks based on period and status
    const taskCards = (taskArray) => {
        const renderCards = taskArray.map((task, index) => (
                <div className="task__card" key={index}>
                    <figure className="task__card__shape">
                        {/*change this later when stop newTaskImg*/}
                        <img src={task.task_img === "newTaskImg"? todoDefaultImg : task.task_img} alt="" className="task__card__img"/>
                        <figcaption className="task__card__detail">
                            {/* figure out what text will be */}
                        </figcaption>
                    </figure>

                    <div className="task__text">
                        <h3>{task.title}</h3>
                        <p>{task.task_description?task.task_description : null}</p>
                        <p>Due Date: {task.due_date}</p>
                        <p>Due Time: {task.due_time}</p>
                    </div>
                    <div className="task__buttons--box">
                        {taskButtons("Edit Task", "edit")}
                        {taskButtons("Delete Task", "delete")}
                    </div>
                </div>
        ))
        return renderCards
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
        <section className="col-3-of-4 section--todo__list">
            <h1>{`To do list (${numberOfTasks})`}</h1>

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
                taskCards(tasks)
                :
                null
            }
        </section>
    )
}
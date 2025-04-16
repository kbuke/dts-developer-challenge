import { useEffect, useState } from "react"

import AddTask from "./1.04-AddTask"
import DeleteTask from "./1.05-DeleteTask"

export default function ToDoList({
    displayedTask, setDisplayedTask,
    allTasks, setAllTasks,
    numberOfTasks, statusOptions,
    taskPeriod,
    taskStatus, setTaskStatus
}){
    const [addTask, setAddTask] = useState(false)
    const [editTask, setEditTask] = useState(false)
    const [deleteTask, setDeleteTask] = useState(false)
    const [selectedTaskId, setSelectedTaskId] = useState()

    const todoDefaultImg = "https://images.unsplash.com/photo-1644329843491-99edfc83de04?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    const date = new Date().toLocaleDateString();
    console.log(date)


    //create task buttons for edits and deletes
    const taskButtons = (buttonText, buttonType, setTaskId, taskId, setTaskAction) => (
        <button 
            className={`btn task__buttons task__buttons--${buttonType}`}
            onClick={() => {setTaskAction(true); setTaskId(taskId)}}
        >
            {buttonText}
        </button>
    )

    //Create radio buttons for status and time period of to do list
    const radioButtons = (buttonType, relevantArray) => {
        return relevantArray.map((button, index) => (
            <div className="radio-group" key={index}>
                <input 
                    type="radio" 
                    className="radio-input" 
                    id={`${buttonType}-${button}`} 
                    name={buttonType}
                    checked={taskStatus === button}
                    onChange={() => setTaskStatus(button)}
                />
                <label htmlFor={`${buttonType}-${button}`} className="radio-label">
                    <span className="radio-button"></span>
                    <span className="radio-text">{button}</span>
                </label>
            </div>
        ))
    }

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
                        <h3>Status: {task.task_status}</h3>
                    </div>
                    <div className="task__buttons--box">
                        {taskButtons("Edit Info", "edit", setSelectedTaskId, task.id, setEditTask)}
                        {taskButtons("Delete Task", "delete", setSelectedTaskId, task.id, setDeleteTask)}
                    </div>
                </div>
        ))
        return renderCards
    }


    return(
        <section className="col-3-of-4 section--todo__list">
            <div className="section--todo__header">
                <h2 className="heading-secondary">
                    {`To do list`}
                </h2>

                <button 
                    onClick={() => setAddTask(true)}
                    className="btn btn--add--task"
                >
                    Add New Task +
                </button>
            </div>

            <div className="radio-button__box">
                {radioButtons("status", statusOptions)}
            </div>

            {
                addTask?
                    <AddTask 
                        allTasks={allTasks}
                        setAllTasks={setAllTasks}
                        statusOptions={statusOptions}
                        setAddTask={setAddTask}
                        date={date}
                    />
                    :
                    null
            }

            {
                deleteTask?
                    <DeleteTask 
                        setDeleteTask={setDeleteTask}
                        allTasks={allTasks}
                        setAllTasks={setAllTasks}
                        selectedTaskId={selectedTaskId}
                    />
                    :
                    null
            }

            {taskPeriod==="All" ?
                taskCards(displayedTask)
                :
                null
            }
        </section>
    )
}
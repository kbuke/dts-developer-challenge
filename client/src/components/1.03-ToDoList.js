import { useEffect, useState } from "react"

import AddTask from "./1.04-AddTask"
import DeleteTask from "./1.05-DeleteTask"
import EditTask from "./1.06-EditTask"

export default function ToDoList({
    displayedTask, setDisplayedTask,
    allTasks, setAllTasks,
    numberOfTasks, statusOptions,
    taskPeriod,
    taskStatus, setTaskStatus,
    timeOptions, 
    setTaskPeriod,
    date
}){
    const [addTask, setAddTask] = useState(false)
    const [editTask, setEditTask] = useState(false)
    const [deleteTask, setDeleteTask] = useState(false)
    const [selectedTaskId, setSelectedTaskId] = useState()
    const [selectedTaskTitle, setSelectedTaskTitle] = useState()
    const [selectedTaskDescription, setSelectedTaskDescription] = useState()
    const [selectedTaskImg, setSelectedTaskImg] = useState()
    const [selectedTaskStatus, setSelectedTaskStatus] = useState()
    const [selectedTaskDueDate, setSelectedTaskDueDate] = useState()
    const [selectedTaskDueTime, setSelectedTaskDueTime] = useState()

    const todoDefaultImg = "https://images.unsplash.com/photo-1644329843491-99edfc83de04?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


    //create task buttons for edits and deletes
    const taskButtons = (
        buttonText, buttonType, setTaskId, taskId, setTaskAction, taskTitle,
        taskDescription, taskImg, taskStatus, taskDueDate, taskDueTime
    ) => (
        <button 
            className={`btn task__buttons task__buttons--${buttonType}`}
            onClick={() => {
                setTaskAction(true); setTaskId(taskId); setSelectedTaskTitle(taskTitle);
                setSelectedTaskDescription(taskDescription); setSelectedTaskImg(taskImg);
                setSelectedTaskStatus(taskStatus); setSelectedTaskDueDate(taskDueDate); 
                setSelectedTaskDueTime(taskDueTime)
            }}
        >
            {buttonText}
        </button>
    )

    //Input for task info
    const newTaskInput = (labelHeading, inputType, setState) => (
        <div className="form__group">
            <input 
                onChange={(e) => setState(e.target.value)}
                type={inputType} 
                className="form__input"
                placeholder={labelHeading}
                id={labelHeading}
            />
            <label className="form__label" htmlFor={labelHeading}>{labelHeading}</label>
        </div>
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

    //Show time options
    const timeOptionButtons = timeOptions.map((period, index) => (
        <button 
            key={index}
            onClick={() => setTaskPeriod(period)}
            className={taskPeriod===period ? "btn btn__time-selected" : "btn btn__time-unselected"}
        >
            {period}
        </button>
    ))

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
                        <h3 className="task__heading">{task.title}</h3>
                        <p>{task.task_description?task.task_description : null}</p>
                        <p>Due Date: {task.due_date}</p>
                        <p>Due Time: {task.due_time}</p>
                        <h3 className="task__heading--status">
                            <span>Status:</span>
                            <span
                                className={
                                    task.task_status==="In Progress"?
                                        "task__heading--status-inProgress"
                                    :
                                    task.task_status==="Complete"?
                                        "task__heading--status-complete"
                                    :
                                    "task__heading--status-incomplete"   
                                }
                            > 
                                {task.task_status}</span>
                        </h3>
                    </div>
                    <div className="task__buttons--box">
                        {taskButtons(
                            "Edit Info", "edit", setSelectedTaskId, task.id, setEditTask, task.title, task.task_description,
                            task.task_img, task.task_status, task.due_date, task.due_time
                        )}
                        {taskButtons("Delete Task", "delete", setSelectedTaskId, task.id, setDeleteTask, task.title)}
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

            <div className="btn__time-box">
                {timeOptionButtons}
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
                        selectedTaskTitle={selectedTaskTitle}
                    />
                    :
                    null
            }

            {
                editTask?
                    <EditTask 
                        allTasks={allTasks}
                        setAllTasks={setAllTasks}
                        selectedTaskId={selectedTaskId}
                        selectedTaskTitle={selectedTaskTitle}
                        selectedTaskImg={selectedTaskImg}
                        selectedTaskDescription={selectedTaskDescription}
                        selectedTaskStatus={selectedTaskStatus}
                        selectedTaskDueDate={selectedTaskDueDate}
                        selectedTaskDueTime={selectedTaskDueTime}
                        setEditTask={setEditTask}
                        newTaskInput={newTaskInput}
                        statusOptions={statusOptions}
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
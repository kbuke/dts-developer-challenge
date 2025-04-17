import { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"

export default function AddTask({
    allTasks,
    setAllTasks,
    statusOptions,
    setAddTask,
    date
}){
    const[newTaskTitle, setNewTaskTitle] = useState("")
    const[newTaskDescription, setNewTaskDescription] = useState("")
    const[newTaskStatus, setNewTaskStatus] = useState("")
    const[newTaskImg, setNewTaskImg] = useState("")
    const[newTaskDueDate, setNewTaskDueDate] = useState()
    const[newTaskDueTime, setNewTaskDueTime] = useState()

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

    //handle additional tasks
    const handleNewTasks = (e) => {
        e.preventDefault()
        const jsonData = {
            newTaskTitle,
            newTaskDescription,
            newTaskStatus,
            newTaskImg,
            newTaskDueDate,
            newTaskDueTime
        }
        fetch('/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(r => r.json())
        .then(newTask => {
            setAllTasks([...allTasks, newTask])
        })
        .then(setAddTask(false))
    }

    

    return(
        <div className="popup-cover">
            <form className="popup-cover_add_task form-box" onSubmit={(e) => handleNewTasks(e)}>
                <h2 className="heading-tertiary">Add New Task</h2>

                {newTaskInput("New Task", "text", setNewTaskTitle)}
                {newTaskInput("Enter Description", "text", setNewTaskDescription)}

                <div className="form__group">
                    {/* <label>Status</label> */}
                    <select
                        name="newTaskStatus"
                        onChange={(e) => setNewTaskStatus(e.target.value)}
                        value={newTaskStatus}
                        className="form__input"
                    >
                        <option value="" disabled>Please Select Status</option>
                        {statusOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <label className="form__label" htmlFor="Task Status">Task Status</label>
                </div>

                {newTaskInput("Enter Image of Task", "text", setNewTaskImg)}

                <div className="form__group">
                    <label>Due Date</label>
                    <input
                        type="date"
                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                        min={date}
                        className="form__input"
                    />
                    {newTaskDueDate && new Date(date) < new Date(newTaskDueDate) ? (
                        <p>{`Due date cannot be before today (${date})`}</p>
                    ) : null}
                </div>

                <div className="form__group">
                    <input 
                        onChange={(e) => setNewTaskDueTime(e.target.value)}
                        type="time" 
                        className="form__input"
                        placeholder="Due Time"
                        id="Due Time"
                    />
                    <label className="form__label" htmlFor="Due Time">Due Time</label>
                </div>

                <div className="form_button-box">
                    <button className="form_button-submit" type="submit">
                        Create New Task
                    </button>

                    <button 
                        className="form_button-cancel"
                        onClick={() => setAddTask(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
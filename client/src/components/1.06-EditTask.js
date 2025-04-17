import { useState } from "react"


export default function EditTask({
    allTasks,
    setAllTasks,
    selectedTaskId,
    selectedTaskTitle,
    selectedTaskImg,
    selectedTaskDescription,
    selectedTaskStatus,
    selectedTaskDueDate,
    selectedTaskDueTime,
    setEditTask,
    statusOptions
}){
    const [newTitle, setNewTitle] = useState(selectedTaskTitle)
    const [newDescription, setNewDescription] = useState(selectedTaskDescription)
    const [newStatus, setNewStatus] = useState(selectedTaskStatus)
    const [newImg, setNewImg] = useState(selectedTaskImg)
    const [newDate, setNewDate] = useState(selectedTaskDueDate)
    const [newTime, setNewTime] = useState(selectedTaskDueTime)


    const editTaskInput = (labelHeading, inputType, setState, val) => {
        return(
            <div className="form__group">
                <input 
                    onChange={(e) => setState(e.target.value)}
                    type={inputType}
                    className="form__input"
                    value={val}
                    id={labelHeading}
                    placeholder={labelHeading}
                />
                {/* <label htmlFor={label} className="form__label">{labelHeading}</label> */}
            </div>
        )
    }

    const handleTaskEdit = (e) => {
        e.preventDefault()
        fetch(`/tasks/${selectedTaskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle,
                task_description: newDescription,
                task_status: newStatus,
                due_date: newDate,
                due_time: newTime,
                task_img: newImg
            })
        })
        .then((r) => {
            if(r.ok){
                return r.json()
            } else {
                console.error("Failed to update task")
                return null
            }
        })
        .then((newTaskInfo) => {
            if(newTaskInfo){
                setAllTasks(allTasks.map(oldTasks => 
                    oldTasks.id === newTaskInfo.id ? newTaskInfo : oldTasks
                ))
            }
        })
        .then(setEditTask(false))
    }

    return(
        <div className="popup-cover">
            <form className="popup-cover_add_task form-box" onSubmit={(e) => handleTaskEdit(e)}>
                <h2 className="heading-tertiary">Edit Task Details</h2>
                
                {editTaskInput("Edit Task Title", "text", setNewTitle, newTitle)}
                {editTaskInput("Edit Task Description", "text", setNewDescription, newDescription)}

                <div className="form__group">
                    <select 
                        name="newStatus" 
                        className="form__input"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="" disabled>Please Select Status</option>
                        {statusOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {editTaskInput("Edit Task Image", "text", setNewImg, newImg)}

                <div className="form__group">
                    <input 
                        type="date" 
                        className="form__input" 
                        placeholder="Due Date"
                        id="Due Date"
                        onChange={(e) => setNewDate(e.target.value)}
                    />
                </div>

                <div className="form__group">
                    <input 
                        type="time"
                        className="form__input"
                        placeholder="Due Time"
                        id="Due Time"
                    />
                </div>

                <div className="form_button-box">
                    <button className="form_button-submit" type="submit">
                        Edit Task
                    </button>

                    <button className="form_button-cancel" onClick={() => setEditTask(false)}>
                        Cancel
                    </button>
                </div>
                
            </form>
        </div>
    )
}
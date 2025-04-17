

export default function DeleteTask({
    setDeleteTask,
    allTasks,
    setAllTasks,
    selectedTaskId,
    selectedTaskTitle
}){
    console.log(`deleting task number ${selectedTaskTitle}`)

    const handleDeleteTask = (e, taskId) => {
        e.preventDefault()
        fetch(`/tasks/${selectedTaskId}`, {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok){
                setAllTasks(allTasks => allTasks.filter(task => task.id !== selectedTaskId))
            }
        })
        .then(setDeleteTask(false))
    }

    return(
        <div className="popup-cover">
            <form className="popup-cover_add_task form-box" onSubmit={(e) => handleDeleteTask(e)}>
                <h2>Delete {selectedTaskTitle}?</h2>

                <div className="form_button-box">
                    <button className="form_button-submit" type="submit">
                        Delete Task
                    </button>

                    <button 
                        className="form_button-cancel"
                        onClick={() => setDeleteTask(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
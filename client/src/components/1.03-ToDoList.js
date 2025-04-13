

export default function ToDoList({
    allTasks,
    setAllTasks,
    taskPeriod
}){

    const renderTasks = (taskArray) => {
        const toDoList = taskArray.map((list, index) => (
            <div key={index}>
                <h3>{list.title}</h3>
                <p>{list.task_description}</p>
            </div>
        ))
        return toDoList
    }


    return(
        <section>
            <h1>To Do List</h1>

            {taskPeriod==="All" ?
                renderTasks(allTasks)
                :
                null
            }
        </section>
    )
}
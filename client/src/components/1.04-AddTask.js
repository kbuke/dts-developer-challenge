import { useEffect, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"

export default function AddTask({
    setAllTasks,
    statusOptions,
    setAddTask
}){
    const [refreshPg, setRefreshPg] = useState(false)

    //create input fields
    const newTaskInput = (labelHeading, inputType) => (
        <div>
            <label>{labelHeading}</label>
            <input 
                id={inputType}
                name={inputType}
                onChange={formik.handleChange}
                value={formik.values.inputType}
            />
            <p>{formik.errors.inputType}</p>
        </div>
    )

    useEffect(() => {
        fetch("/tasks")
        .then((res) => res.json())
        .then((data) => {
            setAllTasks(data)
        })
    }, [])

    const formSchema = yup.object().shape({
        newTaskTitle: yup.string().required("Must enter a title"),
        newTaskDescription: yup.string(),
        newTaskStatus: yup.string().required("Please select status of task"),
        newTaskDueDate: yup
            .date()
            .required("Please select a due date")
            .test("is-not-in-past", "Due date can't be in the past", function (value) {
                if(!value) return false;
                const today = new Date();
                return value >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
            }),
        newTaskDueTime: yup
            .string()
            .required("Please enter a time")
            .test("valid-time", "Time can't be in the past if due today", function (timeStr) {
                const {newTaskDueDate} = this.parent;
                if (!newTaskDueDate || !timeStr) return true;

                const today = new Date();
                const selectedDate = new Date(newTaskDueDate);

                if (
                    selectedDate.getDate() === today.getDate() &&
                    selectedDate.getMonth() === today.getMonth() &&
                    selectedDate.getFullYear() === today.getFullYear()
                ) {
                    const [hour, minute] = timeStr.split(":").map(Number);
                    const now = new Date();
                    if(hour < now.getHours() || (hour === now.getHours() && minute <= now.getMinutes())){
                        return false
                    }
                }
                return true
            }),
        newTaskImg: yup.string().url("Must be a valid URL").nullable()
    })

    const formik = useFormik({
        initialValues: {
            newTaskTitle: "",
            newTaskDescription: "",
            newTaskStatus: "",
            newTaskDueDate: "",
            newTaskDueTime: "",
            newTaskImg: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.ok) {
                    fetch("/tasks")
                        .then(r => r.json())
                        .then(data => {
                            setAllTasks(data)
                            setAddTask(false) 
                        })
                }
            })
        }
        
    })
    return(
        <section>
            <form onSubmit={formik.handleSubmit}>
                {newTaskInput("Add title of task", "newTaskTitle")}
                {newTaskInput("Add description of task", "newTaskDescription")}
                {newTaskInput("Add task image", "newTaskImg")}

                <div>
                    <label>Status</label>
                    <select
                        name="newTaskStatus"
                        onChange={formik.handleChange}
                        value={formik.values.newTaskStatus}
                    >
                        <option value="" disabled>Please select an option</option>
                        {statusOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    <p>{formik.errors.newTaskStatus}</p>
                </div>

                <div>
                    <label>Due Date</label>
                    <input 
                        type="date"
                        name="newTaskDueDate"
                        onChange={formik.handleChange}
                        value={formik.values.newTaskDueDate}
                    />
                    <p>{formik.errors.newTaskDueDate}</p>
                </div>

                <div>
                    <label>Due Time</label>
                    <input 
                        type="time"
                        name="newTaskDueTime"
                        onChange={formik.handleChange}
                        value={formik.values.newTaskDueTime}
                    />
                    <p>{formik.errors.newTaskDueTime}</p>
                </div>

                <button type="submit">Submit</button>
                <button onClick={() => setAddTask(false)}>Cancel</button>
            </form>
        </section>
    )
}
from flask import request, make_response, session, render_template

from models import Task

# The backend should be able to:
# - Create a task with the following properties:
#   - Title - done
#   - Description (optional field) - done
#   - Status - done
#   - Due date/time
# - Retrieve a task by ID
# - Retrieve all tasks
# - Update the status of a task
# - Delete a task

class Tasks(Resource):
    #retrieve all tasks
    def get(self):
        tasks=[task.to_dict() for task in Task.query.all()]
        return tasks, 200
    
    #add a new task
    def post(self):
        json = request.get_json()
        try:
            new_task = Task(
                title=json.get("newTaskTitle"),
                task_description=("newTaskDescription"),
                task_status=("newTaskStatus"),
                due_date=("newTaskDueDate"),
                due_time=("newTaskDueTime")
            )
            db.session.add(new_task)
            db.session.commit()
            return new_task.to_dict(), 201
        except ValueError as e:
            return {"error": [str(e)]}, 400

if __name__ == "__main__":
    app.run(port=5555, debug=True)
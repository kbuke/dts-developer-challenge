from flask import request, make_response, session, render_template

from flask_restful import Resource

from models import Task

from config import app, db, api

from datetime import datetime

class Tasks(Resource):
    #retrieve all tasks
    def get(self):
        tasks=[task.to_dict() for task in Task.query.all()]
        return tasks, 200
    
    #add a new task
    def post(self):
        json = request.get_json()
        # breakpoint()
        try:
            due_date_str = json.get("newTaskDueDate")
            due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date() if due_date_str else None

            due_time_str = json.get("newTaskDueTime")
            due_time = datetime.strptime(due_time_str, "%H:%M").time() if due_time_str else None

            new_task = Task(
                title=json.get("newTaskTitle"),
                task_description=json.get("newTaskDescription"),
                task_status=json.get("newTaskStatus"),
                due_date=due_date,
                due_time=due_time,
                task_img=json.get("newTaskImg")
            )
            db.session.add(new_task)
            db.session.commit()
            return new_task.to_dict(), 201
        except ValueError as e:
            return {"error": [str(e)]}, 400

class TasksId(Resource):
    #retrieve task by id
    def get(self, id):
        task = Task.query.filter(Task.id == id).first()
        if task:
            return make_response(task.to_dict(), 201)
        return {"error": "Task not found"}, 404

    
    #patch task by id
    def patch(self, id):
        data = request.get_json()
        task_info = Task.query.filter(Task.id==id).first()
        if task_info:
            try:
                for attr in data:
                    setattr(task_info, attr, data[attr])
                db.session.add(task_info)
                db.session.commit()
                return make_response(task_info.to_dict(), 202)
            except ValueError:
                return{"error": ["Validation Error"]}, 400
        return {"error": "Task not found"}, 404

    #delete task by id
    def delete(self, id):
        task = Task.query.filter(Task.id == id).first()

        if task:
            db.session.delete(task)
            db.session.commit()
            return{"message": "Task deleted"}, 200 
        return {"error": "Task not found"}, 404

api.add_resource(Tasks, '/tasks')
api.add_resource(TasksId, '/tasks/<int:id>')

if __name__ == "__main__":
    app.run(port=5555, debug=True)
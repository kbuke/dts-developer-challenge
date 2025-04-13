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

from sqlalchemy import Time

#Create the TASK Model
class Task(db.Model, SerializerMixin):
    __tablename__="task_list"

    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String, nullable=False)
    task_description=db.Column(db.String, nullable=True)
    task_status=db.Column(db.String, nullable=False, server_default="Incomplete")
    due_date=db.Column(db.DateTime, nullable=False)
    due_time=db.Column(db.Time, nullable=False)

    #Set up validation for task_status
    ALLOWED_STATUS_OPTIONS = ("Complete", "Incomplete", "In Progress")
    @validates(task_status)
    def validate_status(self, key, status):
        if status in self.ALLOWED_STATUS_OPTIONS:
            return status 
        raise ValueError(f"Value of task_status must be Complete, Incomplete, or In Progress")

    #Set up validation for due_date (can not set a task who's due date is passed)

    #Set up validation for due_tiem (can not set a time on the date that has already passed)
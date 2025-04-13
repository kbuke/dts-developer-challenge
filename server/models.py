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

from sqlalchemy import Time, DateTime
from datetime import datetime, date, time
from sqlalchemy.orm import validates
from config import db
from sqlalchemy_serializer import SerializerMixin

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
    @validates(due_date)
    def validate_due_date(self, key, due_date_value):
        if due_date_value.date() < date.today():
            raise ValueError("Due date can not be in the past")
        return due_date_value

    #Set up validation for due_tiem (can not set a time on the date that has already passed)
    @validates(due_time)
    def validate_due_time(self, key, due_time_value):
        #Find out when the due date is
        due_date_value = self.due_date if isinstance(self.due_date, datetime) else None

        #If the due date is today, ensure that the due_time has not yet past
        if due_date_value and due_date_value.date() == date.today():
            now = datetime.now()
            if due_time_value < now.time():
                raise ValueError("Due time can not be in the past")
            return due_time_value
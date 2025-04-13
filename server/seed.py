from app import app 
from config import db 

from datetime import datetime, time

import os 

from models import Task 

if __name__ == "__main__":
    with app.app_context():
        print("Starting seed...")

        db.drop_all()
        db.create_all()
        print("Begin seeding")

        print("Start seeding all tasks")
        apply_ministry_of_justice = Task(
            title="Apply for Jr Software Developer role at Ministry of Justice UK",
            task_description="I need to apply for this position by creating a to-do list, and writing a personal statement",
            task_status="In Progress",
            due_date=datetime(2025, 4, 13),
            due_time=time(18, 0),
            task_img="https://www.matrixbooking.com/wp-content/uploads/2023/08/MB-MOJ-e1595237357375.png"
        )

        db.session.add_all([apply_ministry_of_justice])
        db.session.commit()

        print("Finished seeding")
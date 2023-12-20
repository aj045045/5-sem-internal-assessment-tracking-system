from .Database import Database
from bson import ObjectId
from datetime import datetime


class Assessment():

    def __init__(self, title="", subject_id="", assessment_type=""):
        self.__title = title
        self.__subject_id = subject_id
        self.__assessment_type = assessment_type

    def create_assessment(self, semester_id,):
        data = {
            'title': self.__title,
            'subject_id': ObjectId(self.__subject_id),
            'assessment_type': ObjectId(self.__assessment_type)
        }
        assessment_value = Database.collection('assessment').insert_one(data)
        if assessment_value is not False:
            student_record = list(Database.collection('student').view_one(
                {'semester_id': ObjectId(semester_id)}))
            time = datetime.now()
            last_logged = time.strftime("%d-%m-%Y")
            for student in student_record:
                assessment_data = {
                    'assessment_id': ObjectId(assessment_value),
                    'student_id': ObjectId(student['_id']),
                    'status': False,
                    'last_changed': last_logged,
                }
                Database.collection(
                    'assessment_record').insert_one(assessment_data)
            return True
        else:
            return False

    def get_assessment_record(self, assessment_id):
        pipeline = [
            {"$match": {"assessment_id": ObjectId(assessment_id)}},
            {"$lookup": {"from": "student", "localField": "student_id","foreignField": "_id", "as": "student_info"}},
            {"$unwind": "$student_info"},
            {"$lookup": {"from": "user", "localField": "student_info.user_id","foreignField": "_id", "as": "user_info"}},
            {"$unwind": "$user_info"},
            {
                "$project": {
                    "_id": 1,
                    "status": 1,
                    "last_changed": 1,
                    "student_info.roll_no": 1,
                    "user_info.user_name": 1,
                }
            },
        ]
        return list(Database.collection('assessment_record').aggregate(pipeline))
    
    def update_assessment(self):
        return

    def delete_assessment(self):
        return

    def view_assessment(self):
        return

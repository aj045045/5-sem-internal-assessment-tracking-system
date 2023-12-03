from .Database import Database
from bson import ObjectId
class Subject():
    def add_subject(self,subject_name,subject_type,code,credit,subject_plan,semester_id,faculty_id):
        data = {
            "subject_name": subject_name,
            "type": subject_type,
            "code": code,
            "credit": credit,
            "subject_plan": subject_plan,
            "semester_id": ObjectId(semester_id),
            "faculty_id": ObjectId(faculty_id)
        }
        return Database.collection('subject').insert_one(data)

    def update():
        return

    def delete():
        return

    def display_subject(self,semester_id):
        pipeline = [
            { "$match": { "semester_id": ObjectId(semester_id) } },
            { "$lookup": { "from": "user", "localField": "faculty_id", "foreignField": "_id", "as": "user_info" } },
            { "$unwind": "$user_info" },
            {"$project": {"_id":1,"subject_name": 1,"credit":1,"type": 1,"code": 1,"subject_plan": 1,"user_info.user_name":1}},
        ]
        return list(Database.collection('subject').aggregate(pipeline))

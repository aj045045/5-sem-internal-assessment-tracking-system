from .Database import Database
from bson import ObjectId

class Semester():
    def __init__(self):
        self.__semester_number = ""
        self.__syllabus_document = ""
        self.__number_of_subject = ""

    @property
    def _semester_number(self):
        return self.__semester_number

    @_semester_number.setter
    def _semester_number(self, value):
        self.__semester_number = value

    @property
    def _syllabus_document(self):
        return self.__syllabus_document

    @_syllabus_document.setter
    def _syllabus_document(self, value):
        if len(value) > 50:
            value = value[:50]
        self.__syllabus_document = value

    @property
    def _number_of_subject(self):
        return self.__number_of_subject

    @_number_of_subject.setter
    def _number_of_subject(self, value):
        self.__number_of_subject = value

    def add_course_sem(self, no_of_sem, course_id):
        json_sem_data = []
        for sem in range(no_of_sem):
            data_sem = {
                "semester_number": sem+1,
                "syllabus_document": "",
                "number_of_subject": 0,
                "faculty_id": ObjectId(),
                "course_id": course_id
            }
            json_sem_data.append(data_sem)
        if len(json_sem_data) > 0:
            return Database.collection('semester').insert(json_sem_data)
        
    def semester():
         data_sem = {
                "semester_number": "",
                "syllabus_document": "",
                "number_of_subject": 0,
                "faculty_id": ObjectId(),
                "course_id": ""
            }
         return Database.collection('semester').insert_one(data_sem)
    def update():
        return

    def delete():
        return

    def view_semester(self, semester_number):
        pipeline = [
            {
                "$match":{"course_id":ObjectId(semester_number)}
            },
            {
            "$lookup":{
                "from":"faculty",
                "localField":"faculty_id",
                "foreignField":"_id",
                "as":"faculty_details"
                },
            },
            {
                "$addFields": {
                    "faculty_details": {
                        "$map": {
                            "input": "$faculty_details",
                            "in": {
                                "name": "$$this.faculty_name",
                            }
                        }
                    }
                }
            },
            {
            "$project":{
                "_id":1,
                "course_name":1,
                "semester_details":1
                }
            }
        ]
        # course_id = ObjectId(f'{semester_number}')
        # 
        # semester = {"course_id":course_id}
        # return list(Database.collection('semester').view_one(semester))
        return list(Database.collection('course').aggregate(pipeline))
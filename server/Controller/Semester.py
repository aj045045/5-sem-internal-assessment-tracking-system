from .Database import Database
from bson import ObjectId
import os
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
                "faculty_id": ObjectId('6533d96be98aa3e7f3907181'),
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
                "faculty_id": ObjectId('6533d96be98aa3e7f3907181'),
                "course_id": ""
            }
         return Database.collection('semester').insert_one(data_sem)
    
    def last_semester_number(self,course_id):
        pipeline =[
          {"$match":{"course_id":ObjectId(course_id)}},
          {"$sort":{"semester_number":-1}},
          {"$limit":1},
          {"$project":{"semester_number":1,"_id":0}}
        ]
        return list(Database.collection('semester').aggregate(pipeline)) 
    
    def add_semester_record(self,semester_number,syllabus_document,faculty_id,course_id):
         data_sem = {
                "semester_number": semester_number,
                "syllabus_document": syllabus_document,
                "number_of_subject": 0,
                "faculty_id": ObjectId(faculty_id),
                "course_id": ObjectId(course_id)
            }
         return Database.collection('semester').insert_one(data_sem)  

    def update(self,semester_id,subject_location,faculty_id):
        #TODO - Set value
        find_pipe = {
            "_id":ObjectId(semester_id)
        }
        update_pipe = {
            "$set":{
            "syllabus_document":subject_location,
            "faculty_id":ObjectId(faculty_id)
            }
        }
        #TODO - Update the values
        response = Database.collection('semester').update_one(find_pipe,update_pipe)
        #TODO - Delete the files
        print('RESPONSE VALUE',response)
        if response is not False and response['syllabus_document'] !='':
            value = response['syllabus_document']
            os.remove(f'../client/public/{value}')
            return True
        else: 
            return False 

    def delete():
        return

    def view_semester(self, semester_number):
      pipeline =[
       {
                "$match": {"course_id": ObjectId(semester_number)}
    },
  {
    "$lookup": {
      "from": "user",
      "localField": "faculty_id",
      "foreignField": "_id",
      "as": "user_info"
    }
  },
  {
    "$unwind": "$user_info"
  },
   {
    "$project": {
      '_id': 1,
      'semester_number': 1,
      'syllabus_document': 1,
      'number_of_subject':1,
      'user_info.user_name': 1,
    }
  },
    ]
      return list(Database.collection('semester').aggregate(pipeline))
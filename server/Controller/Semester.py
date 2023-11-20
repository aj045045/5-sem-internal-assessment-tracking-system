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
                "faculty_id": ObjectId('6533d96be98aa3e7f3907182'),
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
                "faculty_id": ObjectId('6533d96be98aa3e7f3907182'),
                "course_id": ""
            }
         return Database.collection('semester').insert_one(data_sem)
    
    def last_semester_id(self,course_id):
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
    def update():
        return

    def delete():
        return

    def view_semester(self, semester_number):
        pipeline = [
            {
                "$match": {"course_id": ObjectId(semester_number)}
            },
  {
    "$lookup": {
      "from": "faculty",
      "localField": "faculty_id",
      "foreignField": "_id",
      "as": "faculty_info"
    }
  },
  {
    "$unwind": "$faculty_info"
  },
  {
    "$lookup": {
      "from": "user",
      "localField": "faculty_info.userId",
      "foreignField": "_id",
      "as": "user_info"
    }
  },
  {
    "$unwind": "$user_info"
  },
  {
    "$project": {
      "semester_details": "$$ROOT",
      "faculty_user_id": "$faculty_info.userId",
      "faculty_user_name": "$user_info.user_name"
    },
  },
   {
    "$project": {
      'semester_details._id': 0,
      'semester_details.faculty_info': 0,
      'semester_details.user_info': 0,
      'faculty_user_id':0,
      'semester_details.faculty_id': 0,
      'semester_details.course_id': 0,
    }
  },
    ]
        
        pipelineField = [
  {
   "$match":{
     "_id":ObjectId(semester_number),
   } 
  },{
    "$project":{
      "course_name":1,
      "_id":0,
    }
  }
]
        return list(Database.collection('semester').aggregate(pipeline))
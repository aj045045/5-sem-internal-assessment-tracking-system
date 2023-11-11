from pymongo import MongoClient
from flask import Flask

app = Flask(__name__)


# class Temp():

#     def __init__(self):
#         url = MongoClient('mongodb://localhost:27017/')
#         self.__client = url["assessment_system"]
#         self.name = "ansh"
#         self.password = "password"

#     def store(self):
#         collection = self.__client["user"]
#         data = {
#             "name": self.name,
#             "password": self.password
#         }
#         collection.insert_one(data)


# temp_obj = Temp()
# temp_obj.store()
    
# class Database():

#     def __init__(self):
#         url = MongoClient('mongodb://localhost:27017/')
#         self.client = url["assessment_system"]

#     @classmethod
#     def collection(self,collection):
#         self.collection = self.client[collection]
#         return self
    
#     @classmethod
#     def insert(self, data):
#         result = self.collection.insert_many(data)
#         if result.acknowledged:
#             return result.inserted_ids
#         else:
#             return False
    
#     @classmethod
#     def insert_one(self,data):
#         result = self.collection.insert_one(data)
#         if result.acknowledged:
#             return result.inserted_id
#         else:
#             return False
    
#     @classmethod
#     def delete(self, data):
#         result = self.collection.delete_many(data)
#         if result > 0:
#             return True
#         else:
#             return False

#     @classmethod
#     def delete_one(self, data):
#         result = self.collection.find_one_and_delete(data)
#         if result:
#             return result['_id']
#         else:
#             return False
        
#     @classmethod
#     def update(self, update):
#         result = self.collection.update_many({}, update)
#         if result.modified_count > 0:
#             return True
#         else:
#             return False
    
#     @classmethod
#     def update_one(self, find, update):
#         result = self.collection.find_one_and_update(find, update)
#         if result:
#             return result['_id']
#         else:
#             return False

#     @classmethod
#     def view(self):
#         result =  self.collection.find()
#         if result is None:
#             return False
#         else:
#             return result

#     @classmethod
#     def view_one(self, data):
#         result =  self.collection.find({}, data)
#         if result is None:
#             return False
#         else:
#             return result
    
#     @classmethod
#     def aggregate(self,data):
#         return self.collection.aggregate([data])

# db = Database.collection('user').view()
# print(db)
# json_sem_data = []
# for sem in range(5):

#     data_sem = {
#         "semester_number":sem,
#         "syllabus_document":"",
#         "number_of_subject":"0",
#         "faculty_id":"",
#         "course_id":sem
#     }
#     json_sem_data.append(data_sem)
# print(json_sem_data)
from pymongo import MongoClient

class Database:
    def __init__(self):
        url = MongoClient('mongodb://localhost:27017/')
        self.client = url['assessment_system']
        self.collection = None

    @classmethod
    def collection(cls, collection_name):
        instance = cls()
        instance.collection = instance.client[collection_name]
        return instance
    
    def insert(self, data):
        result = self.collection.insert_many(data)
        if result.acknowledged:
            return result.inserted_ids
        else:
            return False

    def insert_one(self, data):
        result = self.collection.insert_one(data)
        if result.acknowledged:
            return result.inserted_id
        else:
            return False

    def delete(self, data):
        result = self.collection.delete_many(data)
        if result > 0:
            return True
        else:
            return False

    def delete_one(self, data):
        result = self.collection.find_one_and_delete(data)
        if result:
            return result['_id']
        else:
            return False

    def update(self, update):
        result = self.collection.update_many({}, update)
        if result.modified_count > 0:
            return True
        else:
            return False

    def update_one(self, find, update):
        result = self.collection.find_one_and_update(find, update)
        if result:
            return result['_id']
        else:
            return False

    def view(self):
        result = self.collection.find({})
        if result is None:
            return False
        else:
            return result

    def view_one(self, data):
        result = self.collection.find(data)
        if result is None:
            return False
        else:
            return result
        
    def aggregate(self, data):
        return self.collection.aggregate(data)

if __name__ == "__main__":
    app.run(debug=True)
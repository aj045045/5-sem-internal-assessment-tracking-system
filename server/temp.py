# from pymongo import MongoClient
# from flask import Flask

# app = Flask(__name__)


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

# if __name__ == "__main__":
#     app.run(debug=True)

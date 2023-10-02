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
class MethodChainer:
    data = None

    @classmethod
    def method1(cls):
        # Implement your first method logic here
        cls.data = "Result from method1"
        return cls

    @classmethod
    def method2(cls):
        # Implement your second method logic here, using cls.data as input
        if cls.data is not None:
            cls.data = f"{cls.data} -> Result from method2"
        else:
            cls.data = "Result from method2 (no prior data)"
        return cls

    @classmethod
    def method3(cls):
        # Implement your third method logic here, using cls.data as input
        if cls.data is not None:
            cls.data = f"{cls.data} -> Result from method3"
        else:
            cls.data = "Result from method3 (no prior data)"
        return cls

    @classmethod
    def get_result(cls):
        # Get the final result after calling all methods
        return cls.data

# Call class methods in a chained manner
result = MethodChainer.method1().method2().method3().get_result()

# Print the final result
print(result)

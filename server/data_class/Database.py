from pymongo import MongoClient

class Database():

    def __init__(self, collection):
        url = MongoClient('mongodb://localhost:27017/')
        self.__client = url["assessment_system"]
        self._collection = self.__client[collection]

    @property
    def collection(self):
        return self._collection

    @collection.setter
    def collection(self, value):
        self._collection = value

    def insert(self, data):
        self.collection.insert_many(data)

    def insert_one(self,data):
        self.collection.insert_one(data)

    def delete(self, data):
        self.collection.delete_many(data)

    def delete_one(self, data):
        self.collection.delete_one(data)

    def update(self, update):
        self.collection.update_many({}, update)

    def update_one(self, find, update):
        self.collection.update_one(find, update)

    def view(self):
        return self.collection.find()

    def view_one(self, data):
        return self.collection.find({}, data)
    
    def aggregate(self,data):
        return self.collection.aggregate([data])
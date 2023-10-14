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
        return self.collection.aggregate([data])

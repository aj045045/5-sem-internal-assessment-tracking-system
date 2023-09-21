from pymongo import MongoClient


class Database:

    def __init__(self, db_uri, db_name):
        self.client = MongoClient(db_uri)
        self.db = self.client[db_name]

    def get_collection(self, collect):
        collection = self.db[collect]
        collectionValue = collection.find({})
        return collectionValue

    def update_collection():
        return

    def delete_from_collection():
        return

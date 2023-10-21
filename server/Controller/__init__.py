from .Assessment import Assessment
from .Course import Course
from .Database import Database
from .Faculty import Faculty
from .Paper import Paper
from .Semester import Semester
from .Student import Student
from .Subject import Subject
from .User import User
from flask import jsonify

__all__ = ['Assessment', 'Course', 'Database', 'Faculty',
           'Paper', 'Semester', 'Student', 'Subject', 'User']

def convert_id(data):
    formatted_data = []
    for document in data:
        object_id_str = str(document['_id'])
        document['_id'] = object_id_str
        formatted_data.append(document)
    return jsonify(formatted_data)

from .Database import Database
from .Semester import Semester
class Course(Database):

    def __init__(self,course_name):
        self.__course_name = course_name
        self.__duration = 0
        self.__capacity = 0
        self.__course_code = ""
        self.__type = ""
        super().__init__('course')
        
    @property
    def _course_name(self):
        return self.__course_name

    @_course_name.setter
    def _course_name(self, value):
        if len(value) > 200:
            value = value[:200]
        self.__course_name = value

    @property
    def _duration(self):
        return self.__duration

    @_duration.setter
    def _duration(self, value):
        if len(value) > 2:
            value = value[:2]
        self.__duration = value

    @property
    def _capacity(self):
        return self.__capacity

    @_capacity.setter
    def _capacity(self, value):
        if len(value) > 4:
            value = value[:4]
        self.__capacity = value

    @property
    def _course_code(self):
        return self.__course_code

    @_course_code.setter
    def _course_code(self, value):
        if len(value) > 10:
            value = value[:10]
        self.__course_code = value

    @property
    def _type(self):
        return self.__type

    @_type.setter
    def _type(self, value):
        if len(value) > 5:
            value = value[:5]
        self.__type = value

        """#REVIEW - START THE CODING"""
        
    def add_course(self,duration,capacity,code,type_course):
        self._duration = duration
        self._capacity = capacity
        self._course_code = code
        self.__type = type_course
        data = {
            "course_name":self._course_name,
            "duration":self._duration,
            "capacity":self._capacity,
            "code":self._course_code,
            "type":self._type
        }
        course_id = super().insert_one(data)
        return course_id

    def update_course():
        return

    def delete_course():
        return

    def view_course():
        return
    
    
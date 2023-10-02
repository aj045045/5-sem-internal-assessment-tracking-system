from .Database import Database

class Course(Database):

    def __init__(self):
        self.__course_name = ""
        self.__course_duration = 0
        self.__enrollment_capacity = 0
        self.__course_code = ""
        self.__faculty_id =""
        self.__type = ""

    @property
    def _course_name(self):
        return self.__course_name

    @_course_name.setter
    def _course_name(self, value):
        if value > 200:
            value = value[:200]
        self.__course_name = value

    @property
    def _course_duration(self):
        return self.__course_duration

    @_course_duration.setter
    def _course_duration(self, value):
        if value > 2:
            value = value[:2]
        self.__course_duration = value

    @property
    def _enrollment_capacity(self):
        return self.__enrollment_capacity

    @_enrollment_capacity.setter
    def _enrollment_capacity(self, value):
        if value > 4:
            value = value[:4]
        self.__enrollment_capacity = value

    @property
    def _course_code(self):
        return self.__course_code

    @_course_code.setter
    def _course_code(self, value):
        if value > 10:
            value = value[:10]
        self.__course_code = value

    @property
    def _faculty_id(self):
        return self.__faculty_id

    @_faculty_id.setter
    def _faculty_id(self, value):
        self.__faculty_id = value

    @property
    def _type(self):
        return self.__type

    @_type.setter
    def _type(self, value):
        if value > 5:
            value = value[:5]
        self.__type = value

        """#REVIEW - START THE CODING"""
    def add_course():
        return

    def update_course():
        return

    def delete_course():
        return

    def view_course():
        return
from .User import User
from bson import ObjectId
from .Database import Database

class Student(User):

    def __init__(self, email_id, password):
        self.__allotment_year = 0000  # year
        self.__semester_id = ""  # Id data of semester
        self.__roll_no = 000
        super().__init__(email_id, password)

    @property
    def _roll_no(self):
        return self.__roll_no

    @_roll_no.setter
    def _roll_no(self, value):
        self.__roll_no = value

    @property
    def _allotment_year(self):
        return self.__allotment_year

    @_allotment_year.setter
    def _allotment_year(self, value):
        self.__allotment_year = value

    @property
    def _semester_id(self):
        return self.__semester_id

    @_semester_id.setter
    def _semester_id(self, value):
        self.__semester_id = value

    def sign_up(self, name, allotment_year, semester_id, roll_no):
        self._allotment_year = allotment_year
        self._semester_id = semester_id
        self._roll_no = roll_no
        user_id = super().sign_up_student(name, "student")
        data = {
            "roll_no":int(roll_no),
            "allotment_year":int(allotment_year),
            "semester_id":ObjectId(semester_id),
            "user_id":user_id
        }
        return Database.collection('student').insert_one(data)

    def update():
        return

    def delete():
        return

    def view():
        return

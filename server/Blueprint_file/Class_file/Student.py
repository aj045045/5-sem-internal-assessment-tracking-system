from .User import User

class Student(User):

    def __init__(self,emailId,password):
        self.__allotment_year = 0000  # year
        self.__semester_id = ""  # Id data of semester
        super().__init__(emailId,password)

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

        
    def add():
        return

    def update():
        return

    def delete():
        return

    def view():
        return

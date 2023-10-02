from .Database import Database

class Semester(Database):
    def __init__(self):
        self.__semester_number = ""
        self.__syllabus_document = ""
        self.__number_of_subject = ""

    @property
    def _semester_number(self):
        return self.__semester_number

    @_semester_number.setter
    def _semester_number(self, value):
        self.__semester_number = value

    @property
    def _syllabus_document(self):
        return self.__syllabus_document

    @_syllabus_document.setter
    def _syllabus_document(self, value):
        if value > 50:
            value = value[:50]
        self.__syllabus_document = value

    @property
    def _number_of_subject(self):
        return self.__number_of_subject

    @_number_of_subject.setter
    def _number_of_subject(self, value):
        self.__number_of_subject = value

        super().__init__('semester')
    
    def add():
        return

    def update():
        return

    def delete():
        return

    def view():
        return

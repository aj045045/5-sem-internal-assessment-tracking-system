from .Database import Database

class Semester(Database):
    def __init__(self):
        self.__semester_number = ""
        self.__syllabus_document = ""
        self.__number_of_subject = ""
        self.__faculty = ""
        super().__init__('semester')
        
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
        if len(value) > 50:
            value = value[:50]
        self.__syllabus_document = value

    @property
    def _number_of_subject(self):
        return self.__number_of_subject

    @_number_of_subject.setter
    def _number_of_subject(self, value):
        self.__number_of_subject = value

    
    def add_course_sem(self,no_of_sem,course_id):
        json_sem_data = [] 
        for sem in range(no_of_sem):
            data_sem = {
                "semester_number":sem+1,
                "syllabus_document":"",
                "number_of_subject":0,
                "faculty_id":"",
                "course_id":course_id
            }
            json_sem_data.append(data_sem)
        if len(json_sem_data) > 0 :
            super().insert(json_sem_data)
            return True
    
    def update():
        return

    def delete():
        return

    def view():
        return
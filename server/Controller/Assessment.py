from .Database import Database


class Assessment():

    def __init__(self,assessment_title=""):
        self.__assessment_title = assessment_title
        self.__status = ""
        self.__student_id = ""
        self.__subject_id = ""
        self.__assessment_type_id = ""
        
    @property
    def _assessment_title(self):
        return self.__assessment_title

    @_assessment_title.setter
    def _assessment_title(self, value):
        if value > 50:
            value = value[:50]
        self.__assessment_title = value

    @property
    def _status(self):
        return self.__status

    @_status.setter
    def _status(self, value):
        self.__status = value

    @property
    def _student_id(self):
        return self.__student_id

    @_student_id.setter
    def _student_id(self, value):
        self.__student_id = value

    @property
    def _subject_id(self):
        return self.__subject_id

    @_subject_id.setter
    def _subject_id(self, value):
        self.__subject_id = value

    @property
    def _assessment_type_id(self):
        return self.__assessment_type_id

    @_assessment_type_id.setter
    def _assessment_type_id(self, value):
        self.__assessment_type_id = value

        """#REVIEW - START THE CODING"""
    def create_assessment(self):
        return

    def update_assessment(self):
        return

    def delete_assessment(self):
        return

    def view_assessment(self):
        return
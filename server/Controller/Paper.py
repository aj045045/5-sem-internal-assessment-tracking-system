from .Database import Database

class Paper():
    def __init__(self,paper_title=None):
        super().__init__('paper')
        self.__paper_title = paper_title
        self.__question_document = ""
        self.__question_allotment_date = ""
        self.__result_document = ""
        self.__result_allotment_date ="" 
        self.__exam_type = ""
        self.__subject_id = ""

    @property
    def _paper_title(self):
        return self.__paper_title

    @_paper_title.setter
    def _paper_title(self, value):
        if value > 50:
            value = value[:50]
        self.__paper_title = value

    @property
    def _question_document(self):
        return self.__question_document

    @_question_document.setter
    def _question_document(self, value):
        if value > 100:
            value = value[:100]
        self.__question_document = value

    @property
    def _question_allotment_date(self):
        return self.__question_allotment_date

    @_question_allotment_date.setter
    def _question_allotment_date(self, value):
        self.__question_allotment_date = value

    @property
    def _result_document(self):
        return self.__result_document

    @_result_document.setter
    def _result_document(self, value):
        if value > 100:
            value = value[:100]
        self.__result_document = value

    @property
    def _result_allotment_date(self):
        return self.__result_allotment_date

    @_result_allotment_date.setter
    def _result_allotment_date(self, value):
        self.__result_allotment_date = value

    @property
    def _exam_type(self):
        return self.__exam_type

    @_exam_type.setter
    def _exam_type(self, value):
        self.__exam_type = value

    @property
    def _subject_id(self):
        return self.__subject_id

    @_subject_id.setter
    def _subject_id(self, value):
        self.__subject_id = value


    def add_paper():
        return

    def update_paper():
        return

    def delete_paper():
        return

    def view_paper():
        return

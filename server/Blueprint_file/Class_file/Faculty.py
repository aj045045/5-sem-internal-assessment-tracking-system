import User


class Faculty(User):
    def __init__(self,emailId,password):
        self.__designation = ""  # 100
        self.__phone_no = 0000000000  # 11
        self.__specialization = ""  # 100
        super().__init__(emailId,password)

    @property
    def _designation(self):
        return self.__designation

    @_designation.setter
    def _designation(self, value):
        if value > 100:
            value = value[:100]
        self.__designation = value

    @property
    def _phone_no(self):
        return self.__phone_no

    @_phone_no.setter
    def _phone_no(self, value):
        if value > 10:
            value = value[:10]
        self.__phone_no = value

    @property
    def _specialization(self):
        return self.__specialization

    @_specialization.setter
    def _specialization(self, value):
        if value > 100:
            value = value[:100]
        self.__specialization = value
    
    def add_faculty(self,):
        return

    def update_faculty(self,):
        return

    def delete_faculty(self,):
        return

    def view_faculty(self,):
        return

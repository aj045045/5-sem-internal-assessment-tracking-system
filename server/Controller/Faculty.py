from .User import User
from .Database import Database

class Faculty(User):

    def __init__(self, emailId, password):
        self.__designation = ""  # 100
        self.__phone_no = 0000000000  # 11
        self.__specialization = ""  # 100
        super().__init__(emailId, password)
        self.db = Database('faculty')        
        
    @property
    def _designation(self):
        return self.__designation

    @_designation.setter
    def _designation(self, value):
        if len(value) > 100:
            value = value[:100]
        self.__designation = value

    @property
    def _phone_no(self):
        return self.__phone_no

    @_phone_no.setter
    def _phone_no(self, value):
        if len(value) > 10:
            value = value[:10]
        self.__phone_no = value

    @property
    def _specialization(self):
        return self.__specialization

    @_specialization.setter
    def _specialization(self, value):
        if len(value) > 100:
            value = value[:100]
        self.__specialization = value

    def add_faculty(self,profile,userName,designation,phoneNo,specialization):
        self._designation = designation
        self._phone_no = phoneNo
        self._specialization = specialization
        userId = super().sign_up(profile,userName,"faculty")
        data = {
            "designation":self._designation,
            "phone_no":self._phone_no,
            "specialization":self._specialization,
            "userId":userId,
        }
        return self.db.insert_one(data)
        

    def update_faculty(self,):
        return

    def delete_faculty(self,):
        return

    def view_faculty(self,):
        return

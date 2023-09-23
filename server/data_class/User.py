from .Database import Database
from datetime import datetime
from hashlib import sha256

class User(Database):

    def __init__(self):
        self.__user_name = ""  # 50
        self.__password = ""  # 64
        self.__email_id = ""  # 150
        self.__last_logged_in = ""  # Date
        self.__user_type_id = ""
        self.logged_in = False
        super().__init__('user')
    
    @property
    def _user_name(self):
        return self.__user_name

    @_user_name.setter
    def _user_name(self, value):
        if value > 50:
            value = value[:50]
        self.__user_name = value

    @property
    def _password(self):
        return self.__password

    @_password.setter
    def _password(self, value):
        if value > 64:
            value = value[:64]
        self.__password = value

    @property
    def _email_id(self):
        return self.__email_id

    @_email_id.setter
    def _email_id(self, value):
        if value >150:
            value = value[:150]
        self.__email_id = value

    @property
    def _last_logged_in(self):
        return self.__last_logged_in

    @_last_logged_in.setter
    def _last_logged_in(self, value):
        self.__last_logged_in = value

    @property
    def _user_type_id(self):
        return self.__user_type_id

    @_user_type_id.setter
    def _user_type_id(self, value):
        self.__user_type_id = value

    def get_logged_in(self):
        return self.logged_in

    def set_logged_in(self, value):
        self.logged_in = value


        """#REVIEW - Insert Data into user"""

    def create(self, user_name, password, email_id, user_type):
        time = datetime.now()
        last_logged = time.strftime("%d-%m-%Y")
        self._user_name = user_name
        self._password = password
        self._email_id = email_id
        self._user_type_id = user_type
        self._last_logged_in = last_logged
        data = {
            "user_name": self._user_name,
            "password": self._password,
            "email_id": self._email_id,
            "last_logged_id": self._last_logged_in,
            "user_type_id": self._user_type_id
        }
        super().insert(data)

    def logout():
        return

    def displayUserAccess():
        return
    
    def validate_child_user(self, name, size):
        return super().validate(name, size)

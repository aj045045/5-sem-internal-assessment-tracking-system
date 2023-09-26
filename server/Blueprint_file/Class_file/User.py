from .Database import Database
from datetime import datetime
from hashlib import sha256
from flask import redirect

class User(Database):

    def __init__(self,emailId,Password):
        self.__user_name = ""  # 50
        self.__password = Password # 64
        self.__email_id = emailId  # 150
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

    def encryptPassword(self):
        data = self.__password
        sha256_hash = sha256()
        sha256_hash.update(data.encode())
        encryptPassword = sha256_hash.hexdigest()
        return encryptPassword
    
        
    """#REVIEW - START THE CODING"""
    def sign_up(self, user_name, user_type):
        time = datetime.now()
        last_logged = time.strftime("%d-%m-%Y")
        self._user_name = user_name
        self._password = self.encryptPassword()
        self._user_type_id = user_type
        self._last_logged_in = last_logged
        data = {
            "user_name": self._user_name,
            "password": self._password,
            "email_id": self._email_id,
            "last_logged_id": self._last_logged_in,
            "user_type_id": self._user_type_id
        }
        return super().insert_one(data)
        
    def logout(self):
        self.set_logged_in(False)
        return redirect('/')

    def display_user_Access():
        return
    
    def forget_password():
        return
    
    def update_user_detail():
        return
    
    def login(self,emailId,password):
        data = {
            "email_id":emailId,
            "password":password
        }
        loginUserData = super().view_one(data)
        return loginUserData
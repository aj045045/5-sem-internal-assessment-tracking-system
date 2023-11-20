from .Database import Database
from datetime import datetime
from hashlib import sha256
from flask import session


class User():

    def __init__(self, emailId="user", Password="user"):
        self.__user_name = ""  # 50
        self.__password = Password  # 64
        self.__email_id = emailId  # 150
        self.__last_logged_in = ""  # Date
        self.__user_type = ""
        self.__profile = ""
        session['user_sign_in'] = False
    
    @property
    def _profile(self):
        return self.__profile

    @_profile.setter
    def _profile(self, value):
        self.__profile = value

    @property
    def _user_name(self):
        return self.__user_name

    @_user_name.setter
    def _user_name(self, value):
        if len(value) > 50:
            value = value[:50]
        self.__user_name = value

    @property
    def _password(self):
        return self.__password

    @_password.setter
    def _password(self, value):
        if len(value) > 64:
            value = value[:64]
        self.__password = value

    @property
    def _email_id(self):
        return self.__email_id

    @_email_id.setter
    def _email_id(self, value):
        if len(value) > 150:
            value = value[:150]
        self.__email_id = value

    @property
    def _last_logged_in(self):
        return self.__last_logged_in

    @_last_logged_in.setter
    def _last_logged_in(self, value):
        self.__last_logged_in = value

    @property
    def _user_type(self):
        return self.__user_type

    @_user_type.setter
    def _user_type(self, value):
        self.__user_type = value

    def get_logged_in(self):
        value = session.get('user_sign_in')
        return value

    def set_logged_in(self, value):
        session['user_sign_in'] = value

    def encryptPassword(self):
        data = self.__password
        if data is None:
            raise ValueError(
                "Password is None. Make sure it's properly initialized.")
        sha256_hash = sha256()
        sha256_hash.update(data.encode())
        encryptPassword = sha256_hash.hexdigest()
        return encryptPassword

    """#REVIEW - START THE CODING"""

    def sign_up(self, profile, user_name, user_type):
        time = datetime.now()
        last_logged = time.strftime("%d-%m-%Y")
        self._profile = profile
        self._user_name = user_name
        self._password = self.encryptPassword()
        self._user_type = user_type
        self._last_logged_in = last_logged
        data = {
            "profile": self._profile,
            "user_name": self._user_name,
            "password": self._password,
            "email_id": self._email_id,
            "last_logged": self._last_logged_in,
            "user_type": self._user_type
        }
        return Database.collection('user').insert_one(data)

    def logout(self):
        self.set_logged_in(False)
        return True

    def display_user_Access():
        return

    def forget_password():
        return

    def update_user_detail():
        return

    def login(self):
        data = {
            "email_id": self._email_id,
            "password": self.encryptPassword()
        }
        response = Database.collection('user').view_one(data)
        if response is not False:
            self.set_logged_in(True)
        return response

    def faculty_dropdown(self):
         pipeline = [
        {'$match': {'user_type': 'faculty'}},
        {'$project': {'_id': 1, 'user_name': 1,}}
    ]
         return list(Database.collection('user').aggregate(pipeline))
    def display_faculty_details(self):
        pipeline = [
            {
                "$match": {
                    "user_type": "faculty"
                }
            },
            {
                "$lookup": {
                    "from": "faculty",
                    "localField": "_id",
                    "foreignField": "userId",
                    "as": "faculty_data"
                }
            },
            {
                "$addFields": {
                    "faculty_data": {
                        "$map": {
                            "input": "$faculty_data",
                            "in": {
                                "designation": "$$this.designation",
                                "specialization": "$$this.specialization"
                            }
                        }
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "user_type": 1,
                    "user_name": 1,
                    "profile": 1,
                    "faculty_data": 1
                }
            }
        ]
        return list(Database.collection('user').aggregate(pipeline))

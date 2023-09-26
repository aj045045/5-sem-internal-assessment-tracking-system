from flask import request
from . import user_bp
from Class_file import User 
import sys
sys.path.append('./Class_file')
@user_bp.route('/submit-form', methods=['POST'])
def SingIn():
    name = request.form.get('userName')
    password = request.form.get('password')
    emailId = request.form.get('emailId')
    userType = request.form.get('userType')
    data = request.get_json()
    name = data.get('userName')
    password = data.get('password')
    emailId = data.get('emailId')
    userType = request.get('userType')
    user_obj = User()
    user_obj.create(name, password, emailId, userType)
    return {"redirect":"Data Submitted"},200

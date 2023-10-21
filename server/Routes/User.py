from flask import request, jsonify,redirect
from . import user_bp
import Controller
from werkzeug.utils import secure_filename

@user_bp.route('/submit-form', methods=['POST'])
def SingIn():
    data = request.get_json()
    name = data.get('userName')
    password = data.get('password')
    emailId = data.get('emailId')
    userType = data.get('userType')
    user_obj = Controller.User(emailId, password)
    response = user_obj.sign_up(name, userType)
    if response is False:
        return jsonify({"redirect": 'false'})
    else:
        return jsonify({"redirect": 'true'})


@user_bp.route('/login', methods=['POST'])
def Login():
    data = request.get_json()
    emailId = data.get('emailId')
    password = data.get('password')
    user_obj = Controller.User(emailId, password)
    response = user_obj.login()
    if response is False:
        return jsonify({'redirect': 'Invalid userName or Password'})
    else:
        return jsonify({'redirect': 'true'})
    
"""Faculty Sign In 
    Returns:
        Json: True
"""

@user_bp.route('/faculty-sign-up', methods=['POST'])
def add_faculty():
    userName = request.form.get('userName')
    emailId = request.form.get('emailId')
    password = request.form.get('password')
    image = request.files['profile']
    file_extension = image.filename.rsplit('.', 1)[1].lower()
    profileName = secure_filename(userName)
    #REVIEW - Save file image
    image.save('../client/public/faculty/'+profileName+'.'+file_extension)
    profile = 'faculty/'+profileName+"."+file_extension
    designation = request.form.get('designation')
    phoneNo = request.form.get('phoneNo')
    specialization = request.form.get('specialization')
    faculty_obj = Controller.Faculty(emailId,password)
    faculty_obj.add_faculty(profile,userName,designation,phoneNo,specialization)
    return redirect('/admin/faculty')
    
@user_bp.route('/faculty-display-all',methods=['GET'])
def view_faculty():
    user = Controller.User()    
    data = user.display_faculty_details()
    return jsonify(data)
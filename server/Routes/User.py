from flask import request, jsonify, redirect
from . import user_bp
import Controller
from werkzeug.utils import secure_filename
from flask import session
import pickle
import json
from bson import ObjectId
import csv
import os

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


"""#REVIEW - Login user
    Returns:
        jsonify: Response of data
"""


@user_bp.route('/login', methods=['POST'])
def Login():
    data = request.get_json()
    emailId = data.get('emailId')
    password = data.get('password')
    user_obj = Controller.User(emailId, password)
    response = user_obj.login()
    serialized_object = pickle.dumps(user_obj)
    session['user_object'] = serialized_object
    if response is False:
        return jsonify({'redirect': 'Invalid Email Id or Password'})
    else:
        response['_id'] = str(response['_id'])
        json_data = json.dumps(response)
        session['user_data'] = json_data
        return jsonify({'redirect': response['user_type']})


@user_bp.route('/logout', methods=['GET'])
def logOut():
    session.clear()
    return jsonify({'redirect': 'home'})


"""#REVIEW - Check User Active or not
    Returns:
        Bool: True when active else false
"""


@user_bp.route('/check-login', methods=['GET'])
def Check_login():
    json_data = session.get('user_data')
    serialized_object = session.get('user_object')
    if serialized_object:
        my_object = pickle.loads(serialized_object)
        my_json = json.loads(json_data)
        user_type = my_json['user_type']
        response = my_object.get_logged_in()
        if response is True:
            return jsonify({'redirect': f'{user_type}'})
        else:
            return jsonify({'redirect': "false"})
    else:
        return jsonify({'redirect': "false"})


@user_bp.route('/get-user', methods=['GET'])
def Get_user():
    json_data = session.get('user_data')
    
    if json_data:
        user_data = json.loads(json_data)
        return jsonify(user_data)    
    return jsonify({'redirect':"false"})


"""#REVIEW - Faculty Sign In 
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
    # REVIEW - Save file image
    image.save('../client/public/faculty/'+profileName+'.'+file_extension)
    profile = 'faculty/'+profileName+"."+file_extension
    designation = request.form.get('designation')
    phoneNo = request.form.get('phoneNo')
    specialization = request.form.get('specialization')
    faculty_obj = Controller.Faculty(emailId, password)
    faculty_obj.add_faculty(
        profile, userName, designation, phoneNo, specialization)
    return redirect('/admin/faculty')


@user_bp.route('/faculty-display-all', methods=['GET'])
def view_faculty():
    user = Controller.User()
    data = user.display_faculty_details()
    return jsonify(data)


@user_bp.route('/faculty-dropdown', methods=['GET'])
def faculty_dropdown():
    user = Controller.User()
    data = user.faculty_dropdown()
    return Controller.convert_id(data)


@user_bp.route('/data-list', methods=['GET'])
def data_list():
    collection_list = ['course', 'faculty', 'paper',
                       'result', 'semester', 'student', 'subject', 'user']
    send_data = {}
    for db in collection_list:
        pipeline = [
            {
                "$group": {
                    "_id": None,
                    "count": {"$sum": 1}
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "count": 1
                }
            }
        ]
        response_cursor = Controller.Database.collection(
            db).aggregate(pipeline)
        # Get the first document or None if there are no documents
        response_document = next(response_cursor, None)
        if response_document is not None:
            send_data[db] = response_document['count']
    return jsonify(send_data)


@user_bp.route('/add-student', methods=['POST'])
def add_student():
    path = request.form.get('path')
    semester_id = request.form.get('semester_id')
    name = request.form.get('student_name')
    password = request.form.get('password')
    email_id = request.form.get('email_id')
    allotment_year = request.form.get('allotment_year')
    roll_no = request.form.get('roll_no')
    student = Controller.Student(email_id, password)
    student.sign_up(name, allotment_year, semester_id, roll_no)
    return redirect(path)


@user_bp.route('/add-student-file/<semester_id>', methods=['POST'])
def add_student_file(semester_id):
    # 0 name, 1 email, 2 rollNo, 3 allotment year
    file = request.files['student_file']
    path = request.form.get('path')
    password = request.form.get('password')
    file_path = 'uploads/'+file.filename
    file.save(file_path)
    with open(file_path, 'r') as f:
        csv_reader = csv.reader(f)
        row_number = 0
        for row in csv_reader:
            if len(row) >= 4 and row_number >=1:
                student = Controller.Student(row[1], password)
                student.sign_up(row[0], row[3], semester_id, row[2])
            row_number+=1
    file_path = os.path.join('uploads', file.filename)
    os.remove(file_path)
    return redirect(path)

@user_bp.route('/student-details/<semester_id>', methods=['GET'])
def student_details(semester_id):
    data = [
        {"$match": {"semester_id": ObjectId(semester_id)}},
        {"$lookup": {"from": "user", "localField": "user_id",
                     "foreignField": "_id", "as": "user_info"}},
        {"$unwind": "$user_info"},
        {
            "$project": {
                "user_info._id": 1,
                "user_info.user_name": 1,
                "user_info.email_id": 1,
                "allotment_year": 1,
                "roll_no": 1,
                "_id": 0
            }
        },
        {"$sort": {"roll_no": 1}} 
    ]
    response = Controller.Database.collection('student').aggregate(data)
    formatted_data = []
    for document in response:
        document['user_info']['_id'] = str(document['user_info']['_id'])
        formatted_data.append(document)
    return jsonify(formatted_data)

# {
#   "profile": "icons/user.png",
#   "user_name": "Ansh Yadav",
#   "password": "f470213d9ae659187a19b9cb2169b4b400544f4d3f59250eda657154700da616",
#   "email_id": "admin-user@gmail.com",
#   "last_logged": "21-10-2023",
#   "user_type": "admin"
# }

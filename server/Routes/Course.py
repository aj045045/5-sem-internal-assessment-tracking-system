from . import course_bp
from flask import request, redirect, jsonify,session
import Controller
from bson import ObjectId
import json
# //REVIEW - Add course to system


@course_bp.route('/add-course', methods=['POST'])
def add_course():
    name = request.form.get('courseName')
    duration = request.form.get('duration')
    capacity = request.form.get('capacity')
    code = request.form.get('code')
    course_type = request.form.get('type')
    course = Controller.Course(name)
    response_course = course.add_course(duration, capacity, code, course_type)
    dur = int(duration)
    if response_course is not False:
        semester = Controller.Semester()
        semester.add_course_sem(dur*2, response_course)
        return redirect('/admin/course/')
    else:
        return ('/admin')

# REVIEW - Display course List in system


@course_bp.route('/display-course', methods=['GET'])
def display_course():
    course = Controller.Course('mcs')
    data = course.view_course()
    return Controller.convert_id(data)

# REVIEW - Display Semester details


@course_bp.route('/semester-details/<course_data_id>', methods=['GET'])
def semester_details(course_data_id):
    semester = Controller.Semester()
    data = semester.view_semester(course_data_id)
    return Controller.convert_id(data)

# REVIEW - Add semester using course id
@course_bp.route('/add-semester/<course_id>', methods=['POST'])
def add_semester(course_id):
    faculty = request.form.get('faculty_dropdown')
    file = request.files['syllabus']
    sem = Controller.Semester()
    path = request.form.get('path')
    semester = sem.last_semester_number(course_id)
    semester = semester[0]
    semesterNumber = int(semester['semester_number'])
    semesterNumber += 1
    if file.filename != '' and file is not None:
        fileName = f"{course_id}_sem_{semesterNumber}.pdf"
        file.save('../client/public/syllabus/'+fileName)
        storeFile = f"syllabus/{fileName}"
    else:
        storeFile = ''
    sem.add_semester_record(semesterNumber, storeFile, faculty, course_id)
    return redirect(path)

# REVIEW - Update semester of a semester_id
@course_bp.route('/update-semester/<semester_id>', methods=['POST'])
def update_semester(semester_id):
    faculty_id = request.form.get('faculty_dropdown')
    subject_plan = request.files.get('syllabus')
    semester = Controller.Semester()
    path = request.form.get('path')
    if subject_plan is not None and subject_plan.filename != '':
        fileName = f"{ObjectId()}_subject_plan.pdf"
        subject_plan.save('../client/public/subject_plan/' + fileName)
        subject_location = f"subject_plan/{fileName}"
    else:
        subject_location = ''
    semester.update(semester_id, subject_location, faculty_id)
    return redirect(path)

# REVIEW - Add subject to the system


@course_bp.route('/add-subject', methods=['POST'])
def add_subject():
    path = request.form.get('path')
    semester_id = request.form.get('semester_id')
    subject = Controller.Subject()
    subject_name = request.form.get('subject_name')
    code = request.form.get('code')
    credit = request.form.get('credit')
    subject_type = request.form.get('type')
    subject_plan = request.files.get('plan')
    faculty_id = request.form.get('faculty_dropdown')
    if subject_plan is not None and subject_plan.filename != '':
        fileName = f"{ObjectId()}_subject_plan.pdf"
        subject_plan.save('../client/public/subject_plan/' + fileName)
        subject_location = f"subject_plan/{fileName}"
    else:
        subject_location = ''
    subject.add_subject(subject_name, subject_type, code,
                        credit, subject_location, semester_id, faculty_id)
    Controller.Database.collection('semester').update_one(
        {'_id': ObjectId(semester_id)}, {'$inc': {'number_of_subject': 1}})
    return redirect(path)

# REVIEW - Display Subjects


@course_bp.route('/subject-details/<semester_id>', methods=['GET'])
def display_subject(semester_id):
    subject = Controller.Subject()
    response = subject.display_subject(semester_id)
    return Controller.convert_id(response)

@course_bp.route('/get-faculty-subject',methods=['GET'])
def get_faculty_subject():
    json_data = session.get('user_data')
    my_json = json.loads(json_data) 
    user_id = my_json['_id']
    pipeline = [
    {
        '$match': {
            'faculty_id': ObjectId(user_id)
        }
    },
    {
        '$lookup': {
            'from': 'semester',
            'localField': 'semester_id',
            'foreignField': '_id',
            'as': 'semesterDetail'
        }
    },
    { "$unwind": "$semesterDetail" },
    {
        '$lookup': {
            'from': 'course',
            'localField': 'semesterDetail.course_id',
            'foreignField': '_id',
            'as': 'courseDetail'
        }
    },
    {
        '$project': {
            '_id': 0,
            "subject_name": 1,
            "type": 1,
            "code": 1,
            "credit": 1,
            "subject_plan": 1,
            "semesterDetail.semester_number": 1,
            "courseDetail.course_name": 1,
            "courseDetail.code": 1,
        }
    }
    ]
    data = list(Controller.Database.collection('subject').aggregate(pipeline))
    return jsonify(data)

@course_bp.route('/update-subject/<subject_id>', methods=['POST'])
def update_subject(subject_id):

    return
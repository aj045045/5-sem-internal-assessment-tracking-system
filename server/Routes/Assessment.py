from . import assessment_bp
from flask import request, redirect, jsonify,session
import Controller
from bson import ObjectId
from datetime import datetime
import json

@assessment_bp.route('/choose-course', methods=['GET'])
def choose_course():
    data = [
        {'$project': {
            '_id': 1,
            'course_name': 1
        }},
    ]
    response = list(Controller.Database.collection('course').aggregate(data))
    return Controller.convert_id(response)


@assessment_bp.route('/choose-semester/<course_id>', methods=['GET'])
def choose_semester(course_id):
    data = [
        {"$match": {"course_id": ObjectId(course_id)}},
        {'$project': {
            '_id': 1,
            'semester_number': 1
        }},
    ]
    response = list(Controller.Database.collection('semester').aggregate(data))
    return Controller.convert_id(response)


@assessment_bp.route('/assessment-subject/<semester_id>', methods=['GET'])
def assessment_subject(semester_id):
    data = [
        {"$match": {"semester_id": ObjectId(semester_id)}},
        {'$project': {
            '_id': 1,
            'subject_name': 1,
            'code': 1
        }},
    ]
    response = list(Controller.Database.collection('subject').aggregate(data))
    return Controller.convert_id(response)


@assessment_bp.route('/add-assessment-type', methods=['POST'])
def assessment_category():
    category = request.form.get('assessment_category')
    path = request.form.get('path')
    data = {"assessment_type": str(category)}
    Controller.Database.collection('assessment_type').insert_one(data)
    return redirect(path)


@assessment_bp.route('/assessment-type', methods=['GET'])
def assessment_type():
    response = list(Controller.Database.collection('assessment_type').view())
    return Controller.convert_id(response)


@assessment_bp.route('/add-assessment/<semester_id>', methods=['POST'])
def add_assessment(semester_id):
    path = request.form.get('path')
    title = request.form.get('assessment_title')
    subject = request.form.get('subject')
    assessment_type = request.form.get('type')
    assessment = Controller.Assessment(title, subject, assessment_type)
    assessment.create_assessment(semester_id)
    return redirect(path)


@assessment_bp.route('/display-assessment/<semester_data>', methods=['GET'])
def display_assessment(semester_data):
    pipeline = [
        {"$match": {"semester_id": ObjectId(semester_data)}},
        {"$lookup": {"from": "assessment", "localField": "_id",
                     "foreignField": "subject_id", "as": "assessment_info"}},
        {"$unwind": "$assessment_info"},
        {"$lookup": {"from": "assessment_type", "localField": "assessment_info.assessment_type",
                     "foreignField": "_id", "as": "data_type"}},
        {"$unwind": "$data_type"},
        {
            "$project": {
                "_id": 0,
                "subject_name": 1,
                "code": 1,
                "assessment_info._id": 1,
                "assessment_info.title": 1,
                "data_type.assessment_type": 1
            }
        },
    ]
    data = list(Controller.Database.collection('subject').aggregate(pipeline))
    for response in data:
        response['assessment_info']['_id'] = str(
            response['assessment_info']['_id'])
    return jsonify(data)


@assessment_bp.route('/display-assessment-faculty/<semester_data>', methods=['GET'])
def display_assessment_faculty(semester_data):
    json_data = session.get('user_data')
    my_json = json.loads(json_data) 
    user_id = my_json['_id']
    pipeline = [
        {"$match": {"faculty_id": ObjectId(user_id)}},
        {"$match": {"semester_id": ObjectId(semester_data)}},
        {
            "$lookup": {
                "from": "assessment", "localField": "_id",
                "foreignField": "subject_id", "as": "assessment_info"
            }
        },
        {"$unwind": "$assessment_info"},
        {
            "$lookup": {
                "from": "assessment_type", "localField": "assessment_info.assessment_type",
                "foreignField": "_id", "as": "data_type"
            }
        },
        {"$unwind": "$data_type"},
        {
            "$project": {
                "_id": 0,
                "subject_name": 1,
                "code": 1,
                "assessment_info._id": 1,
                "assessment_info.title": 1,
                "data_type.assessment_type": 1
            }
        },
    ]
    data = list(Controller.Database.collection('subject').aggregate(pipeline))
    for response in data:
        response['assessment_info']['_id'] = str(
            response['assessment_info']['_id'])
    return jsonify(data)


@assessment_bp.route('/get-assessment-record/<assessment_id>', methods=['GET'])
def get_assessment_record(assessment_id):
    assessment = Controller.Assessment()
    response = assessment.get_assessment_record(assessment_id)
    return Controller.convert_id(response)


@assessment_bp.route('/change-assessment-status', methods=['POST'])
def change_assessment_status():
    data = request.get_json()
    assessment_id = data.get('assessment_id')
    status = data.get('status')
    time = datetime.now()
    last_changed = time.strftime("%d-%m-%Y")
    find = {'_id': ObjectId(assessment_id)}
    update = {'$set': {'status': status, 'last_changed': last_changed}}
    response = Controller.Database.collection(
        'assessment_record').update_one(find, update)
    if response is not False:
        return {"change": "True"}
    else:
        return {"change": "False"}
    
@assessment_bp.route('/get-student-assessment-record',methods=['GET'])
def get_student_assessment_record():
    json_data = session.get('user_data')
    my_json = json.loads(json_data) 
    user_id = my_json['_id']
    pipeline = [
    {
        '$match': {
            'user_id': ObjectId(user_id)
        }
    },
    {
        '$lookup': {
            'from': 'assessment_record',
            'localField': '_id',
            'foreignField': 'student_id',
            'as': 'assessment_record_detail'
        }
    },
    { "$unwind": "$assessment_record_detail" },
    {
        '$lookup': {
            'from': 'assessment',
            'localField': 'assessment_record_detail.assessment_id',
            'foreignField': '_id',
            'as': 'assessment_detail'
        }
    },
    { "$unwind": "$assessment_detail" },
    {
        '$lookup': {
            'from': 'assessment_type',
            'localField': 'assessment_detail.assessment_type',
            'foreignField': '_id',
            'as': 'assessment_type'
        }
    },
    {
        '$project': {
            '_id': 0,
            "roll_no": 1,
            "assessment_record_detail.status": 1,
            "assessment_record_detail.last_changed": 1,
            "assessment_detail.title": 1,
            "assessment_type.assessment_type": 1,
        }
    },
     {
        "$sort": {
            "assessment_record_detail.last_changed": 1 
        }
    }
]
    return list(Controller.Database.collection('student').aggregate(pipeline))

@assessment_bp.route('/get-student-subject',methods=['GET'])
def get_student_subject():
    json_data = session.get('user_data')
    my_json = json.loads(json_data) 
    user_id = my_json['_id']
    pipeline = [
    {
        '$match': {
            'user_id': ObjectId(user_id)
        }
    },
    {
        '$lookup': {
            'from': 'subject',
            'localField': 'semester_id',
            'foreignField': 'semester_id',
            'as': 'semester_detail'
        }
    },
    {
        "$project": {
            "_id": 0,
            "roll_no": 1,
            "allotment_year": 1,
            "semester_detail.subject_name": 1,
            "semester_detail.type":1,
            "semester_detail.code":1,
            "semester_detail.credit":1,
            "semester_detail.subject_plan":1,
        }
    },
     {
        "$unwind": "$semester_detail"
    },
    {
        "$sort": {"semester_detail.credit": 1}
    }
]
    return list(Controller.Database.collection('student').aggregate(pipeline))
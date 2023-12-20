from . import assessment_bp
from flask import request, redirect, jsonify
import Controller
from bson import ObjectId
from datetime import datetime


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
    response = Controller.Database.collection('assessment_record').update_one(find,update)
    if response is not False:
        return {"change": "True"}
    else:
        return {"change":"False"}

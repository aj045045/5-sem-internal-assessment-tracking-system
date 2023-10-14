from . import course_bp
from flask import request, redirect, jsonify
import Controller
from bson import json_util


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


@course_bp.route('/display-course', methods=['GET'])
def display_course():
    course = Controller.Course('mcs')
    data = course.view_course()
    formatted_data = []
    for document in data:
        object_id_str = str(document['_id'])
        document['_id'] = object_id_str
        formatted_data.append(document)
    return jsonify(formatted_data)


@course_bp.route('/semester-details/<course_data_id>', methods=['GET'])
def semester_details(course_data_id):
    semester = Controller.Semester()
    data = semester.view_semester(course_data_id)
    formatted_data = []
    for document in data:
        object_id_str = str(document['_id'])
        document['_id'] = object_id_str
        course_id = str(document['course_id'])
        document['course_id'] = course_id
        formatted_data.append(document)
    return jsonify(formatted_data)

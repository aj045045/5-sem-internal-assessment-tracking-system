from . import course_bp
from flask import request, redirect
import Controller


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
    return Controller.convert_id(data)


@course_bp.route('/semester-details/<course_data_id>', methods=['GET'])
def semester_details(course_data_id):
    semester = Controller.Semester()
    data = semester.view_semester(course_data_id)
    return Controller.convert_id(data)

@course_bp.route('/add-semester/<course_id>',methods=['POST'])
def add_semester(course_id):
    url = request.url();
    faculty = request.form.get('faculty_dropdown')
    file = request.files['syllabus']
    sem = Controller.Semester()
    semester = sem.last_semester_id(course_id)
    semesterNumber = int(semester[0])+1
    fileName = f"{course_id}_sem_{semesterNumber}.pdf"
    file.save('../client/public/syllabus/'+fileName)
    sem.add_semester_record(semesterNumber,fileName,faculty,course_id)
    return redirect(url)

@course_bp.route('/update-semester/<semester_id>',methods=['POST'])
def update_semester(semester_id):
    return

@course_bp.route('/add-subject/<semester_id>',methods=['POST'])
def add_subject(semester_id):
    return

@course_bp.route('/update-subject/<subject_id>',methods=['POST'])
def update_subject(subject_id):
    return

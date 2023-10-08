from . import course_bp
from flask import request,redirect
import Controller

@course_bp.route('/add-course',methods=['POST'])
def add_course():
    print(request)
    name = request.form.get('courseName')
    duration = request.form.get('duration')
    capacity = request.form.get('capacity')
    code = request.form.get('code')
    course_type = request.form.get('type')
    course = Controller.Course(name)
    response_course = course.add_course(duration,capacity,code,course_type)
    dur = int(duration)
    if response_course is not False:
        semester = Controller.Semester()
        semester.add_course_sem(dur*2,response_course)
        return redirect('/admin/course/')
    else:
        return('/admin')
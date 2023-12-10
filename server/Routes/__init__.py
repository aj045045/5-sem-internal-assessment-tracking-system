from flask import Blueprint


assessment_bp = Blueprint('assessment',__name__,url_prefix='/assessment-system/assessment')
course_bp = Blueprint('course',__name__,url_prefix='/assessment-system/course')
paper_bp = Blueprint('paper',__name__,url_prefix='/assessment-system/paper')
user_bp = Blueprint('user',__name__,url_prefix='/assessment-system/user')

from . import Assessment
from . import Course
from . import Paper
from . import User
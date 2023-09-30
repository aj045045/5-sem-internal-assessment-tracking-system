from flask import Flask
from Blueprint_file import assessment_bp,course_bp,user_bp,paper_bp

app = Flask(__name__)

"""
#REVIEW - Create all collection for data entry
userData = ["user","user_type","semester","student","course","subject","assignment","assessment_type","assessment","exam_type","faculty","paper","result"]
for data in userData:
    userCreateData.create_collection(data)
"""
app.register_blueprint(assessment_bp)
app.register_blueprint(course_bp)
app.register_blueprint(paper_bp)
app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run(debug=True)

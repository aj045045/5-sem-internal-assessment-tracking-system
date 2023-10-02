from flask import Flask
from Routes import assessment_bp,course_bp,user_bp,paper_bp

app = Flask(__name__)
app.secret_key = "dev"
app.register_blueprint(assessment_bp)
app.register_blueprint(course_bp)
app.register_blueprint(paper_bp)
app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run(debug=True)

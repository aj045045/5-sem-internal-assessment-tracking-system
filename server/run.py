from flask import Flask, session
from Routes import assessment_bp,course_bp,user_bp,paper_bp

app = Flask(__name__)
app.secret_key = "af9c93b419c37431e900011710c2c2d2f31eb413c2d10b33ea06b8b5f90b80c8"
app.register_blueprint(assessment_bp)
app.register_blueprint(course_bp)
app.register_blueprint(paper_bp)
app.register_blueprint(user_bp)

if __name__ == "__main__":
    app.run(debug=True)

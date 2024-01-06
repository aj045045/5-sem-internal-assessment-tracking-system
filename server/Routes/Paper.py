from . import paper_bp
from flask import send_file, jsonify,request,redirect
import zipfile
from datetime import datetime
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from Crypto.PublicKey import RSA
import os
import Controller
from bson import ObjectId

"""#REVIEW - Create Keys
    Returns:
        Zips: zip containing private and public keys
    """

from flask import send_file
from datetime import datetime
import os
import zipfile
from Crypto.PublicKey import RSA

@paper_bp.route('/keys', methods=['GET'])
def download_keys():
    # Private_key
    private_key = RSA.generate(2048)
    private_pem = private_key.export_key()
    
    # Save private key to file
    private_key_path = 'uploads/private_key.pem'
    with open(private_key_path, 'wb') as f:
        f.write(private_pem)

    # Public_key
    public_key = private_key.publickey()
    public_pem = public_key.export_key()

    # Save public key to file
    public_key_path = 'uploads/public_key.pem'
    with open(public_key_path, 'wb') as f:
        f.write(public_pem)

    # Create a zip file
    date_today = datetime.now().strftime("%d-%m-%Y-%H:%M:%S")
    zip_name = f'uploads/keys-{date_today}.zip'
    
    with zipfile.ZipFile(zip_name, 'w') as zips:
        # Move the keys files to the main zip
        zips.write(private_key_path, os.path.basename(private_key_path))
        zips.write(public_key_path, os.path.basename(public_key_path))
    # Remove individual key files
    os.remove(private_key_path)
    os.remove(public_key_path)
    # Send the zip file as a response
    response = send_file(zip_name, as_attachment=True)
    # Remove the zip file
    os.remove(zip_name)
    return response

@paper_bp.route('/encrypt-paper', methods=['POST'])
def encrypt_paper():
    path = request.form.get('path')
    title = request.form.get('title')
    subject = request.form.get('subject')
    paper = request.files['question_paper']
    key = request.files['public_key']
    # Upload files
    paper_name = paper.filename
    key_name = key.filename
    paper.save(f'./uploads/{paper_name}')
    key.save(f'./uploads/{key_name}')
    with open(f"uploads/{key_name}", "rb") as f:
        public_key = RSA.import_key(f.read())
    file_path = os.path.join(os.getcwd(), f'./uploads/{paper_name}')
    paper_obj = Controller.Paper()
    paper_obj.encrypt_paper(title,subject,file_path,public_key)
    os.remove(f'uploads/{paper_name}')
    os.remove(f'uploads/{key_name}')
    return redirect(path)

@paper_bp.route("/decrypt-paper", methods=["POST"])
def decrypt_paper():
    path = request.form.get('path')
    paper = request.form.get('paper')
    key = request.files['private_key']
    key_name = key.filename
    key.save(f'./uploads/{key_name}')
    response_data = list(Controller.Database.collection('paper').view_one({"_id":ObjectId(paper)}))
    with open(f"uploads/{key_name}", "rb") as f:
        private_key = RSA.import_key(f.read())
    file_path = os.path.join(os.getcwd(), f'../client/public/{response_data[0]["paper"]}')
    paper_obj = Controller.Paper()
    data = paper_obj.decrypt_file(file_path,private_key)
    response = send_file(data,as_attachment=True)
    path = response_data[0]['paper'][:-29] +"-decrypt.docx"
    os.remove(f"uploads/{os.path.basename(path)}")
    os.remove(f"uploads/{key_name}")
    return response

@paper_bp.route("/get-paper/<data>",methods=["GET"])
def get_papers(data):
    pipeline = [
        {
            "$match": {"subject": ObjectId(data)}
        },
        {
            "$project": {
                "_id": 1,
                "title": 1,
            }
        }
    ]
    return Controller.convert_id(Controller.Database.collection('paper').aggregate(pipeline))

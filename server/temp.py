from pymongo import MongoClient
from flask import Flask

from flask import Flask, send_file, request, jsonify
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
import zipfile
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import os
from docx import Document

app = Flask(__name__)

# def create_keys():
#     # Private_key
#     private_key = rsa.generate_private_key(
#         public_exponent=65537,
#         key_size=2048,
#     )
#     private_pem = private_key.private_bytes(
#         encoding=serialization.Encoding.PEM,
#         format=serialization.PrivateFormat.PKCS8,
#         encryption_algorithm=serialization.NoEncryption()
#     )
#     # Public_key
#     with open('private_key.pem', 'wb') as f:
#         f.write(private_pem)

#     public_key = private_key.public_key()
#     public_pem = public_key.public_bytes(
#         encoding=serialization.Encoding.PEM,
#         format=serialization.PublicFormat.SubjectPublicKeyInfo
#     )

#     with open('public_key.pem', 'wb') as f:
#         f.write(public_pem)


# @app.route('/keys')
# def download_keys():
#     create_keys()
#     with zipfile.ZipFile('keys.zip', 'w') as zips:
#         zips.write('private_key.pem')
#         zips.write('public_key.pem')
#     response = send_file('keys.zip', as_attachment=True)
#     os.remove('private_key.pem')
#     os.remove('public_key.pem')
#     os.remove('keys.zip')
#     return response

# from flask import Flask, request, jsonify
# from Crypto.PublicKey import RSA
# from Crypto.Cipher import PKCS1_OAEP, AES
# from Crypto.Random import get_random_bytes
# import os

# app = Flask(__name__)

# # Load keys from files
# with open("public_key.pem", "rb") as f:
#     public_key = RSA.import_key(f.read())

# with open("private_key.pem", "rb") as f:
#     private_key = RSA.import_key(f.read())

# def encrypt_file(file_path, public_key):
#     # Generate a random AES key
#     session_key = get_random_bytes(16)
    
#     # Encrypt the file with AES
#     cipher_aes = AES.new(session_key, AES.MODE_EAX)
#     with open(file_path, "rb") as f:
#         plaintext = f.read()
#     ciphertext, tag = cipher_aes.encrypt_and_digest(plaintext)
    
#     # Encrypt the AES key with RSA
#     cipher_rsa = PKCS1_OAEP.new(public_key)
#     enc_session_key = cipher_rsa.encrypt(session_key)
    
#     # Save the encrypted file and encrypted AES key
#     with open(file_path + ".enc", "wb") as f:
#         [f.write(x) for x in (enc_session_key, cipher_aes.nonce, tag, ciphertext)]

# def decrypt_file(file_path, private_key):
#     # Read the encrypted file and encrypted AES key
#     with open(file_path, "rb") as f:
#         enc_session_key, nonce, tag, ciphertext = [f.read(x) for x in (private_key.size_in_bytes(), 16, 16, -1)]
    
#     # Decrypt the AES key with RSA
#     cipher_rsa = PKCS1_OAEP.new(private_key)
#     session_key = cipher_rsa.decrypt(enc_session_key)
    
#     # Decrypt the file with AES
#     cipher_aes = AES.new(session_key, AES.MODE_EAX, nonce=nonce)
#     decrypted_data = cipher_aes.decrypt_and_verify(ciphertext, tag)
    
#     # Save the decrypted file with the original ".docx" extension
#     output_file_path = file_path[:-4] + "-decrypt.docx"  # Remove the ".enc" extension and add "-decrypt.docx"
#     with open(output_file_path, "wb") as f:
#         f.write(decrypted_data)
#     os.remove(file_path)
#     return output_file_path


# @app.route("/encrypt", methods=["GET"])
# def encrypt_endpoint():
#     file_path = os.path.join(os.getcwd(), 'uploads/JAVA-NOES.docx')
#     encrypt_file(file_path, public_key)
#     return jsonify({"message": "File encrypted successfully"})

# @app.route("/decrypt", methods=["GET"])
# def decrypt_endpoint():
#     file_path = os.path.join(os.getcwd(), 'uploads/JAVA-NOES.docx.enc')
#     decrypt_file(file_path, private_key)
#     return jsonify({"message": "File decrypted successfully"})
from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB connection setup
uri = "mongodb+srv://aj045045:aj045045clusterdepartment@department.ywm3ege.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)

# Database setup
try:
    db = client['assessment-system']
    print(list(db['course'].find({})))
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
if __name__ == "__main__":
    app.run(debug=True)

from pymongo import MongoClient
from flask import Flask

from flask import Flask, send_file
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
import zipfile
import os
app = Flask(__name__)
def create_keys():
    # Private_key
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )
    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )
    # Public_key
    with open('private_key.pem', 'wb') as f:
        f.write(private_pem)

    public_key = private_key.public_key()
    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )

    with open('public_key.pem', 'wb') as f:
        f.write(public_pem)

@app.route('/keys')
def download_keys():
    create_keys()
    with zipfile.ZipFile('keys.zip', 'w') as zips:
        zips.write('private_key.pem')
        zips.write('public_key.pem')
    response = send_file('keys.zip', as_attachment=True)
    os.remove('private_key.pem')
    os.remove('public_key.pem')
    os.remove('keys.zip')
    return response


if __name__ == "__main__":
    app.run(debug=True)
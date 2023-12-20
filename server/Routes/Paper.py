from . import paper_bp
from flask import  send_file
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
import zipfile
from datetime import datetime
import os

"""#REVIEW - Create Keys
    Returns:
        Zips: zip containing private and public keys
    """
@paper_bp.route('/keys')
def download_keys():
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
    with open('uploads/private_key.pem', 'wb') as f:
        f.write(private_pem)

    public_key = private_key.public_key()
    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )

    with open('uploads/public_key.pem', 'wb') as f:
        f.write(public_pem)
    # Download files
    date_today = datetime.now()
    date_today = date_today.strftime("%d-%m-%Y-%H:%M:%S")
    zipName = f'uploads/keys-{date_today}.zip'
    with zipfile.ZipFile(f'{zipName}', 'w') as zips:
        zips.write('uploads/private_key.pem')
        zips.write('uploads/public_key.pem')
    response = send_file(f'{zipName}', as_attachment=True)
    # Remove files
    os.remove('uploads/private_key.pem')
    os.remove('uploads/public_key.pem')
    os.remove(f'{zipName}')
    return response

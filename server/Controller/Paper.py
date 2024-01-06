from bson import ObjectId
from .Database import Database
from Crypto.Cipher import PKCS1_OAEP, AES
from Crypto.Random import get_random_bytes
import os
import shutil
from datetime import datetime

class Paper():
    @classmethod
    def encrypt_paper(self,title, subject, paper, key):
        # Generate a random AES key
        session_key = get_random_bytes(16)

        # Encrypt the file with AES
        cipher_aes = AES.new(session_key, AES.MODE_EAX)
        with open(paper, "rb") as f:
            plaintext = f.read()
        ciphertext, tag = cipher_aes.encrypt_and_digest(plaintext)

        # Encrypt the AES key with RSA
        cipher_rsa = PKCS1_OAEP.new(key)
        enc_session_key = cipher_rsa.encrypt(session_key)

        # Save the encrypted file and encrypted AES key
        encrypted_filename = paper + ".enc"
        with open(encrypted_filename, "wb") as f:
            [f.write(x) for x in (enc_session_key, cipher_aes.nonce, tag, ciphertext)]

        # Rename the file before moving
        temp_name = os.path.basename(paper)
        date_today = datetime.now().strftime("%d-%m-%Y-%H:%M:%S")
        new_encrypted_filename = os.path.join(os.path.dirname(paper), f'{temp_name}_{date_today}.enc')
        os.rename(encrypted_filename, new_encrypted_filename)

        # Move the file to the new location
        destination_directory = '../client/public/papers/'
        new_location = os.path.join(destination_directory, os.path.basename(new_encrypted_filename))
        shutil.move(new_encrypted_filename, new_location)

        # Update the data with the new file path
        data = {
            "title": title,
            "subject":ObjectId(subject),
            "paper": f'papers/{os.path.basename(new_location)}'
        }
        return Database.collection('paper').insert_one(data)

    def decrypt_file(self,file_path, private_key):
        output_directory = 'uploads/'
        # Read the encrypted file and encrypted AES key
        with open(file_path, "rb") as f:
            enc_session_key, nonce, tag, ciphertext = [
                f.read(x) for x in (private_key.size_in_bytes(), 16, 16, -1)]
        # Decrypt the AES key with RSA
        cipher_rsa = PKCS1_OAEP.new(private_key)
        session_key = cipher_rsa.decrypt(enc_session_key)
        # Decrypt the file with AES
        cipher_aes = AES.new(session_key, AES.MODE_EAX, nonce=nonce)
        decrypted_data = cipher_aes.decrypt_and_verify(ciphertext, tag)
        
    # Construct the output file path in the specified output directory
        output_file_name = os.path.basename(file_path)[:-29] + "-decrypt.docx"
        output_file_path = os.path.join(output_directory, output_file_name)
        with open(output_file_path, "wb") as f:
            f.write(decrypted_data)
        return output_file_path

    def delete_paper():
        return

    def view_paper():
        return

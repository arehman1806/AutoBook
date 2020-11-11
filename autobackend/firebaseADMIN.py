import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("path/to/service_account_key")
app = firebase_admin.initialize_app(cred)

firestore_client = firebase_admin.firestore.client()
firestore_client




import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
from datetime import datetime

cred = credentials.Certificate("C:\\Users\\arehm\\WebstormProjects\\AutoBook\\autobackend\\service_account_key.json")
app = firebase_admin.initialize_app(cred)

firestore_client = firebase_admin.firestore.client()


def fetch_booking_data(uid: str, did: str):
  ref = 'users/' + uid + '/bookings/' + did

  booking_data = firestore_client.document(ref).get().to_dict()
  booking_data_json = json.dumps(booking_data, default=lambda o: o.isoformat() if hasattr(o, 'isoformat') else o)  # stores datetime in nanoseconds
  return booking_data_json

def save_platform_connect_data(uid: str, did: str):
  return True

# if __name__ == '__main__':
# main()

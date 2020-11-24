import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
from datetime import datetime
import os

current_dir = os.path.dirname(__file__)
cert_dir = os.path.join(current_dir,'service_account_key.json')
cred = credentials.Certificate(cert_dir)
app = firebase_admin.initialize_app(cred)

firestore_client = firebase_admin.firestore.client()


def fetch_booking_data(uid: str, did: str):
  ref = 'users/' + uid + '/bookings/' + did

  booking_data = firestore_client.document(ref).get().to_dict()
  booking_data_json = json.dumps(booking_data, default=lambda o: o.isoformat() if hasattr(o,
                                                                                          'isoformat') else o)  # store DateTimeInNanoSeconds
  return booking_data_json


def save_platform_connect_data(uid: str, platform_id: str, platform_username: str, platform_password: str):
  userProfileRef = 'users/' + uid
  userPlatformRef = 'users/' + uid + '/platforms/' + platform_id
  userProfileConnectedPlatforms = firestore_client.document(userProfileRef).get().to_dict()['connectedPlatforms']
  userProfileConnectedPlatforms.append(platform_id)
  firestore_client.document(userPlatformRef).set({'username': platform_username, 'password': platform_password})
  firestore_client.document(userProfileRef).update({'connectedPlatforms': userProfileConnectedPlatforms})
  return True

# if __name__ == '__main__':
# main()

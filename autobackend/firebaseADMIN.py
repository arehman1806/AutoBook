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
  booking_data_json = json.dumps(booking_data, default=lambda o: o.isoformat() if hasattr(o,
                                                                                          'isoformat') else o)  # stores datetime in nanoseconds
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

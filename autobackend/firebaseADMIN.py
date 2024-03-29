import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
from datetime import datetime
from google.api_core.datetime_helpers import DatetimeWithNanoseconds
import os

current_dir = os.path.dirname(__file__)
cert_dir = os.path.join(current_dir, 'service_account_key.json')
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


def convert_booking_to_json(booking_data):
  return json.dumps(booking_data, default=lambda o: o.isoformat() if hasattr(o,
                                                                             'isoformat') else o)


def fetch_bookings_by_date(platform_id: str, date):
  users_ref = 'users'
  users = firestore_client.collection(users_ref).stream()
  bookings_fetched = []
  for user in users:
    userID = user.to_dict()['uid']
    bookingsRef = 'users/' + userID + '/bookings'
    bookings = firestore_client.collection(bookingsRef).where(u'StartTime', u'<=', date).where(u'platformID', u'==',
                                                                                               platform_id).where(
      u'status', u'==', 'pending').stream()
    for booking in bookings:
      bookings_fetched.append(booking.to_dict())
  return bookings_fetched


# method takes in:
# userID: string
# booking_ID: string - might be called doc_ID elsewhere
# status to update: string - success, *add others here * //TODO
def update_scheduler_result(userID, booking_ID, status):
  user_ref = f'users/{userID}'
  doc_ref = user_ref + f'/bookings/{booking_ID}'
  status_to_update = {'status': status}
  firestore_client.document(doc_ref).update(status_to_update)


if __name__ == '__main__':
  update_scheduler_result('SnTwkMRinBZaTKP8m0XljALRGbz1', '1606684151165', 'success')
#   fetch_bookings_by_date('pl-1', DatetimeWithNanoseconds.now())

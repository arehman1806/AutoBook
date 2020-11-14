import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
from datetime import datetime

cred = credentials.Certificate("service_account_key.json")
app = firebase_admin.initialize_app(cred)

firestore_client = firebase_admin.firestore.client()

# def main():
#   bookingsFetched = []
#   usersRef = firestore_client.collection('users')
#   userDocs = usersRef.list_documents()
#   write = open('test.json', 'w')
#   for user in userDocs:
#     bookingsRef = firestore_client.collection('users/' + user.id + '/bookings')
#     bookingDocs = bookingsRef.list_documents()
#     for booking in bookingDocs:
#       x = booking.get().to_dict()
#       x['Date'] = str(x['StartTime'].date())
#       x['Time'] = str(x['StartTime'].time())
#       x['uid'] = user.id
#       bookingsFetched.append(x)
#       write.write(str(x))
#   write.flush()
#   write.close()

def fetch_booking_data(uid: str, did: str):
  ref = 'users/'+uid+'/bookings/'+'1605131372703'

  booking_data = firestore_client.document(ref).get().to_dict()
  # booking_data_json = json.dumps(booking_data, indent=4, default=str) # stores datetime as string
  booking_data_json = json.dumps(booking_data, default=lambda o: o.isoformat() if hasattr(o, 'isoformat') else o) #stores datetime in nanoseconds
  # plgym_data = json.loads(booking_data_json)
  # # print((datetime.fromisoformat(plgym_data['EndTime'])).strftime("%d-%m-%Y"))
  # # print((datetime.fromisoformat(plgym_data['EndTime'])).strftime("%H:%M"))
  return booking_data_json


if __name__ == '__main__':
  # main()
  fetch_booking_data("T8Zpsdxt8WWPqPToi8zRQELUWHP2", "1605131372703")
  # fetch_booking_data('users/T8Zpsdxt8WWPqPToi8zRQELUWHP2/bookings/1605131372703')

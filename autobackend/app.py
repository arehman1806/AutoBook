from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
import time
import atexit
import scheduler

from apscheduler.schedulers.background import BackgroundScheduler
from google.api_core.datetime_helpers import DatetimeWithNanoseconds
from datetime import datetime, timedelta

import firebaseADMIN
import plgym
import json

app = Flask(__name__)
CORS(app)


@app.route('/new_platform', methods=['POST'])
def new_platform():
  platform_data_json = request.get_json()
  print(platform_data_json)
  username = platform_data_json['username']
  password = platform_data_json['password']
  platform_id = platform_data_json['platformID']
  uid = platform_data_json['autoBookUID']
  if plgym.login(username, password):
    firebaseADMIN.save_platform_connect_data(uid, platform_id, username, password)
    response_message = 'True'

  else:
    response_message = 'False'

  return jsonify(login_status=response_message)


@app.route('/new_booking/<string:uid>/<int:did>')
def new_booking(uid: str, did: int):
  print('Booking user id: %s and document number %d' % (uid, did))
  booking_data_json = firebaseADMIN.fetch_booking_data(uid, str(did))
  print(booking_data_json)
  plgym.json_parse_and_run(booking_data_json)

  return jsonify(message='OK')





@app.route('/')
# def test():
#   scheduler.init()
#   return 0

def pl_scheduler():
  d_3 = DatetimeWithNanoseconds.now()+timedelta(days=3)
  fetched_bookings = firebaseADMIN.fetch_bookings_by_date('pl-1', d_3)
  for booking_data in fetched_bookings:
    booking_data_json = firebaseADMIN.convert_booking_to_json(booking_data)



def print_date_time():
  print(DatetimeWithNanoseconds.now()+timedelta(days=3))


if __name__ == '__main__':
  app.run()
  print(DatetimeWithNanoseconds.now())

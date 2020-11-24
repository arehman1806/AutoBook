from flask import Flask, jsonify
from flask import request
from flask_cors import CORS

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
  if plgym.login(username, password):
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


if __name__ == '__main__':
  app.run()

import os
import threading
import time
from decimal import Decimal

import pyautogui as pyautogui
from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.select import Select

import firebaseADMIN
import plgym

app = Flask(__name__)
CORS(app)


@app.route('/new_platform', methods=['POST'])
def new_platform():
  platform_data_json = request.get_json()
  print(platform_data_json)

  return jsonify(message='OK')


@app.route('/new_booking/<string:uid>/<int:did>')
def new_booking(uid: str, did: int):
  print('Using URL Variables %s and number %d' % (uid, did))
  did = str(did)
  booking_data_json = firebaseADMIN.fetch_booking_data(uid, did)
  print(booking_data_json)
  plgym.json_parse_and_run(booking_data_json)

  return jsonify(message='OK')


if __name__ == '__main__':
  app.run()

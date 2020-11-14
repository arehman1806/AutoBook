import os
import threading
import time
from decimal import Decimal

import pyautogui as pyautogui
from flask import Flask, jsonify
from flask import request
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.select import Select
from datetime import datetime


class plgym:
  driver_dir = os.path.dirname(__file__)
  chrome_driver = os.path.join(driver_dir, 'driver', 'chromedriver.exe')
  driver = webdriver.Chrome(chrome_driver, chrome_options=options)

  def plgym_json_parser(self, booking_data_json):

    return null

  def booking(self, day, month, time_input, user_id, user_password):

    # testing account
    if user_id == 'test':
      user_id = 'mnm-matin'
      user_password = '123*Jkljkljkl'

    initialize()
    login(user_id, user_password)
    # Fill Form
    select_site("Easter Bush")
    select_activity("Gym Access")
    # Send Query
    send_query()
    # Select Required Booking
    basket(time_input)
    select_terms()
    confirm_booking()

    return print("Run ok")

  def initialize(self):

    options = Options()
    options.set_capability("acceptInsecureCerts", True)

    driver_dir = os.path.dirname(__file__)
    chrome_driver = os.path.join(driver_dir, 'driver', 'chromedriver.exe')

    driver = webdriver.Chrome(chrome_driver, chrome_options=options)

    # For certificate skipping
    # Won't be a problem during dev
    def threaded_function():
      # Calls the website
      # driver.get('https://www.sport.ed.ac.uk/online-booking')
      driver.get('https://www.sport.ed.ac.uk/online-booking/Account/LogOn')

    def threaded_function2():
      for i in range(0, 8):
        pyautogui.press('enter')

    # END certificate skipping

    # Calling the website and pressing 10 times in the same time
    thread2 = threading.Thread(target=threaded_function2)
    thread2.start()

    thread = threading.Thread(target=threaded_function)
    thread.start()

  def login(self, user_name, user_pass):
    USER_ID = user_name
    USER_PASSWORD = user_pass
    LOGIN_URL = 'https://www.sport.ed.ac.uk/online-booking/Account/LogOn'
    driver.get(LOGIN_URL)
    time.sleep(1)
    username = driver.find_element_by_id('UserName')
    username.click()
    username.send_keys(USER_ID)
    password = driver.find_element_by_id('Password')
    password.click()
    password.send_keys(USER_PASSWORD)
    password.submit()
    time.sleep(2)
    return True

  def select_site(self, site: str):
    # driver.get('https://www.sport.ed.ac.uk/online-booking')
    site = Select(driver.find_element_by_id("SiteID"))
    site.select_by_visible_text(site)
    time.sleep(1)
    return True

  def select_activity(self, activity: str):
    activity = Select(driver.find_element_by_id("Activity"))
    activity.select_by_visible_text(activity)
    time.sleep(1)
    return True

  def send_query(self):
    # submit_query_button = driver.find_element_by_class_name("NavigationButton")
    submit_query_button = driver.find_element_by_xpath("//input[@name='submitButton' and @value='Search']")
    submit_query_button.click()
    time.sleep(6)
    return True

  def basket(self, time_input_x):
    def convert_time(time_x_):
      split1 = time_x_.split(' ')
      split2 = split1[0].split(':')
      time_split = split2 + [split1[1]]
      if time_split[1] == '30':
        if time_split[2] == 'AM':
          number = int(time_split[0]) + 0.5
        else:
          if time_split[2] == 'PM':
            number = int(time_split[0]) + 0.5 + 12
          else:
            number = -1
      else:
        if time_split[2] == 'AM':
          number = int(time_split[0])
        else:
          if time_split[2] == 'PM':
            number = int(time_split[0]) + 12
          else:
            number = -1

      if time_split == ['12', '00', 'PM']:
        number = 12
      if time_split == ['12', '30', 'PM']:
        number = 12.5

      return Decimal(number)

    results_table = driver.find_element_by_class_name("ActivitySearchResults")
    results_table = results_table.find_element_by_tag_name('tbody')

    results_table_rows = results_table.find_elements_by_tag_name("tr")

    for row in results_table_rows:
      time_x = row.find_element_by_class_name('TimeField').text
      time_int = convert_time(time_x)
      if time_int == time_input_x:
        selectable = row.find_element_by_class_name('LinkField')
        selectable.click()
        return 1

    time.sleep(5)

  def select_terms(self):
    terms = driver.find_element_by_id("TermsAccepted")
    terms.click()
    terms.submit()

  def confirm_booking(self):
    confirm = driver.find_element_by_link_text("Confirm your booking(s)")

  def logout(self):
    return null

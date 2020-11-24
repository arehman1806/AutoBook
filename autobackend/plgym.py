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
from selenium.common.exceptions import NoSuchElementException
import json
from datetime import datetime

# from selenium import webdriver
# from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(ChromeDriverManager().install())

options = Options()
options.set_capability("acceptInsecureCerts", True)
driver_dir = os.path.dirname(__file__)
chrome_driver = os.path.join(driver_dir, 'driver', 'chromedriver.exe')
driver = webdriver.Chrome(chrome_driver, chrome_options=options)
# driver = webdriver.Chrome(ChromeDriverManager().install, chrome_options=options)


def json_parse_and_run(booking_data_json):
  plgym_data = json.loads(booking_data_json)
  day = datetime.fromisoformat(plgym_data['StartTime']).strftime("%d")
  month = datetime.fromisoformat(plgym_data['StartTime']).strftime("%m")
  time_input = datetime.fromisoformat(plgym_data['StartTime']).strftime("%H:%M")
  site_name = plgym_data['Site']
  activity_name = plgym_data['Activity']

  booking(day, month, time_input, site_name, activity_name, 'wrong_test', 'test')


def booking(day, month, time_input, site, activity, user_id, user_password):
  # testing account
  if user_id == 'test':
    user_id = 'mnm-matin'
    user_password = '123*Jkljkljkl'

  if user_id == 'wrong_test':
    user_id = 'wrong_user_name'
    user_password = 'wrong_password'

  # initialize()
  login(user_id, user_password)
  time.sleep(1)
  # Fill Form
  select_site(site)
  time.sleep(1)
  select_activity(activity)
  time.sleep(1)
  select_date(day, month)
  time.sleep(2)
  # Send Query
  send_query()
  time.sleep(6)
  # Select Required Booking
  basket(time_input)
  time.sleep(2)
  select_terms()
  time.sleep(2)
  confirm_booking()

  return print("Run ok")


def initialize():
  global driver

  options = Options()
  options.set_capability("acceptInsecureCerts", True)

  driver_dir = os.path.dirname(__file__)
  chrome_driver = os.path.join(driver_dir, 'driver', 'chromedriver.exe')

  driver = webdriver.Chrome(chrome_driver, chrome_options=options)

  # For certificate skipping
  # Won't be a problem during production

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


def login(user_name, user_pass):
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

  try:
    validation_error = driver.find_element_by_xpath('//*[@id="LogOn"]/div/form/div[1]/span')
    validation_error_text = driver.find_element_by_xpath('//*[@id="LogOn"]/div/form/div[1]/span').text

    if validation_error_text == "Your attempted log on was unsuccessful. Please correct the errors and try again.":
      print("unsuccessful")   # TODO :throw exception
      return False
    else:
      print("successful")
      return True

  except NoSuchElementException:
    print("successful")
    return True


def select_site(site_name: str):
  # driver.get('https://www.sport.ed.ac.uk/online-booking')
  site = Select(driver.find_element_by_id("SiteID"))
  site.select_by_visible_text(site_name)
  return True


def select_activity(activity_name: str):
  activity = Select(driver.find_element_by_id("Activity"))
  activity.select_by_visible_text(activity_name)
  return True


def select_date(day_x, month_x):
  print(day_x, month_x)
  months_to_num = {
    'january': 1,
    'february': 2,
    'march': 3,
    'april': 4,
    'may': 5,
    'june': 6,
    'july': 7,
    'august': 8,
    'september': 9,
    'october': 10,
    'november': 11,
    'december': 12
  }
  date = driver.find_element_by_id("SearchDate")
  date.click()
  count = 0
  while str(months_to_num[driver.find_element_by_class_name('ui-datepicker-month').text.lower()]) != str(month_x):
    time.sleep(3)
    next_month = driver.find_element_by_class_name('ui-datepicker-next')
    next_month.click()
    count += 1
    if count > 3:
      return -1
  date_table = driver.find_element_by_tag_name('tbody')
  dates = date_table.find_elements_by_tag_name("td")
  for date in dates:
    if date.text == str(day_x):
      if 'ui-datepicker-unselectable' in date.get_attribute('class').split(' '):
        return -1
      else:
        date.click()
        return 0


def send_query():
  # submit_query_button = driver.find_element_by_class_name("NavigationButton")
  submit_query_button = driver.find_element_by_xpath('//*[@id="SearchButtonDiv"]/input')
  # submit_query_button = driver.find_element_by_xpath("//input[@name='submitButton' and @value='Search']")
  submit_query_button.click()
  time.sleep(6)
  return True


def basket(time_input: str):
  # time_input in format "%H:%M" 24 hour clock

  # try:
  #   driver.find_element_by_xpath('//*[@id="NoSearchResultsNotice"]')
  # except NoSuchElementException:
  #   print("continue basket function normally")
  # return print("not available")  # TODO :throw exception

  results_table = driver.find_element_by_class_name("ActivitySearchResults")
  results_table = results_table.find_element_by_tag_name('tbody')
  results_table_rows = results_table.find_elements_by_tag_name("tr")

  def scrap_time_link():
    time_link_ = {}
    for row_ in results_table_rows:
      time_field = row_.find_element_by_class_name('TimeField').text
      standard_time_format = datetime.strptime(time_field, "%I:%M %p")
      time_field = datetime.strftime(standard_time_format, "%H:%M")
      link_field = row_.find_element_by_class_name('LinkField')
      print(link_field)
      if time_field not in time_link_:
        time_link_[time_field] = []
        time_link_[time_field].append(link_field)
    return time_link_

  time_link = scrap_time_link()

  if time_input not in time_link:
    return print("time not found")
  else:
    basket_link = time_link[time_input]
    basket_link[0].click()


def select_terms():
  terms = driver.find_element_by_id("TermsAccepted")
  terms.click()
  terms.submit()


def confirm_booking():
  confirm = driver.find_element_by_link_text("Confirm your booking(s)")


def logout():
  return null

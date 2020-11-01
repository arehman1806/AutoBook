import threading
import time

import pyautogui as pyautogui
from flask import Flask
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.wait import WebDriverWait


def booking(day, month, time_input):
    USER_ID = 'mnm-matin'
    USER_PASSWORD = '123*Jkljkljkl'
    options = Options()
    options.set_capability("acceptInsecureCerts", True)

    driver = webdriver.Chrome(r"C:\Users\Matin\PycharmProjects\flaskProject\venv\driver\chromedriver.exe",
                              chrome_options=options)

    def threaded_function():
        # Calls the website
        # driver.get('https://www.sport.ed.ac.uk/online-booking')
        driver.get('https://www.sport.ed.ac.uk/online-booking/Account/LogOn')

    def threaded_function2():
        for i in range(0, 8):
            pyautogui.press('enter')

    # Calling the website and pressing 10 times in the same time
    thread2 = threading.Thread(target=threaded_function2)
    thread2.start()

    thread = threading.Thread(target=threaded_function)
    thread.start()

    driver.get('https://www.sport.ed.ac.uk/online-booking/Account/LogOn')
    time.sleep(1)
    username = driver.find_element_by_id('UserName')
    username.click()
    username.send_keys(USER_ID)
    password = driver.find_element_by_id('Password')
    password.click()
    password.send_keys(USER_PASSWORD)
    password.submit()

    time.sleep(2)

    # driver.get('https://www.sport.ed.ac.uk/online-booking')
    site = Select(driver.find_element_by_id("SiteID"))
    site.select_by_visible_text("Easter Bush")
    time.sleep(1)
    activity = Select(driver.find_element_by_id("Activity"));
    activity.select_by_visible_text("Gym Access");

    def select_date(day_x, month_x):
        day_x = int(day_x)
        month_x = int(month_x)
        MONTHS_TO_NUM = {
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
        while MONTHS_TO_NUM[driver.find_element_by_class_name('ui-datepicker-month').text.lower()] != month_x:
            time.sleep(3)
            next_month = driver.find_element_by_class_name('ui-datepicker-next')
            next_month.click()
            print(MONTHS_TO_NUM[driver.find_element_by_class_name('ui-datepicker-month').text.lower()])
            count += 1
            # if count > 3:
            #     return -1
        date_table = driver.find_element_by_tag_name('tbody')
        dates = date_table.find_elements_by_tag_name("td")
        for date in dates:
            if date.text == str(day_x):
                if 'ui-datepicker-unselectable' in date.get_attribute('class').split(' '):
                    return -1
                else:
                    date.click()
                    return 0

    select_date(day, month)

    time.sleep(1)

    submit_query_button = driver.find_element_by_class_name("NavigationButton")
    submit_query_button.click()

    time.sleep(6)

    def basket(time_input_x):
        time_input_x = int(time_input_x)
        def convert_time(time_x):
            split1 = time_x.split(' ')
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

            return number

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

    x = basket(time_input)

    time.sleep(5)

    terms = driver.find_element_by_id("TermsAccepted")
    terms.click()
    terms.submit()

    confirm = driver.find_element_by_link_text("Confirm your booking(s)")


app = Flask(__name__)

from flask import request


@app.route('/query-example')
def query_example():
    return 'Todo...'


@app.route('/', methods=['GET'])
def hello_world():
    day = request.args['day']
    month = request.args['month']
    time_input = request.args['time']
    print((day, month, time_input))

    booking(day, month, time_input)

    # return (day, month, time_input)


if __name__ == '__main__':
    app.run()

from datetime import date

from apscheduler.schedulers.background import BackgroundScheduler
from google.api_core.datetime_helpers import DatetimeWithNanoseconds

from firebaseADMIN import update_scheduler_result
from firebaseADMIN import fetch_bookings_by_date

scheduler = BackgroundScheduler()


def pl_1_scheduler():
  bookings_fetched = fetch_bookings_by_date('pl-1', DatetimeWithNanoseconds.now())
  #TODO: call appropriate functions here for each booking in bookings fetched. update result using update_scheduler_result.

def init():
  scheduler.add_job(id='Task', func=pl_1_scheduler, trigger='interval', seconds=5)
  scheduler.start()
  return 0

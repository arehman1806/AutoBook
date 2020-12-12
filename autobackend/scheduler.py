from apscheduler.schedulers.background import BackgroundScheduler
from firebaseADMIN import update_scheduler_result
from firebaseADMIN import fetch_bookings_by_date

scheduler = BackgroundScheduler()


def pl_1_scheduler():
  bookings_fetched = fetch_bookings_by_date()
  #TODO: call appropriate functions here for each booking in bookings fetched. update result using update_scheduler_result.

def init():
  scheduler.add_job(id='Task', func=pl_1_scheduler, trigger='interval', seconds=5)
  scheduler.start()
  return 0

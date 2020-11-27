from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()


def scheduled_task():
  print("Scheduled Task")


def init():
  scheduled_task()
  scheduler.add_job(id='Task', func=scheduled_task, trigger='interval', seconds=5)
  scheduler.start()
  return 0

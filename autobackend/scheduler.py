from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()


def scheduled_task():
  print("Scheduled Task")


def main():
  scheduler.add_job(id='Task', func=scheduled_task, trigger='interval', seconds=5)
  scheduler.start()


if __name__ == '__main__':
  main()

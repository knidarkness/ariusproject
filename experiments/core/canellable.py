import threading
import thread
import time

i = True
lock = threading.RLock()
cancel = False

class Updater(threading.Thread):
	def __init__(self, lock):
		threading.Thread.__init__(self)
		print 'intializing message-handling class'
		self.lock = lock

	def run(self):
		while True:
			pass

	def stop_running(self):
		global i
		self.lock.acquire()
		i = False
		self.lock.release()

class Worker:
	def __init__(self, lock):
		self.result = None
		self.lock = lock
		print 'initializing worker class'


	def work(self):
		global i
		print i
		thread.start_new_thread(self.dothing, ())
		print 'started worker'
		while not self.result:
			if i == False:
				print 'canelled'
				break
		print 'finsihed worker'
		if self.result:
			print self.result
		else:
			print 'cancelled'
	def dothing(self):
		print 'began workeing'
		time.sleep(2)
		print 'finished'
		self.result = 200

if __name__=="__main__":
	print 'started test'
	u = Updater(lock)
	w = Worker(lock)

	worker = threading.Thread(target=w.work, args=())
	worker.start()
	time.sleep(1)
	updater = Updater(lock)
	updater.start()
	updater.stop_running()
	# thread.start_new_thread(w.work, ())
	#time.sleep(1)
	#print 'sending end signal'
	#i = False
	time.sleep(.1)
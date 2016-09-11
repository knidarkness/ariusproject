# ariusproject
This is for ariusproject.


#To install all needed parts of Arius you need to run install.sh
It will create python virtual environment,
install needed python packages,
download and install qt, marytts and elastic search

##Script needs a little attention of user. 

It will ask you to choose voices for marytts.

Right now we want to installing en-US voices (cmu-slt, cmu-rms-hsmm, cmu-bdl-hsmm). You should install them. (After finishing installing voices menu doesn't dissapear,, so you should just close it to continue)

#Prepare to the work
All data that Arius use should be stored in the server/static.
There are few folders for different types of information.  

If you add or remove files, which Arius should show, you need to run esindex_builder.sh in additional_scripts.

After this preparing Arius is ready for start.

#To start Arius
You can run Arius in three different ways.
We use tmux to make debugging easy and comfortable.

- Debug mode with all information just run `./run.sh -m debug`
- Less informative verbose mode `./run.sh -m verbose`
- Silent work (without visible terminals at all) `run.sh -m silent`

To make your output size specific use flag `-s widthxheight` (e.g. `./run.sh -m debug -s 500x600`, `./run.sh -m silent -s 100x400`, ...).
Otherwise output in fullscreen mode.

##To run specific parts of Arius
###In the folder additional_scripts
-  Core module `./core.sh -h` to see needed flags of this script
-  Server module `./server.sh -h` to see help
-  Output module `./output.sh -h` to get know how to use
-  Input module `./input.sh`

###In the folder required packages
-  Text to speech server `./marytts-5.1.2/bin/marytts-server`
-  Search engine server `./elasticsearch-2.3.5/bin/elasticsearch`




##Configuration and tagging

todo


##The targets of the used packages

- Mary TTS server is used for transforming text to speech. We have tts_module for interaction with it. You can change voice and effects in `config.py`. There are few options we made, you can modify them and choose needed by changing key option `default_voice` in the file. To work with Mary server you can use browser and server address `127.0.0.1:59125`.
It has 3 version of GNU LGPL license.


- Elasticsearch. We use it to index presentations, web pages, and documents (you can add and remove file extensions in `config.py`). To index elements we have `esindex_builder.py` in the core folder. We need results of search engine in the case if of unpredifined user request. Elasticsearch is under Apache 2.0 license.

- We use QT to create own browser with three tabs. The top and bottom tabs are designed to provide non-main information and attract user. The tab in the middle is for the main content. To be able to open pdf-files our browser uses PDF.js which is provided under Apache 2.0 license.

- We used python packages (you can see them in `requirements.txt`) for several needs. For the server which communicate with all modules and render results for the content tab, communication with elasticsearch server, processing text input...
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

If you add or remove files, which Arius should show, you need to run esindex_builder.py in new_core

After this preparing Arius is ready for start.

#To start Arius
You can run Arius in three different ways.
We use tmux to make debugging easy and comfortable.

- Debug mode with all information just run `./run.sh -m debug`
- Less informative verbose mode `./run.sh -m verbose`
- Silent work (without visible terminals at all) `run.sh -m silent`

To make your output size specific use flag `-s widthxheight` (e.g. `./run.sh -m debug -s 500x600`, `./run.sh -m silent -s 100x400`, ...).
Otherwise output in fullscreen mode.


##Tagging and configuration


### Tagging
Except Quepy and Elascticsearch we provide tagging data to show important materials.
In the `server/static` we have two files: `tag_data.json` and `video_data.json`.
First is used by core module to generate Arius reaction on the user request.
This file contains two important parts: synonyms and tag_data

####New tags
To add new tag which can be used for tagging data you should write it key and all words that should be associated with this tag (e.g `'1':{'key':'Arius', 'equal':['Arius', 'ads project rnd']}`). After adding tag to the "synonyms" you can use it for tagging any type of files, and that files will be showed on the needed request.
####Tagging files
To add new file with associated tags you need to add it the next format
`'1':{'priority': 0, 'name': Arius, 'path': 'Arius.pdf', 'tags': [['Arius', 1], ['rnd', 0.4], ['showroom', 0.6]}`
Prioirity shows importance of the file. It is integer and smaller is it more important the file is.
Name just let us easily indetify the file (if the path is not informative)
Path is a relative path (for videos it is path from the folder videos e.g `'path': 'arius.webm'` if the full path to the file is `home/.../ariusproject/server/static/videos/arius.webm`. For other files it is relative path from the folder 'local_pages' where is suggested to save all documents and webpages)
Tags field contains list of lists where we have key of the tag and its relevance to the file. For example if file is about Arius and briefly about the showroom then confidence of the "Arius" tag is bigger than confidence of the "showroom" tag. This number should be fload in range of 0 to 1


###Configuration
In the file 'config.py' which is located in the root of the project you can modify addresses, style, voice, default phrases to speak, phrases associated with commands and templates.

It is required to change flask addresses for both clients and servers (e.g. "flask_server_video_addr" and "flask_server_video_addr_client"). Otherwise if won't work correctly.

To get know how to change voice you can attend "127.0.0.1:59125/documentation.html" after starting marytts server
(to start it just run `./required_packages/marytts-5.1.1/bin/marytts-server` from the project root)
It is good to try voice first with web-interface "127.0.0.1:59125". It is easy to configure and test.

##The targets of the used packages

- Mary TTS server is used for transforming text to speech. We have tts_module for interaction with it. You can change voice and effects in `config.py`. There are few options we made, you can modify them and choose needed by changing key option `default_voice` in the file. To work with Mary server you can use browser and server address `127.0.0.1:59125`.
It has 3 version of GNU LGPL license.

- Elasticsearch. We use it to index presentations, web pages, and documents (you can add and remove file extensions in `config.py`). To index elements we have `esindex_builder.py` in the core folder. We need results of search engine in the case if of unpredifined user request. Elasticsearch is under Apache 2.0 license.

- We use QT to create own browser with three tabs. The top and bottom tabs are designed to provide non-main information and attract user. The tab in the middle is for the main content. To be able to open pdf-files our browser uses PDF.js which is provided under Apache 2.0 license.

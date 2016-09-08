# ariusproject
This is for ariusproject.


#To install all needed parts of Arius you need to run install.sh
It will create python virtual environment,
install needed python packages,
download and install qt, marytts and elastic search

##Script needs a little attention of user. 

It will ask you to choose voices for marytts.

Right now we use all en-us voices. You should install them. (After finishing installing voices menu doesn't dissapear,, so you should just close it to continue)

#Prepare to the work
All data that Arius use should be stored in the server/static.
There are few folders for different types of information.  

If you add or remove files, which Arius should show, you need to run esindex_builder.sh in additional_scripts.

After this preparing Arius is ready for start.

###To start Arius
Just run *run.sh* in the root of the repo
./run.sh

####To run specific parts of Arius
./core.sh
./server.sh
./output.sh
./elasticsearch
/marytts/bin/marytts-server
/elasticsearch/bin/elasticsearch

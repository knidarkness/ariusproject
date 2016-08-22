# ariusproject
This is for ariusproject.


##To use this wonderful repo you need to set virtualenv
virtualenv --system-site-packages env
source env/bin/activate
pip install -r requeirements.txt

###Also you will need to install some packages
sudo apt-get install libqt5webkit5-dev
sudo apt-get install python2-pyqt5.qtsvg
sudo apt-get install python2-pyqt5.qtwebkit

###It is requiered to have marytts in the root folder
You can ask Anton for it

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

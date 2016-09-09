sudo apt-get update
sudo apt-get install default-jre
sudo apt-get install default-jdk
sudo apt-get install tmux
sudo apt install python-pip
pip install virtualenv
virtualenv --system-site-packages env
source env/bin/activate
pip install -r requirements.txt
mkdir required_packages
cd required_packages
wget "https://sourceforge.net/projects/pyqt/files/sip/sip-4.18.1/sip-4.18.1.tar.gz/download" -O sip.tar.gz
wget "https://sourceforge.net/projects/pyqt/files/PyQt5/PyQt-5.7/PyQt5_gpl-5.7.tar.gz/download" -O pyqt.tar.gz
tar -xvzf sip.tar.gz
tar -xvzf pyqt.tar.gz
cd sip-4.18.1
python configure.py
cd ../
wget http://download.qt.io/official_releases/qt/5.7/5.7.0/qt-opensource-linux-x64-5.7.0.run
wget https://github.com/marytts/marytts/releases/download/v5.1.2/marytts-5.1.2.zip
unzip marytts-5.1.2.zip
cd marytts-5.1.2/bin
./marytts-component-installer
chmod 555 marytts-server
cd ../../
chmod +x qt-opensource-linux-x64-5.7.0.run
./qt-opensource-linux-x64-5.7.0.run
sudo apt-get install build-essential
sudo apt-get install libfontconfig1
cd PyQt5_gpl-5.7
python configure.py
make -j4
make install
cd ../
curl -L -O https://download.elastic.co/elasticsearch/release/org/elasticsearch/distribution/tar/elasticsearch/2.3.5/elasticsearch-2.3.5.tar.gz
tar -xvf elasticsearch-2.3.5.tar.gz
cd elasticsearch-2.3.5
sudo bin/plugin install mapper-attachments
chmod 555 bin/elasticsearch
cd ../../
sudo apt-get install libqt5webkit5-dev
sudo apt-get install python-pyqt5.qtsvg
sudo apt-get install python-pyqt5.qtwebkit
cd env/lib/python2.7/site-packages
echo ../../../../ >> config.pth
cd ../../../../
cd additional_scripts
chmod 555 core.sh
chmod 555 input.sh
chmod 555 server.sh
chmod 555 output.sh



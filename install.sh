sudo apt-get update
sudo apt-get install default-jre
sudo apt-get install default-jdk
tar -xvzf required_packages/PyQt5_gpl-5.7.tar.gz 
tar -xvzf required_packages/sip-4.18.1.tar.gz
sudo apt install python-pip
pip install virtualenv
virtualenv --system-site-packages env
source env/bin/activate
pip install -r requirements.txt
cd sip-4.18.1
python configure.py
cd ../
wget http://download.qt.io/official_releases/qt/5.7/5.7.0/qt-opensource-linux-x64-5.7.0.run
chmod +x qt-opensource-linux-x64-5.7.0.run
./qt-opensource-linux-x64-5.7.0.run
sudo apt-get install build-essential
sudo apt-get install libfontconfig1
cd PyQt5_gpl-5.7
python configure.py
make
make install
cd ../
sudo apt-get install libqt5webkit5-dev
sudo apt-get install python-pyqt5.qtsvg
sudo apt-get install python-pyqt5.qtwebkit
cd env/lib/python2.7/site-packages
echo ../../../../ >> config.pth
cd ../../../../



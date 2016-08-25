#!/bin/sh
#gnome-terminal -e required_packages/marytts/bin/marytts-server
#gnome-terminal -e required_packages/elasticsearch/bin/elasticsearch
cd additional_scripts
gnome-terminal -e ./server.sh
sleep 10 
gnome-terminal -e ./input.sh
gnome-terminal -e ./core.sh 
./output.sh

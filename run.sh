#!/bin/sh
gnome-terminal -e required_packages/marytts-5.1.2/bin/marytts-server
gnome-terminal -e required_packages/elasticsearch-2.3.5/bin/elasticsearch
cd additional_scripts
gnome-terminal -e ./server.sh
sleep 10 
gnome-terminal -e ./input.sh
gnome-terminal -e ./core.sh 
./output.sh

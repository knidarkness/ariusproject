#!/bin/sh
gnome-terminal -e ./server.sh &
gnome-terminal -e marytts/bin/marytts-server &
gnome-terminal -e elasticsearch/bin/elasticsearch &
gnome-terminal -e ./core.sh &
gnome-terminal -e ./input.sh &
./output.sh

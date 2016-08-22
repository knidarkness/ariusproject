#!/bin/sh
gnome-terminal -e marytts/bin/marytts-server &
gnome-terminal -e elasticsearch/bin/elasticsearch &
gnome-terminal -e ./server.sh &
gnome-terminal -e ./core.sh &
./output.sh

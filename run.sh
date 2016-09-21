#!/bin/sh
usage()
{
cat << EOF
usage: $0 options

This script run all parts of Arius in debug/verbose/silent mode

OPTIONS:
   -h      Show this message
   -m      mode type, can be 'debug', 'verbose' or 'silent'
   -s      size of output window can be in format '500x600'
EOF
}

MODE=
SIZE=
SLIENT=false
while getopts “hm:s:” OPTION
do
     case $OPTION in
         h)
             usage
             exit 1
             ;;
         m)
             MODE=$OPTARG
             ;;
         s)
			 SIZE=$OPTARG
			 ;;
         ?)
             usage
             exit
             ;;
     esac
done

if [ -z "$MODE" ];
then
     usage
     exit 1
else
	if [ "$MODE" = "debug" ];
		then
			MODE="-d"

	elif [ "$MODE" = "verbose" ];
		then
			MODE="-v"
	elif [ "$MODE" = "slient" ];
		then
			MODE=" "
			SLIENT=true
	fi
fi
if [ -n "$SIZE" ];
then
	SIZE="-s ${SIZE}"
fi


tmux new-session  -s Arius -d
tmux split-window -d -t 0 -v
tmux split-window -d -t 0 -h
tmux split-window -d -t 0 -v
tmux split-window -d -t 2 -v 
tmux split-window -d -t 4 -h 

tmux send-keys -t 0 "cd server; python server.py ${MODE} ; cd ../" C-m
tmux send-keys -t 3 "cd required_packages/marytts-5.1.1/bin/; ./marytts-server" C-m
tmux send-keys -t 4 "cd required_packages/elasticsearch-2.3.5/bin; ./elasticsearch" C-m
sleep 8
tmux send-keys -t 5 "cd new_core; python core_main.py ${MODE} ; cd ../" C-m
tmux send-keys -t 1 "cd output_module; python output_main.py ${MODE} ${SIZE}; cd ../" C-m

if [ "$SLIENT" = false ] ;
then
	tmux send-keys -t 2 "cd server;  python input_sim.py; cd ../" C-m
	tmux attach-session 
else
	cd server
	python input_sim.py
fi
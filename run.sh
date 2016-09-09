#!/bin/sh
usage()
{
cat << EOF
usage: $0 options

This script run all parts of arius in debug/verbose/silent mode

OPTIONS:
   -h      Show this message
   -m      mode type, can be 'debug', 'verbose' or 'silent'
   -s      size of output window can be in format '500x600'
EOF
}


SESSION_NAME="arius"


debug_mode()
{
	tmux new-session -s ${SESSION_NAME} -n server -d
	tmux send-keys -t ${SESSION_NAME} 'cd additional_scripts; ./server.sh -m debug' C-m

	tmux new-window -n marytts -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:1 'cd required_packages/marytts-5.1.2/bin/; ./marytts-server' C-m

	tmux new-window -n elasticsearch -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:2 'cd required_packages/elasticsearch-2.3.5/bin; ./elasticsearch' C-m

	sleep 10

	tmux new-window -n core -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:3 'cd additional_scripts; ./core.sh -m debug' C-m

	tmux new-window -n output -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:4 'cd additional_scripts; ./output.sh -m debug' C-m

	tmux new-window -n input -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:5 'cd additional_scripts; ./input.sh' C-m
}

verbose_mode()
{
	tmux new-session -s ${SESSION_NAME} -n server -d
	tmux send-keys -t ${SESSION_NAME} 'cd additional_scripts; ./server.sh -m verbose' C-m

	tmux new-window -n marytts -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:1 'cd required_packages/marytts-5.1.2/bin/; ./marytts-server' C-m

	tmux new-window -n elasticsearch -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:2 'cd required_packages/elasticsearch-2.3.5/bin; ./elasticsearch' C-m

	sleep 10

	tmux new-window -n core -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:3 'cd additional_scripts; ./core.sh -m verbose' C-m

	tmux new-window -n output -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:4 'cd additional_scripts; ./output.sh -m verbose' C-m

	tmux new-window -n input -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:5 'cd additional_scripts; ./input.sh' C-m
}

silent_mode()
{
	tmux new-session -s ${SESSION_NAME} -n server -d
	tmux send-keys -t ${SESSION_NAME} 'cd additional_scripts; ./server.sh -m silent' C-m

	tmux new-window -n marytts -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:1 'cd required_packages/marytts-5.1.2/bin/; ./marytts-server' C-m

	tmux new-window -n elasticsearch -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:2 'cd required_packages/elasticsearch-2.3.5/bin; ./elasticsearch' C-m

	sleep 10

	tmux new-window -n core -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:3 'cd additional_scripts; ./core.sh -m silent' C-m

	tmux new-window -n output -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:4 'cd additional_scripts; ./output.sh -m silent' C-m

	tmux new-window -n input -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:5 'cd additional_scripts; ./input.sh' C-m
}

debug_mode_window()
{
	tmux new-session -s ${SESSION_NAME} -n server -d
	tmux send-keys -t ${SESSION_NAME} 'cd additional_scripts; ./server.sh -m debug' C-m

	tmux new-window -n marytts -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:1 'cd required_packages/marytts-5.1.2/bin/; ./marytts-server' C-m

	tmux new-window -n elasticsearch -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:2 'cd required_packages/elasticsearch-2.3.5/bin; ./elasticsearch' C-m

	sleep 10

	tmux new-window -n core -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:3 'cd additional_scripts; ./core.sh -m debug' C-m

	tmux new-window -n output -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:4 'cd additional_scripts; ./output.sh -m debug -s '"$SIZE" C-m

	tmux new-window -n input -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:5 'cd additional_scripts; ./input.sh' C-m
}

verbose_mode_window()
{
	tmux new-session -s ${SESSION_NAME} -n server -d
	tmux send-keys -t ${SESSION_NAME} 'cd additional_scripts; ./server.sh -m verbose' C-m

	tmux new-window -n marytts -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:1 'cd required_packages/marytts-5.1.2/bin/; ./marytts-server' C-m

	tmux new-window -n elasticsearch -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:2 'cd required_packages/elasticsearch-2.3.5/bin; ./elasticsearch' C-m

	sleep 10

	tmux new-window -n core -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:3 'cd additional_scripts; ./core.sh -m verbose' C-m

	tmux new-window -n output -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:4 'cd additional_scripts; ./output.sh -m verbose -s '"$SIZE" C-m

	tmux new-window -n input -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:5 'cd additional_scripts; ./input.sh' C-m
}

silent_mode_window()
{
	tmux new-session -s ${SESSION_NAME} -n server -d
	tmux send-keys -t ${SESSION_NAME} 'cd additional_scripts; ./server.sh -m silent' C-m

	tmux new-window -n marytts -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:1 'cd required_packages/marytts-5.1.2/bin/; ./marytts-server' C-m

	tmux new-window -n elasticsearch -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:2 'cd required_packages/elasticsearch-2.3.5/bin; ./elasticsearch' C-m

	sleep 10

	tmux new-window -n core -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:3 'cd additional_scripts; ./core.sh -m silent' C-m

	tmux new-window -n output -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:4 'cd additional_scripts; ./output.sh -m silent -s '"$SIZE" C-m

	tmux new-window -n input -t ${SESSION_NAME}
	tmux send-keys -t ${SESSION_NAME}:5 'cd additional_scripts; ./input.sh' C-m
}


MODE=
SIZE=
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
elif [ -z "$SIZE" ];
then
		if [ "$MODE" = "debug" ];
			then
				debug_mode
		
		elif [ "$MODE" = "verbose" ];
			then
				verbose_mode
		elif [ "$MODE" = "silent" ];
			then
				silent_mode
			fi
else
	if [ "$MODE" = "debug" ];
			then
				debug_mode_window
	elif [ "$MODE" = "verbose" ];
			then
				verbose_mode_window
	elif [ "$MODE" = "silent" ];
		then
			silent_mode_window
		fi
fi

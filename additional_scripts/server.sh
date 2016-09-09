#!/bin/bash
usage()
{
cat << EOF
usage: $0 options

This script run the server in debug/verbose/silent mode

OPTIONS:
   -h      Show this message
   -m      mode type, can be 'debug', 'verbose' or 'silent'
EOF
}

debug_server()
{	
	cd ../server
	../env/bin/python server.py  --debug
}

verbose_server()
{	
	cd ../server
	../env/bin/python server.py  --verbose
}

silent_server()
{
	cd ../server
	../env/bin/python server.py 
}

MODE=
while getopts “hm:” OPTION
do
     case $OPTION in
         h)
             usage
             exit 1
             ;;
         m)
             MODE=$OPTARG
             ;;
         ?)
             usage
             exit
             ;;
     esac
done

if [ -z $MODE ];
then
     usage
     exit 1
else
	if [ "$MODE" = "debug" ];
	then
		debug_server
	elif [ "$MODE" = "verbose" ];
	then
		verbose_server
	elif [ "$MODE" = "silent" ];
	then
		silent_server
	fi
fi



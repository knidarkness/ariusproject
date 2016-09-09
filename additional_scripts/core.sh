#!/bin/bash
usage()
{
cat << EOF
usage: $0 options

This script run the core in debug/verbose/silent mode

OPTIONS:
   -h      Show this message
   -m      mode type, can be 'debug', 'verbose' or 'silent'
EOF
}

debug_core()
{	
	cd ../core_module
	../env/bin/python core.py --debug
}

verbose_core()
{	
	cd ../core_module
	../env/bin/python core.py --verbose
}

silent_core()
{
	cd ../core_module
	../env/bin/python core.py
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
		debug_core
	elif [ "$MODE" = "verbose" ];
	then
		verbose_core
	elif [ "$MODE" = "silent" ];
	then
		silent_core
	fi
fi

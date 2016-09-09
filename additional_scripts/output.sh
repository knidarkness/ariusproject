#!/bin/bash
usage()
{
cat << EOF
usage: $0 options

This script run the output in debug/verbose/silent mode

OPTIONS:
   -h      Show this message
   -m      mode type, can be 'debug', 'verbose' or 'silent'
   -s      Size of the window
EOF
}

debug_output()
{	
	cd ../output_module
	../env/bin/python output_main.py  --debug
}

verbose_output()
{	
	cd ../output_module
	../env/bin/python output_main.py  --verbose
}

silent_output()
{
	cd ../output_module
	../env/bin/python output_main.py 
}

debug_output_window()
{	
	cd ../output_module
	../env/bin/python output_main.py  --debug -s "$SIZE"
}

verbose_output_window()
{	
	cd ../output_module
	../env/bin/python output_main.py  --verbose -s "$SIZE"
}

silent_output_window()
{
	cd ../output_module
	../env/bin/python output_main.py -s "$SIZE"
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
				debug_output
		
		elif [ "$MODE" = "verbose" ];
			then
				verbose_output
		elif [ "$MODE" = "silent" ];
			then
				silent_output
			fi
else
	if [ "$MODE" = "debug" ];
			then
				debug_output_window
	elif [ "$MODE" = "verbose" ];
			then
				verbose_output_window
	elif [ "$MODE" = "silent" ];
		then
			silent_output_window
		fi
fi




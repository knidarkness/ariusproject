for file in *.mp4; do ffmpeg -i "$file" -strict -2 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis "$file"."webm"; done

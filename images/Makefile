all: compile

compile:
	./tile_generator.py > cathedral-color.svg

watch:
	while inotifywait -e close_write .; do python tile_generator.py > cathedral-color.svg; done

all: compile

compile:
	python tile_generator.py

watch:
	while inotifywait -e close_write .; do python tile_generator.py; done

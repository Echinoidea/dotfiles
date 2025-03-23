#!/bin/sh

nitrogen --set-scaled ~/Pictures/wallpapers/blue-sky.jpg
wal -i ~/Pictures/wallpapers/blue-sky.jpg

qtile cmd-obj -o cmd -f reload_config

#!/bin/sh

wal -f ~/.config/wal/colorschemes/dark/lantern.json
feh --bg-fill ~/Pictures/wallpapers/a_city_skyline_with_a_sunset_in_the_background.png

qtile cmd-obj -o cmd -f reload_config

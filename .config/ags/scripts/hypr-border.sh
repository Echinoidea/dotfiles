#!/bin/bash

config_file="$HOME/.config/river/init"
wal_color_file="$HOME/.cache/wal/colors"

new_color=$(sed -n '11p' "$wal_color_file" | cut -c 2-)aa

sed -i "s/\(riverctl border-color-focused 0x\)[0-9a-fA-F]\{8\}/\1${new_color}/" "$config_file"

~/.config/river/init

#!/bin/bash

# Ensure a theme argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <theme_name>"
    exit 1
fi

# Argument and file path
new_theme="$1"
chadrc_file="$HOME/.config/nvim/lua/chadrc.lua"

# Replace the theme line
sed -i "s/\(theme = \)\"[^\"]*\"/\1\"${new_theme}\"/" "$chadrc_file"

echo "Updated theme to '${new_theme}' in ${chadrc_file}."


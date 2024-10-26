#!/bin/bash
killall dunst
# Path to the pywal generated color file
PYWAL_COLORS_FILE="$HOME/.cache/wal/colors"
# Path to the dunst configuration file
CONFIG_FILE="$HOME/.config/dunst/dunstrc"

OPACITY="CC"

# Read colors from pywal file into an array
mapfile -t colors < "$PYWAL_COLORS_FILE"

# Define color replacement patterns for dunst and corresponding colors from pywal
declare -A color_patterns=(
    ["background"]="${colors[0]}$OPACITY"
    ["foreground"]="${colors[15]}$OPACITY"
    ["highlight"]="${colors[4]}$OPACITY"
    ["frame_color"]="${colors[7]}$OPACITY"
)

# Backup the original config file
cp "$CONFIG_FILE" "${CONFIG_FILE}.bak"

# Replace main color patterns (background, foreground, highlight, frame_color) in the dunst config file
for pattern in "${!color_patterns[@]}"; do
    # Use a capture group to match the existing quote and reuse it in the replacement
    sed -i "s/${pattern} = \([\"']\)#[^\"']*\1/${pattern} = \1${color_patterns[$pattern]}\1/g" "$CONFIG_FILE"
done

# Replace <span foreground='color'> with new foreground color, preserving original quote type
sed -i "s/\(<span foreground=\)\([\']\)#[^\']*\2/\1\2${color_patterns[foreground]}\2/g" "$CONFIG_FILE"

dunst &

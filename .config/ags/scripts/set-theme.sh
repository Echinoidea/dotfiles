#!/bin/bash

# Wallpaper image and saturation level
IMAGE=$1
SATURATE=$2

# Check if an image file is provided and exists
if [[ -z "$IMAGE" ]]; then
  echo "Usage: $0 <path-to-image> [saturation-level]"
  exit 1
elif [[ ! -f "$IMAGE" ]]; then
  echo "Image file '$IMAGE' not found!"
  exit 1
fi

# Set wallpaper with swww img
swww img "$IMAGE" --transition-type left --transition-fps 30 --transition-step 2 --transition-duration 1

# Apply the colorscheme with wal
wal -i "$IMAGE" --saturate "$SATURATE"

exit

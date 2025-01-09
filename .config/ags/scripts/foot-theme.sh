#!/bin/bash

# Paths
WAL_COLORS="$HOME/.cache/wal/colors"
FOOT_CONFIG="$HOME/.config/foot/foot.ini"

# Ensure the colors file exists
if [[ ! -f "$WAL_COLORS" ]]; then
    echo "Error: Colors file $WAL_COLORS not found."
    exit 1
fi

# Read the colors from the wal file
mapfile -t COLORS < "$WAL_COLORS"

# Ensure we have exactly 16 colors
if [[ ${#COLORS[@]} -ne 16 ]]; then
    echo "Error: Colors file does not contain exactly 16 colors."
    exit 1
fi

# Strip the '#' from the colors
for i in "${!COLORS[@]}"; do
    COLORS[$i]="${COLORS[$i]#\#}"
done

# Backup the original foot.ini
cp "$FOOT_CONFIG" "${FOOT_CONFIG}.bak"

# Write the new configuration
cat > "$FOOT_CONFIG" <<EOF

[main]
font=DepartureMono Nerd Font:size=7
font-size-adjustment=1px
dpi-aware=yes

[colors]
foreground=${COLORS[7]}
background=${COLORS[0]}

regular0=${COLORS[0]}
regular1=${COLORS[1]}
regular2=${COLORS[2]}
regular3=${COLORS[3]}
regular4=${COLORS[4]}
regular5=${COLORS[5]}
regular6=${COLORS[6]}
regular7=${COLORS[7]}

bright0=${COLORS[8]}
bright1=${COLORS[9]}
bright2=${COLORS[10]}
bright3=${COLORS[11]}
bright4=${COLORS[12]}
bright5=${COLORS[13]}
bright6=${COLORS[14]}
bright7=${COLORS[15]}
EOF

echo "Updated foot.ini with colors from $WAL_COLORS."


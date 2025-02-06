#!/usr/bin/env bash

# Color files
PFILE="$HOME/.config/polybar/colors.ini"
WFILE="$HOME/.cache/wal/colors.sh"

# Function to apply Pywal with different modes
pywal_get() {
    case "$1" in
        -i) wal -i "$2" ;;        # Set colors from an image
        -f) wal -f "$2" ;;        # Set colors from a colorscheme file
        --theme) wal --theme "$2" ;;  # Set colors from a predefined theme
        *) 
            echo "Usage: $0 {-i image | -f colorscheme | --theme theme}"
            exit 1
        ;;
    esac
}

# Function to extract colors manually (to avoid sourcing issues)
extract_colors() {
    if [[ ! -f "$WFILE" ]]; then
        echo "Error: $WFILE not found. Pywal may not have run successfully."
        exit 1
    fi

    # Debugging: Check if colors.sh has the expected variables
    echo "Checking $WFILE content..."
    grep -E 'background=|foreground=' "$WFILE"

    # Extract colors manually to avoid issues with `source`
    BG=$(grep "background=" "$WFILE" | cut -d "'" -f2)
    FG=$(grep "foreground=" "$WFILE" | cut -d "'" -f2)
    
    # If variables are empty, fallback to default colors
    [[ -z "$BG" ]] && BG="#000000"
    [[ -z "$FG" ]] && FG="#FFFFFF"

    FGA=$(grep "color7=" "$WFILE" | cut -d "'" -f2)
    SH1=$(grep "color1=" "$WFILE" | cut -d "'" -f2)
    SH2=$(grep "color2=" "$WFILE" | cut -d "'" -f2)
    SH3=$(grep "color3=" "$WFILE" | cut -d "'" -f2)
    SH4=$(grep "color4=" "$WFILE" | cut -d "'" -f2)
    SH5=$(grep "color5=" "$WFILE" | cut -d "'" -f2)
    SH6=$(grep "color6=" "$WFILE" | cut -d "'" -f2)
    SH7=$(grep "color7=" "$WFILE" | cut -d "'" -f2)
    SH8=$(grep "color8=" "$WFILE" | cut -d "'" -f2)

    # Debug output
    echo "Extracted colors:"
    echo "Background: $BG"
    echo "Foreground: $FG"
}

# Function to update Polybar colors
change_color() {
    extract_colors

    # Apply colors to the Polybar config
    sed -i -e "s/background = .*/background = $BG/g" $PFILE
    sed -i -e "s/foreground = .*/foreground = $FG/g" $PFILE
    sed -i -e "s/foreground-alt = .*/foreground-alt = $FGA/g" $PFILE
    sed -i -e "s/shade1 = .*/shade1 = $SH1/g" $PFILE
    sed -i -e "s/shade2 = .*/shade2 = $SH2/g" $PFILE
    sed -i -e "s/shade3 = .*/shade3 = $SH3/g" $PFILE
    sed -i -e "s/shade4 = .*/shade4 = $SH4/g" $PFILE
    sed -i -e "s/shade5 = .*/shade5 = $SH5/g" $PFILE
    sed -i -e "s/shade6 = .*/shade6 = $SH6/g" $PFILE
    sed -i -e "s/shade7 = .*/shade7 = $SH7/g" $PFILE
    sed -i -e "s/shade8 = .*/shade8 = $SH8/g" $PFILE


}

# Check if Pywal is installed
if ! command -v wal &>/dev/null; then
    echo "[!] 'pywal' is not installed."
    exit 1
fi

# Check for user input and run Pywal
if [[ -n "$1" && -n "$2" ]]; then
    pywal_get "$1" "$2"
    change_color
else
    echo "Usage: $0 {-i image | -f colorscheme | --theme theme}"
    exit 1
fi

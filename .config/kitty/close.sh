#!/bin/bash
current_process=$(ps -p $PPID -o comm=)

if [[ "$current_process" == "fish" || "$current_process" == "bash" ]]; then
    # Automatically close for fish or bash
    kitty @ close-window --self
else
    # Keep confirmation for other processes
    kitty @ confirm-close
fi


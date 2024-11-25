if status is-interactive
  cat ~/.cache/wal/sequences 
  #fastfetch
end

function ez
    eza -G --color=always --icons=always 
end

set -gx EDITOR nvim 

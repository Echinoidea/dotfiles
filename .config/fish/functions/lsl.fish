function l
ls -lh | awk '{print $5, $6, $7, $9}' | column -t
end

from qtile_pywal import *

bar_main = bar.Bar(
    [
        widget.GroupBox(
            # font="ZedMono Nerd Font",
                    fontsize=18,
                    borderwidth=1,
                    padding_x=2,
                    padding_y=10,
                    highlight_method='line',
                    active=color_fg,
                    block_highlight_text_color=color_red,
                    highlight_color=adjust_lightness(color_bg, 0.3),
                    inactive=color_black,
                    foreground=color_fg,
                    background=adjust_lightness(color_bg, 0.25),
                    this_current_screen_border=color_white,
                    this_screen_border=color_cursor,
                    other_current_screen_border=color_yellow,
                    other_screen_border=color_yellow,
                    urgent_border=color_red,
                    rounded=False,
                    disable_drag=True,
        ),
        widget.CurrentLayout(
            background = adjust_lightness(color_bg, 0.2)
        ),
        widget.Chord(
        ),
        widget.Prompt(
            background = adjust_lightness(color_bg, 0.1),
            cursor_color = color_white
        ),
        widget.Spacer(),
        widget.Volume(
            background = adjust_lightness(color_bg, 0.1),
            emoji = False,
            emoji_list = [ '', '', '', '' ],
            unmute_format=" {volume}%",
        ),
        widget.Battery(
            background = adjust_lightness(color_bg, 0.1),
            charge_char = "",
            discharge_char = "",
            format = "{char} {percent:2.0%} "
        ),
        widget.CPU(
            format = " {load_percent}%",
            background=adjust_lightness(color_bg, 0.2)
        ),
        widget.Memory(
            format = " {MemPercent}% ",
            measure_mem="G",
            background=adjust_lightness(color_bg, 0.2),
        ),
        widget.Clock(
            background=adjust_lightness(color_bg, 0.3),
            format="%y-%m-%d %a %I:%M %p "
        ),
        # widget.QuickExit(),
            ],
    24,
    border_color = "#282738",
    margin=[0, 0, 0, 0],
    #border_width=[0, 0, 0, 0],  # Draw top and bottom borders
    # border_color=["ff00ff", "000000", "ff00ff", "000000"]  # Borders are magenta
    )

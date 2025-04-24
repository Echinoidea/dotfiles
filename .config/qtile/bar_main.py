from libqtile import bar, layout, qtile, hook, widget
from libqtile.config import Click, Drag, Group, Key, KeyChord, Match, Screen

from qtile_extras import widget
from qtile_extras.widget.decorations import PowerLineDecoration
from qtile_pywal import *

widget_defaults = dict(
    font="GoMono Nerd Font",
    # font="Kirsch Nerd Font Mono"
    fontsize=12,
    padding=3,
    background = color_bg,
    foreground = color_fg
)

powerline_right = {
    "decorations": [
        PowerLineDecoration(path = "forward_slash")
    ]
}

powerline_left = {
    "decorations": [
        PowerLineDecoration(path = "forward_slash")
    ]
}

bar_main = bar.Bar(
    [
        widget.GroupBox(
                    fontsize=14,
                    borderwidth=1,
                    padding_x=2,
                    padding_y=10,
                    highlight_method='line',
                    active=color_fg,
                    block_highlight_text_color=color_red,
                    highlight_color=adjust_lightness(color_bg, 0.2, 0.2),
                    inactive=color_black,
                    foreground=color_fg,
                    background=adjust_lightness(color_bg, 0.15, 0.15),
                    this_current_screen_border=color_white,
                    this_screen_border=color_cursor,
                    other_current_screen_border=color_yellow,
                    other_screen_border=color_yellow,
                    urgent_border=color_red,
                    rounded=False,
                    disable_drag=True,
                    **powerline_left
        ),
        widget.CurrentLayout(
            background = adjust_lightness(color_bg, 0.07, 0.07),
            **powerline_left
        ),
        widget.Chord(
            max_chars=100,
            markup=False
        ),
        widget.Prompt(
            background = adjust_lightness(color_bg, 0.04, 0.04),
            cursor_color = color_white,
            **powerline_left
        ),
        widget.Spacer(
            **powerline_right
        ),
        widget.Volume(
            background = adjust_lightness(color_bg, 0.04, 0.04),
            emoji = False,
            emoji_list = [ '', '', '', '' ],
            unmute_format=" {volume}%",
            **powerline_right
        ),
        widget.Battery(
            background = adjust_lightness(color_bg, 0.04, 0.04),
            charge_char = "",
            discharge_char = "",
            format = "{char} {percent:2.0%} ",
            **powerline_right
        ),
        widget.ThermalSensor(
            threshold=80.0,
            background = adjust_lightness(color_bg, 0.07, 0.07),
            format="{temp:.0f}C",
            padding=-1,
            **powerline_right
        ),
        widget.CPU(
            format = " {load_percent}% ",
            padding=-1,
            background=adjust_lightness(color_bg, 0.07, 0.07),
        ),
        widget.Memory(
            format = " {MemPercent}%",
            measure_mem="G",
            background=adjust_lightness(color_bg, 0.07, 0.07),
            **powerline_right
        ),
        widget.Clock(
            background=adjust_lightness(color_bg, 0.15, 0.15),
            format="%y-%m-%d %a %I:%M %p ",
            # **powerline_right
        ),
    ],
    24,
    border_color = "#282738",
    margin=[0, 0, 0, 0],
)

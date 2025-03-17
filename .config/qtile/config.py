from libqtile import bar, layout, qtile, hook, widget
from libqtile.config import Click, Drag, Group, Key, KeyChord, Match, Screen
from libqtile.lazy import lazy
from libqtile.utils import guess_terminal

from qtile_extras import widget
from qtile_extras.widget.decorations import PowerLineDecoration

import os
import subprocess
import json

from qtile_pywal import *

mod = "mod4"
terminal = guess_terminal()

keys = [
    Key([mod], "h", lazy.layout.left(), desc="Move focus to left"),
    Key([mod], "l", lazy.layout.right(), desc="Move focus to right"),
    Key([mod], "j", lazy.layout.down(), desc="Move focus down"),
    Key([mod], "k", lazy.layout.up(), desc="Move focus up"),
    Key([mod], "space", lazy.layout.next(), desc="Move window focus to other window"),

    # Move windows between left/right columns or move up/down in current stack.
    # Moving out of range in Columns layout will create new column.
    Key([mod, "shift"], "h", lazy.layout.shuffle_left(), desc="Move window to the left"),
    Key([mod, "shift"], "l", lazy.layout.shuffle_right(), desc="Move window to the right"),
    Key([mod, "shift"], "j", lazy.layout.shuffle_down(), desc="Move window down"),
    Key([mod, "shift"], "k", lazy.layout.shuffle_up(), desc="Move window up"),

    # Grow windows. If current window is on the edge of screen and direction
    # will be to screen edge - window would shrink.
    Key([mod, "control"], "h", lazy.layout.grow_left(), desc="Grow window to the left"),
    Key([mod, "control"], "l", lazy.layout.grow_right(), desc="Grow window to the right"),
    Key([mod, "control"], "j", lazy.layout.grow_down(), desc="Grow window down"),
    Key([mod, "control"], "k", lazy.layout.grow_up(), desc="Grow window up"),

    Key([mod], "n", lazy.layout.normalize(), desc="Reset all window sizes"),

    # Toggle between split and unsplit sides of stack.
    # Split = all windows displayed
    # Unsplit = 1 window displayed, like Max layout, but still with
    # multiple stack panes
    Key([mod], "period", lazy.next_screen(), desc="Next monitor"),
    # Key([mod], "comma", lazy.prev_screen(), desc="Next monitor"),

    Key(
        [mod, "shift"],
        "Return",
        lazy.layout.toggle_split(),
        desc="Toggle between split and unsplit sides of stack",
    ),

    Key([mod], "Return", lazy.spawn(terminal), desc="Launch terminal"),

    # Toggle between different layouts as defined below
    Key([mod], "Tab", lazy.next_layout(), desc="Toggle between layouts"),
    Key([mod, "shift"], "Tab", lazy.prev_layout(), desc="Toggle between layouts"),

    Key([mod, "shift"], "q", lazy.window.kill(), desc="Kill focused window"),
    Key(
        [mod],
        "f",
        lazy.window.toggle_fullscreen(),
        desc="Toggle fullscreen on the focused window",
    ),
    Key([mod], "t", lazy.window.toggle_floating(), desc="Toggle floating on the focused window"),
    Key([mod, "control"], "r", lazy.reload_config(), desc="Reload the config"),
    Key([mod, "control"], "q", lazy.shutdown(), desc="Shutdown Qtile"),
    Key([mod], "r", lazy.spawncmd(), desc="Spawn a command using a prompt widget"),

    KeyChord([mod], "e", [
        Key([], "l", lazy.spawn("emacs"))
    ])
]

# Add key bindings to switch VTs in Wayland.
# We can't check qtile.core.name in default config as it is loaded before qtile is started
# We therefore defer the check until the key binding is run by using .when(func=...)
for vt in range(1, 8):
    keys.append(
        Key(
            ["control", "mod1"],
            f"f{vt}",
            lazy.core.change_vt(vt).when(func=lambda: qtile.core.name == "wayland"),
            desc=f"Switch to VT{vt}",
        )
    )


groups = [Group(i) for i in "123456789"]

for i in groups:
    keys.extend(
        [
            # mod + group number = switch to group
            Key(
                [mod],
                i.name,
                lazy.group[i.name].toscreen(),
                desc=f"Switch to group {i.name}",
            ),
            # mod + shift + group number = switch to & move focused window to group
            Key(
                [mod, "shift"],
                i.name,
                lazy.window.togroup(i.name, switch_group=True),
                desc=f"Switch to & move focused window to group {i.name}",
            ),
            # Or, use below if you prefer not to switch to that group.
            # # mod + shift + group number = move focused window to group
            # Key([mod, "shift"], i.name, lazy.window.togroup(i.name),
            #     desc="move focused window to group {}".format(i.name)),
        ]
    )

layouts = [
    # layout.Columns(border_focus_stack=["#d75f5f", "#8f3d3d"], border_width=1),
    # layout.Max(),
    # Try more layouts by unleashing below layouts.
    # layout.Stack(num_stacks=2),
    # layout.Matrix(margin = 8),
    layout.MonadTall(
        border_focus = color_green,
        border_normal = color_bg,
        margin = 4,
        border_width = 1),

    layout.Bsp(margin = 2,
               border_width = 1,
               border_focus = color_green,
               border_normal = color_bg),
    # layout.MonadWide(margin = 8),
    # layout.RatioTile(margin = 8, fancy = True, border_focus = color_green, bg_normal = color_bg, ratio = 1.3),
    # layout.Tile(margin = 8),
    # layout.TreeTab(margin = 8),
    # layout.VerticalTile(margin = 8),
    layout.Zoomy(),
]

widget_defaults = dict(
    font="Terminess Nerd Font",
    fontsize=14,
    padding=3,
    background = color_bg,
    foreground = color_fg
)

powerline_right = {
    "decorations": [
        PowerLineDecoration(path = "rounded_right")
    ]
}

powerline_left = {
    "decorations": [
        PowerLineDecoration(path = "rounded_left")
    ]
}

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
                    **powerline_left
        ),
        widget.CurrentLayout(
            background = adjust_lightness(color_bg, 0.2),
                    **powerline_left
        ),
        widget.Chord(
        ),
        widget.Prompt(
            background = adjust_lightness(color_bg, 0.1),
            cursor_color = color_white,
            **powerline_left
        ),
        widget.Spacer(
            **powerline_right),
        widget.Volume(
            background = adjust_lightness(color_bg, 0.1),
            emoji = False,
            emoji_list = [ '', '', '', '' ],
            unmute_format=" {volume}%",
            **powerline_right
        ),
        widget.Battery(
            background = adjust_lightness(color_bg, 0.1),
            charge_char = "",
            discharge_char = "",
            format = "{char} {percent:2.0%} ",
            **powerline_right
        ),
        widget.CPU(
            format = " {load_percent}%",
            background=adjust_lightness(color_bg, 0.2),
            **powerline_right
        ),
        widget.Memory(
            format = " {MemPercent}% ",
            measure_mem="G",
            background=adjust_lightness(color_bg, 0.2),
            **powerline_right
        ),
        widget.Clock(
            background=adjust_lightness(color_bg, 0.3),
            format="%y-%m-%d %a %I:%M %p ",
            # **powerline_right
        ),
        # widget.QuickExit(),
        ],
    24,
    border_color = "#282738",
    margin=[0, 0, 0, 0],
    #border_width=[0, 0, 0, 0],  # Draw top and bottom borders
    # border_color=["ff00ff", "000000", "ff00ff", "000000"]  # Borders are magenta
    )

bar_second = bar.Bar(
    [
        widget.GroupBox(
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
                    **powerline_left
        ),
        widget.CurrentLayout(
            background = adjust_lightness(color_bg, 0.2),
                    **powerline_left
        ),
        widget.Chord(
        ),
        widget.Prompt(
            background = adjust_lightness(color_bg, 0.1),
            cursor_color = color_white,
            **powerline_left
        ),
        widget.Spacer(
            **powerline_right),
        widget.Volume(
            background = adjust_lightness(color_bg, 0.1),
            emoji = False,
            emoji_list = [ '', '', '', '' ],
            unmute_format=" {volume}%",
            **powerline_right
        ),
        widget.Battery(
            background = adjust_lightness(color_bg, 0.1),
            charge_char = "",
            discharge_char = "",
            format = "{char} {percent:2.0%} ",
            **powerline_right
        ),
        widget.CPU(
            format = " {load_percent}%",
            background=adjust_lightness(color_bg, 0.2),
            **powerline_right
        ),
        widget.Memory(
            format = " {MemPercent}% ",
            measure_mem="G",
            background=adjust_lightness(color_bg, 0.2),
            **powerline_right
        ),
        widget.Clock(
            background=adjust_lightness(color_bg, 0.3),
            format="%y-%m-%d %a %I:%M %p ",
            # **powerline_right
        ),
        # widget.QuickExit(),
        ],
    24,
    border_color = "#282738",
    margin=[0, 0, 0, 0],
    #border_width=[0, 0, 0, 0],  # Draw top and bottom borders
    # border_color=["ff00ff", "000000", "ff00ff", "000000"]  # Borders are magenta
    )

screens = [
    Screen(
        top=bar_main
    ),
    Screen(
        top=bar_second
    ),
]

# Drag floating layouts.
mouse = [
    Drag([mod], "Button1", lazy.window.set_position_floating(), start=lazy.window.get_position()),
    Drag([mod], "Button3", lazy.window.set_size_floating(), start=lazy.window.get_size()),
    Click([mod], "Button2", lazy.window.bring_to_front()),
]

dgroups_key_binder = None
dgroups_app_rules = []  # type: list
follow_mouse_focus = True
bring_front_click = False
floats_kept_above = True
cursor_warp = False
floating_layout = layout.Floating(
    border_focus = color_fg,
    border_normal = color_bg,
    float_rules=[
        # Run the utility of `xprop` to see the wm class and name of an X client.
        *layout.Floating.default_float_rules,
        Match(wm_class="confirmreset"),  # gitk
        Match(wm_class="makebranch"),  # gitk
        Match(wm_class="maketag"),  # gitk
        Match(wm_class="ssh-askpass"),  # ssh-askpass
        Match(title="branchdialog"),  # gitk
        Match(title="pinentry"),  # GPG key password entry
    ]
)
auto_fullscreen = True
focus_on_window_activation = "smart"
reconfigure_screens = True

# If things like steam games want to auto-minimize themselves when losing
# focus, should we respect this or not?
auto_minimize = True

# When using the Wayland backend, this can be used to configure input devices.
wl_input_rules = None

# xcursor theme (string or None) and size (integer) for Wayland backend
wl_xcursor_theme = None
wl_xcursor_size = 24

# XXX: Gasp! We're lying here. In fact, nobody really uses or cares about this
# string besides java UI toolkits; you can see several discussions on the
# mailing lists, GitHub issues, and other WM documentation that suggest setting
# this string if your java app doesn't work correctly. We may as well just lie
# and say that we're a working one by default.
#
# We choose LG3D to maximize irony: it is a 3D non-reparenting WM written in
# java that happens to be on java's whitelist.
# wmname = "LG3D"
wmname = "Qtile"

@hook.subscribe.startup_once
def autostart():
    home = os.path.expanduser('~/.config/qtile/autostart.sh')
    subprocess.call(home)


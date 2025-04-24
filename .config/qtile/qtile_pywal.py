import json
import colorsys

def load_colors(file_path='/home/gabriel/.cache/wal/colors.json'):
    with open(file_path, 'r') as f:
        return json.load(f)

def hex_to_rgb(hex_color):
    """Convert a hex string to an RGB tuple."""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb_color):
    """Convert an RGB tuple to a hex string."""
    return '#{:02x}{:02x}{:02x}'.format(*rgb_color)

# def adjust_lightness(hex_color, delta):
#     """Adjust the lightness of a color by a given delta (-1.0 to +1.0)."""
#     rgb_color = hex_to_rgb(hex_color)
#     h, l, s = colorsys.rgb_to_hls(*[x / 255.0 for x in rgb_color])
#     l = max(0, min(1, l + delta))  # Ensure l stays within [0,1]
#     r, g, b = colorsys.hls_to_rgb(h, l, s)
#     return rgb_to_hex((int(r * 255), int(g * 255), int(b * 255)))

def is_light_color(hex_color):
    """Determine if a color is light based on its luminance."""
    rgb_color = hex_to_rgb(hex_color)
    # Calculate the luminance using the formula (0.299*R + 0.587*G + 0.114*B)
    luminance = (0.299 * rgb_color[0] + 0.587 * rgb_color[1] + 0.114 * rgb_color[2]) / 255
    return luminance > 0.5

def adjust_lightness(hex_color, delta_light, delta_dark):
    """Adjust the lightness of a color. Light colors become darker and vice-versa."""
    if is_light_color(hex_color):
        delta = -delta_light
    else:
        delta = delta_dark

    rgb_color = hex_to_rgb(hex_color)
    h, l, s = colorsys.rgb_to_hls(*[x / 255.0 for x in rgb_color])
    l = max(0, min(1, l + delta))  # Ensure l stays within [0,1]
    r, g, b = colorsys.hls_to_rgb(h, l, s)
    return rgb_to_hex((int(r * 255), int(g * 255), int(b * 255)))

colors = load_colors()

color_bg = colors["special"]["background"]
color_fg = colors["special"]["foreground"]
color_cursor = colors["special"]["cursor"]
color_black = colors["colors"]["color0"]
color_red = colors["colors"]["color1"]
color_green = colors["colors"]["color2"]
color_yellow = colors["colors"]["color3"]
color_blue = colors["colors"]["color4"]
color_pink = colors["colors"]["color5"]
color_purple = colors["colors"]["color6"]
color_white = colors["colors"]["color7"]
print(color_black)
# colors = load_colors()

# color_bg = colors["special"]["background"]


# color_bg_light1 = adjust_lightness(color_bg, 0.1)

# print(color_bg)
# print(color_bg_light1)

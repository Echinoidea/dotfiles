---@type Base46Table
local M = {}

-- UI
M.base_30 = {
  white = "#b5b5b5",
  black = "#60513e", -- usually your theme bg
  darker_black = "#4f4334", -- slightly darker than black
  black2 = "#4f3f2d", -- alternate black
  one_bg = "#4c4840", -- slightly lighter than black
  one_bg2 = "#909090", -- lighter shade of one_bg
  one_bg3 = "#a89984", -- lighter shade of one_bg2
  grey = "#89785e",
  grey_fg = "#bca684", -- slightly lighter than grey
  grey_fg2 = "#ceb590", -- lighter than grey_fg
  light_grey = "#d8bc84",
  red = "#A06469",
  baby_pink = "#ff9da4",
  pink = "#c29ad3",
  line = "#60513e", -- matches one_bg
  green = "#a1ba82",
  vibrant_green = "#d1f1a9",
  nord_blue = "#8fa6c1",
  blue = "#bbdaff",
  seablue = "#9ec1d3",
  yellow = "#d8bc84",
  sun = "#ffeb99",
  purple = "#c29ad3",
  dark_purple = "#ebbbff",
  teal = "#9ec1d3",
  orange = "#b57277",
  cyan = "#c0e9ff",
  statusline_bg = "#4f3f2d",
  lightbg = "#544636",
  pmenu_bg = "#a1ba82",
  folder_bg = "#8fa6c1",
}

-- Base16
M.base_16 = {
  base00 = "#544636", -- background
  base01 = "#4c4840",
  base02 = "#4c4840",
  base03 = "#909090",
  base04 = "#a89984",
  base05 = "#b5b5b5", -- foreground
  base06 = "#d8bc84",
  base07 = "#f5f5f5", -- white
  base08 = "#A06469", -- red
  base09 = "#b57277", -- orange
  base0A = "#d8bc84", -- yellow
  base0B = "#a1ba82", -- green
  base0C = "#c0e9ff", -- cyan
  base0D = "#8fa6c1", -- blue
  base0E = "#c29ad3", -- purple
  base0F = "#ebbbff", -- pink
}

-- OPTIONAL
M.polish_hl = {
  Comment = {
    fg = M.base_30.grey_fg,
    italic = true,
  },
  ["@variable.parameter"] = { fg = M.base_30.orange },
  ["@keyword"] = { fg = M.base_30.pink, italic = true },
}

-- Theme type
M.type = "dark"

-- Allow user overrides
M = require("base46").override_theme(M, "custom_theme")

return M

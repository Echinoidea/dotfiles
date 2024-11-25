---@type Base46Table
local M = {}

-- UI
M.base_30 = {
  white = "#f4e3d7",
  black = "#2b202e", -- usually your theme bg
  darker_black = "#21181f", -- 6% darker than black
  black2 = "#332731", -- 6% lighter than black
  one_bg = "#392d36", -- 10% lighter than black
  one_bg2 = "#443845", -- 6% lighter than one_bg
  one_bg3 = "#4f424f", -- 6% lighter than one_bg2
  grey = "#5a4d5a", -- 40% lighter than black
  grey_fg = "#635563", -- 10% lighter than grey
  grey_fg2 = "#6e5f6e", -- 5% lighter than grey_fg
  light_grey = "#786978",
  red = "#f06969",
  baby_pink = "#f69a8d",
  pink = "#e89cac",
  line = "#332731", -- 15% lighter than black
  green = "#a8c66c",
  vibrant_green = "#b3d97d",
  nord_blue = "#8fb3cd",
  blue = "#87a8da",
  seablue = "#80d1c1",
  yellow = "#f3d780", -- 8% lighter than yellow
  sun = "#f6e49c",
  purple = "#dba4c2",
  dark_purple = "#c894ae",
  teal = "#92e3d1",
  orange = "#f58673",
  cyan = "#22ecdb",
  statusline_bg = "#332731",
  lightbg = "#443845",
  pmenu_bg = "#a8c66c",
  folder_bg = "#87a8da",
}

-- Base16
M.base_16 = {
  base00 = "#2b202e",
  base01 = "#332731",
  base02 = "#392d36",
  base03 = "#5a4d5a",
  base04 = "#e4d5cc",
  base05 = "#f4e3d7",
  base06 = "#fceae1",
  base07 = "#ffffff",
  base08 = "#f06969",
  base09 = "#f58673",
  base0A = "#f3d780",
  base0B = "#a8c66c",
  base0C = "#80d1c1",
  base0D = "#87a8da",
  base0E = "#dba4c2",
  base0F = "#e4d5cc",
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
M = require("base46").override_theme(M, "summer_evening")

return M

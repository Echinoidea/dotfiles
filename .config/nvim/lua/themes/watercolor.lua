-- Watercolor

---@type Base46Table
local M = {}

-- UI
M.base_30 = {
  white = "#757067",
  black = "#e2dcc3", -- bg
  darker_black = "#d8cfab", -- File tree bg
  black2 = "#bab4a0", -- Line
  one_bg = "#ece9e1",
  one_bg2 = "#f3f0e8",
  one_bg3 = "#faf7ef",
  grey = "#7ba0b2", -- Row numbers
  grey_fg = "#939e98", -- Comments
  grey_fg2 = "#e1dcd2",
  light_grey = "#eae5db",
  red = "#b67c82",
  baby_pink = "#c58a8e",
  pink = "#b88990",
  line = "#c58a8e",
  green = "#7a9187",
  vibrant_green = "#89a094",
  nord_blue = "#6d8f9f",
  blue = "#7ba0b2",
  seablue = "#679492",
  yellow = "#9c8b6e",
  sun = "#ab997a",
  purple = "#8c7c94",
  dark_purple = "#9a89a3",
  teal = "#74a3a1",
  orange = "#c58a8e",
  cyan = "#679492",
  statusline_bg = "#e1dcd2",
  lightbg = "#e1dcd2",
  pmenu_bg = "#7a9187",
  folder_bg = "#6d8f9f",
}

-- Base16
M.base_16 = {
  base00 = "#f5f2ea",
  base01 = "#ece9e1",
  base02 = "#eae7df",
  base03 = "#cec9bf",
  base04 = "#4d4a41",
  base05 = "#3d3a33",
  base06 = "#2d2a25",
  base07 = "#1d1a17",
  base08 = "#b67c82", -- red
  base09 = "#c58a8e", -- orange
  base0A = "#9c8b6e", -- yellow
  base0B = "#7a9187", -- green
  base0C = "#679492", -- cyan
  base0D = "#6d8f9f", -- blue
  base0E = "#8c7c94", -- purple
  base0F = "#757067", -- gray
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
M.type = "light"

-- Allow user overrides
M = require("base46").override_theme(M, "watercolor_sky")

return M

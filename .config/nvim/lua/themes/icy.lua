-- Icy Theme
---@type Base46Table
local M = {}

-- UI
M.base_30 = {
  white = "#80deea",
  black = "#021012", -- bg
  darker_black = "#021018", -- File tree bg
  black2 = "#052e34", -- Line
  one_bg = "#404040",
  one_bg2 = "#767C77",
  one_bg3 = "#BFBFBF",
  grey = "#404040", -- Row numbers
  grey_fg = "#767C77", -- Comments
  grey_fg2 = "#BFBFBF",
  light_grey = "#F9F9F9",
  red = "#bf616a",
  baby_pink = "#FF1A75",
  pink = "#FF1A75",
  line = "#404040",
  green = "#8fbcbb",
  vibrant_green = "#a3be8c",
  nord_blue = "#00BFFF",
  blue = "#28C9FF",
  seablue = "#00FFFF",
  yellow = "#FFD700",
  sun = "#FFFF00",
  purple = "#BFBFBF",
  dark_purple = "#BFBFBF",
  teal = "#00FFFF",
  orange = "#052e34",
  cyan = "#00FFFF",
  statusline_bg = "#052e34",
  lightbg = "#052e34",
  pmenu_bg = "#1AFFA3",
  folder_bg = "#28C9FF",
}

-- Base16
M.base_16 = {
  base00 = "#021012",
  base01 = "#16c1d9",
  base02 = "#4dd0e1",
  base03 = "#80deea",
  base04 = "#00bcd4",
  base05 = "#00acc1",
  base06 = "#26c6da",
  base07 = "#095b67",
  base08 = "#80deea",
  base09 = "#16c1d9",
  base0A = "#4dd0e1",
  base0B = "#80deea",
  base0C = "#00bcd4",
  base0D = "#00acc1",
  base0E = "#26c6da",
  base0F = "#109cb0",
}

-- OPTIONAL
M.polish_hl = {
  Comment = {
    fg = M.base_30.grey_fg,
    italic = true,
  },
  ["@variable.parameter"] = { fg = M.base_30.orange },
  ["@keyword"] = { fg = M.base_30.red, italic = true },
}

-- Theme type
M.type = "dark"

-- Allow user overrides
M = require("base46").override_theme(M, "custom_theme")

return M

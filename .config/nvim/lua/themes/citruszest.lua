-- Custom Theme

---@type Base46Table
local M = {}

-- UI
M.base_30 = {
  white = "#BFBFBF",
  black = "#121212", -- bg
  darker_black = "#232323", -- File tree bg
  black2 = "#383838", -- Line
  one_bg = "#404040",
  one_bg2 = "#767C77",
  one_bg3 = "#BFBFBF",
  grey = "#404040", -- Row numbers
  grey_fg = "#767C77", -- Comments
  grey_fg2 = "#BFBFBF",
  light_grey = "#F9F9F9",
  red = "#FF5454",
  baby_pink = "#FF1A75",
  pink = "#FF1A75",
  line = "#404040",
  green = "#00CC7A",
  vibrant_green = "#1AFFA3",
  nord_blue = "#00BFFF",
  blue = "#28C9FF",
  seablue = "#00FFFF",
  yellow = "#FFD700",
  sun = "#FFFF00",
  purple = "#BFBFBF",
  dark_purple = "#BFBFBF",
  teal = "#00FFFF",
  orange = "#FF7431",
  cyan = "#00FFFF",
  statusline_bg = "#232323",
  lightbg = "#404040",
  pmenu_bg = "#1AFFA3",
  folder_bg = "#28C9FF",
}

-- Base16
M.base_16 = {
  base00 = "#121212", -- Background
  base01 = "#232323",
  base02 = "#383838",
  base03 = "#404040",
  base04 = "#767C77",
  base05 = "#BFBFBF", -- Foreground
  base06 = "#F9F9F9",
  base07 = "#FFFFFF", -- Bright White
  base08 = "#FF5454", -- Red
  base09 = "#FF7431", -- Orange
  base0A = "#FFD700", -- Yellow
  base0B = "#00CC7A", -- Green
  base0C = "#00FFFF", -- Cyan
  base0D = "#00BFFF", -- Blue
  base0E = "#FF1A75", -- Bright Red/Pink
  base0F = "#FFAA54", -- Bright Orange
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

---@type Base46Table
local M = {}

-- UI
M.base_30 = {
  white = "#5c4e42",
  black = "#f5f1e5", -- usually your theme bg
  darker_black = "#eae5db", -- 6% darker than black
  black2 = "#f9f4e9", -- 6% lighter than black
  one_bg = "#ebe6dc", -- 10% lighter than black
  one_bg2 = "#f2ece1", -- 6% lighter than one_bg
  one_bg3 = "#f9f5e8", -- 6% lighter than one_bg2
  grey = "#cdc3b8", -- 40% lighter than black
  grey_fg = "#d6cdc2", -- 10% lighter than grey
  grey_fg2 = "#e0d6cb", -- 5% lighter than grey_fg
  light_grey = "#e9e0d5",
  red = "#d27d6f",
  baby_pink = "#e6a397",
  pink = "#dba4ae",
  line = "#f9f4e9", -- 15% lighter than black
  green = "#98c0a1",
  vibrant_green = "#a8b377",
  nord_blue = "#719a9c",
  blue = "#789b9c",
  seablue = "#80d1c1",
  yellow = "#e6b970", -- 8% lighter than yellow
  sun = "#f3dba0",
  purple = "#b99bae",
  dark_purple = "#a58c9d",
  teal = "#93c5a1",
  orange = "#e6ac85",
  cyan = "#98c0a1",
  statusline_bg = "#ebe6dc",
  lightbg = "#f2ece1",
  pmenu_bg = "#98c0a1",
  folder_bg = "#789b9c",
}

-- Base16
M.base_16 = {
  base00 = "#f5f1e5",
  base01 = "#ebe6dc",
  base02 = "#eae5db",
  base03 = "#cdc3b8",
  base04 = "#5c4e42",
  base05 = "#3a342b",
  base06 = "#2e2b26",
  base07 = "#1e1b17",
  base08 = "#d27d6f",
  base09 = "#e6ac85",
  base0A = "#e6b970",
  base0B = "#98c0a1",
  base0C = "#80d1c1",
  base0D = "#719a9c",
  base0E = "#b99bae",
  base0F = "#cdc3b8",
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
M = require("base46").override_theme(M, "home_light")

return M

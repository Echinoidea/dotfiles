---@type Base46Table
local M = {}

-- UI
M.base_30 = {
  white = "#e7d8c5",
  black = "#2e2b26", -- usually your theme bg
  darker_black = "#25231f", -- 6% darker than black
  black2 = "#38342f", -- 6% lighter than black
  one_bg = "#403c37", -- 10% lighter than black
  one_bg2 = "#4b4640", -- 6% lighter than one_bg
  one_bg3 = "#56514a", -- 6% lighter than one_bg2
  grey = "#605b53", -- 40% lighter than black
  grey_fg = "#6b655d", -- 10% lighter than grey
  grey_fg2 = "#766f66", -- 5% lighter than grey_fg
  light_grey = "#807a70",
  red = "#d27d6f",
  baby_pink = "#e6a397",
  pink = "#dba4ae",
  line = "#38342f", -- 15% lighter than black
  green = "#a8b377",
  vibrant_green = "#b3c47e",
  nord_blue = "#789b9c",
  blue = "#719a9c",
  seablue = "#98c0a1",
  yellow = "#e6b970", -- 8% lighter than yellow
  sun = "#f1c988",
  purple = "#b99bae",
  dark_purple = "#a58c9d",
  teal = "#93c5a1",
  orange = "#e6ac85",
  cyan = "#80d1c1",
  statusline_bg = "#38342f",
  lightbg = "#4b4640",
  pmenu_bg = "#a8b377",
  folder_bg = "#719a9c",
}

-- Base16
M.base_16 = {
  base00 = "#2e2b26",
  base01 = "#38342f",
  base02 = "#403c37",
  base03 = "#605b53",
  base04 = "#c4b6a8",
  base05 = "#e7d8c5",
  base06 = "#f1e9dc",
  base07 = "#faf1e5",
  base08 = "#d27d6f",
  base09 = "#e6ac85",
  base0A = "#e6b970",
  base0B = "#a8b377",
  base0C = "#98c0a1",
  base0D = "#719a9c",
  base0E = "#b99bae",
  base0F = "#c4b6a8",
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
M = require("base46").override_theme(M, "home_dark")

return M

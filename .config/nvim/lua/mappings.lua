require "nvchad.mappings"

-- add yours here

local map = vim.keymap.set

map("n", ";", ":", { desc = "CMD enter command mode" })
map("i", "jk", "<ESC>")
map("i", "jj", "<ESC>")
-- map({ "n", "i", "v" }, "<C-s>", "<cmd> w <cr>")

-- DISABLE ARROW KEYS
map("n", "<Up>", "<Nop>")
map("n", "<Down>", "<Nop>")
map("n", "<Right>", "<Nop>")
map("n", "<Left>", "<Nop>")

map("i", "<Up>", "<Nop>")
map("i", "<Down>", "<Nop>")
map("i", "<Right>", "<Nop>")
map("i", "<Left>", "<Nop>")

map("n", "d", '"_d')
map("v", "d", '"_d')
map("v", "D", '"_D')

-- DISABLE F1
map("i", "<F1>", "<Esc>")
map("n", "<F1>", "<Esc>")
map("v", "<F1>", "<Esc>")

-- Make O o new line without entering insert mode
map("n", "o", 'o<Esc>0"_D')
map("n", "O", 'O<Esc>0"_D')

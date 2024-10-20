require("nvchad.mappings")

-- add yours here

local map = vim.keymap.set

map("n", ";", ":", { desc = "CMD enter command mode" })
map("i", "jk", "<ESC>")
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

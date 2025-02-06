return {
  {
    "stevearc/conform.nvim",
    event = "BufWritePre", -- uncomment for format on save
    opts = require "configs.conform",
  },

  -- These are some examples, uncomment them if you want to see them work!
  {
    "neovim/nvim-lspconfig",
    config = function()
      require "configs.lspconfig"
    end,
  },

  {
    "windwp/nvim-ts-autotag",
    event = "InsertEnter",
    config = function()
      require("nvim-ts-autotag").setup {
        opts = {
          -- Defaults
          enable_close = true, -- Auto close tags
          enable_rename = true, -- Auto rename pairs of tags
          enable_close_on_slash = false, -- Auto close on trailing </
        },
      }
    end,
  },

  {
    "williamboman/mason.nvim",
    opts = {
      ensure_installed = {
        "lua-language-server",
        "stylua",
        "html-lsp",
        "css-lsp",
        "prettier",
      },
    },
  },

  {
    "nvim-treesitter/nvim-treesitter",
    opts = {
      ensure_installed = {
        "vim",
        "lua",
        "vimdoc",
        "html",
        "css",
        "tsx",
      },
    },
  },

  {
    "gelguy/wilder.nvim",
    config = function()
      -- config goes here
    end,
  },

  {
    "nvim-neorg/neorg",
    lazy = false, -- Disable lazy loading as some `lazy.nvim` distributions set `lazy = true` by default
    version = "*", -- Pin Neorg to the latest stable release
    config = function()
      require("neorg").setup {
        load = {
          ["core.defaults"] = {},
          ["core.dirman"] = {
            config = {
              workspaces = {
                org = "~/org",
              },
            },
          },
          ["core.concealer"] = {
            config = { -- We added a `config` table!
              icon_preset = "varied", -- And we set our option here.
            },
          },
        },
      }
    end,
  },

  {
    "uZer/pywal16.nvim",
    -- for local dev replace with:
    -- dir = '~/your/path/pywal16.nvim',
    config = function()
      vim.cmd.colorscheme "pywal16"
    end,
  },

  -- {
  --   "kawre/leetcode.nvim",
  --   build = ":TSUpdate html", -- if you have `nvim-treesitter` installed
  --   dependencies = {
  --     "nvim-telescope/telescope.nvim",
  --     -- "ibhagwan/fzf-lua",
  --     "nvim-lua/plenary.nvim",
  --     "MunifTanjim/nui.nvim",
  --   },
  --   opts = {
  --     {
  --       ---@type string
  --       arg = "leetcode.nvim",
  --
  --       ---@type lc.lang
  --       lang = "cpp",
  --
  --       cn = { -- leetcode.cn
  --         enabled = false, ---@type boolean
  --         translator = true, ---@type boolean
  --         translate_problems = true, ---@type boolean
  --       },
  --
  --       ---@type lc.storage
  --       storage = {
  --         home = vim.fn.stdpath "data" .. "/leetcode",
  --         cache = vim.fn.stdpath "cache" .. "/leetcode",
  --       },
  --
  --       ---@type table<string, boolean>
  --       plugins = {
  --         non_standalone = false,
  --       },
  --
  --       ---@type boolean
  --       logging = true,
  --
  --       injector = {}, ---@type table<lc.lang, lc.inject>
  --
  --       cache = {
  --         update_interval = 60 * 60 * 24 * 7, ---@type integer 7 days
  --       },
  --
  --       console = {
  --         open_on_runcode = true, ---@type boolean
  --
  --         dir = "row", ---@type lc.direction
  --
  --         size = { ---@type lc.size
  --           width = "90%",
  --           height = "75%",
  --         },
  --
  --         result = {
  --           size = "60%", ---@type lc.size
  --         },
  --
  --         testcase = {
  --           virt_text = true, ---@type boolean
  --
  --           size = "40%", ---@type lc.size
  --         },
  --       },
  --
  --       description = {
  --         position = "left", ---@type lc.position
  --
  --         width = "40%", ---@type lc.size
  --
  --         show_stats = true, ---@type boolean
  --       },
  --
  --       ---@type lc.picker
  --       picker = { provider = nil },
  --
  --       hooks = {
  --         ---@type fun()[]
  --         ["enter"] = {},
  --
  --         ---@type fun(question: lc.ui.Question)[]
  --         ["question_enter"] = {},
  --
  --         ---@type fun()[]
  --         ["leave"] = {},
  --       },
  --
  --       keys = {
  --         toggle = { "q" }, ---@type string|string[]
  --         confirm = { "<CR>" }, ---@type string|string[]
  --
  --         reset_testcases = "r", ---@type string
  --         use_testcase = "U", ---@type string
  --         focus_testcases = "H", ---@type string
  --         focus_result = "L", ---@type string
  --       },
  --
  --       ---@type lc.highlights
  --       theme = {},
  --
  --       ---@type boolean
  --       image_support = false,
  --     },
  --   },
  -- },
}

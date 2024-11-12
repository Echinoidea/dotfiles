import GLib from "gi://GLib";

const WINDOW_NAME = "ArchCtl";

const XDG_CONFIG_PATH = GLib.getenv('XDG_CONFIG_HOME') || `${GLib.get_home_dir()}/.config`;
const XDG_CACHE_PATH = GLib.getenv('XDG_CACHE_HOME') || `${GLib.get_home_dir()}/.cache`;

const SCRIPTS_PATH = `${XDG_CONFIG_PATH}/ags/scripts`;
const CONFIGS_PATH = `${XDG_CONFIG_PATH}/ags/configs`;
const ASSETS_PATH = `${XDG_CONFIG_PATH}/ags/assets`;

function roundToNearestN(num, n) {
  return Math.round(num / n) * n;
}

let saturation = 0.0;

const SaturationSlider = () =>
  Widget.Slider({
    className: "saturation-slider",
    // @ts-ignore vertical: false, value: 0, min: 0,
    max: 50,
    on_change: ({ value }) => {
      saturation = roundToNearestN(value, 5) / 100;
    },
    marks: [[1, "saturation", "bottom"]],
  });

let selectedTheme = null;

const getSelectedWallpaper = () => {
  let currentWallpaperPath = Utils.exec(`cat ${XDG_CACHE_PATH}/swww/eDP-1`).trim();
  let convertedWallpaperPath = currentWallpaperPath.replace(/\.gif$/, ".png");

  if (currentWallpaperPath.endsWith(".gif")) {
    Utils.exec(`ffmpeg -i "${currentWallpaperPath}" -frames:v 1 "${convertedWallpaperPath}"`);
    return (convertedWallpaperPath);
  } else {
    return (currentWallpaperPath);
  }
}

let selectedWallpaper = Variable(getSelectedWallpaper());

const ShuffleTheme = () => {
  Utils.execAsync(
    `${SCRIPTS_PATH}/change-theme.sh ${ASSETS_PATH}/wallpapers/ ${saturation}`
  ).then(() => {
    App.config({ style: "./style.css" });
    selectedWallpaper.setValue(getSelectedWallpaper());
  });

  Utils.execAsync(
    `${SCRIPTS_PATH}/dunst-theme.sh`
  )
  App.closeWindow(WINDOW_NAME);
};

let themeIndex = 0;

const ChangeTheme = (themeJson) => {
  if (!selectedTheme) {
    return;
  }

  if (themeIndex >= themeJson.length) {
    themeIndex = 0;
  }

  Utils.execAsync(
    `${SCRIPTS_PATH}/set-theme.sh ${ASSETS_PATH}/wallpapers/${themeJson[themeIndex]} ${saturation}`
  )
    .then(() => {
      App.config({ style: "./style.css" });
      selectedWallpaper.value = getSelectedWallpaper();

      return Utils.execAsync(`${SCRIPTS_PATH}/dunst-theme.sh`);
    })
    .then(() => {
      console.log("dunst-theme.sh executed successfully.");
    })
    .catch((error) => {
      console.log("Error during set-theme.sh or dunst-theme.sh execution");
      console.log(error);
    });

  App.closeWindow(WINDOW_NAME);
  themeIndex++;
};

const ExecPywal = () => {
  Utils.execAsync(`wal -i ${selectedWallpaper.value} --saturate ${saturation}`)
    .then(() => {
      App.config({ style: "./style.css" });
      Utils.exec("pywalfox update")
      return Utils.execAsync(`${SCRIPTS_PATH}/dunst-theme.sh`); // Chain the next command
    })
    .then(() => {
      console.log("dunst-theme.sh executed successfully.");
    })
    .catch((error) => {
      console.log("Error during pywal -i or dunst-theme.sh execution");
      console.log(error);
    });

}

const SettingsButton = (label, onClick) =>
  Widget.Button({
    className: "theme-settings-button",
    xalign: 0.5,
    label,
    onClicked: onClick,
  });

const ThemeWallpaperMenuItem = (label, path) =>
  Widget.MenuItem({
    className: "menuitem",
    name: label,
    child: Widget.Label({
      className: "menuitem-label",
      label,

    }),
    onActivate: () => {
      selectedTheme = label.toLowerCase();
      console.log("selected theme: ", selectedTheme);
      ChangeTheme(GetThemeWallpapers(selectedTheme));
    },
  });


const WallpaperMenuItem = (label, path) =>
  Widget.MenuItem({
    className: "menuitem",
    name: label,
    child: Widget.Label({
      className: "menuitem-label",
      label,

    }),
    onActivate: () => {
      selectedWallpaper.setValue(`${ASSETS_PATH}/wallpapers/${label}`)

      Utils.execAsync(
        `${SCRIPTS_PATH}/set-theme.sh ${selectedWallpaper.value} ${saturation}`
      ).then(() => {
        App.config({ style: "./style.css" });
      });


    },
  });

const VimPaletteMenuItem = (fileName) =>
  Widget.MenuItem({
    className: "menuitem",
    name: fileName,
    child: Widget.Label({
      className: "menuitem-label",
      label: fileName,
    }),
    onActivate: () => {

      Utils.execAsync(
        `wal -f ${CONFIGS_PATH}/palettes/${fileName}`
      )
        .then(() => {
          App.config({ style: "./style.css" });

          Utils.exec("pywalfox update")
          return Utils.execAsync(`${SCRIPTS_PATH}/dunst-theme.sh`); // Chain the next command
        })
        .then(() => {
          console.log("dunst-theme.sh executed successfully.");
        })
        .catch((error) => {
          console.log("Error during pywal -i or dunst-theme.sh execution");
          console.log(error);
        });
    },
  });

const ThemeDropdown = (paths) =>
  Widget.Button({
    className: "dropdown-trigger",
    label: "",
    xalign: 0.5,
    on_primary_click: (_, event) => {
      Widget.Menu({
        className: "dropdown-menu",
        children: paths.map((path) => ThemeWallpaperMenuItem(path, path)),
      }).popup_at_pointer(event);
    },
  });


const WallpaperDropdown = (paths) =>
  Widget.Button({
    className: "dropdown-trigger",
    label: "󰋩",
    xalign: 0.5,
    on_primary_click: (_, event) => {
      Widget.Menu({
        className: "dropdown-menu",
        children: paths.map((path) => WallpaperMenuItem(path, path)),
      }).popup_at_pointer(event);
    },
  });


const VimPaletteDropdown = (paths) =>
  Widget.Button({
    css: `font-size: 16px;`,
    className: "dropdown-trigger",
    label: "vim",
    xalign: 0.5,
    on_primary_click: (_, event) => {
      Widget.Menu({
        className: "dropdown-menu",
        children: paths.map((path) => VimPaletteMenuItem(path)),
      }).popup_at_pointer(event);
    },
  });

export const GetThemes = () => {
  const paths = Utils.exec(`ls ${CONFIGS_PATH}/wallpaper-categories/`).split("\n");
  return paths.map((themePath) =>
    JSON.parse(Utils.readFile(`${CONFIGS_PATH}/wallpaper-categories/${themePath}`)).name
  );
};

const GetThemeWallpapers = (themeName) => {
  const theme = JSON.parse(
    Utils.readFile(`${CONFIGS_PATH}/wallpaper-categories/${themeName.toLowerCase()}.json`)
  );
  console.log("Got theme: ", theme.wallpaper_names);
  return theme.wallpaper_names;
};

const GetWallpaperPaths = () => {
  return Utils.exec(`ls ${ASSETS_PATH}/wallpapers`).split("\n").filter(Boolean);
}

const GetVimPalettePaths = () => {
  return Utils.exec(`ls ${CONFIGS_PATH}/palettes`).split('\n').filter(Boolean);
}


const wallpaperIcon = () => Widget.Icon().hook(selectedWallpaper, self => {
  self.icon = String(selectedWallpaper.value)
  self.size = 316
  self.xalign = 1
}, "changed")


export const themeWidget = () => {
  selectedWallpaper.setValue(getSelectedWallpaper());
  GetThemes();

  return (
    Widget.Box({

      className: "archctl-window",
      vertical: true,
      spacing: 20,

      children: [
        Widget.Box({
          vertical: true,
          children: [
            Widget.Box({
              vertical: true,
              spacing: 14,
              children: [
                Widget.Box({
                  child: wallpaperIcon(),
                }),


                Widget.Box({
                  vertical: false,
                  spacing: 32,
                  homogeneous: true,
                  children: [
                    SettingsButton("", ShuffleTheme),
                    //ThemeDropdown(GetThemes()),
                    WallpaperDropdown(GetWallpaperPaths())
                  ]
                })
              ]
            }),
          ]
        }),

        Widget.Box({
          spacing: 2,

          children: [

            Widget.Box({
              css: `margin-right: 16px;`,
              spacing: 4,
              homogeneous: true,
              children: [
                Widget.Label({
                  label: "",
                  className: "color1"
                }),
                Widget.Label({
                  label: "",
                  className: "color2"
                }),
                Widget.Label({
                  label: "",
                  className: "color3"
                }),
                Widget.Label({
                  label: "",
                  className: "color4"
                }),
                Widget.Label({
                  label: "",
                  className: "color5"
                }),
                Widget.Label({
                  label: "",
                  className: "color6"
                }),
                Widget.Label({
                  label: "",
                  className: "color7"
                }),
                Widget.Label({
                  label: "",
                  className: "color8"
                }),
              ]
            }),

            SettingsButton("wal", ExecPywal),
            VimPaletteDropdown(GetVimPalettePaths())

          ]
        }),

        SaturationSlider(),
      ]
    })
  )
}

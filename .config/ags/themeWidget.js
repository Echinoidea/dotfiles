
const WINDOW_NAME = "ArchCtl";

const AGS_PATH = "/home/gabriel/.config/ags";
function roundToNearestN(num, n) {
  return Math.round(num / n) * n;
}

let saturation = 0.0;

const SaturationSlider = () =>
  Widget.Slider({
    className: "saturation-slider",
    // @ts-ignore
    vertical: false,
    value: 0,
    min: 0,
    max: 50,
    on_change: ({ value }) => {
      saturation = roundToNearestN(value, 5) / 100;
    },
    marks: [[1, "saturation", "bottom"]],
  });

let selectedTheme = null;

const getSelectedWallpaper = () => {
  let currentWallpaperPath = Utils.exec("cat /home/gabriel/.cache/swww/eDP-1").trim();
  let convertedWallpaperPath = currentWallpaperPath.replace(/\.gif$/, ".png");

  // Check if the file is a GIF
  if (currentWallpaperPath.endsWith(".gif")) {
    // Extract the first frame of the GIF and save it as a PNG
    Utils.exec(`ffmpeg -i "${currentWallpaperPath}" -frames:v 1 "${convertedWallpaperPath}"`);
    return (convertedWallpaperPath);
  } else {
    return (currentWallpaperPath);
  }
}

let selectedWallpaper = Variable(getSelectedWallpaper());

const ShuffleTheme = () => {
  Utils.execAsync(
    `${AGS_PATH}/scripts/change-theme.sh ${AGS_PATH}/wallpapers/ ${saturation}`
  ).then(() => {
    App.config({ style: "./style.css" });
    selectedWallpaper.setValue(getSelectedWallpaper());
  });

  Utils.execAsync(
    `${AGS_PATH}/scripts/dunst-theme.sh`
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
    `${AGS_PATH}/scripts/set-theme.sh ${AGS_PATH}/wallpapers/${themeJson[themeIndex]} ${saturation}`
  ).then(() => {
    App.config({ style: "./style.css" });
    selectedWallpaper.value = getSelectedWallpaper();
  });

  Utils.execAsync(
    `${AGS_PATH}/scripts/dunst-theme.sh`
  )
  App.closeWindow(WINDOW_NAME);
  themeIndex++;
};

const ExecPywal = () => {
  console.log(selectedWallpaper.value)
  Utils.execAsync(`wal -i ${selectedWallpaper.value} --saturate ${saturation}`).then(() => {
    App.config({ style: "./style.css" });
  });

  Utils.execAsync(
    `${AGS_PATH}/scripts/dunst-theme.sh`
  )
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
      selectedWallpaper.setValue(`${AGS_PATH}/wallpapers/${label}`)

      Utils.execAsync(
        `${AGS_PATH}/scripts/set-theme.sh ${selectedWallpaper.value} ${saturation}`
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
        `wal -f ${AGS_PATH}/vim-palettes/${fileName}`
      ).then(() => {
        App.config({ style: "./style.css" });
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
  const paths = Utils.exec(`ls ${AGS_PATH}/themes/`).split("\n");
  return paths.map((themePath) =>
    JSON.parse(Utils.readFile(`${AGS_PATH}/themes/${themePath}`)).name
  );
};

const GetThemeWallpapers = (themeName) => {
  const theme = JSON.parse(
    Utils.readFile(`${AGS_PATH}/themes/${themeName.toLowerCase()}.json`)
  );
  console.log("Got theme: ", theme.wallpaper_names);
  return theme.wallpaper_names;
};

const GetWallpaperPaths = () => {
  return Utils.exec(`ls ${AGS_PATH}/wallpapers`).split("\n").filter(Boolean);
}

const GetVimPalettePaths = () => {
  return Utils.exec(`ls ${AGS_PATH}/vim-palettes`).split('\n').filter(Boolean);
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
                    ThemeDropdown(GetThemes()),
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
              spacing: 6,
              homogeneous: true,
              children: [
                Widget.Label({
                  label: "",
                  className: "color1"
                }),
                Widget.Label({
                  label: "",
                  className: "color2"
                }),
                Widget.Label({
                  label: "",
                  className: "color3"
                }),
                Widget.Label({
                  label: "",
                  className: "color4"
                }),
                Widget.Label({
                  label: "",
                  className: "color5"
                }),
                Widget.Label({
                  label: "",
                  className: "color6"
                }),
                Widget.Label({
                  label: "",
                  className: "color7"
                }),
                Widget.Label({
                  label: "",
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

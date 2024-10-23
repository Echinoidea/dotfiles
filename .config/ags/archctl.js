const WINDOW_NAME = "ArchCtl";
const AGS_PATH = "/home/gabriel/.config/ags";

const SettingsButton = (label, onClick) =>
  Widget.Button({
    className: "settings-button",
    xalign: 9,
    label,
    onClicked: onClick,
  });

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
    max: 25,
    on_change: ({ value }) => {
      saturation = roundToNearestN(value, 5) / 100;
    },
    marks: [[1, "saturation", "bottom"]],
  });

let selectedTheme = null;

const ShuffleTheme = () => {
  Utils.exec(
    `${AGS_PATH}/scripts/change-theme.sh ${AGS_PATH}/wallpapers/ ${saturation}`
  );
  App.config({ style: "./style.css" });
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

  Utils.exec(
    `${AGS_PATH}/scripts/set-theme.sh ${AGS_PATH}/wallpapers/${themeJson[themeIndex]} ${saturation}`
  );
  App.config({ style: "./style.css" });
  App.closeWindow(WINDOW_NAME);
  themeIndex++;
};

const Main = () =>
  Widget.Box({
    className: "archctl-window",
    vertical: true,
    spacing: 8,
    children: [
      Widget.Label({ label: "Theme" }),
      Widget.Box({
        className: "archctl-window-column",
        vertical: false,
        spacing: 8,
        children: [
          SettingsButton(" ", ShuffleTheme),
          ThemeDropdown(GetThemes()),
        ],
      }),
      SaturationSlider(),
      Widget.Label({ label: "System" }),
      SettingsButton("⏻", () => {
        App.ToggleWindow("powerctl");
      }),
    ],
    setup: (self) =>
      self.hook(App, (_, windowName) => {
        if (windowName !== WINDOW_NAME) return;
      }),
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
      selectedTheme = label.toLowerCase();
      console.log("selected theme: ", selectedTheme);
      ChangeTheme(GetThemeWallpapers(selectedTheme));
    },
  });

const ThemeDropdown = (paths) =>
  Widget.Button({
    className: "dropdown-trigger",
    label: " ",
    xalign: -1,
    on_primary_click: (_, event) => {
      Widget.Menu({
        className: "dropdown-menu",
        children: paths.map((path) => WallpaperMenuItem(path, path)),
      }).popup_at_pointer(event);
    },
  });

const GetThemes = () => {
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

export const ArchCtl = () => {
  GetThemes();
  return Widget.Window({
    name: WINDOW_NAME,
    className: "archctl-window",
    margins: [4, 0, 0, 4],
    anchor: ["top", "left"],
    exclusivity: "normal",
    setup: (self) =>
      self.keybind("Escape", () => {
        App.closeWindow(WINDOW_NAME);
      }),
    visible: false,
    keymode: "exclusive",
    child: Widget.Box({
      children: [Main()],
    }),
  });
};

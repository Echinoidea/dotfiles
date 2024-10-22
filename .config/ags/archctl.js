const WINDOW_NAME = "ArchCtl"

const SettingsButton = (label, onClick) => Widget.Button({
  className: "settings-button",
  label: label,
  onClicked: onClick
})

function roundToNearestN(num, n) {
  return Math.round(num / n) * n;
}

let saturation = 0.0;

const SaturationSlider = () => Widget.Slider({
  className: "saturation-slider",
  // @ts-ignore
  vertical: false,
  value: 0,
  min: 0,
  max: 25,
  on_change: ({ value }) => { saturation = roundToNearestN(value, 5) / 100 },
  marks: [
    [1, "saturation", "bottom"]
  ]
})

const ChangeTheme = () => {
  Utils.exec(`/home/gabriel/.config/ags/scripts/change-theme.sh /home/gabriel/.config/ags/wallpapers/ ${saturation}`);
  App.config({ style: "./style.css" });
  App.closeWindow(WINDOW_NAME);
}

const Main = () => {
  return Widget.Box({

    className: "archctl-window",
    vertical: true,
    spacing: 8,

    children: [
      Widget.Label({
        label: "Theme"
      }),

      Widget.Box({
        className: "archctl-window-column",
        vertical: false,
        spacing: 8,
        children: [
          SettingsButton("", () => Utils.exec(`/home/gabriel/.config/ags/scripts/change-theme.sh /home/gabriel/.config/ags/wallpapers/ ${saturation}`)),

          SettingsButton("", () => ChangeTheme()),
        ]
      }),


      SaturationSlider(),
      Widget.Label({
        label: "System"
      }),
      SettingsButton("⏻", () => { App.ToggleWindow("powerctl") })
    ],
    setup: self => self.hook(App, (_, windowName, visible) => {
      if (windowName !== WINDOW_NAME)
        return
    }),
  })
}

const WallpaperItems = () => {
  const wallpaperDir = "/home/gabriel/.config/ags/wallpapers/"
  const command = `ls ${wallpaperDir} | grep -E "\\.jpg$|\\.png$|\\.gif$|\\.jpeg$"`;

  let imagePaths = []

  Utils.exec(command, (output) => {
    imagePaths = output.trim().split("\n").map(file => `${wallpaperDir}/${file}`);

  })

  return imagePaths
}

const imagePaths = WallpaperItems();

const WallpaperMenuItem = (label, path) => {
  return (
    Widget.MenuItem({
      child: Widget.Label({
        className: "menuitem-label",
        label: label,
      }),
    })
  );
}

function WallpaperDropdown() {
  const menu = Widget.Menu({
    className: "dropdown-menu",
    children: [
    ],
  })

  return Widget.Button({
    className: "dropdown-trigger",
    on_primary_click: (_, event) => {
      menu.popup_at_pointer(event)
    },
  })
}
//const revealer = Widget.Revealer({
//  revealChild: false,
//  transitionDuration: 1000,
//  transition: 'slide_right',
//  child: Widget.Label('hello!'),
//  setup: self => self.poll(2000, () => {
//    self.reveal_child = !self.reveal_child;
//  }),
//})

export const ArchCtl = () => {
  return (
    Widget.Window({
      name: WINDOW_NAME,
      className: "archctl-window",
      margins: [4, 0, 0, 4],
      anchor: ["top", "left"],
      exclusivity: "normal",
      setup: self => self.keybind("Escape", () => {
        App.closeWindow(WINDOW_NAME)
      }),
      visible: false,
      keymode: "exclusive",
      child: Widget.Box({
        children: [
          Main(),
          Widget.Icon({
            //icon: '/home/gabriel/pictures/wallpapers/cliff.jpg',
            icon: imagePaths[0],
            size: 200
          })
        ]
      })
    }))
}



const WINDOW_NAME = "archctl"

const SettingsButton = (label, onClick) => Widget.Button({
  className: "settings-button",
  label: label,
  onClicked: onClick

})

let saturation = 0.0;

const SaturationSlider = () => Widget.Slider({
  className: "saturation-slider",
  // @ts-ignore
  vertical: false,
  value: 0,
  min: 0,
  max: 100,
  on_change: ({ value }) => { saturation = value / 100 },
  marks: [
    [1, 'saturation', 'bottom']
  ]
})

const ChangeTheme = () => {
  Utils.exec(`/home/gabriel/.config/ags/scripts/change-theme.sh /home/gabriel/.config/ags/wallpapers/ ${saturation}`);
  App.config({ style: "./style.css" });
  App.closeWindow(WINDOW_NAME);
}

const ArchCtl = () => {
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

export const archctl = () => {
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
          ArchCtl()
        ]
      })
    }))
}

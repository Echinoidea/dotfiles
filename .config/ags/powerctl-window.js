const WINDOW_NAME = "powerctl"

const PowerCtlButton = (label, onClick) => {
  return (
    Widget.Button({
      className: "powerctl-button",
      label: label,
      onClicked: () => {
        onClick();
        App.closeWindow(WINDOW_NAME)
        App.closeWindow("archctl")
      }
    })
  )
}

const PowerCtl = () => {

  // search entry
  return Widget.Box({

    className: "powerctl-window",
    vertical: false,
    spacing: 16,
    children: [
      PowerCtlButton("⏻", () => Utils.exec("systemctl poweroff")),
      PowerCtlButton("", () => Utils.exec("systemctl suspend")),
      PowerCtlButton("", () => Utils.exec("systemctl reboot")),
      // todo)) Lock with hyprlock
    ],
    setup: self => self.hook(App, (_, windowName, visible) => {
      if (windowName !== WINDOW_NAME)
        return
    }),
  })
}

// there needs to be only one instance
export const powerctl = Widget.Window({
  name: WINDOW_NAME,
  className: "powerctl-window",
  //anchor: ["top", "left"],
  //margins: [4, 0, 0, 120],
  setup: self => self.keybind("Escape", () => {
    App.closeWindow(WINDOW_NAME)
  }),
  visible: false,
  keymode: "exclusive",
  child: PowerCtl(),
})

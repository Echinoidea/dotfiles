const time = Variable("", {
  poll: [1000, 'date "+%I:%M"'],
})

const date = Variable("", {
  poll: [6000, 'date "+%Y-%m-%e\n%A"'],
})

const SettingsButton = (label, onClick) =>
  Widget.Button({
    className: "settings-button",
    css: "font-size: 36px;",
    hpack: "center",
    vpack: "center",
    //xalign: 0.5,
    onClicked: onClick,
    label
  });

export const clockWidget = () => {
  return (
    Widget.Box({
      className: "archctl-window",
      vertical: false,
      spacing: 30,
      children: [
        Widget.Label({ label: time.bind(), css: `font-size: 36px;` }),
        Widget.Label({ label: date.bind(), css: `font-size: 16px;` }),
        SettingsButton("⏻", () => {
          App.ToggleWindow("powerctl");
        }),
      ],
    })
  )
}

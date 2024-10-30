const time = Variable("", {
  poll: [6000, 'date "+%I:%M"'],
})

const date = Variable("", {
  poll: [6000, 'date "+%Y-%m-%e\n%A"'],
})

const SettingsButton = (label, onClick) =>
  Widget.Button({
    className: "settings-button",
    xalign: 0.5,
    label,
    onClicked: onClick,
  });

export const clockWidget = () => {
  return (
    Widget.Box({
      className: "archctl-window",
      vertical: false,
      spacing: 30,
      children: [
        Widget.Label({ label: time.value, css: `font-size: 36px;` }),
        Widget.Label({ label: date.value, css: `font-size: 16px;` }),
        SettingsButton("⏻", () => {
          App.ToggleWindow("powerctl");
        }),
      ],
    })
  )
}

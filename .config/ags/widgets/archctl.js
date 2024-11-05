import { GetThemes, themeWidget } from './themeWidget.js';
import { clockWidget } from './clockWidget.js';

const WINDOW_NAME = "ArchCtl";

const SettingsButton = (label, onClick) =>
  Widget.Button({
    className: "settings-button",
    xalign: 9,
    label,
    onClicked: onClick,
  });


const Main = (time, date) =>
  Widget.Box({
    className: "archctl-window",
    vertical: true,
    spacing: 8,
    homogeneous: true,
    children: [
      Widget.Box({
        className: "archctl-window-column",
        vertical: true,
        spacing: 8,
        children: [
          clockWidget(),
          themeWidget()
        ],
      }),
    ],
    setup: (self) =>
      self.hook(App, (_, windowName) => {
        if (windowName !== WINDOW_NAME) return;
      }),
  });


export const ArchCtl = (time, date) => {
  GetThemes();
  return Widget.Window({
    name: WINDOW_NAME,
    className: "archctl-window",
    margins: [8, 0, 0, 4],
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

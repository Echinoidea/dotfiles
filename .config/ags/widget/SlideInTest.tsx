import { Revealer } from "../../../../../usr/share/astal/gjs/gtk3/widget";
import { App, Astal, Gtk, Gdk } from "astal/gtk3"

export function SlideTest({ onClick }: { onClick: () => void }) {
  return <window
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={Astal.WindowAnchor.LEFT
      | Astal.WindowAnchor.TOP
      | Astal.WindowAnchor.BOTTOM}
  >
    <button onClick={onClick}>
      <label label="Open" />
    </button>

  </window>
}

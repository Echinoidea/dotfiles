import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable } from "astal"

const date = Variable("").poll(1000, 'date "+%A, %b. %d, %Y"');

export function DateLabel(): JSX.Element {
  return <label
    className="ClockLarge"
    css={`font-size: 20px;`}
    halign={Gtk.Align.START}
    valign={Gtk.Align.START}
    label={date()}
  >
  </label>
}


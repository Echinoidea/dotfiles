import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable } from "astal"

const time = Variable("").poll(1000, 'date "+%I:%M"');

export function ClockLarge(): JSX.Element {
  return <label
    className="ClockLarge"
    css={`font-size: 32px;`}
    halign={Gtk.Align.START}
    valign={Gtk.Align.START}
    label={time()}
  >
  </label>
}


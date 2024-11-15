import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable } from "astal"

const time = Variable("").poll(1000, 'date "+%I\n%M"');

export function Clock(): JSX.Element {
  return <button
    className="Clock"
    halign={Gtk.Align.CENTER}
    valign={Gtk.Align.CENTER}
  >
    <label
      css={`font-size: 16px;`}
      label={time()} />
  </button>
}

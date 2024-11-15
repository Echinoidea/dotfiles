import { App, Astal, Gtk, Gdk } from "astal/gtk3"

export function ArchCtlTrigger(): JSX.Element {
  return <button
    className="ArchCtlTrigger"
    onClick={() => App.toggle_window("ArchCtlMenu")}>
    <label css={`font-size: 42px; margin-top: -8px; margin-bottom: -10px;`}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      label="󰣇" />
  </button >
}



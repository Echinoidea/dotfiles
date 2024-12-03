
import { App, Astal, Gtk, Gdk } from "astal/gtk3"

export function KeyboardVizTrigger(): JSX.Element {
  return <button
    className="KeyboardVizTrigger"
    onClick={() => App.toggle_window("KeyVisualizer")}>
    <label css={`font-size: 42px; margin-top: -8px; margin-bottom: -10px;`}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      label="Key Visualizer" />
  </button >
}



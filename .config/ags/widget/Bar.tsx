import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { bind, Gio, Variable } from "astal"
import { Clock } from "./Clock"
import { BatteryIndicator } from "./Battery"
import { TempIndicator } from "./Temp"
import { CpuIndicator } from "./Cpu"
import { ArchCtlTrigger } from "./ArchCtlTrigger"
import { Workspaces } from "./Workspaces"
import { VolumeIndicator } from "./Volume"
import GLib from "gi://GLib?version=2.0"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  let childReveal = Variable(false);

  return <window
    className="Bar"
    gdkmonitor={gdkmonitor}
    keymode={Astal.Keymode.ON_DEMAND}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={Astal.WindowAnchor.LEFT
      | Astal.WindowAnchor.TOP
      | Astal.WindowAnchor.BOTTOM}
    application={App}
  >

    <centerbox
      vertical={true}
      halign={Gtk.Align.CENTER}
    >
      <box
        css={`margin-top: 2px;`}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.START}
        vertical={true}
        spacing={4}
      >
        <ArchCtlTrigger />
        <BatteryIndicator />
        <TempIndicator />
        <VolumeIndicator />
      </box>

      <box
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
        spacing={4}
      >
        <Workspaces />
      </box>

      <box
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.END}
        spacing={4}
      >

        <Clock />
      </box>
    </centerbox>

  </window>
}


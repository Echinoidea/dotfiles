import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { bind, Variable } from "astal"
import { Clock } from "./Clock"
import { BatteryIndicator } from "./Battery"
import { TempIndicator } from "./Temp"
import { CpuIndicator } from "./Cpu"
import { ArchCtlTrigger } from "./ArchCtlTrigger"
import { Workspaces } from "./Workspaces"
import { SlideTest } from "./SlideInTest"
import { Revealer } from "../../../../../usr/share/astal/gjs/gtk3/widget"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  let childReveal = Variable(false);

  return <window
    className="Bar"
    gdkmonitor={gdkmonitor}
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



//<box
//
//>
//  <Revealer revealChild={childReveal.get()} child={<SlideTest onClick={() => { console.log(childReveal); childReveal.set(!childReveal.get()) }} />}>
//
//  </Revealer>
//</box>

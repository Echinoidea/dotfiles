import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { ClockLarge } from "./ClockLarge";
import { PowerButton } from "./PowerButtons";
import { DateLabel } from "./DateLabel";
import { ColorSchemeStack } from "./ColorSelector";
import { WallpaperSelector } from "./WallpaperSelector";
import { CpuIndicator } from "./Cpu";
import { RamIndicator } from "./MemoryIndicator";

export function OrgMenu() {
  return <window
    className="Bar"
    name="OrgMenu"
    visible={false}
    exclusivity={Astal.Exclusivity.NORMAL}
    anchor={Astal.WindowAnchor.LEFT}
    application={App}
    keymode={Astal.Keymode.EXCLUSIVE}
    onKeyPressEvent={(self, event: Gdk.Event) => {
      if (event.get_keyval()[1] === Gdk.KEY_Escape) {
        self.hide();
      }
    }}
    valign={Gtk.Align.START}
    heightRequest={1080 - 8}
    widthRequest={300}
    marginLeft={4}
    css={"border-radius: 6px;"}
  >
    <box vertical spacing={8} className={"OrgMenuBox"} >

    </box>
  </window>
}

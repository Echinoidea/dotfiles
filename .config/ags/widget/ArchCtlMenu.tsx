import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { ClockLarge } from "./ClockLarge";
import { PowerButton } from "./PowerButtons";
import { DateLabel } from "./DateLabel";
import { ColorSchemeStack } from "./ColorSelector";

export function ArchCtlMenu() {
  return <window
    className="Bar"
    name="ArchCtlMenu"
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
    css={"border-radius: 8px;"}
  >
    <box vertical className={"ArchCtlBox"}>
      <box vertical halign={Gtk.Align.START}>
        <DateLabel />
        <box spacing={16}>
          <ClockLarge />
          <box css={`margin-top: -6px;`} >
            <PowerButton type="power" />
            <PowerButton type="suspend" />
            <PowerButton type="reboot" />
            <PowerButton type="logout" />
          </box>
        </box>

        <ColorSchemeStack />
      </box>

    </box>
  </window>
}

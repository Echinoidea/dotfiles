import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { bind, Variable } from "astal"
import { CircularProgress } from "../../../../../usr/share/astal/gjs/gtk3/widget"
import AstalBattery from "gi://AstalBattery?version=0.1"

const battery = AstalBattery.get_default();

export function BatteryIndicator(): JSX.Element {
  return <CircularProgress
    className="CircleIndicator"
    value={bind(battery, "percentage").as((p: number) =>
      p
    )}
    startAt={0.75}
    endAt={0.75}
    rounded
    child={<label css={'font-size: 16px;'} label={"󱐌"} />
    }
  >
  </CircularProgress >
}

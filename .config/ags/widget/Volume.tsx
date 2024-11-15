import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { bind, Variable } from "astal"
import { CircularProgress } from "../../../../../usr/share/astal/gjs/gtk3/widget"
import Wp from "gi://AstalWp"


export function VolumeIndicator(): JSX.Element {
  const speaker = Wp.get_default()?.default_speaker!;

  return <CircularProgress
    className="CircleIndicator"
    value={bind(speaker, "volume")}
    startAt={0.75}
    endAt={0.75}
    rounded
    child={<icon css={`font-size: 11px;`} icon={bind(speaker, "volumeIcon")} />}
  ></CircularProgress>
}

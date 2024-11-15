import { Gtk } from "astal/gtk3"

export function ArchCtlTrigger(): JSX.Element {
  return <button
    heightRequest={26}
    css={`margin-bottom: -6px; margin-top: -6px;`} >
    <label halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} label="󰣇" />
  </button >
}

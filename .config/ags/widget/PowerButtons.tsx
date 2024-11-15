import { exec } from "../../../../../usr/share/astal/gjs";

export function PowerButton({ type }: { type: "power" | "suspend" | "reboot" | "logout" }): JSX.Element {
  let icon = "";
  let cmd = "";

  if (type === "power") {
    icon = "";
    cmd = "systemctl poweroff"
  }
  else if (type === "suspend") {
    icon = "󰏦";
    cmd = "systemctl suspend"
  }
  else if (type === "reboot") {
    icon = "";
    cmd = "systemctl reboot"
  }
  else if (type === "logout") {
    icon = ""
    cmd = "hyprlock"
  }

  return <button
    className={`PowerButton-${type}`}
    onClick={() => exec(cmd)}
    can_focus={false}
  >
    <label label={icon} />
  </button>
}

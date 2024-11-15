import GLib from "gi://GLib";
import { exec, execAsync } from "../../../../../usr/share/astal/gjs";
import { App, Astal, Gtk, Gdk } from "astal/gtk3"

const XDG_CONFIG_PATH = GLib.getenv('XDG_CONFIG_HOME') || `${GLib.get_home_dir()}/.config`;
const XDG_CACHE_PATH = GLib.getenv('XDG_CACHE_HOME') || `${GLib.get_home_dir()}/.cache`;

const SCRIPTS_PATH = `${XDG_CONFIG_PATH}/ags/scripts`;
const CONFIGS_PATH = `${XDG_CONFIG_PATH}/ags/configs`;

const getSelectedWallpaper = () => {
  let currentWallpaperPath = exec(`cat ${XDG_CACHE_PATH}/swww/eDP-1`).trim();
  let convertedWallpaperPath = currentWallpaperPath.replace(/\.gif$/, ".png");

  if (currentWallpaperPath.endsWith(".gif")) {
    exec(`ffmpeg -i "${currentWallpaperPath}" -frames:v 1 "${convertedWallpaperPath}"`);
    return (convertedWallpaperPath);
  } else {
    return (currentWallpaperPath);
  }
}

const saturation = 0.5;

let selectedWallpaper = Variable(getSelectedWallpaper());

function ExecWal() {
  execAsync(`wal -i ${selectedWallpaper.value} --saturate ${saturation}`)
    .then(() => {
      App.config({ style: "./style.css" });
      Utils.exec("pywalfox update")
      return Utils.execAsync(`${SCRIPTS_PATH}/dunst-theme.sh`); // Chain the next command
    })
    .then(() => {
      console.log("dunst-theme.sh executed successfully.");
    })
    .catch((error) => {
      console.log("Error during pywal -i or dunst-theme.sh execution");
      console.log(error);
    });
}

export function ColorSchemeStack() {
  return <stack>

  </stack>
}

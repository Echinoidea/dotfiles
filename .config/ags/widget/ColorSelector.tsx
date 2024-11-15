import GLib from "gi://GLib";
import { exec, execAsync, Variable } from "../../../../../usr/share/astal/gjs";
import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Scrollable } from "../../../../../usr/share/astal/gjs/gtk3/widget";

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

const GetColorSchemes = () => {
  const schemePaths = exec(`ls ${CONFIGS_PATH}/palettes`).split('\n').filter(Boolean);

  return schemePaths;
}

const saturation = 0.5;

let selectedWallpaper = Variable(getSelectedWallpaper());
selectedWallpaper.set("/home/gabriel/.config/ags-v1/assets/wallpapers/bloom.png");

function ApplyCssFromScss() {
  const scss = `${XDG_CONFIG_PATH}/ags/style.scss`;
  const css = "/tmp/style.css";
  exec(`sass ${scss} ${css}`);
  App.apply_css(css);
}

function ExecWalImage() {
  execAsync(`wal -i ${selectedWallpaper.get()} --saturate ${saturation}`)
    .then(() => {
      ApplyCssFromScss();
      exec("pywalfox update");
    })
    .catch((error) => {
      console.log("Error during pywal or pywalfox update");
      console.log(error);
    })
}

function ExecWalPreset(schemeFileName: string) {
  console.log(`${XDG_CONFIG_PATH}/ags/configs/palettes/${schemeFileName}`)
  execAsync(`wal -f ${XDG_CONFIG_PATH}/ags/configs/palettes/${schemeFileName}`)
    .then(() => {
      ApplyCssFromScss();
      exec("pywalfox update");
    })
    .catch((error) => {
      console.log("Error during pywal or pywalfox update");
      console.log(error);
    })
}

export function ColorSchemeStack() {
  return <box vertical>
    <label label={"vim schemes"} />
    <Scrollable heightRequest={200} >
      <box vertical >
        {GetColorSchemes().map((path: string, index: number) => (
          <button onClick={() => ExecWalPreset(path)}>
            <label css={`font-size: 12px;`} halign={Gtk.Align.START} label={path.slice(0, path.length - 5)} />
          </button>
        ))}
      </box>
    </Scrollable>
  </box>
}

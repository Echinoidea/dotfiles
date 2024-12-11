import GLib from "gi://GLib";
import { exec, execAsync, Gio, Variable } from "../../../../../usr/share/astal/gjs";
import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Scrollable } from "../../../../../usr/share/astal/gjs/gtk3/widget";
import Json from "gi://Json";

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
  execAsync(`wal -i ${getSelectedWallpaper()} `)
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

      return execAsync(`${XDG_CONFIG_PATH}/ags/scripts/dunst-theme.sh`).then(() => {
        console.log("Updated dunst")
      }).catch((error) => {
        console.error(error);
      });
    })
    .catch((error) => {
      console.log("Error during pywal or pywalfox update");
      console.log(error);
    })


}

const GetColorsFromPreset = (schemeFileName: string) => {
  const path = `${XDG_CONFIG_PATH}/ags/configs/palettes/${schemeFileName}`

  const file = Gio.File.new_for_path(path);
  const [success, content] = file.load_contents(null);

  if (!success) {
    throw new Error(`Failed to read file: ${path}`);
  }

  const jsonData = JSON.parse(imports.byteArray.toString(content));

  const colors = jsonData.colors;
  const selectedColors: { [key: string]: string } = {};

  for (let i = 0; i <= 7; i++) {
    const colorKey = `color${i}`;
    if (colors[colorKey]) {
      selectedColors[colorKey] = colors[colorKey];
    }
  }

  return selectedColors;
}

const GetColorsFromWalCache = () => {
  const path = `${XDG_CACHE_PATH}/wal/colors.json`;

  const file = Gio.File.new_for_path(path);
  const [success, content] = file.load_contents(null);

  if (!success) {
    throw new Error(`Failed to read file: ${path}`);
  }

  const jsonData = JSON.parse(imports.byteArray.toString(content));

  const colors = jsonData.colors;
  const selectedColors: { [key: string]: string } = {};

  for (let i = 0; i <= 7; i++) {
    const colorKey = `color${i}`;
    if (colors[colorKey]) {
      selectedColors[colorKey] = colors[colorKey];
    }
  }

  return selectedColors;
}

function ColorPreview({ schemeFileName }: { schemeFileName: string }): JSX.Element {
  const colors = GetColorsFromPreset(schemeFileName!);

  return <box halign={Gtk.Align.END} spacing={1}>
    {
      Array.from({ length: 7 }, (_, i) => i + 1).map((number) => (
        <label css={`font-size: 20px; color: ${colors[`color${number}`]}`} label={"󰋘"} />
      ))}
  </box>
}

export function ColorSchemeStack() {
  return <box vertical className="ColorSchemePreviewBox">
    <Scrollable heightRequest={200} >
      <box vertical className="ColorSchemePreviewBoxInner">
        <eventbox onClick={() => ExecWalImage()}>
          <box homogeneous>
            <label className="ColorSchemeName" css={`font-size: 14px; margin-bottom: 4px;`} halign={Gtk.Align.START} label={"Run Pywal"} />
          </box>
        </eventbox>
        {GetColorSchemes().map((path: string, index: number) => (
          <eventbox onClick={() => ExecWalPreset(path)}>
            <box homogeneous>
              <label className="ColorSchemeName" css={`font-size: 14px;`} halign={Gtk.Align.START} label={path.slice(0, path.length - 5)} />
              <ColorPreview schemeFileName={path} />
            </box>
          </eventbox>
        ))}
      </box>
    </Scrollable >
  </box >
}

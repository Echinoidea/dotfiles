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

async function ExecWalImage(light: boolean) {
  const configPath = `${XDG_CONFIG_PATH}/ags`;

  try {
    // Update pywal colors
    await execAsync(`wal -i ${getSelectedWallpaper()} ${light ? '-l' : ''}`)
    ApplyCssFromScss();
    // Uncomment if you want to update pywalfox
    // await execAsync("pywalfox update");

    console.log("Pywal updated");

    // Update dunst theme
    await execAsync(`${configPath}/scripts/dunst-theme.sh`);
    console.log("Updated dunst");

    // Update hypr border and foot theme
    await execAsync(`${configPath}/scripts/hypr-border.sh`);
    console.log("Updated hypr border color");

    await execAsync(`${configPath}/scripts/foot-theme.sh`);

    console.log("Updated foot theme");
  } catch (error) {
    console.error("An error occurred during the theme update process:", error);
  }
}

async function ExecWalPreset(schemeFileName: string) {
  const configPath = `${XDG_CONFIG_PATH}/ags`;
  console.log(`${XDG_CONFIG_PATH}/ags/configs/palettes/${schemeFileName}`)

  try {
    // Update pywal colors
    await execAsync(`wal --theme ${configPath}/configs/palettes/${schemeFileName.split('.')[0]}`);
    ApplyCssFromScss();
    // Uncomment if you want to update pywalfox
    // await execAsync("pywalfox update");

    console.log("Pywal updated");

    // Update dunst theme
    await execAsync(`${configPath}/scripts/dunst-theme.sh`);
    console.log("Updated dunst");

    // Update hypr border and foot theme
    await execAsync(`${configPath}/scripts/hypr-border.sh`);
    console.log("Updated hypr border color");

    await execAsync(`${configPath}/scripts/foot-theme.sh`);
    console.log("Updated foot theme");
  } catch (error) {
    console.error("An error occurred during the theme update process:", error);
  }
  //execAsync(`wal -f ${XDG_CONFIG_PATH}/ags/configs/palettes/${schemeFileName}`)
  //  .then(async () => {
  //    ApplyCssFromScss();
  //    //exec("pywalfox update");
  //
  //    try {
  //      await execAsync(`${XDG_CONFIG_PATH}/ags/scripts/dunst-theme.sh`);
  //      console.log("Updated dunst");
  //      try {
  //        await execAsync(`${XDG_CONFIG_PATH}/ags/scripts/hypr-border.sh`).then(() => { execAsync(`${XDG_CONFIG_PATH}/ags/scripts/foot-theme.sh`) }
  //        );
  //        console.log("Updated hypr border color");
  //
  //        try {
  //
  //        } catch (error) {
  //          console.log(error);
  //        }
  //      } catch (error) {
  //        console.log(error);
  //      }
  //    } catch (error_1) {
  //      console.error(error_1);
  //    }
  //
  //
  //  })
  //  .catch((error) => {
  //    console.log("Error during pywal or pywalfox update");
  //    console.log(error);
  //  })


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
        <label css={`font-size: 20px; color: ${colors[`color${number}`]}`} label={"󰋘"} halign={Gtk.Align.BASELINE} />
      ))}
  </box>
}

export function ColorSchemeStack() {
  return <box vertical className="ColorSchemePreviewBox">
    <Scrollable heightRequest={200} hscroll={Gtk.PolicyType.AUTOMATIC}>
      <box vertical className="ColorSchemePreviewBoxInner">
        <eventbox onClick={() => ExecWalImage(false)}>
          <box homogeneous>
            <label className="ColorSchemeName" css={`font-size: 14px; margin-bottom: 4px;`} halign={Gtk.Align.START} label={"wal"} />
          </box>
        </eventbox>
        <eventbox onClick={() => ExecWalImage(true)}>
          <box homogeneous>
            <label className="ColorSchemeName" css={`font-size: 14px; margin-bottom: 4px;`} halign={Gtk.Align.START} label={"wal -l"} />
          </box>
        </eventbox>

        {GetColorSchemes().map((path: string, index: number) => (
          <eventbox onClick={() => ExecWalPreset(path)}>
            <box halign={Gtk.Align.FILL} hexpand >
              <box halign={Gtk.Align.START}>
                <label halign={Gtk.Align.START} className="ColorSchemeName" css={`font-size: 14px;`} label={path.slice(0, path.length - 5)} />
              </box>

              <box halign={Gtk.Align.END} hexpand>
                <ColorPreview schemeFileName={path} />
              </box>
            </box>
          </eventbox>
        ))}
      </box>
    </Scrollable >
  </box >
}

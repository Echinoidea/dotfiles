import { exec, execAsync, GLib } from "../../../../../usr/share/astal/gjs";
import { Scrollable } from "../../../../../usr/share/astal/gjs/gtk3/widget";

const XDG_CONFIG_PATH = GLib.getenv('XDG_CONFIG_HOME') || `${GLib.get_home_dir()}/.config`;
const XDG_CACHE_PATH = GLib.getenv('XDG_CACHE_HOME') || `${GLib.get_home_dir()}/.cache`;

const SCRIPTS_PATH = `${XDG_CONFIG_PATH}/ags/scripts`;
const CONFIGS_PATH = `${XDG_CONFIG_PATH}/ags/configs`;

const GetWallpaperPaths = () => {
  return exec(`ls ${XDG_CONFIG_PATH}/ags/assets/cropped_wallpapers/`).split("\n");
}

const SetSwww = (imageFileName: string) => {
  exec(`swww img ${XDG_CONFIG_PATH}/ags/assets/wallpapers/${imageFileName} --transition-type left --transition-fps 30 --transition-step 2 --transition-duration 1 
`);
}


export function WallpaperSelector() {
  return <box vertical className="WallpaperSelectorBoxOuter">
    <Scrollable css={`min-height: 770px`}>
      <box vertical spacing={4} className="WallpaperSelectorBoxInner">
        {
          GetWallpaperPaths().map((path: string, index: number) => (
            <eventbox className="WallpaperSelectorEventBox" onClick={() => { SetSwww(path) }}>
              <icon css={`font-size: 300px;`} icon={`${XDG_CONFIG_PATH}/ags/assets/cropped_wallpapers/${path}`}></icon>
            </eventbox>
          ))
        }
      </box>
    </Scrollable >
  </box >
}

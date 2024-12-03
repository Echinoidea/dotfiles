import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/Bar"
import { ArchCtlMenu } from "./widget/ArchCtlMenu"
import { exec } from "../../../../usr/share/astal/gjs"
import { OrgMenu } from "./widget/OrgMenu"
import { KeyVisualizer } from "./widget/KeyVisualizer"

const scss = "./style.scss";
const css = "/tmp/style.css";
exec(`sass ${scss} ${css}`);

App.start({
  css: css,
  main() {
    App.get_monitors().map(Bar)
    ArchCtlMenu()
    OrgMenu()
    //KeyVisualizer()
  },
})

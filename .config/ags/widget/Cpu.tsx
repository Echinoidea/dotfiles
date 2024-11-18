import { bind, Variable } from "astal"
import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { CircularProgress } from "../../../../../usr/share/astal/gjs/gtk3/widget"


const cpu = Variable(0).poll(1000, "top -b -n 1", (stdout: string, prev: number) => {
  const cpuExtracted = stdout.split('\n')
    .find((line: string) => line.includes('Cpu(s)'))
    ?.split(/\s+/)[1]
    .replace(',', '.') || "";

  return parseFloat(cpuExtracted);
})

export function CpuIndicator(): JSX.Element {
  return <box>
    <label css={`font-size: 16px;`} label={"CPU"} />
    <levelbar className="ResourcesLevelBar" value={cpu()} minValue={0} maxValue={100} widthRequest={270} />
  </box>
}


import { bind, Variable } from "astal"
import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { CircularProgress } from "../../../../../usr/share/astal/gjs/gtk3/widget"


const ram = Variable(0).poll(1000, "top -b -n 1", (stdout: string, prev: number) => {
  const memLine = stdout.split('\n')
    .find((line: string) => line.includes('MiB Mem')) || "";
  const totalMem = parseFloat(memLine.split(/\s+/)[3]); // Total memory
  const usedMem = parseFloat(memLine.split(/\s+/)[7]);  // Used memory

  if (isNaN(totalMem) || isNaN(usedMem)) return prev;

  const usagePercentage = (usedMem / totalMem) * 100;
  return usagePercentage;
});

export function RamIndicator(): JSX.Element {
  return <box>
    <label css={`font-size: 16px;`} label={"MEM"} />
    <levelbar className="ResourcesLevelBar" value={ram()} minValue={0} maxValue={100} widthRequest={270} />
  </box>
}



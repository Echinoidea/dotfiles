import { bind, Variable } from "astal"
import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { CircularProgress } from "../../../../../usr/share/astal/gjs/gtk3/widget"


const cpu = Variable(0).poll(1000, "top -b -n 1", (stdout: string, prev: number) => {
  if (!stdout) {
    stdout = ""
  }

  const cpuExtracted = stdout.split('\n')
    .find((line: string) => line.includes('Cpu(s)'))
    ?.split(/\s+/)[1]
    .replace(',', '.') || ""

  return Number(cpuExtracted) / 100;
})

export function CpuIndicator(): JSX.Element {
  return <CircularProgress
    className="CircleIndicator"
    value={cpu()}
    startAt={0.75}
    endAt={0.75}
    rounded
    inverted
    child={<label css={'font-size: 20px;'} valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER} label={""} />
    }
  >
  </CircularProgress >
}


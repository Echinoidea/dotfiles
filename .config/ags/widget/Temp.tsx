import { bind, Variable } from "astal"
import { CircularProgress } from "../../../../../usr/share/astal/gjs/gtk3/widget"

const temp = Variable(0).poll(1000, "sensors", (stdout: string, prev: number) => {
  const line = stdout.split('\n').find(line => line.includes("Package id 0:"));

  if (line) {
    const tempValue = line.split(/\s+/)[3].replace(/[°C+]/g, '').trim();
    return parseFloat(tempValue) / 100;
  }

  return 0;
})

export function TempIndicator(): JSX.Element {
  return <CircularProgress
    className="CircleIndicator"
    value={temp()}
    startAt={0.75}
    endAt={0.75}
    rounded
    child={<label css={'font-size: 16px;'} label={"󰔄"} />
    }
  >
  </CircularProgress >
}

import Hyprland from "gi://AstalHyprland"
import { bind, exec, Variable } from "astal"

export function Workspaces(): JSX.Element {
  const hypr = Hyprland.get_default();

  return <box
    className="Workspaces"
    vertical
  >
    {bind(hypr, "workspaces").as(wss => wss
      .sort((a, b) => a.id - b.id)
      .map(ws => (
        <button
          className={bind(hypr, "focusedWorkspace").as(fw =>
            ws === fw ? "focused" : "")}
          onClicked={() => ws.focus()}>
          {bind(hypr, "focusedWorkspace").as(fw =>
            ws === fw ? "" : ws.id)}
        </button>
      ))
    )}
  </box>
}


//{
//  Array.from({ length: 5 }, (_, i) => i).map((id: number) => (<button className={focusedWorkspace.id === id ? "focused" : ""} onClick={() => {
//    if (hypr.get_workspaces().reverse()[id]) {
//      hypr.get_workspaces().reverse()[id].focus()
//    }
//  }}>
//    {bind(hypr, "focusedWorkspace").as(fw =>
//      id === fw.id ? "" : id + 1)}
//  </button>
//  ))
//}


//{bind(hypr, "workspaces").as(wss => wss
//  .sort((a, b) => a.id - b.id)
//  .map(ws => (
//    <button
//      className={bind(hypr, "focusedWorkspace").as(fw =>
//        ws === fw ? "focused" : ws.id.toString())}
//      onClicked={() => ws.focus()}>
//      {ws.id}
//    </button>
//  ))
//)}

//{bind(hypr, "focusedWorkspace").as(fw =>
//  ws === fw ? "" : ws.id)}

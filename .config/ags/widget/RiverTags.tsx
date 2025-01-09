import AstalRiver from "gi://AstalRiver?version=0.1";
import { bind, Variable } from "../../../../../usr/share/astal/gjs";
// Convert the base-10 tag bitfield to an array of occupied tags [1, 2, 3..]
function getOccupiedTags(bitmask: number): number[] {
  const occupiedTags: number[] = [];
  let tag = 1;
  while (bitmask > 0) {
    if (bitmask & 1) {
      occupiedTags.push(tag);
    }
    bitmask >>= 1;
    tag++;
  }

  return occupiedTags;
}

export function RiverTags(): JSX.Element {
  const river = AstalRiver.get_default()

  const output = river!.get_outputs()[0];
  // create a variable, which upates then either occupied or focused tags change
  // an generate a list of numbers for the tags
  // occupied and focused tags are combined, otherwise the focuse tag, wont show if empty
  const tags = Variable.derive(
    [bind(output, "occupied-tags"), bind(output, "focused-tags")],
    (occupied, focused) => {
      return getOccupiedTags(occupied | focused);
    }
  )

  //drop variable when widget is destroyed to prevent memorey leak
  //bind tha above Variable and create a button for each tag
  return <box
    onDestroy={() => tags.drop()}
    className="Workspaces"
    vertical
  >
    {
      tags().as((tags: any) => tags.map((tag: any) => {
        return (<button onClick={() => { }}>
          {bind(output, "focused-tags").as(f => (f & 1 << (tag - 1)) ? "" : tag)}
        </button>)
      }))
    }
  </box >
}

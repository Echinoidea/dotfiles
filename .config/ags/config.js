import { powerctl } from "./widgets/powerctl-window.js"
import { ArchCtl } from "./widgets/archctl.js"
import { rgbToHex } from "./utils/rgbToHex.js"
//import { NotificationPopups } from "./notifications.js"

const hyprland = await Service.import("hyprland")
//const notifications = await Service.import("notifications")
const audio = await Service.import("audio")
const battery = await Service.import("battery")


const time = Variable("", {
  poll: [1000, 'date "+%I\n%M"'],
})

const date = Variable("", {
  poll: [1000, 'date "+%m\n%e"'],
})



const clockWidgetTime = Variable("", {
  poll: [1000, 'date "+%I:%M"'],
})

const clockWidgetDate = Variable("", {
  poll: [6000, 'date "+%Y/%m/%e\n%A"'],
})


const divide = ([total, free]) => free / total

const cpu = Variable(0, {
  poll: [2000, 'top -b -n 1', out => divide([100, out.split('\n')
    .find(line => line.includes('Cpu(s)'))
    .split(/\s+/)[1]
    .replace(',', '.')])],
})

const temp = Variable(0, {
  poll: [1000, 'sensors', out => {
    const line = out.split('\n').find(line => line.includes("Package id 0:"));
    if (line) {
      const tempValue = line.split(/\s+/)[3].replace(/[°C+]/g, '').trim();
      return parseFloat(tempValue) / 100;
    }
    return 0; // Default value if not found
  }]
})


const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`);

const activeId = hyprland.active.workspace.bind("id")

const Workspaces = () => Widget.EventBox({
  onScrollDown: () => dispatch('+1'),
  onScrollUp: () => dispatch('-1'),
  child: Widget.Box({
    vertical: true,
    class_name: "workspaces",
    children: Array.from({ length: 5 }, (_, i) => i + 1).map(i => Widget.Button({
      class_name: activeId.as(activeWsId => `${i === activeWsId ? "focused" : ""}`),
      xalign: 0.3,
      label: activeId.as(activeWsId => `${i === activeWsId ? "" : i}`),
      onClicked: () => dispatch(i),
    })),
  }),
})

function Clock() {
  return Widget.Label({
    class_name: "time",
    justification: "right",
    maxWidthChars: 2,
    wrap: true,
    label: date.bind(),
  })
}

function DateDisplay() {
  return Widget.Label({
    class_name: "date",
    justification: "right",
    maxWidthChars: 2,
    wrap: true,
    label: time.bind(),
  })
}


function BatteryLabel() {
  const value = battery.bind("percent").emitter.percent;


  const getColor = function(percent, charging) {
    let value = battery.bind("percent").emitter.percent

    if (charging) {
      return "#a3be8c";
    }

    if (value <= 25) {
      return "#ed8796";
    } else if (value <= 50) {
      return "#eed49f";
    } else {
      return "#eceff4";
    }
  };


  return Widget.Box({
    class_name: "battery",
    vertical: true,
    visible: battery.bind("available"),
    children: [
      Widget.CircularProgress({
        css: battery.bind("charging").as((charging) =>
          'min-width: 24px;'
          + 'min-height: 24px;'
          + 'font-size: 2px;'
          + 'margin: 1px;'
          + 'background-color: #171717;'
          + `color: ${getColor(value, charging)};`
        ),
        rounded: false,
        inverted: false,
        startAt: 0.75,
        value: battery.bind('percent').as(p => p / 100),
        child: Widget.Label({
          className: "battery-label",
          label: "󱐋"
        })
      }),
    ],
  })
}

function ArchCtlTrigger() {
  return Widget.Button({
    label: "",
    class_name: "archctl",
    xalign: 0.25,
    on_primary_click: () => {
      App.ToggleWindow("ArchCtl")
    }
  })
}

function CpuTemp() {
  const getColor = function(value) {

    const tempVal = value;
    if (tempVal > .9) {
      return "#ed8796";
    } else if (tempVal > .75) {
      return "#eed49f";
    } else {
      return "#eceff4";
    }
  }

  console.log(temp.getValue())

  return Widget.Box({
    class_name: "cpu-temp",
    vertical: true,
    children: [
      Widget.CircularProgress({
        css: temp.bind("value").as((value) =>
          'min-width: 24px;'
          + 'min-height: 24px;'
          + 'font-size: 2px;'
          + 'margin: 1px;'
          + 'background-color: #171717;'
          + `color: ${getColor(value)};`
        ),
        rounded: false,
        inverted: false,
        startAt: 0.75,
        value: temp.bind(),
        child: Widget.Label({
          className: "cpu-temp-label",
          label: "󰔄"
        })
      }),
    ],
  })
}
const volumeIcon = Widget.Icon({ className: "volumeIcon" }).hook(audio.speaker, self => {

  const vol = audio.speaker.volume * 100;
  const icon = [
    [101, 'overamplified'],
    [67, 'high'],
    [34, 'medium'],
    [1, 'low'],
    [0, 'muted'],
  ].find(([threshold]) => Number(threshold) <= Number(vol))?.[1];

  self.icon = `audio-volume-${icon}-symbolic`;
  self.tooltip_text = `volume ${Math.floor(vol)}%`;
})

function Volume() {
  const scaleTo255 = (value) => {
    value = Math.max(0, Math.min(100, value));

    return Math.round((value / 100) * 255);
  }

  const getColor = function(value) {
    return (rgbToHex(scaleTo255(value) + 25, scaleTo255(value) + 25, scaleTo255(value) + 25));
  }

  const vol = audio.speaker.volume;
  console.log(vol)

  return Widget.Box({
    class_name: "cpu-temp",
    vertical: true,
    children: [
      Widget.CircularProgress({
        rounded: false,
        inverted: false,
        startAt: 0.75,
        value: vol,
        child: volumeIcon,
      }).hook(audio.speaker, (self) => {
        // Set the progress value and color dynamically
        const vol = audio.speaker.volume * 100; // Convert to percentage
        self.value = vol / 100; // `value` expects a 0-1 range
        self.css = `
          min-width: 24px;
          min-height: 24px;
          font-size: 2px;
          margin: 1px;
          background-color: #171717;
          color: ${getColor(vol)};
        `;
      }),
    ]
  })

}

// layout of the bar
function Top() {
  return Widget.Box({
    className: "modules-top",
    vertical: true,
    spacing: 8,
    children: [
      ArchCtlTrigger(),
      BatteryLabel(),
      CpuTemp(),
      Volume()
    ],
  })
}

function Center() {
  return Widget.Box({
    spacing: 8,
    children: [
      Workspaces()
    ],
  })
}

function Bottom() {
  return Widget.Box({
    className: "modules-bottom",
    spacing: 8,
    vpack: 'end',
    vertical: true,
    children: [
      DateDisplay(),
      Clock(),
    ],
  })
}

function Bar(monitor = 0) {
  return Widget.Window({
    name: `bar`,
    class_name: "bar",
    monitor,
    heightRequest: 1062,
    anchor: ["left"],
    margins: [0, 0, 0, 4],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      vertical: true,
      start_widget: Top(),
      center_widget: Center(),
      end_widget: Bottom(),
    }),
  })
}


App.config({
  style: "./style.css",
  windows: [
    Bar(),
    ArchCtl(clockWidgetTime.value, clockWidgetDate.value),
    powerctl,
  ],
})

export { }

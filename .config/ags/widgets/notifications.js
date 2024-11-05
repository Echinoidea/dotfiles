const notifications = await Service.import("notifications")

/** @param {import('resource:///com/github/Aylur/ags/service/notifications.js').Notification} n */
function NotificationIcon({ app_entry, app_icon, image }) {
  if (image) {
    return Widget.Box({
      css: `background-image: url("${image}");`
        + "background-size: contain;"
        + "background-repeat: no-repeat;"
        + "background-position: center;",
    })
  }

  let icon = "dialog-information-symbolic"
  if (Utils.lookUpIcon(app_icon))
    icon = app_icon

  if (app_entry && Utils.lookUpIcon(app_entry))
    icon = app_entry

  return Widget.Box({
    child: Widget.Icon(icon),
  })
}

function Notification(n) {
  const icon = Widget.Box({
    vpack: "start",
    class_name: "icon",
    child: NotificationIcon(n),
  })

  const title = Widget.Label({
    class_name: "title",
    xalign: 0,
    justification: "left",
    hexpand: true,
    max_width_chars: 24,
    truncate: "end",
    wrap: true,
    label: n.summary,
    use_markup: true,
  })

  const body = Widget.Label({
    class_name: "body",
    hexpand: true,
    use_markup: true,
    xalign: 0,
    justification: "left",
    label: n.body,
    wrap: true,
  })

  const actions = Widget.Box({
    class_name: "actions",
    children: n.actions.map(({ id, label }) => Widget.Button({
      class_name: "action-button",
      on_clicked: () => {
        n.invoke(id)
        n.dismiss()
      },
      hexpand: true,
      child: Widget.Label(label),
    })),
  })

  return Widget.EventBox(
    {
      attribute: { id: n.id },
      on_primary_click: n.dismiss,
    },
    Widget.Box(
      {
        class_name: `notification`,
        vertical: true,
      },
      Widget.Box([
        icon,
        Widget.Box(
          { vertical: true, spacing: 4, },
          title,
          body,
        ),
      ]),
      //actions,
    ),
  )
}

export function NotificationPopups(monitor = 0) {
  const list = Widget.Box({
    vertical: true,
    spacing: 4,
    children: notifications.popups.map(Notification),
  })

  function onNotified(_, /** @type {number} */ id) {
    const n = notifications.getNotification(id)
    if (n)
      list.children = [Notification(n), ...list.children]
  }

  function onDismissed(_, /** @type {number} */ id) {
    list.children.find(n => n.attribute.id === id)?.destroy()
  }

  list.hook(notifications, onNotified, "notified")
    .hook(notifications, onDismissed, "dismissed")

  return Widget.Window({
    monitor,
    name: `notifications`,
    class_name: "notification-popups",
    anchor: ["bottom", "left"],
    margins: [0, 0, 8, 4],
    hexpand: true,
    child: Widget.Box({
      class_name: "notifications",
      vertical: true,
      child: list,
    }),
  })
}

import { Gio, Variable } from "astal"
import GLib from "gi://GLib?version=2.0"
import { App, Astal } from "../../../../../usr/share/astal/gjs/gtk3";

export function KeyVisualizer(): JSX.Element {
  const subprocess = new Gio.Subprocess({
    argv: ['sudo', 'showmethekey-cli'],
    flags: Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE,
  });

  let label = Variable("");

  if (!subprocess.init(null)) {
    label.set('Failed to start key monitor.');
  }

  const stdoutStream = subprocess.get_stdout_pipe();
  const dataStream = new Gio.DataInputStream({
    base_stream: stdoutStream!,
  });

  let isCaps = false;
  let isShift = false;
  let isCtrl = false;
  let isAlt = false;
  let isSuper = false;

  const specialKeyMapping = {
    "KEY_GRAVE": "`",
    "KEY_SEMICOLON": ";",
    "KEY_EQUAL": "=",
    "KEY_COMMA": ",",
    "KEY_MINUS": "-",
    "KEY_DOT": ".",
    "KEY_SLASH": "/",
    "KEY_BACKSLASH": "\\",
    "KEY_APOSTROPHE": "'",
    "KEY_LEFTBRACE": "[",
    "KEY_RIGHTBRACE": "]",
    "KEY_SPACE": " ",
    "KEY_BACKSPACE": "BACK",
    "KEY_TAB": "TAB",
    "KEY_ENTER": "ENTER",
    "KEY_1": "1",
    "KEY_2": "2",
    "KEY_3": "3",
    "KEY_4": "4",
    "KEY_5": "5",
    "KEY_6": "6",
    "KEY_7": "7",
    "KEY_8": "8",
    "KEY_9": "9",
    "KEY_0": "0",
  };

  const shiftSpecialKeyMapping = {
    "KEY_GRAVE": "~",
    "KEY_SEMICOLON": ":",
    "KEY_EQUAL": "+",
    "KEY_COMMA": "<",
    "KEY_MINUS": "_",
    "KEY_DOT": ">",
    "KEY_SLASH": "?",
    "KEY_BACKSLASH": "|",
    "KEY_APOSTROPHE": '"',
    "KEY_LEFTBRACE": "{",
    "KEY_RIGHTBRACE": "}",
    "KEY_1": "!",
    "KEY_2": "@",
    "KEY_3": "#",
    "KEY_4": "$",
    "KEY_5": "%",
    "KEY_6": "^",
    "KEY_7": "&",
    "KEY_8": "*",
    "KEY_9": "(",
    "KEY_0": ")",
  };

  const readOutput = () => {
    dataStream.read_line_async(GLib.PRIORITY_DEFAULT, null, (stream, res) => {
      try {
        const [line] = stream!.read_line_finish_utf8(res);
        if (line) {
          const event = JSON.parse(line);

          if (event.key_name === "KEY_CAPSLOCK" && event.state_name === "PRESSED") {
            isCaps = !isCaps;
          }

          // Handle Shift
          if (event.key_name === "KEY_LEFTSHIFT" || event.key_name === "KEY_RIGHTSHIFT") {
            if (event.state_name === "PRESSED") {
              isShift = true;
            } else if (event.state_name === "RELEASED") {
              isShift = false;
            }
          }

          // Handle Ctrl
          if (event.key_name === "KEY_LEFTCTRL" || event.key_name === "KEY_RIGHTCTRL") {
            if (event.state_name === "PRESSED") {
              isCtrl = true;
            } else if (event.state_name === "RELEASED") {
              isCtrl = false;
            }
          }

          // Handle Alt
          if (event.key_name === "KEY_LEFTALT" || event.key_name === "KEY_RIGHTALT") {
            if (event.state_name === "PRESSED") {
              isAlt = true;
            } else if (event.state_name === "RELEASED") {
              isAlt = false;
            }
          }

          // Handle Super
          if (event.key_name === "KEY_LEFTMETA" || event.key_name === "KEY_RIGHTMETA") {
            if (event.state_name === "PRESSED") {
              isSuper = true;
            } else if (event.state_name === "RELEASED") {
              isSuper = false;
            }
          }

          if (
            event.state_name === "PRESSED" &&
            !["KEY_LEFTSHIFT", "KEY_RIGHTSHIFT", "KEY_CAPSLOCK", "KEY_LEFTCTRL", "KEY_RIGHTCTRL", "KEY_LEFTALT", "KEY_RIGHTALT", "KEY_LEFTMETA", "KEY_RIGHTMETA"].includes(event.key_name)
          ) {
            let key;
            if (specialKeyMapping[event.key_name as keyof typeof specialKeyMapping]) {
              key = isShift && shiftSpecialKeyMapping[event.key_name as keyof typeof shiftSpecialKeyMapping]
                ? shiftSpecialKeyMapping[event.key_name as keyof typeof shiftSpecialKeyMapping]
                : specialKeyMapping[event.key_name as keyof typeof specialKeyMapping];
            } else {

              const isUpper = isCaps !== isShift;
              key = `${isUpper ? event.key_name : event.key_name.toLowerCase()}`.split('_')[1];
            }

            let formattedKey = key;
            if (isCtrl) formattedKey = `<C-${key}>`;
            if (isAlt) formattedKey = `ALT+${formattedKey}`;
            if (isSuper) formattedKey = `SUPER+${formattedKey}`;
            if (label.get().length > 50) {
              const currentContent = label.get();
              label.set(currentContent.slice(-50));
            }
            label.set(label.get() + formattedKey + " ");


          }

          readOutput();
        }
      } catch (e) {
        logError(e);
        label.set('Error');
      }
    });
  };

  readOutput();

  return <window
    name="KeyVisualizer"
    visible={false}
    //is_active={false}
    anchor={Astal.WindowAnchor.BOTTOM}
    application={App}
    keymode={Astal.Keymode.NONE}>
    <box widthRequest={400} className="KeyVisualizerBox">
      <label label={label()} />
    </box>
  </window >
}


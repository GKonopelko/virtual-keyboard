const keyboard = {
  elements: {
    container: null,
    monitor: null,
    textarea: null,
    keyboard: null,

    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
  },

  init() {
    // Create main elements

    this.elements.container = document.createElement("div");
    this.elements.monitor = document.createElement("div");
    this.elements.textarea = document.createElement("textarea");
    this.elements.keyboard = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // this.elements.main = document.createElement("div");

    // Setup main elements
    // this.elements.main.classList.add("keyboard", "keyboard--hidden");
    // this.elements.keysContainer.classList.add("keyboard__keys");

    this.elements.keysContainer.className = "keyboard__keys";

    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    this.elements.container.className = "container";
    this.elements.monitor.className = "monitor";
    this.elements.textarea.className = "text-input";
    this.elements.textarea.innerHTML =
      "Virtual Keyboard    ОС Windows     Переключение языка: левыe shift + alt";

    this.elements.keyboard.className = "keyboard";

    // Add to DOM
    // this.elements.main.appendChild(this.elements.keysContainer);
    // document.body.appendChild(this.elements.main);

    document.body.append(this.elements.container);
    document.body.append(this.elements.monitor);
    document.body.lastChild.append(this.elements.textarea);
    document.body.append(this.elements.keyboard);
    document.body.lastChild.append(this.elements.keysContainer);

    // Automatically use keyboard for elements with .text-input
    document.querySelectorAll(".text-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "Backspace",
      "Tab",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "[",
      "]",
      "\\",
      "Del",
      "CapsLock",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "'",
      "Enter",
      "Shift",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "/",
      "▲",
      "Shiftr",
      "Ctrl",
      "Win",
      "Alt",
      "Space",
      "Alt",
      "◄",
      "▼",
      "►",
      "Ctrl",
    ];

    // Creates HTML for an icon

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["Backspace", "Del", "Enter", "Shiftr"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "Backspace":
          keyElement.classList.add("keyboard__key_wide");
          // keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key_wide",
            "keyboard__key--activatable"
          );
          // keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key_wide");
          // keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          // keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key_wide", "keyboard__key--dark");
          // keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },
};

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
});

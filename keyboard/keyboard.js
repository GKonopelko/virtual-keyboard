const keyboard = {
  elements: {
    title: null,
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
    this.elements.title = document.createElement("p");
    this.elements.container = document.createElement("div");
    this.elements.monitor = document.createElement("div");
    this.elements.textarea = document.createElement("textarea");
    this.elements.keyboard = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    this.elements.keysContainer.className = "keyboard__keys";
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    this.elements.container.className = "container";
    this.elements.monitor.className = "monitor";
    this.elements.textarea.className = "text-input";
    this.elements.title.innerHTML = "Virtual Keyboard    ОС Windows";
    this.elements.keyboard.className = "keyboard";

    document.body.append(this.elements.title);
    document.body.append(this.elements.container);
    document.body.append(this.elements.monitor);
    document.body.lastChild.append(this.elements.textarea);
    document.body.append(this.elements.keyboard);
    document.body.lastChild.append(this.elements.keysContainer);

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

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["Backspace", "Del", "Enter", "Shiftr"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.className = "keyboard__key";

      switch (key) {
        case "Backspace":
          keyElement.classList.add("keyboard__key_wide");
          keyElement.innerHTML = "Backspace";
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });
          break;

        case "Tab":
          keyElement.classList.add("keyboard__key_wide");
          keyElement.innerHTML = "Tab";
          keyElement.addEventListener("click", () => {
            this.properties.value += "    ";
            this._triggerEvent("oninput");
          });
          break;

        case "Del":
          keyElement.classList.add("keyboard__key_wide");
          keyElement.innerHTML = "Del";
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });
          break;

        case "CapsLock":
          keyElement.classList.add("keyboard__key_wide");
          keyElement.innerHTML = "CapsLock";
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(this.properties.capsLock);
          });
          break;

        case "Shift":
          keyElement.classList.add("keyboard__key_wide");
          keyElement.innerHTML = "Shift";
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(this.properties.capsLock);
          });
          break;

        case "Shiftr":
          keyElement.classList.add("keyboard__key_wide");
          keyElement.innerHTML = "Shift";
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(this.properties.capsLock);
          });
          break;

        case "Ctrl":
          keyElement.classList.add("keyboard__key_wide");
          keyElement.innerHTML = "Ctrl";
          break;

        case "Win":
          keyElement.classList.add("keyboard__key_wide");
          keyElement.innerHTML = "Win";
          break;

        case "Alt":
          keyElement.classList.add("keyboard__key_wide");
          keyElement.innerHTML = "Alt";
          break;

        case "Enter":
          keyElement.classList.add("keyboard__key_wide");
          keyElement.innerHTML = "Enter";
          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });
          break;

        case "Space":
          keyElement.classList.add("keyboard__key_space");
          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
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

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },
};

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
});

(() => {
  "use strict";

  const CANVAS_WIDTH = 1920;
  const CANVAS_HEIGHT = 1080;
  const CACHE_DB_NAME = "adv-message-movie-tool";
  const CACHE_STORE_NAME = "projects";
  const CACHE_KEY = "autosave";

  const FONT_OPTIONS = [
    { label: "システムゴシック", value: "\"Yu Gothic UI\", \"Yu Gothic\", \"Hiragino Sans\", \"Meiryo\", sans-serif" },
    { label: "Noto Sans JP", value: "\"Noto Sans JP\", sans-serif" },
    { label: "Zen Kaku Gothic New", value: "\"Zen Kaku Gothic New\", sans-serif" },
    { label: "BIZ UDPGothic", value: "\"BIZ UDPGothic\", sans-serif" },
    { label: "BIZ UDGothic", value: "\"BIZ UDGothic\", sans-serif" },
    { label: "M PLUS 1p", value: "\"M PLUS 1p\", sans-serif" },
    { label: "M PLUS 1", value: "\"M PLUS 1\", sans-serif" },
    { label: "M PLUS 2", value: "\"M PLUS 2\", sans-serif" },
    { label: "IBM Plex Sans JP", value: "\"IBM Plex Sans JP\", sans-serif" },
    { label: "Sawarabi Gothic", value: "\"Sawarabi Gothic\", sans-serif" },
    { label: "Kosugi", value: "\"Kosugi\", sans-serif" },
    { label: "M PLUS Rounded 1c", value: "\"M PLUS Rounded 1c\", sans-serif" },
    { label: "Zen Maru Gothic", value: "\"Zen Maru Gothic\", sans-serif" },
    { label: "Kiwi Maru", value: "\"Kiwi Maru\", serif" },
    { label: "Kosugi Maru", value: "\"Kosugi Maru\", sans-serif" },
    { label: "Noto Serif JP", value: "\"Noto Serif JP\", serif" },
    { label: "Shippori Mincho", value: "\"Shippori Mincho\", serif" },
    { label: "Zen Old Mincho", value: "\"Zen Old Mincho\", serif" },
    { label: "Sawarabi Mincho", value: "\"Sawarabi Mincho\", serif" },
    { label: "Hina Mincho", value: "\"Hina Mincho\", serif" },
    { label: "BIZ UDMincho", value: "\"BIZ UDMincho\", serif" },
    { label: "BIZ UDPMincho", value: "\"BIZ UDPMincho\", serif" },
    { label: "Klee One", value: "\"Klee One\", cursive" },
    { label: "Yomogi", value: "\"Yomogi\", cursive" },
    { label: "Yuji Syuku", value: "\"Yuji Syuku\", serif" },
    { label: "Yuji Mai", value: "\"Yuji Mai\", serif" },
    { label: "Yuji Boku", value: "\"Yuji Boku\", serif" },
    { label: "DotGothic16", value: "\"DotGothic16\", sans-serif" },
    { label: "Dela Gothic One", value: "\"Dela Gothic One\", sans-serif" },
    { label: "Rampart One", value: "\"Rampart One\", sans-serif" },
    { label: "Reggae One", value: "\"Reggae One\", sans-serif" },
    { label: "Stick", value: "\"Stick\", sans-serif" }
  ];

  const $ = (selector) => document.querySelector(selector);

  const canvas = $("#previewCanvas");
  const ctx = canvas.getContext("2d", { alpha: true });

  const audioInput = $("#audioInput");
  const audioPlayer = $("#audioPlayer");
  const windowImageInput = $("#windowImageInput");
  const clearWindowImageBtn = $("#clearWindowImageBtn");

  const saveJsonBtn = $("#saveJsonBtn");
  const loadJsonInput = $("#loadJsonInput");
  const saveCacheBtn = $("#saveCacheBtn");
  const loadCacheBtn = $("#loadCacheBtn");

  const characterNameInput = $("#characterNameInput");
  const addCharacterBtn = $("#addCharacterBtn");
  const characterList = $("#characterList");

  const lineCharacterSelect = $("#lineCharacterSelect");
  const lineTextInput = $("#lineTextInput");
  const lineStartInput = $("#lineStartInput");
  const lineEndInput = $("#lineEndInput");
  const lineCpsInput = $("#lineCpsInput");
  const setStartFromAudioBtn = $("#setStartFromAudioBtn");
  const setEndFromAudioBtn = $("#setEndFromAudioBtn");
  const addOrUpdateLineBtn = $("#addOrUpdateLineBtn");
  const cancelEditLineBtn = $("#cancelEditLineBtn");
  const lineList = $("#lineList");

  const previewTimeInput = $("#previewTimeInput");
  const previewTimeRange = $("#previewTimeRange");
  const renderPreviewBtn = $("#renderPreviewBtn");
  const activeLineInfo = $("#activeLineInfo");

  const settingsPanel = $("#settingsPanel");

  const exportFpsInput = $("#exportFpsInput");
  const exportPrefixInput = $("#exportPrefixInput");
  const exportStartInput = $("#exportStartInput");
  const exportEndInput = $("#exportEndInput");
  const exportZipBtn = $("#exportZipBtn");
  const exportProgress = $("#exportProgress");

  const defaultSettings = () => ({
    window: {
      x: 120,
      y: 760,
      width: 1680,
      height: 250,
      fallbackOpacity: 0.72
    },
    nameText: {
      x: 190,
      y: 800,
      fontSize: 36,
      fontFamily: "\"Noto Sans JP\", sans-serif",
      color: "#ffffff",
      strokeColor: "#1c3b52",
      strokeWidth: 4
    },
    bodyText: {
      x: 190,
      y: 870,
      width: 1510,
      fontSize: 42,
      fontFamily: "\"Noto Sans JP\", sans-serif",
      lineHeight: 58,
      maxLines: 3,
      color: "#ffffff",
      strokeColor: "#1c3b52",
      strokeWidth: 4
    },
    font: {
      family: "Yu Gothic UI, Yu Gothic, Hiragino Sans, Meiryo, sans-serif"
    },
    shadow: {
      blur: 0,
      offsetX: 0,
      offsetY: 0,
      color: "#000000"
    }
  });

  const state = {
    characters: [{ id: "char_default", name: "キャラクター" }],
    lines: [],
    selectedLineId: null,
    lastCharacterId: localStorage.getItem("adv-message-tool-last-character") || "char_default",
    windowImageDataUrl: null,
    windowImage: null,
    audioObjectUrl: null,
    settings: defaultSettings()
  };

  const settingDefinitions = [
    { label: "ウィンドウX", path: "window.x", type: "range", min: 0, max: CANVAS_WIDTH, step: 1 },
    { label: "ウィンドウY", path: "window.y", type: "range", min: 0, max: CANVAS_HEIGHT, step: 1 },
    { label: "ウィンドウ幅", path: "window.width", type: "range", min: 100, max: CANVAS_WIDTH, step: 1 },
    { label: "ウィンドウ高さ", path: "window.height", type: "range", min: 50, max: CANVAS_HEIGHT, step: 1 },
    { label: "仮ウィンドウ濃度", path: "window.fallbackOpacity", type: "range", min: 0, max: 1, step: 0.01 },

    { label: "名前X", path: "nameText.x", type: "range", min: 0, max: CANVAS_WIDTH, step: 1 },
    { label: "名前Y", path: "nameText.y", type: "range", min: 0, max: CANVAS_HEIGHT, step: 1 },
    { label: "名前サイズ", path: "nameText.fontSize", type: "range", min: 10, max: 120, step: 1 },
    { label: "名前フォント", path: "nameText.fontFamily", type: "select", options: FONT_OPTIONS },
    { label: "名前色", path: "nameText.color", type: "color" },
    { label: "名前フチ色", path: "nameText.strokeColor", type: "color" },
    { label: "名前フチ太さ", path: "nameText.strokeWidth", type: "range", min: 0, max: 20, step: 1 },

    { label: "本文X", path: "bodyText.x", type: "range", min: 0, max: CANVAS_WIDTH, step: 1 },
    { label: "本文Y", path: "bodyText.y", type: "range", min: 0, max: CANVAS_HEIGHT, step: 1 },
    { label: "折り返し幅", path: "bodyText.width", type: "range", min: 100, max: CANVAS_WIDTH, step: 1 },
    { label: "本文サイズ", path: "bodyText.fontSize", type: "range", min: 10, max: 120, step: 1 },
    { label: "本文フォント", path: "bodyText.fontFamily", type: "select", options: FONT_OPTIONS },
    { label: "行間", path: "bodyText.lineHeight", type: "range", min: 10, max: 160, step: 1 },
    { label: "最大行数", path: "bodyText.maxLines", type: "range", min: 1, max: 8, step: 1 },
    { label: "本文色", path: "bodyText.color", type: "color" },
    { label: "本文フチ色", path: "bodyText.strokeColor", type: "color" },
    { label: "本文フチ太さ", path: "bodyText.strokeWidth", type: "range", min: 0, max: 20, step: 1 },

    { label: "影ぼかし", path: "shadow.blur", type: "range", min: 0, max: 40, step: 1 },
    { label: "影X", path: "shadow.offsetX", type: "range", min: -30, max: 30, step: 1 },
    { label: "影Y", path: "shadow.offsetY", type: "range", min: -30, max: 30, step: 1 },
    { label: "影色", path: "shadow.color", type: "color" }
  ];

  function uniqueId(prefix) {
    if (crypto && typeof crypto.randomUUID === "function") {
      return `${prefix}_${crypto.randomUUID()}`;
    }
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }

  function clampNumber(value, min, max) {
    const n = Number(value);
    if (!Number.isFinite(n)) return min;
    return Math.min(max, Math.max(min, n));
  }

  function toFixedSafe(value, digits = 2) {
    const n = Number(value);
    if (!Number.isFinite(n)) return "0";
    return String(Math.round(n * 10 ** digits) / 10 ** digits);
  }

  function getByPath(object, path) {
    return path.split(".").reduce((current, key) => current?.[key], object);
  }

  function setByPath(object, path, value) {
    const keys = path.split(".");
    const last = keys.pop();
    const target = keys.reduce((current, key) => current[key], object);
    target[last] = value;
  }

  function deepMerge(base, incoming) {
    if (!incoming || typeof incoming !== "object") return base;
    for (const [key, value] of Object.entries(incoming)) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        if (!base[key] || typeof base[key] !== "object") base[key] = {};
        deepMerge(base[key], value);
      } else {
        base[key] = value;
      }
    }
    return base;
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsText(file, "utf-8");
    });
  }

  function loadImageFromDataUrl(dataUrl) {
    return new Promise((resolve, reject) => {
      if (!dataUrl) {
        resolve(null);
        return;
      }
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = dataUrl;
    });
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function downloadText(text, filename, mime = "application/json") {
    const blob = new Blob([text], { type: `${mime};charset=utf-8` });
    downloadBlob(blob, filename);
  }

  function drawRoundRect(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
  }

  function drawFallbackWindow(context) {
    const s = state.settings.window;
    const opacity = clampNumber(s.fallbackOpacity, 0, 1);
    if (opacity <= 0) return;

    context.save();
    drawRoundRect(context, s.x, s.y, s.width, s.height, 32);
    context.fillStyle = `rgba(24, 53, 74, ${opacity})`;
    context.fill();
    context.lineWidth = 4;
    context.strokeStyle = "rgba(255,255,255,0.75)";
    context.stroke();
    context.restore();
  }

  function splitTextByWidth(context, text, maxWidth) {
    const output = [];
    const paragraphs = String(text || "").split(/\r?\n/);

    for (const paragraph of paragraphs) {
      let line = "";
      const chars = Array.from(paragraph);

      if (chars.length === 0) {
        output.push("");
        continue;
      }

      for (const char of chars) {
        const test = line + char;
        if (line && context.measureText(test).width > maxWidth) {
          output.push(line);
          line = char;
        } else {
          line = test;
        }
      }
      output.push(line);
    }

    return output;
  }

  function applyTextShadow(context) {
    const s = state.settings.shadow;
    context.shadowBlur = Number(s.blur) || 0;
    context.shadowOffsetX = Number(s.offsetX) || 0;
    context.shadowOffsetY = Number(s.offsetY) || 0;
    context.shadowColor = s.color || "#000000";
  }

  function drawStrokedText(context, text, x, y, options) {
    context.save();
    applyTextShadow(context);
    const fontFamily = options.fontFamily || state.settings.font?.family || "\"Noto Sans JP\", sans-serif";
    context.font = `${options.fontSize}px ${fontFamily}`;
    context.textBaseline = "top";
    context.lineJoin = "round";

    if (Number(options.strokeWidth) > 0) {
      context.lineWidth = Number(options.strokeWidth);
      context.strokeStyle = options.strokeColor;
      context.strokeText(text, x, y);
    }

    context.fillStyle = options.color;
    context.fillText(text, x, y);
    context.restore();
  }

  function findCharacter(id) {
    return state.characters.find((character) => character.id === id) || null;
  }

  function getActiveLine(time) {
    return [...state.lines]
      .sort((a, b) => Number(b.start) - Number(a.start))
      .find((line) => Number(line.start) <= time && time <= Number(line.end)) || null;
  }

  function getAnimatedText(line, time) {
    const cps = Number(line.charsPerSecond) || 24;
    const elapsed = Math.max(0, time - Number(line.start));
    const visibleLength = Math.floor(elapsed * cps);
    return Array.from(line.text || "").slice(0, visibleLength).join("");
  }

  function renderAt(time) {
    const currentTime = Number(time) || 0;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const w = state.settings.window;
    if (state.windowImage) {
      ctx.drawImage(state.windowImage, w.x, w.y, w.width, w.height);
    } else {
      drawFallbackWindow(ctx);
    }

    const activeLine = getActiveLine(currentTime);
    if (!activeLine) {
      activeLineInfo.textContent = "表示中のセリフなし";
      return;
    }

    const character = findCharacter(activeLine.characterId);
    const characterName = character?.name || "";
    const visibleText = getAnimatedText(activeLine, currentTime);

    const nameStyle = state.settings.nameText;
    drawStrokedText(ctx, characterName, nameStyle.x, nameStyle.y, nameStyle);

    const bodyStyle = state.settings.bodyText;
    ctx.save();
    const bodyFontFamily = bodyStyle.fontFamily || state.settings.font?.family || "\"Noto Sans JP\", sans-serif";
    ctx.font = `${bodyStyle.fontSize}px ${bodyFontFamily}`;
    const wrappedLines = splitTextByWidth(ctx, visibleText, Number(bodyStyle.width) || 1200).slice(0, Number(bodyStyle.maxLines) || 3);
    ctx.restore();

    wrappedLines.forEach((line, index) => {
      drawStrokedText(
        ctx,
        line,
        bodyStyle.x,
        bodyStyle.y + index * bodyStyle.lineHeight,
        bodyStyle
      );
    });

    activeLineInfo.textContent = `${characterName}：${activeLine.text}`;
  }

  function currentPreviewTime() {
    if (audioPlayer.src && !audioPlayer.paused) return audioPlayer.currentTime;
    return Number(previewTimeInput.value) || 0;
  }

  function syncPreviewInputs(time) {
    const value = toFixedSafe(time, 2);
    previewTimeInput.value = value;
    previewTimeRange.value = value;
  }

  function updatePreviewMax() {
    const maxLineEnd = state.lines.reduce((max, line) => Math.max(max, Number(line.end) || 0), 0);
    const audioDuration = Number.isFinite(audioPlayer.duration) ? audioPlayer.duration : 0;
    const max = Math.max(30, maxLineEnd, audioDuration, Number(exportEndInput.value) || 0);
    previewTimeRange.max = toFixedSafe(max, 2);
  }

  function populateCharacterSelect() {
    lineCharacterSelect.innerHTML = "";

    for (const character of state.characters) {
      const option = document.createElement("option");
      option.value = character.id;
      option.textContent = character.name;
      lineCharacterSelect.appendChild(option);
    }

    const exists = state.characters.some((character) => character.id === state.lastCharacterId);
    const selectedId = exists ? state.lastCharacterId : state.characters[0]?.id;
    if (selectedId) {
      lineCharacterSelect.value = selectedId;
      state.lastCharacterId = selectedId;
      localStorage.setItem("adv-message-tool-last-character", selectedId);
    }
  }

  function renderCharacterList() {
    characterList.innerHTML = "";

    for (const character of state.characters) {
      const item = document.createElement("div");
      item.className = "character-item";

      const name = document.createElement("div");
      name.className = "character-name";
      name.textContent = character.name;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "danger";
      remove.textContent = "削除";
      remove.disabled = state.characters.length <= 1;
      remove.addEventListener("click", () => {
        const used = state.lines.some((line) => line.characterId === character.id);
        if (used && !confirm("このキャラクターを使用しているセリフがあります。削除しますか？")) return;
        state.characters = state.characters.filter((target) => target.id !== character.id);
        state.lines = state.lines.filter((line) => line.characterId !== character.id);
        if (state.lastCharacterId === character.id) state.lastCharacterId = state.characters[0]?.id || "";
        populateCharacterSelect();
        renderCharacterList();
        renderLineList();
        renderAt(currentPreviewTime());
      });

      item.append(name, remove);
      characterList.appendChild(item);
    }
  }

  function renderLineList() {
    lineList.innerHTML = "";
    const sortedLines = [...state.lines].sort((a, b) => Number(a.start) - Number(b.start));

    for (const line of sortedLines) {
      const character = findCharacter(line.characterId);
      const item = document.createElement("div");
      item.className = `line-item${line.id === state.selectedLineId ? " is-selected" : ""}`;

      const meta = document.createElement("div");
      meta.className = "line-meta";
      meta.innerHTML = `<span>${escapeHtml(character?.name || "未設定")}</span><span>${toFixedSafe(line.start)}s - ${toFixedSafe(line.end)}s / ${line.charsPerSecond}cps</span>`;

      const text = document.createElement("div");
      text.className = "line-text";
      text.textContent = line.text;

      const actions = document.createElement("div");
      actions.className = "line-actions";

      const edit = document.createElement("button");
      edit.type = "button";
      edit.textContent = "編集";
      edit.addEventListener("click", () => selectLineForEdit(line.id));

      const duplicate = document.createElement("button");
      duplicate.type = "button";
      duplicate.textContent = "複製";
      duplicate.addEventListener("click", () => duplicateLine(line.id));

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "danger";
      remove.textContent = "削除";
      remove.addEventListener("click", () => removeLine(line.id));

      actions.append(edit, duplicate, remove);
      item.append(meta, text, actions);
      lineList.appendChild(item);
    }

    updatePreviewMax();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function selectLineForEdit(id) {
    const line = state.lines.find((target) => target.id === id);
    if (!line) return;

    state.selectedLineId = id;
    lineCharacterSelect.value = line.characterId;
    lineTextInput.value = line.text;
    lineStartInput.value = toFixedSafe(line.start);
    lineEndInput.value = toFixedSafe(line.end);
    lineCpsInput.value = line.charsPerSecond;
    addOrUpdateLineBtn.textContent = "セリフ更新";
    renderLineList();
  }

  function clearLineEdit() {
    state.selectedLineId = null;
    lineTextInput.value = "";
    lineStartInput.value = toFixedSafe(Number(lineEndInput.value) || 0);
    lineEndInput.value = toFixedSafe((Number(lineStartInput.value) || 0) + 3);
    lineCpsInput.value = "24";
    addOrUpdateLineBtn.textContent = "セリフ追加";
    renderLineList();
  }

  function getLineFormData() {
    const characterId = lineCharacterSelect.value;
    const text = lineTextInput.value.trim();
    const start = Number(lineStartInput.value);
    const end = Number(lineEndInput.value);
    const charsPerSecond = Math.max(1, Number(lineCpsInput.value) || 24);

    if (!characterId) throw new Error("キャラクターを登録してください。");
    if (!text) throw new Error("セリフを入力してください。");
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) {
      throw new Error("開始秒と終了秒を正しく入力してください。");
    }

    return { characterId, text, start, end, charsPerSecond };
  }

  function addOrUpdateLine() {
    try {
      const data = getLineFormData();
      state.lastCharacterId = data.characterId;
      localStorage.setItem("adv-message-tool-last-character", data.characterId);

      if (state.selectedLineId) {
        const index = state.lines.findIndex((line) => line.id === state.selectedLineId);
        if (index >= 0) state.lines[index] = { ...state.lines[index], ...data };
      } else {
        state.lines.push({ id: uniqueId("line"), ...data });
      }

      exportStartInput.value = toFixedSafe(Math.min(Number(exportStartInput.value) || data.start, data.start));
      exportEndInput.value = toFixedSafe(Math.max(Number(exportEndInput.value) || data.end, data.end));
      renderLineList();
      renderAt(currentPreviewTime());
      if (!state.selectedLineId) lineTextInput.value = "";
    } catch (error) {
      alert(error.message);
    }
  }

  function duplicateLine(id) {
    const line = state.lines.find((target) => target.id === id);
    if (!line) return;
    state.lines.push({
      ...line,
      id: uniqueId("line"),
      start: Number(line.end),
      end: Number(line.end) + Math.max(1, Number(line.end) - Number(line.start))
    });
    renderLineList();
    renderAt(currentPreviewTime());
  }

  function removeLine(id) {
    state.lines = state.lines.filter((line) => line.id !== id);
    if (state.selectedLineId === id) clearLineEdit();
    renderLineList();
    renderAt(currentPreviewTime());
  }

  function renderSettingsPanel() {
    settingsPanel.innerHTML = "";

    for (const definition of settingDefinitions) {
      const row = document.createElement("label");
      row.className = "setting-row";

      const label = document.createElement("span");
      label.textContent = definition.label;

      const mainInput = definition.type === "select"
        ? document.createElement("select")
        : document.createElement("input");

      mainInput.dataset.path = definition.path;

      const valueInput = definition.type === "select"
        ? document.createElement("span")
        : document.createElement("input");

      valueInput.dataset.path = definition.path;

      if (definition.type === "range") {
        mainInput.type = "range";
        mainInput.min = definition.min;
        mainInput.max = definition.max;
        mainInput.step = definition.step;
        valueInput.type = "number";
        valueInput.min = definition.min;
        valueInput.max = definition.max;
        valueInput.step = definition.step;
      } else if (definition.type === "color") {
        mainInput.type = "color";
        valueInput.type = "text";
        valueInput.placeholder = "#ffffff";
      } else if (definition.type === "select") {
        valueInput.className = "setting-value-label";

        for (const optionData of definition.options || []) {
          const option = document.createElement("option");
          option.value = optionData.value;
          option.textContent = optionData.label;
          option.style.fontFamily = optionData.value;
          mainInput.appendChild(option);
        }
      } else {
        mainInput.type = definition.type || "text";
        valueInput.type = "text";
      }

      const value = getByPath(state.settings, definition.path);
      mainInput.value = value;

      if (definition.type === "select") {
        const selected = (definition.options || []).find((option) => option.value === value);
        valueInput.textContent = selected?.label || "選択中";
      } else {
        valueInput.value = value;
      }

      const apply = (rawValue, source) => {
        let nextValue = rawValue;
        if (definition.type === "range") {
          nextValue = clampNumber(rawValue, definition.min, definition.max);
        }

        setByPath(state.settings, definition.path, nextValue);

        if (source !== mainInput) mainInput.value = nextValue;

        if (definition.type === "select") {
          const selected = (definition.options || []).find((option) => option.value === nextValue);
          valueInput.textContent = selected?.label || "選択中";
        } else if (source !== valueInput) {
          valueInput.value = nextValue;
        }

        renderAt(currentPreviewTime());
      };

      mainInput.addEventListener("input", () => apply(mainInput.value, mainInput));

      if (definition.type !== "select") {
        valueInput.addEventListener("input", () => apply(valueInput.value, valueInput));
      }

      row.append(label, mainInput, valueInput);
      settingsPanel.appendChild(row);
    }
  }

  function getProjectData() {
    return {
      version: 1,
      canvas: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
      },
      characters: state.characters,
      lines: state.lines,
      settings: state.settings,
      lastCharacterId: state.lastCharacterId,
      windowImageDataUrl: state.windowImageDataUrl
    };
  }

  async function applyProjectData(data) {
    const settings = deepMerge(defaultSettings(), data.settings || {});
    const legacyFontFamily = data.settings?.font?.family;
    if (legacyFontFamily && !data.settings?.nameText?.fontFamily) {
      settings.nameText.fontFamily = legacyFontFamily;
    }
    if (legacyFontFamily && !data.settings?.bodyText?.fontFamily) {
      settings.bodyText.fontFamily = legacyFontFamily;
    }
    state.characters = Array.isArray(data.characters) && data.characters.length
      ? data.characters
      : [{ id: "char_default", name: "キャラクター" }];
    state.lines = Array.isArray(data.lines) ? data.lines : [];
    state.selectedLineId = null;
    state.lastCharacterId = data.lastCharacterId || state.characters[0]?.id || "";
    state.settings = settings;
    state.windowImageDataUrl = data.windowImageDataUrl || null;
    state.windowImage = await loadImageFromDataUrl(state.windowImageDataUrl);

    populateCharacterSelect();
    renderCharacterList();
    renderLineList();
    renderSettingsPanel();
    updatePreviewMax();
    renderAt(currentPreviewTime());
  }

  function openCacheDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(CACHE_DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(CACHE_STORE_NAME)) {
          db.createObjectStore(CACHE_STORE_NAME, { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function saveProjectToCache() {
    const db = await openCacheDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CACHE_STORE_NAME, "readwrite");
      const store = tx.objectStore(CACHE_STORE_NAME);
      store.put({ id: CACHE_KEY, project: getProjectData(), savedAt: new Date().toISOString() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function loadProjectFromCache() {
    const db = await openCacheDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CACHE_STORE_NAME, "readonly");
      const store = tx.objectStore(CACHE_STORE_NAME);
      const request = store.get(CACHE_KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  function canvasToPngBlob() {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("PNG生成に失敗しました。"));
      }, "image/png");
    });
  }

  async function exportZip() {
    if (typeof JSZip === "undefined") {
      alert("JSZipを読み込めませんでした。インターネット接続またはCDNの読み込みを確認してください。");
      return;
    }

    if (document.fonts?.ready) {
      exportProgress.textContent = "フォント読み込み確認中...";
      await document.fonts.ready;
    }

    const fps = clampNumber(exportFpsInput.value, 1, 60);
    const start = Number(exportStartInput.value);
    const end = Number(exportEndInput.value);
    const prefix = (exportPrefixInput.value.trim() || "frame").replace(/[\\/:*?"<>|]/g, "_");

    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) {
      alert("書き出し開始秒と終了秒を正しく入力してください。");
      return;
    }

    const totalFrames = Math.floor((end - start) * fps) + 1;
    if (totalFrames > 1800 && !confirm(`${totalFrames}枚のPNGを書き出します。ブラウザが重くなる可能性があります。続行しますか？`)) {
      return;
    }

    exportZipBtn.disabled = true;
    exportProgress.textContent = "PNG生成中...";

    const zip = new JSZip();
    const digits = Math.max(6, String(totalFrames).length);
    const originalPreviewTime = currentPreviewTime();

    try {
      for (let frame = 0; frame < totalFrames; frame += 1) {
        const time = start + frame / fps;
        renderAt(time);
        const blob = await canvasToPngBlob();
        const filename = `${prefix}_${String(frame + 1).padStart(digits, "0")}.png`;
        zip.file(filename, blob);

        if (frame % 5 === 0 || frame === totalFrames - 1) {
          exportProgress.textContent = `${frame + 1} / ${totalFrames} 枚生成中...`;
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
      }

      exportProgress.textContent = "ZIP生成中...";
      const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" }, (metadata) => {
        exportProgress.textContent = `ZIP生成中... ${metadata.percent.toFixed(1)}%`;
      });
      downloadBlob(zipBlob, `adv_message_frames_${Date.now()}.zip`);
      exportProgress.textContent = "書き出し完了";
    } catch (error) {
      console.error(error);
      alert(error.message || "書き出し中にエラーが発生しました。");
      exportProgress.textContent = "書き出し失敗";
    } finally {
      exportZipBtn.disabled = false;
      renderAt(originalPreviewTime);
    }
  }

  function bindEvents() {
    audioInput.addEventListener("change", () => {
      const file = audioInput.files?.[0];
      if (!file) return;
      if (state.audioObjectUrl) URL.revokeObjectURL(state.audioObjectUrl);
      state.audioObjectUrl = URL.createObjectURL(file);
      audioPlayer.src = state.audioObjectUrl;
      audioPlayer.load();
    });

    audioPlayer.addEventListener("loadedmetadata", () => {
      updatePreviewMax();
      exportEndInput.value = toFixedSafe(audioPlayer.duration || Number(exportEndInput.value) || 3);
    });

    audioPlayer.addEventListener("timeupdate", () => {
      syncPreviewInputs(audioPlayer.currentTime);
      renderAt(audioPlayer.currentTime);
    });

    audioPlayer.addEventListener("seeked", () => {
      syncPreviewInputs(audioPlayer.currentTime);
      renderAt(audioPlayer.currentTime);
    });

    windowImageInput.addEventListener("change", async () => {
      const file = windowImageInput.files?.[0];
      if (!file) return;
      state.windowImageDataUrl = await readFileAsDataUrl(file);
      state.windowImage = await loadImageFromDataUrl(state.windowImageDataUrl);
      renderAt(currentPreviewTime());
    });

    clearWindowImageBtn.addEventListener("click", () => {
      windowImageInput.value = "";
      state.windowImageDataUrl = null;
      state.windowImage = null;
      renderAt(currentPreviewTime());
    });

    addCharacterBtn.addEventListener("click", () => {
      const name = characterNameInput.value.trim();
      if (!name) return;
      const character = { id: uniqueId("char"), name };
      state.characters.push(character);
      state.lastCharacterId = character.id;
      characterNameInput.value = "";
      populateCharacterSelect();
      renderCharacterList();
      renderAt(currentPreviewTime());
    });

    characterNameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") addCharacterBtn.click();
    });

    lineCharacterSelect.addEventListener("change", () => {
      state.lastCharacterId = lineCharacterSelect.value;
      localStorage.setItem("adv-message-tool-last-character", state.lastCharacterId);
    });

    setStartFromAudioBtn.addEventListener("click", () => {
      const value = audioPlayer.src ? audioPlayer.currentTime : Number(previewTimeInput.value) || 0;
      lineStartInput.value = toFixedSafe(value);
    });

    setEndFromAudioBtn.addEventListener("click", () => {
      const value = audioPlayer.src ? audioPlayer.currentTime : Number(previewTimeInput.value) || 0;
      lineEndInput.value = toFixedSafe(value);
    });

    addOrUpdateLineBtn.addEventListener("click", addOrUpdateLine);
    cancelEditLineBtn.addEventListener("click", clearLineEdit);

    previewTimeInput.addEventListener("input", () => {
      previewTimeRange.value = previewTimeInput.value;
      renderAt(Number(previewTimeInput.value) || 0);
    });

    previewTimeRange.addEventListener("input", () => {
      previewTimeInput.value = previewTimeRange.value;
      renderAt(Number(previewTimeRange.value) || 0);
    });

    renderPreviewBtn.addEventListener("click", () => renderAt(Number(previewTimeInput.value) || 0));

    saveJsonBtn.addEventListener("click", () => {
      const json = JSON.stringify(getProjectData(), null, 2);
      downloadText(json, `adv_message_project_${Date.now()}.json`);
    });

    loadJsonInput.addEventListener("change", async () => {
      const file = loadJsonInput.files?.[0];
      if (!file) return;
      try {
        const text = await readFileAsText(file);
        const json = JSON.parse(text);
        await applyProjectData(json);
      } catch (error) {
        console.error(error);
        alert("JSONの読み込みに失敗しました。");
      } finally {
        loadJsonInput.value = "";
      }
    });

    saveCacheBtn.addEventListener("click", async () => {
      try {
        await saveProjectToCache();
        alert("キャッシュへ保存しました。");
      } catch (error) {
        console.error(error);
        alert("キャッシュ保存に失敗しました。画像が大きすぎる場合はJSON保存を使用してください。");
      }
    });

    loadCacheBtn.addEventListener("click", async () => {
      try {
        const cache = await loadProjectFromCache();
        if (!cache) {
          alert("保存済みキャッシュがありません。");
          return;
        }
        await applyProjectData(cache.project);
      } catch (error) {
        console.error(error);
        alert("キャッシュ復元に失敗しました。");
      }
    });

    exportZipBtn.addEventListener("click", exportZip);

    [exportStartInput, exportEndInput].forEach((input) => {
      input.addEventListener("input", updatePreviewMax);
    });
  }

  function init() {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    populateCharacterSelect();
    renderCharacterList();
    renderLineList();
    renderSettingsPanel();
    bindEvents();
    renderAt(0);
  }

  init();
})();

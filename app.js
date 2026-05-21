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

  const UI_LANGUAGE_STORAGE_KEY = "adv-message-tool-ui-language";
  const INPUT_LANGUAGE_STORAGE_KEY = "adv-message-tool-input-language";
  const SUPPORTED_LANGUAGES = ["ja", "en", "ko"];

  const I18N = {
    ja: {
      languageNameJa: "日本語",
      languageNameEn: "English",
      languageNameKo: "한국어",
      uiLanguage: "UI Language",
      inputLanguage: "入力テキスト言語",
      appSubtitle: "透過メッセージウィンドウ＋テキストアニメーション連番PNG生成",
      saveJson: "JSON保存",
      loadJson: "JSON読込",
      saveCache: "キャッシュ保存",
      loadCache: "キャッシュ復元",
      help: "取扱説明",
      sceneManagement: "シーン管理",
      materials: "素材",
      fontRegistration: "フォント登録",
      characterRegistration: "キャラクター登録",
      speechButtonRegistration: "台詞ボタン登録",
      lineList: "セリフ一覧",
      displaySettings: "表示設定",
      export: "書き出し",
      sceneSelect: "シーン選択",
      sceneNamePlaceholder: "シーン名",
      add: "追加",
      rename: "名前変更",
      duplicate: "複製",
      delete: "削除",
      sceneStatusDefault: "シーンごとに音声・セリフを保存します。キャラクター、ウィンドウ画像、表示設定はプロジェクト共通です。",
      mediaFile: "音声 / MP4ファイル",
      savedAudioNone: "保存済み音声なし",
      clearMaterial: "素材を解除",
      windowImage: "メッセージウィンドウ画像",
      clearImage: "画像を解除",
      customFontLoad: "任意フォント読み込み",
      fontStatusDefault: "ttf / otf / woff / woff2 を読み込むと、表示設定の「名前フォント」「本文フォント」から選べます。JSON保存・キャッシュ保存にも含まれます。",
      characterNamePlaceholder: "キャラクター名",
      speechTxtLoad: "台詞txt読み込み",
      clearSpeechButtons: "台詞ボタンを全削除",
      speechBankStatusDefault: "txt内の「キャラ名：台詞」「キャラ名「台詞」」「キャラ名(台詞)」または「001 キャラ名：台詞」を読み込みます。英語・韓国語の名前と本文にも対応しています。",
      filePrefix: "ファイル名接頭辞",
      exportStart: "書き出し開始秒",
      exportEnd: "書き出し終了秒",
      exportZip: "透過PNG連番ZIPを書き出し",
      noActiveLine: "表示中のセリフなし",
      mediaPreviewTitle: "音声 / MP4プレビュー",
      mediaPreviewSubtitle: "MP4は文字の下敷きとしてプレビューに表示。書き出しには含まれません",
      previewSeconds: "プレビュー秒",
      update: "更新",
      mediaHint: "音声 / MP4の再生位置とテキストプレビューは同期します。MP4映像は書き出しには含まれません。",
      nameSelect: "名前選択",
      lineInput: "セリフ入力",
      lineInputPlaceholder: "表示したいセリフを入力",
      quickSettings: "設定項目",
      startSeconds: "開始秒",
      endSeconds: "終了秒",
      charsPerSecond: "文字送り/秒",
      bodyAnimation: "本文アニメーション",
      animTypewriter: "タイプライター表示",
      animScaleReveal: "拡大しながら表示",
      animNormal: "通常表示",
      scaleStartSize: "拡大開始サイズ",
      setStartFromCurrent: "現在時刻を開始へ",
      setEndFromCurrent: "現在時刻を終了へ",
      addLine: "セリフ追加",
      updateLine: "セリフ更新",
      cancelEdit: "編集解除",
      helpSubtitle: "ADV Message Movie Tool 現行版の使い方",
      close: "閉じる",
      defaultCharacter: "キャラクター",
      scene: "シーン",
      scene1: "シーン1",
      sceneCopy: "{name} コピー",
      currentScene: "現在のシーン",
      mp4PlayPause: "MP4再生 / 停止",
      mp4Stop: "MP4停止",
      mp4Play: "MP4再生",
      customFontEmpty: "任意フォントはまだ登録されていません。",
      customFontHelpShort: "ttf / otf / woff / woff2 を読み込むと、名前フォント・本文フォントで個別に選べます。",
      customFontPrefix: "任意：{name}",
      loaded: "読み込み済み",
      notLoaded: "未読込",
      customFontCount: "{count}件の任意フォントを登録中。表示設定から名前・本文それぞれに割り当てできます。",
      loadingFont: "フォントを読み込み中...",
      fontLoadFailed: "{file} のフォント読み込みに失敗しました。",
      fontAdded: "{count}件のフォントを追加しました。名前フォント・本文フォントから選択できます。",
      materialMp4: "MP4あり",
      materialAudio: "音声あり",
      materialFile: "素材ファイル",
      noMedia: "音声 / MP4なし",
      currentSceneStatus: "現在：{name} / セリフ{count}件 / {media}",
      enterSceneName: "シーン名を入力してください。",
      needScene: "シーンは最低1つ必要です。",
      confirmDeleteScene: "{name}を削除しますか？",
      savedMp4: "保存済みMP4：{name}",
      savedAudio: "保存済み音声：{name}",
      unnamed: "名称未設定",
      savedMaterialNone: "保存済み素材なし",
      formPreview: "入力中 / ",
      speechImported: "{added}件の台詞ボタンを追加しました。新規キャラ{created}件 / 読み飛ばし{skipped}行",
      speechCharMissing: "この台詞ボタンのキャラクターが見つかりません。",
      speechInsertCanceled: "「{text}」の挿入をキャンセルしました。",
      speechInserted: "「{text}」を{time}sへ挿入しました。もう一度押すとキャンセルできます。",
      speechEmpty: "台詞txtを読み込むと、キャラごとの台詞ボタンがここに表示されます。",
      countItems: "{count}件",
      speechInsertedTitle: "{name}：{text} / 挿入済み。もう一度押すとキャンセル",
      speechInsertTitle: "{name}：{text} / クリックで現在時刻へ挿入",
      removeSpeechButtonTitle: "この台詞ボタンを削除",
      confirmDeleteCharacter: "このキャラクターを使用しているセリフがあります。削除しますか？",
      animShortScale: "拡大",
      animShortNormal: "通常",
      animShortType: "タイプ",
      unset: "未設定",
      edit: "編集",
      selectActive: "選択中",
      needCharacter: "キャラクターを登録してください。",
      needLineText: "セリフを入力してください。",
      invalidLineTime: "開始秒と終了秒を正しく入力してください。",
      pngFailed: "PNG生成に失敗しました。",
      jszipMissing: "JSZipを読み込めませんでした。インターネット接続またはCDNの読み込みを確認してください。",
      checkingFonts: "フォント読み込み確認中...",
      invalidExportTime: "書き出し開始秒と終了秒を正しく入力してください。",
      confirmManyFrames: "{count}枚のPNGを書き出します。ブラウザが重くなる可能性があります。続行しますか？",
      creatingPng: "PNG生成中...",
      creatingPngProgress: "{current} / {total} 枚生成中...",
      creatingZip: "ZIP生成中...",
      creatingZipProgress: "ZIP生成中... {percent}%",
      exportDone: "書き出し完了",
      exportFailed: "書き出し失敗",
      exportError: "書き出し中にエラーが発生しました。",
      convertingMedia: "音声 / MP4を保存用データへ変換中...",
      mediaLoadFailed: "音声 / MP4ファイルの読み込みに失敗しました。",
      mp4PlaybackFailed: "MP4を再生できませんでした。ブラウザの制限により、もう一度ボタンを押すと再生できる場合があります。",
      loadingSpeechTxt: "台詞txtを読み込み中...",
      speechTxtLoadFailed: "台詞txtの読み込みに失敗しました。",
      confirmClearSpeechButtons: "登録済みの台詞ボタンをすべて削除しますか？",
      speechButtonsCleared: "台詞ボタンをすべて削除しました。",
      jsonLoadFailed: "JSONの読み込みに失敗しました。",
      cacheSaved: "キャッシュへ保存しました。",
      cacheSaveFailed: "キャッシュ保存に失敗しました。音声や画像が大きすぎる場合はJSON保存、または素材を軽くしてから保存してください。",
      noSavedCache: "保存済みキャッシュがありません。",
      cacheRestoreFailed: "キャッシュ復元に失敗しました。",
      settingWindowX: "ウィンドウX",
      settingWindowY: "ウィンドウY",
      settingWindowWidth: "ウィンドウ幅",
      settingWindowHeight: "ウィンドウ高さ",
      settingWindowOpacity: "仮ウィンドウ濃度",
      settingNameX: "名前X",
      settingNameY: "名前Y",
      settingNameSize: "名前サイズ",
      settingNameFont: "名前フォント",
      settingNameColor: "名前色",
      settingNameStrokeColor: "名前フチ色",
      settingNameStrokeWidth: "名前フチ太さ",
      settingBodyX: "本文X",
      settingBodyY: "本文Y",
      settingBodyWidth: "折り返し幅",
      settingBodySize: "本文サイズ",
      settingBodyFont: "本文フォント",
      settingLineHeight: "行間",
      settingMaxLines: "最大行数",
      settingBodyColor: "本文色",
      settingBodyStrokeColor: "本文フチ色",
      settingBodyStrokeWidth: "本文フチ太さ",
      settingShadowBlur: "影ぼかし",
      settingShadowX: "影X",
      settingShadowY: "影Y",
      settingShadowColor: "影色",
      manualBodyHtml: `<section><h3>このツールでできること</h3><p>音声または音声付きMP4に合わせて、ADVノベルゲーム風のメッセージウィンドウ・キャラクター名・セリフ本文を表示し、背景透過の連番PNGをZIPで書き出せます。MP4はプレビュー上で文字入れの下敷きとして表示されますが、書き出しPNGには含まれません。キャンバスサイズは1920×1080固定です。</p></section><section><h3>基本の流れ</h3><ol><li>「シーン管理」でシーンを作成または選択します。</li><li>「素材」から音声ファイルまたは音声付きMP4、メッセージウィンドウ画像を読み込みます。</li><li>「キャラクター登録」で名前を追加します。</li><li>右側の入力パネルで、名前・セリフ・開始秒・終了秒・文字送り速度・本文アニメーションを設定して「セリフ追加」を押します。</li><li>音声 / MP4プレビューで再生位置を確認しながら、必要に応じてセリフを編集します。</li><li>「書き出し」から現在選択中のシーンを透過PNG連番ZIPとして書き出します。</li></ol></section><section><h3>言語設定</h3><p>ヘッダーの UI Language で画面表示を日本語・英語・韓国語に切り替えられます。「入力テキスト言語」は台詞txtの案内表示と読み込み時の言語設定です。台詞本文は翻訳せず、そのまま表示・書き出しされます。</p></section><section><h3>台詞txt読み込み</h3><p>txtを読み込むと、1行ごとのセリフをキャラクター別のボタンとして登録できます。未登録のキャラクター名は自動追加されます。</p><pre>001 キャラ名：おはよう\nCharacter: Good morning\n캐릭터: 안녕하세요</pre><p>対応形式は「名前：本文」「Name: Text」「이름: 대사」「名前「本文」」「名前(本文)」です。先頭に半角数字3桁がある場合、その番号がボタン上に表示されます。</p></section><section><h3>保存と復元</h3><p>JSON保存・JSON読込・キャッシュ保存・キャッシュ復元に対応しています。UI言語と入力テキスト言語もプロジェクトに保存されます。</p></section><section><h3>書き出し</h3><p>書き出しは現在選択中のシーンが対象です。FPS、開始秒、終了秒、ファイル名接頭辞を指定し、「透過PNG連番ZIPを書き出し」を押してください。MP4映像は確認用の下敷きなので、PNGには含まれません。</p><p>ZIP書き出しにはJSZip CDNを使用しているため、インターネット接続が必要です。</p></section>`
    },
    en: {
      languageNameJa: "Japanese",
      languageNameEn: "English",
      languageNameKo: "Korean",
      uiLanguage: "UI Language",
      inputLanguage: "Input Text Language",
      appSubtitle: "Transparent message window + text animation PNG sequence exporter",
      saveJson: "Save JSON",
      loadJson: "Load JSON",
      saveCache: "Save Cache",
      loadCache: "Restore Cache",
      help: "Manual",
      sceneManagement: "Scene Management",
      materials: "Assets",
      fontRegistration: "Font Registration",
      characterRegistration: "Character Registration",
      speechButtonRegistration: "Line Button Registration",
      lineList: "Line List",
      displaySettings: "Display Settings",
      export: "Export",
      sceneSelect: "Scene Select",
      sceneNamePlaceholder: "Scene name",
      add: "Add",
      rename: "Rename",
      duplicate: "Duplicate",
      delete: "Delete",
      sceneStatusDefault: "Audio and lines are saved per scene. Characters, window image, and display settings are shared across the project.",
      mediaFile: "Audio / MP4 File",
      savedAudioNone: "No saved audio",
      clearMaterial: "Clear Asset",
      windowImage: "Message Window Image",
      clearImage: "Clear Image",
      customFontLoad: "Load Custom Fonts",
      fontStatusDefault: "Load ttf / otf / woff / woff2 files to select them separately for name and body fonts. They are included in JSON/cache saves.",
      characterNamePlaceholder: "Character name",
      speechTxtLoad: "Load line txt",
      clearSpeechButtons: "Clear All Line Buttons",
      speechBankStatusDefault: "Loads lines like “Character: Line”, “Character「Line」”, “Character(Line)”, or “001 Character: Line”. Japanese, English, and Korean names/text are supported.",
      filePrefix: "File Name Prefix",
      exportStart: "Export Start Sec",
      exportEnd: "Export End Sec",
      exportZip: "Export Transparent PNG Sequence ZIP",
      noActiveLine: "No active line",
      mediaPreviewTitle: "Audio / MP4 Preview",
      mediaPreviewSubtitle: "MP4 is displayed under the text as a guide. It is not included in exports.",
      previewSeconds: "Preview Sec",
      update: "Update",
      mediaHint: "The audio / MP4 playback position syncs with the text preview. MP4 video is not included in PNG exports.",
      nameSelect: "Name Select",
      lineInput: "Line Input",
      lineInputPlaceholder: "Enter the line to display",
      quickSettings: "Settings",
      startSeconds: "Start Sec",
      endSeconds: "End Sec",
      charsPerSecond: "Characters/sec",
      bodyAnimation: "Body Animation",
      animTypewriter: "Typewriter",
      animScaleReveal: "Scale Reveal",
      animNormal: "Normal",
      scaleStartSize: "Initial Scale",
      setStartFromCurrent: "Set Current Time as Start",
      setEndFromCurrent: "Set Current Time as End",
      addLine: "Add Line",
      updateLine: "Update Line",
      cancelEdit: "Cancel Edit",
      helpSubtitle: "Current version guide for ADV Message Movie Tool",
      close: "Close",
      defaultCharacter: "Character",
      scene: "Scene",
      scene1: "Scene 1",
      sceneCopy: "{name} Copy",
      currentScene: "Current scene",
      mp4PlayPause: "MP4 Play / Pause",
      mp4Stop: "Stop MP4",
      mp4Play: "Play MP4",
      customFontEmpty: "No custom fonts registered yet.",
      customFontHelpShort: "Load ttf / otf / woff / woff2 files to select them separately for name and body fonts.",
      customFontPrefix: "Custom: {name}",
      loaded: "Loaded",
      notLoaded: "Not loaded",
      customFontCount: "{count} custom font(s) registered. Assign them separately to name/body text in Display Settings.",
      loadingFont: "Loading fonts...",
      fontLoadFailed: "Failed to load font: {file}",
      fontAdded: "Added {count} font(s). Select them from name/body font settings.",
      materialMp4: "MP4 loaded",
      materialAudio: "Audio loaded",
      materialFile: "asset file",
      noMedia: "No audio / MP4",
      currentSceneStatus: "Current: {name} / {count} line(s) / {media}",
      enterSceneName: "Enter a scene name.",
      needScene: "At least one scene is required.",
      confirmDeleteScene: "Delete {name}?",
      savedMp4: "Saved MP4: {name}",
      savedAudio: "Saved audio: {name}",
      unnamed: "Untitled",
      savedMaterialNone: "No saved asset",
      formPreview: "Editing / ",
      speechImported: "Added {added} line button(s). New characters: {created} / Skipped lines: {skipped}",
      speechCharMissing: "The character for this line button was not found.",
      speechInsertCanceled: "Canceled insertion of “{text}”.",
      speechInserted: "Inserted “{text}” at {time}s. Click again to cancel.",
      speechEmpty: "Load a line txt file to show character-based line buttons here.",
      countItems: "{count}",
      speechInsertedTitle: "{name}: {text} / Inserted. Click again to cancel",
      speechInsertTitle: "{name}: {text} / Click to insert at current time",
      removeSpeechButtonTitle: "Delete this line button",
      confirmDeleteCharacter: "Some lines use this character. Delete it?",
      animShortScale: "Scale",
      animShortNormal: "Normal",
      animShortType: "Type",
      unset: "Unset",
      edit: "Edit",
      selectActive: "Selected",
      needCharacter: "Please register a character.",
      needLineText: "Please enter a line.",
      invalidLineTime: "Please enter valid start/end seconds.",
      pngFailed: "Failed to generate PNG.",
      jszipMissing: "JSZip could not be loaded. Check your internet connection or CDN loading.",
      checkingFonts: "Checking fonts...",
      invalidExportTime: "Please enter valid export start/end seconds.",
      confirmManyFrames: "This will export {count} PNG files. The browser may become slow. Continue?",
      creatingPng: "Generating PNG...",
      creatingPngProgress: "Generating {current} / {total} PNGs...",
      creatingZip: "Generating ZIP...",
      creatingZipProgress: "Generating ZIP... {percent}%",
      exportDone: "Export complete",
      exportFailed: "Export failed",
      exportError: "An error occurred during export.",
      convertingMedia: "Converting audio / MP4 to saved data...",
      mediaLoadFailed: "Failed to load the audio / MP4 file.",
      mp4PlaybackFailed: "Could not play the MP4. Due to browser restrictions, pressing the button again may start playback.",
      loadingSpeechTxt: "Loading line txt...",
      speechTxtLoadFailed: "Failed to load line txt.",
      confirmClearSpeechButtons: "Delete all registered line buttons?",
      speechButtonsCleared: "Deleted all line buttons.",
      jsonLoadFailed: "Failed to load JSON.",
      cacheSaved: "Saved to cache.",
      cacheSaveFailed: "Failed to save cache. If audio/images are too large, use JSON save or reduce asset size first.",
      noSavedCache: "No saved cache found.",
      cacheRestoreFailed: "Failed to restore cache.",
      settingWindowX: "Window X",
      settingWindowY: "Window Y",
      settingWindowWidth: "Window Width",
      settingWindowHeight: "Window Height",
      settingWindowOpacity: "Fallback Window Opacity",
      settingNameX: "Name X",
      settingNameY: "Name Y",
      settingNameSize: "Name Size",
      settingNameFont: "Name Font",
      settingNameColor: "Name Color",
      settingNameStrokeColor: "Name Stroke Color",
      settingNameStrokeWidth: "Name Stroke Width",
      settingBodyX: "Body X",
      settingBodyY: "Body Y",
      settingBodyWidth: "Wrap Width",
      settingBodySize: "Body Size",
      settingBodyFont: "Body Font",
      settingLineHeight: "Line Height",
      settingMaxLines: "Max Lines",
      settingBodyColor: "Body Color",
      settingBodyStrokeColor: "Body Stroke Color",
      settingBodyStrokeWidth: "Body Stroke Width",
      settingShadowBlur: "Shadow Blur",
      settingShadowX: "Shadow X",
      settingShadowY: "Shadow Y",
      settingShadowColor: "Shadow Color",
      manualBodyHtml: `<section><h3>What this tool does</h3><p>This tool lets you display an ADV / visual-novel style message window, character name, and body text in sync with audio or an MP4 with audio, then export transparent PNG sequences as a ZIP. MP4 is shown as a guide layer under the text in the preview, but it is not included in exported PNGs. The canvas size is fixed at 1920×1080.</p></section><section><h3>Basic workflow</h3><ol><li>Create or select a scene in Scene Management.</li><li>Load an audio file or MP4 with audio, plus an optional message window image, in Assets.</li><li>Add character names in Character Registration.</li><li>Use the input panel on the right to set the name, line, start/end seconds, speed, and body animation, then press Add Line.</li><li>Check timing in the Audio / MP4 Preview and edit lines as needed.</li><li>Export the current scene as a transparent PNG sequence ZIP from Export.</li></ol></section><section><h3>Language settings</h3><p>Use UI Language in the header to switch the interface between Japanese, English, and Korean. Input Text Language controls the guidance for line txt importing. Your line text is not translated; it is displayed and exported exactly as entered.</p></section><section><h3>Line txt import</h3><p>When you load a txt file, each line can be registered as a button grouped by character. New character names are added automatically.</p><pre>001 Character: Good morning\nキャラ名：おはよう\n캐릭터: 안녕하세요</pre><p>Supported formats include “Name: Text”, “名前：本文”, “이름: 대사”, “Name「Text」”, and “Name(Text)”. If a line begins with a 3-digit number, that number is shown on the button.</p></section><section><h3>Save / Restore</h3><p>JSON Save, JSON Load, Cache Save, and Cache Restore are supported. UI Language and Input Text Language are also saved in the project.</p></section><section><h3>Export</h3><p>Export targets the currently selected scene. Set FPS, start/end seconds, and file name prefix, then press Export Transparent PNG Sequence ZIP. MP4 video is only a preview guide layer and is not included in PNGs.</p><p>ZIP export uses the JSZip CDN, so an internet connection is required.</p></section>`
    },
    ko: {
      languageNameJa: "일본어",
      languageNameEn: "영어",
      languageNameKo: "한국어",
      uiLanguage: "UI Language",
      inputLanguage: "입력 텍스트 언어",
      appSubtitle: "투명 메시지 창 + 텍스트 애니메이션 PNG 시퀀스 생성",
      saveJson: "JSON 저장",
      loadJson: "JSON 불러오기",
      saveCache: "캐시 저장",
      loadCache: "캐시 복원",
      help: "사용 설명",
      sceneManagement: "씬 관리",
      materials: "소재",
      fontRegistration: "폰트 등록",
      characterRegistration: "캐릭터 등록",
      speechButtonRegistration: "대사 버튼 등록",
      lineList: "대사 목록",
      displaySettings: "표시 설정",
      export: "내보내기",
      sceneSelect: "씬 선택",
      sceneNamePlaceholder: "씬 이름",
      add: "추가",
      rename: "이름 변경",
      duplicate: "복제",
      delete: "삭제",
      sceneStatusDefault: "오디오와 대사는 씬별로 저장됩니다. 캐릭터, 창 이미지, 표시 설정은 프로젝트 공통입니다.",
      mediaFile: "오디오 / MP4 파일",
      savedAudioNone: "저장된 오디오 없음",
      clearMaterial: "소재 해제",
      windowImage: "메시지 창 이미지",
      clearImage: "이미지 해제",
      customFontLoad: "사용자 폰트 불러오기",
      fontStatusDefault: "ttf / otf / woff / woff2를 불러오면 이름 폰트와 본문 폰트에서 각각 선택할 수 있습니다. JSON/캐시 저장에도 포함됩니다.",
      characterNamePlaceholder: "캐릭터 이름",
      speechTxtLoad: "대사 txt 불러오기",
      clearSpeechButtons: "대사 버튼 전체 삭제",
      speechBankStatusDefault: "“캐릭터: 대사”, “캐릭터「대사」”, “캐릭터(대사)”, “001 캐릭터: 대사” 형식을 불러옵니다. 일본어·영어·한국어 이름과 본문을 지원합니다.",
      filePrefix: "파일명 접두사",
      exportStart: "내보내기 시작 초",
      exportEnd: "내보내기 종료 초",
      exportZip: "투명 PNG 시퀀스 ZIP 내보내기",
      noActiveLine: "표시 중인 대사 없음",
      mediaPreviewTitle: "오디오 / MP4 미리보기",
      mediaPreviewSubtitle: "MP4는 텍스트 아래 가이드로 표시됩니다. 내보내기에는 포함되지 않습니다.",
      previewSeconds: "미리보기 초",
      update: "갱신",
      mediaHint: "오디오 / MP4 재생 위치와 텍스트 미리보기가 동기화됩니다. MP4 영상은 PNG 내보내기에 포함되지 않습니다.",
      nameSelect: "이름 선택",
      lineInput: "대사 입력",
      lineInputPlaceholder: "표시할 대사를 입력",
      quickSettings: "설정 항목",
      startSeconds: "시작 초",
      endSeconds: "종료 초",
      charsPerSecond: "초당 글자 수",
      bodyAnimation: "본문 애니메이션",
      animTypewriter: "타자기 표시",
      animScaleReveal: "확대하며 표시",
      animNormal: "일반 표시",
      scaleStartSize: "확대 시작 크기",
      setStartFromCurrent: "현재 시간을 시작으로",
      setEndFromCurrent: "현재 시간을 종료로",
      addLine: "대사 추가",
      updateLine: "대사 갱신",
      cancelEdit: "편집 해제",
      helpSubtitle: "ADV Message Movie Tool 현재 버전 사용법",
      close: "닫기",
      defaultCharacter: "캐릭터",
      scene: "씬",
      scene1: "씬 1",
      sceneCopy: "{name} 복사",
      currentScene: "현재 씬",
      mp4PlayPause: "MP4 재생 / 정지",
      mp4Stop: "MP4 정지",
      mp4Play: "MP4 재생",
      customFontEmpty: "등록된 사용자 폰트가 없습니다.",
      customFontHelpShort: "ttf / otf / woff / woff2를 불러오면 이름 폰트와 본문 폰트에서 각각 선택할 수 있습니다.",
      customFontPrefix: "사용자: {name}",
      loaded: "불러옴",
      notLoaded: "미불러옴",
      customFontCount: "사용자 폰트 {count}개 등록 중. 표시 설정에서 이름/본문에 각각 지정할 수 있습니다.",
      loadingFont: "폰트를 불러오는 중...",
      fontLoadFailed: "{file} 폰트 불러오기에 실패했습니다.",
      fontAdded: "폰트 {count}개를 추가했습니다. 이름/본문 폰트에서 선택할 수 있습니다.",
      materialMp4: "MP4 있음",
      materialAudio: "오디오 있음",
      materialFile: "소재 파일",
      noMedia: "오디오 / MP4 없음",
      currentSceneStatus: "현재: {name} / 대사 {count}개 / {media}",
      enterSceneName: "씬 이름을 입력하세요.",
      needScene: "씬은 최소 1개가 필요합니다.",
      confirmDeleteScene: "{name}을(를) 삭제할까요?",
      savedMp4: "저장된 MP4: {name}",
      savedAudio: "저장된 오디오: {name}",
      unnamed: "이름 없음",
      savedMaterialNone: "저장된 소재 없음",
      formPreview: "입력 중 / ",
      speechImported: "대사 버튼 {added}개를 추가했습니다. 신규 캐릭터 {created}개 / 건너뜀 {skipped}행",
      speechCharMissing: "이 대사 버튼의 캐릭터를 찾을 수 없습니다.",
      speechInsertCanceled: "“{text}” 삽입을 취소했습니다.",
      speechInserted: "“{text}”을(를) {time}s에 삽입했습니다. 다시 누르면 취소할 수 있습니다.",
      speechEmpty: "대사 txt를 불러오면 캐릭터별 대사 버튼이 여기에 표시됩니다.",
      countItems: "{count}개",
      speechInsertedTitle: "{name}: {text} / 삽입됨. 다시 누르면 취소",
      speechInsertTitle: "{name}: {text} / 클릭하면 현재 시간에 삽입",
      removeSpeechButtonTitle: "이 대사 버튼 삭제",
      confirmDeleteCharacter: "이 캐릭터를 사용하는 대사가 있습니다. 삭제할까요?",
      animShortScale: "확대",
      animShortNormal: "일반",
      animShortType: "타자",
      unset: "미설정",
      edit: "편집",
      selectActive: "선택 중",
      needCharacter: "캐릭터를 등록하세요.",
      needLineText: "대사를 입력하세요.",
      invalidLineTime: "시작 초와 종료 초를 올바르게 입력하세요.",
      pngFailed: "PNG 생성에 실패했습니다.",
      jszipMissing: "JSZip을 불러올 수 없습니다. 인터넷 연결 또는 CDN 로드를 확인하세요.",
      checkingFonts: "폰트 확인 중...",
      invalidExportTime: "내보내기 시작/종료 초를 올바르게 입력하세요.",
      confirmManyFrames: "PNG {count}장을 내보냅니다. 브라우저가 느려질 수 있습니다. 계속할까요?",
      creatingPng: "PNG 생성 중...",
      creatingPngProgress: "{current} / {total} 장 생성 중...",
      creatingZip: "ZIP 생성 중...",
      creatingZipProgress: "ZIP 생성 중... {percent}%",
      exportDone: "내보내기 완료",
      exportFailed: "내보내기 실패",
      exportError: "내보내기 중 오류가 발생했습니다.",
      convertingMedia: "오디오 / MP4를 저장용 데이터로 변환 중...",
      mediaLoadFailed: "오디오 / MP4 파일 불러오기에 실패했습니다.",
      mp4PlaybackFailed: "MP4를 재생할 수 없습니다. 브라우저 제한으로 인해 버튼을 다시 누르면 재생될 수 있습니다.",
      loadingSpeechTxt: "대사 txt 불러오는 중...",
      speechTxtLoadFailed: "대사 txt 불러오기에 실패했습니다.",
      confirmClearSpeechButtons: "등록된 대사 버튼을 모두 삭제할까요?",
      speechButtonsCleared: "대사 버튼을 모두 삭제했습니다.",
      jsonLoadFailed: "JSON 불러오기에 실패했습니다.",
      cacheSaved: "캐시에 저장했습니다.",
      cacheSaveFailed: "캐시 저장에 실패했습니다. 오디오나 이미지가 너무 큰 경우 JSON 저장을 사용하거나 소재를 가볍게 한 뒤 저장하세요.",
      noSavedCache: "저장된 캐시가 없습니다.",
      cacheRestoreFailed: "캐시 복원에 실패했습니다.",
      settingWindowX: "창 X",
      settingWindowY: "창 Y",
      settingWindowWidth: "창 너비",
      settingWindowHeight: "창 높이",
      settingWindowOpacity: "임시 창 농도",
      settingNameX: "이름 X",
      settingNameY: "이름 Y",
      settingNameSize: "이름 크기",
      settingNameFont: "이름 폰트",
      settingNameColor: "이름 색상",
      settingNameStrokeColor: "이름 테두리 색",
      settingNameStrokeWidth: "이름 테두리 두께",
      settingBodyX: "본문 X",
      settingBodyY: "본문 Y",
      settingBodyWidth: "줄바꿈 너비",
      settingBodySize: "본문 크기",
      settingBodyFont: "본문 폰트",
      settingLineHeight: "줄 간격",
      settingMaxLines: "최대 줄 수",
      settingBodyColor: "본문 색상",
      settingBodyStrokeColor: "본문 테두리 색",
      settingBodyStrokeWidth: "본문 테두리 두께",
      settingShadowBlur: "그림자 흐림",
      settingShadowX: "그림자 X",
      settingShadowY: "그림자 Y",
      settingShadowColor: "그림자 색",
      manualBodyHtml: `<section><h3>이 도구로 할 수 있는 것</h3><p>오디오 또는 오디오가 포함된 MP4에 맞춰 ADV/비주얼 노벨풍 메시지 창, 캐릭터 이름, 대사 본문을 표시하고 배경이 투명한 PNG 시퀀스를 ZIP으로 내보낼 수 있습니다. MP4는 미리보기에서 텍스트 아래 가이드로 표시되지만, 내보낸 PNG에는 포함되지 않습니다. 캔버스 크기는 1920×1080 고정입니다.</p></section><section><h3>기본 흐름</h3><ol><li>씬 관리에서 씬을 만들거나 선택합니다.</li><li>소재에서 오디오 파일 또는 오디오 포함 MP4, 메시지 창 이미지를 불러옵니다.</li><li>캐릭터 등록에서 이름을 추가합니다.</li><li>오른쪽 입력 패널에서 이름, 대사, 시작/종료 초, 글자 표시 속도, 본문 애니메이션을 설정하고 대사 추가를 누릅니다.</li><li>오디오 / MP4 미리보기에서 재생 위치를 확인하며 필요에 따라 대사를 편집합니다.</li><li>내보내기에서 현재 선택한 씬을 투명 PNG 시퀀스 ZIP으로 내보냅니다.</li></ol></section><section><h3>언어 설정</h3><p>헤더의 UI Language로 화면 표시를 일본어·영어·한국어로 전환할 수 있습니다. 입력 텍스트 언어는 대사 txt 불러오기 안내와 언어 설정에 사용됩니다. 대사 본문은 번역하지 않고 입력한 그대로 표시·내보내기 됩니다.</p></section><section><h3>대사 txt 불러오기</h3><p>txt를 불러오면 한 줄씩 캐릭터별 버튼으로 등록할 수 있습니다. 등록되지 않은 캐릭터 이름은 자동으로 추가됩니다.</p><pre>001 캐릭터: 안녕하세요\nCharacter: Good morning\nキャラ名：おはよう</pre><p>지원 형식은 “이름: 대사”, “Name: Text”, “名前：本文”, “이름「대사」”, “이름(대사)”입니다. 줄 맨 앞에 반각 숫자 3자리가 있으면 그 번호가 버튼에 표시됩니다.</p></section><section><h3>저장과 복원</h3><p>JSON 저장, JSON 불러오기, 캐시 저장, 캐시 복원을 지원합니다. UI 언어와 입력 텍스트 언어도 프로젝트에 저장됩니다.</p></section><section><h3>내보내기</h3><p>내보내기는 현재 선택한 씬이 대상입니다. FPS, 시작 초, 종료 초, 파일명 접두사를 지정하고 투명 PNG 시퀀스 ZIP 내보내기를 누르세요. MP4 영상은 확인용 가이드이므로 PNG에는 포함되지 않습니다.</p><p>ZIP 내보내기는 JSZip CDN을 사용하므로 인터넷 연결이 필요합니다.</p></section>`
    }
  };

  function normalizeLanguage(value) {
    return SUPPORTED_LANGUAGES.includes(value) ? value : "ja";
  }

  let activeUiLanguage = normalizeLanguage(localStorage.getItem(UI_LANGUAGE_STORAGE_KEY) || "ja");
  let activeInputLanguage = normalizeLanguage(localStorage.getItem(INPUT_LANGUAGE_STORAGE_KEY) || activeUiLanguage);

  function translate(lang, key, vars = {}) {
    const table = I18N[normalizeLanguage(lang)] || I18N.ja;
    const fallback = I18N.ja[key] || key;
    let value = table[key] ?? fallback;
    if (typeof value === "string") {
      value = value.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
    }
    return value;
  }

  function t(key, vars = {}) {
    return translate(activeUiLanguage, key, vars);
  }

  function inputT(key, vars = {}) {
    return translate(activeInputLanguage, key, vars);
  }

  const $ = (selector) => document.querySelector(selector);

  const canvas = $("#previewCanvas");
  const ctx = canvas.getContext("2d", { alpha: true });

  const audioInput = $("#audioInput");
  const audioPlayer = $("#audioPlayer");
  const previewVideoPlayer = $("#previewVideoPlayer");
  const videoControlPanel = $("#videoControlPanel");
  const mediaPlayPauseBtn = $("#mediaPlayPauseBtn");
  const audioFileInfo = $("#audioFileInfo");
  const clearAudioBtn = $("#clearAudioBtn");
  const windowImageInput = $("#windowImageInput");
  const clearWindowImageBtn = $("#clearWindowImageBtn");
  const fontInput = $("#fontInput");
  const fontStatus = $("#fontStatus");
  const customFontList = $("#customFontList");

  const saveJsonBtn = $("#saveJsonBtn");
  const loadJsonInput = $("#loadJsonInput");
  const saveCacheBtn = $("#saveCacheBtn");
  const loadCacheBtn = $("#loadCacheBtn");

  const sceneSelect = $("#sceneSelect");
  const sceneNameInput = $("#sceneNameInput");
  const addSceneBtn = $("#addSceneBtn");
  const renameSceneBtn = $("#renameSceneBtn");
  const duplicateSceneBtn = $("#duplicateSceneBtn");
  const deleteSceneBtn = $("#deleteSceneBtn");
  const sceneStatus = $("#sceneStatus");

  const characterNameInput = $("#characterNameInput");
  const addCharacterBtn = $("#addCharacterBtn");
  const characterList = $("#characterList");

  const speechTextInput = $("#speechTextInput");
  const clearSpeechButtonsBtn = $("#clearSpeechButtonsBtn");
  const speechBankStatus = $("#speechBankStatus");
  const speechButtonGroups = $("#speechButtonGroups");

  const lineCharacterSelect = $("#lineCharacterSelect");
  const lineTextInput = $("#lineTextInput");
  const lineStartInput = $("#lineStartInput");
  const lineEndInput = $("#lineEndInput");
  const lineCpsInput = $("#lineCpsInput");
  const lineCpsRange = $("#lineCpsRange");
  const lineCpsOutput = $("#lineCpsOutput");
  const lineAnimationSelect = $("#lineAnimationSelect");
  const lineScaleRevealMinInput = $("#lineScaleRevealMinInput");
  const lineScaleRevealMinRange = $("#lineScaleRevealMinRange");
  const lineScaleRevealMinOutput = $("#lineScaleRevealMinOutput");
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

  const helpBtn = $("#helpBtn");
  const helpModal = $("#helpModal");
  const helpCloseBtn = $("#helpCloseBtn");
  const helpCloseFooterBtn = $("#helpCloseFooterBtn");
  const languageSelect = $("#languageSelect");
  const inputLanguageSelect = $("#inputLanguageSelect");

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
    uiLanguage: activeUiLanguage,
    inputLanguage: activeInputLanguage,
    characters: [{ id: "char_default", name: translate(activeUiLanguage, "defaultCharacter") }],
    speechButtons: [],
    scenes: [],
    currentSceneId: "",
    lines: [],
    selectedLineId: null,
    lastCharacterId: localStorage.getItem("adv-message-tool-last-character") || "char_default",
    windowImageDataUrl: null,
    windowImage: null,
    audioDataUrl: null,
    audioFileName: "",
    audioMimeType: "",
    audioObjectUrl: null,
    customFonts: [],
    settings: defaultSettings()
  };


  let previewRafId = null;

  function isVideoMediaFile(mimeType = "", fileName = "") {
    return /^video\//i.test(mimeType || "") || /\.(mp4|m4v|mov)$/i.test(fileName || "");
  }

  function hasPreviewVideo() {
    return Boolean(state.audioDataUrl && isVideoMediaFile(state.audioMimeType, state.audioFileName));
  }

  function activeMediaPlayer() {
    return hasPreviewVideo() ? previewVideoPlayer : audioPlayer;
  }

  function syncMediaVisibility() {
    const videoMode = hasPreviewVideo();
    previewVideoPlayer?.classList.toggle("hidden", !videoMode);
    videoControlPanel?.classList.toggle("hidden", !videoMode);
    audioPlayer?.classList.toggle("hidden", videoMode);
    updateMediaPlayPauseButton();
  }

  function syncActiveMediaTime(time) {
    const media = activeMediaPlayer();
    if (!media || !state.audioDataUrl) return;
    const nextTime = Number(time);
    if (!Number.isFinite(nextTime) || nextTime < 0) return;
    try {
      if (Number.isFinite(media.duration) && media.duration > 0 && nextTime > media.duration) return;
      if (Math.abs((media.currentTime || 0) - nextTime) > 0.03) {
        media.currentTime = nextTime;
      }
    } catch (_) {
      // メタデータ読み込み前のseek失敗は無視します。
    }
  }

  function stopPreviewLoop() {
    if (previewRafId) {
      cancelAnimationFrame(previewRafId);
      previewRafId = null;
    }
  }

  function updateMediaPlayPauseButton() {
    if (!mediaPlayPauseBtn) return;
    const media = activeMediaPlayer();
    if (!hasPreviewVideo()) {
      mediaPlayPauseBtn.textContent = t("mp4PlayPause");
      mediaPlayPauseBtn.disabled = true;
      return;
    }
    mediaPlayPauseBtn.disabled = !state.audioDataUrl;
    mediaPlayPauseBtn.textContent = media && !media.paused ? t("mp4Stop") : t("mp4Play");
  }


  function startPreviewLoop() {
    stopPreviewLoop();
    const tick = () => {
      const media = activeMediaPlayer();
      if (!media || media.paused || media.ended) {
        previewRafId = null;
        return;
      }
      const time = media.currentTime || 0;
      syncPreviewInputs(time);
      renderAt(time);
      previewRafId = requestAnimationFrame(tick);
    };
    previewRafId = requestAnimationFrame(tick);
  }

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



  const SETTING_LABEL_KEYS = {
    "window.x": "settingWindowX",
    "window.y": "settingWindowY",
    "window.width": "settingWindowWidth",
    "window.height": "settingWindowHeight",
    "window.fallbackOpacity": "settingWindowOpacity",
    "nameText.x": "settingNameX",
    "nameText.y": "settingNameY",
    "nameText.fontSize": "settingNameSize",
    "nameText.fontFamily": "settingNameFont",
    "nameText.color": "settingNameColor",
    "nameText.strokeColor": "settingNameStrokeColor",
    "nameText.strokeWidth": "settingNameStrokeWidth",
    "bodyText.x": "settingBodyX",
    "bodyText.y": "settingBodyY",
    "bodyText.width": "settingBodyWidth",
    "bodyText.fontSize": "settingBodySize",
    "bodyText.fontFamily": "settingBodyFont",
    "bodyText.lineHeight": "settingLineHeight",
    "bodyText.maxLines": "settingMaxLines",
    "bodyText.color": "settingBodyColor",
    "bodyText.strokeColor": "settingBodyStrokeColor",
    "bodyText.strokeWidth": "settingBodyStrokeWidth",
    "shadow.blur": "settingShadowBlur",
    "shadow.offsetX": "settingShadowX",
    "shadow.offsetY": "settingShadowY",
    "shadow.color": "settingShadowColor"
  };

  function localeForLanguage(lang = activeInputLanguage) {
    return lang === "ko" ? "ko" : lang === "en" ? "en" : "ja";
  }

  function setElementText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function setElementHtml(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = value;
  }

  function setFieldLabel(controlSelector, value) {
    const control = document.querySelector(controlSelector);
    const label = control?.closest("label");
    const span = label?.querySelector("span");
    if (span) span.textContent = value;
  }

  function setPlaceholder(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.placeholder = value;
  }

  function setSelectOptionText(select, value, label) {
    const option = select?.querySelector(`option[value="${value}"]`);
    if (option) option.textContent = label;
  }

  function syncDefaultCharacterName() {
    const defaultNames = ["キャラクター", "Character", "캐릭터"];
    state.characters.forEach((character) => {
      if (character.id === "char_default" && defaultNames.includes(character.name)) {
        character.name = t("defaultCharacter");
      }
    });
  }

  function syncLanguageSelectOptions() {
    [languageSelect, inputLanguageSelect].forEach((select) => {
      if (!select) return;
      setSelectOptionText(select, "ja", t("languageNameJa"));
      setSelectOptionText(select, "en", t("languageNameEn"));
      setSelectOptionText(select, "ko", t("languageNameKo"));
    });
    if (languageSelect) languageSelect.value = activeUiLanguage;
    if (inputLanguageSelect) inputLanguageSelect.value = activeInputLanguage;
  }

  function applyLanguage({ rerender = true } = {}) {
    activeUiLanguage = normalizeLanguage(state.uiLanguage || activeUiLanguage);
    activeInputLanguage = normalizeLanguage(state.inputLanguage || activeInputLanguage || activeUiLanguage);
    localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, activeUiLanguage);
    localStorage.setItem(INPUT_LANGUAGE_STORAGE_KEY, activeInputLanguage);

    document.documentElement.lang = activeUiLanguage;
    document.body.dataset.uiLang = activeUiLanguage;
    syncLanguageSelectOptions();
    syncDefaultCharacterName();

    setElementText(".app-header p", t("appSubtitle"));
    setElementText("#uiLanguageLabel", t("uiLanguage"));
    setElementText("#inputLanguageLabel", t("inputLanguage"));
    setElementText("#saveJsonBtn", t("saveJson"));
    setElementText("#loadJsonLabelText", t("loadJson"));
    setElementText("#saveCacheBtn", t("saveCache"));
    setElementText("#loadCacheBtn", t("loadCache"));
    setElementText("#helpBtn", t("help"));

    const summaryKeys = ["sceneManagement", "materials", "fontRegistration", "characterRegistration", "speechButtonRegistration", "lineList", "displaySettings", "export"];
    document.querySelectorAll(".controls-panel > details > summary").forEach((summary, index) => {
      if (summaryKeys[index]) summary.textContent = t(summaryKeys[index]);
    });

    setFieldLabel("#sceneSelect", t("sceneSelect"));
    setPlaceholder("#sceneNameInput", t("sceneNamePlaceholder"));
    setElementText("#addSceneBtn", t("add"));
    setElementText("#renameSceneBtn", t("rename"));
    setElementText("#duplicateSceneBtn", t("duplicate"));
    setElementText("#deleteSceneBtn", t("delete"));

    setFieldLabel("#audioInput", t("mediaFile"));
    setElementText("#clearAudioBtn", t("clearMaterial"));
    setFieldLabel("#windowImageInput", t("windowImage"));
    setElementText("#clearWindowImageBtn", t("clearImage"));

    setFieldLabel("#fontInput", t("customFontLoad"));
    setPlaceholder("#characterNameInput", t("characterNamePlaceholder"));
    setElementText("#addCharacterBtn", t("add"));

    setFieldLabel("#speechTextInput", t("speechTxtLoad"));
    setElementText("#clearSpeechButtonsBtn", t("clearSpeechButtons"));

    setFieldLabel("#exportPrefixInput", t("filePrefix"));
    setFieldLabel("#exportStartInput", t("exportStart"));
    setFieldLabel("#exportEndInput", t("exportEnd"));
    setElementText("#exportZipBtn", t("exportZip"));

    setElementText(".preview-toolbar strong", "Canvas");
    setElementText(".preview-audio-head strong", t("mediaPreviewTitle"));
    setElementText(".preview-audio-head span", t("mediaPreviewSubtitle"));
    setFieldLabel("#previewTimeInput", t("previewSeconds"));
    setElementText("#renderPreviewBtn", t("update"));
    setElementText(".preview-media-hint", t("mediaHint"));

    setFieldLabel("#lineCharacterSelect", t("nameSelect"));
    setFieldLabel("#lineTextInput", t("lineInput"));
    setPlaceholder("#lineTextInput", t("lineInputPlaceholder"));
    setElementText(".quick-settings > summary", t("quickSettings"));
    setFieldLabel("#lineStartInput", t("startSeconds"));
    setFieldLabel("#lineEndInput", t("endSeconds"));
    if (lineCpsOutput?.parentElement?.firstChild) lineCpsOutput.parentElement.firstChild.nodeValue = `${t("charsPerSecond")} `;
    setFieldLabel("#lineAnimationSelect", t("bodyAnimation"));
    setSelectOptionText(lineAnimationSelect, "typewriter", t("animTypewriter"));
    setSelectOptionText(lineAnimationSelect, "scaleReveal", t("animScaleReveal"));
    setSelectOptionText(lineAnimationSelect, "normal", t("animNormal"));
    if (lineScaleRevealMinOutput?.parentElement?.firstChild) lineScaleRevealMinOutput.parentElement.firstChild.nodeValue = `${t("scaleStartSize")} `;
    setElementText("#setStartFromAudioBtn", t("setStartFromCurrent"));
    setElementText("#setEndFromAudioBtn", t("setEndFromCurrent"));
    setElementText("#addOrUpdateLineBtn", state.selectedLineId ? t("updateLine") : t("addLine"));
    setElementText("#cancelEditLineBtn", t("cancelEdit"));

    setElementText("#helpModalTitle", t("help"));
    setElementText(".manual-modal-head p", t("helpSubtitle"));
    setElementHtml(".manual-modal-body", t("manualBodyHtml"));
    setElementText("#helpCloseFooterBtn", t("close"));
    helpCloseBtn?.setAttribute("aria-label", t("close"));

    if (!state.audioDataUrl && audioFileInfo) audioFileInfo.textContent = t("savedMaterialNone");
    if (speechBankStatus) speechBankStatus.textContent = inputT("speechBankStatusDefault");
    if (fontStatus && (!state.customFonts || state.customFonts.length === 0)) fontStatus.textContent = t("fontStatusDefault");

    updateMediaPlayPauseButton();

    if (rerender) {
      populateCharacterSelect();
      populateSceneSelect();
      renderCharacterList();
      renderSpeechButtonGroups();
      renderLineList();
      renderCustomFontList();
      renderSettingsPanel();
      renderAt(currentPreviewTime());
    }
  }

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

  function normalizeCps(value) {
    return Math.round(clampNumber(value, 1, 120));
  }

  function syncCpsControls(value, source = null) {
    const cps = normalizeCps(value || 24);
    if (lineCpsInput && source !== lineCpsInput) lineCpsInput.value = String(cps);
    if (lineCpsRange && source !== lineCpsRange) lineCpsRange.value = String(cps);
    if (lineCpsOutput) lineCpsOutput.textContent = `${cps} cps`;
    return cps;
  }

  function normalizeAnimation(value) {
    return ["normal", "typewriter", "scaleReveal"].includes(value) ? value : "typewriter";
  }

  function normalizeScaleRevealMin(value) {
    return Math.round(clampNumber(value, 1, 100));
  }

  function syncScaleRevealMinControls(value, source = null) {
    const min = normalizeScaleRevealMin(value || 18);
    if (lineScaleRevealMinInput && source !== lineScaleRevealMinInput) lineScaleRevealMinInput.value = String(min);
    if (lineScaleRevealMinRange && source !== lineScaleRevealMinRange) lineScaleRevealMinRange.value = String(min);
    if (lineScaleRevealMinOutput) lineScaleRevealMinOutput.textContent = `${min}%`;
    return min;
  }

  function syncAnimationControls(animation = "typewriter") {
    const value = normalizeAnimation(animation);
    if (lineAnimationSelect) lineAnimationSelect.value = value;
    document.querySelectorAll(".scale-reveal-field").forEach((element) => {
      element.classList.toggle("is-muted", value !== "scaleReveal");
    });
    return value;
  }

  function getFontOptions() {
    const customOptions = (state.customFonts || [])
      .filter((font) => font && font.family && font.dataUrl)
      .map((font) => ({
        label: t("customFontPrefix", { name: font.label || font.fileName || font.family }),
        value: `"${font.family}", sans-serif`
      }));
    return [...FONT_OPTIONS, ...customOptions];
  }

  function escapeCssString(value) {
    return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  function sanitizeFontFamilyName(fileName) {
    const base = String(fileName || "custom-font")
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "_")
      .replace(/^_+|_+$/g, "") || "custom_font";
    return `UserFont_${base}_${Math.random().toString(36).slice(2, 8)}`;
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

  async function loadCustomFont(font) {
    if (!font || !font.family || !font.dataUrl) return false;
    if (font._loaded) return true;
    if (typeof FontFace === "undefined") return false;

    try {
      const face = new FontFace(font.family, `url("${escapeCssString(font.dataUrl)}")`);
      const loaded = await face.load();
      document.fonts.add(loaded);
      font._loaded = true;
      return true;
    } catch (error) {
      console.error(error);
      font._loaded = false;
      return false;
    }
  }

  async function hydrateCustomFonts() {
    const results = await Promise.all((state.customFonts || []).map((font) => loadCustomFont(font)));
    renderCustomFontList();
    return results.every(Boolean);
  }

  function renderCustomFontList() {
    if (!customFontList) return;
    customFontList.innerHTML = "";

    if (!state.customFonts || state.customFonts.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-text";
      empty.textContent = t("customFontEmpty");
      customFontList.appendChild(empty);
      if (fontStatus) fontStatus.textContent = t("customFontHelpShort");
      return;
    }

    for (const font of state.customFonts) {
      const item = document.createElement("div");
      item.className = "custom-font-item";

      const sample = document.createElement("div");
      sample.className = "custom-font-sample";
      sample.style.fontFamily = `"${font.family}", sans-serif`;
      sample.textContent = font.label || font.fileName || font.family;

      const meta = document.createElement("small");
      meta.textContent = `${font.fileName || "font"} / ${font._loaded ? t("loaded") : t("notLoaded")}`;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "danger";
      remove.textContent = t("delete");
      remove.addEventListener("click", () => {
        const fontValue = `"${font.family}", sans-serif`;
        state.customFonts = state.customFonts.filter((target) => target.id !== font.id);
        if (state.settings.nameText.fontFamily === fontValue) state.settings.nameText.fontFamily = "\"Noto Sans JP\", sans-serif";
        if (state.settings.bodyText.fontFamily === fontValue) state.settings.bodyText.fontFamily = "\"Noto Sans JP\", sans-serif";
        renderCustomFontList();
        renderSettingsPanel();
        renderAt(currentPreviewTime());
      });

      const textWrap = document.createElement("div");
      textWrap.append(sample, meta);
      item.append(textWrap, remove);
      customFontList.appendChild(item);
    }

    if (fontStatus) {
      fontStatus.textContent = t("customFontCount", { count: state.customFonts.length });
    }
  }

  async function importCustomFonts(files) {
    const targets = Array.from(files || []).filter((file) => file);
    if (targets.length === 0) return;
    if (fontStatus) fontStatus.textContent = t("loadingFont");

    let added = 0;
    for (const file of targets) {
      try {
        const dataUrl = await readFileAsDataUrl(file);
        const label = file.name.replace(/\\.[^.]+$/, "") || file.name;
        const font = {
          id: uniqueId("font"),
          label,
          family: sanitizeFontFamilyName(file.name),
          fileName: file.name,
          mimeType: file.type || "font/*",
          dataUrl
        };
        const ok = await loadCustomFont(font);
        if (!ok) throw new Error("FontFace load failed");
        state.customFonts.push(font);
        added += 1;
      } catch (error) {
        console.error(error);
        alert(t("fontLoadFailed", { file: file.name }));
      }
    }

    renderCustomFontList();
    renderSettingsPanel();
    renderAt(currentPreviewTime());
    if (fontStatus) fontStatus.textContent = t("fontAdded", { count: added });
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


  function cloneLine(line) {
    return { ...line };
  }

  function createScene(name = t("scene1"), source = {}) {
    const audio = source.audio || null;
    return {
      id: source.id || uniqueId("scene"),
      name: String(source.name || name || t("scene")).trim() || t("scene"),
      lines: Array.isArray(source.lines) ? source.lines.map(cloneLine) : [],
      audioDataUrl: source.audioDataUrl || audio?.dataUrl || null,
      audioFileName: source.audioFileName || audio?.fileName || "",
      audioMimeType: source.audioMimeType || audio?.mimeType || ""
    };
  }

  function ensureScenes() {
    if (!Array.isArray(state.scenes) || state.scenes.length === 0) {
      state.scenes = [
        createScene(t("scene1"), {
          lines: state.lines,
          audioDataUrl: state.audioDataUrl,
          audioFileName: state.audioFileName,
          audioMimeType: state.audioMimeType
        })
      ];
    }

    if (!state.currentSceneId || !state.scenes.some((scene) => scene.id === state.currentSceneId)) {
      state.currentSceneId = state.scenes[0]?.id || "";
    }
  }

  function getCurrentScene() {
    ensureScenes();
    return state.scenes.find((scene) => scene.id === state.currentSceneId) || state.scenes[0] || null;
  }

  function captureCurrentScene() {
    const scene = getCurrentScene();
    if (!scene) return;

    scene.lines = state.lines.map(cloneLine);
    scene.audioDataUrl = state.audioDataUrl || null;
    scene.audioFileName = state.audioFileName || "";
    scene.audioMimeType = state.audioMimeType || "";
  }

  function resetLineFormAfterSceneSwitch() {
    state.selectedLineId = null;
    lineTextInput.value = "";
    lineStartInput.value = "0";
    lineEndInput.value = "3";
    syncCpsControls(24);
    syncAnimationControls("typewriter");
    syncScaleRevealMinControls(18);
    addOrUpdateLineBtn.textContent = t("addLine");
  }

  function applySceneToState(scene) {
    if (!scene) return;

    state.currentSceneId = scene.id;
    state.lines = Array.isArray(scene.lines) ? scene.lines.map(cloneLine) : [];
    resetLineFormAfterSceneSwitch();
    setAudioFromDataUrl(scene.audioDataUrl || null, scene.audioFileName || "", scene.audioMimeType || "");
    audioInput.value = "";
    syncPreviewInputs(0);
    updatePreviewMax();
  }

  function populateSceneSelect() {
    ensureScenes();
    if (!sceneSelect) return;

    const selectedId = state.currentSceneId;
    sceneSelect.innerHTML = "";

    state.scenes.forEach((scene, index) => {
      const option = document.createElement("option");
      option.value = scene.id;
      option.textContent = scene.name || `${t("scene")}${index + 1}`;
      sceneSelect.appendChild(option);
    });

    sceneSelect.value = selectedId;

    const current = getCurrentScene();
    if (sceneNameInput && document.activeElement !== sceneNameInput) {
      sceneNameInput.value = current?.name || "";
    }

    if (sceneStatus) {
      const lineCount = state.lines.length;
      const materialLabel = hasPreviewVideo() ? t("materialMp4") : t("materialAudio");
      const audioText = state.audioDataUrl ? `${materialLabel}: ${state.audioFileName || t("materialFile")}` : t("noMedia");
      sceneStatus.textContent = t("currentSceneStatus", { name: current?.name || t("scene"), count: lineCount, media: audioText });
    }
  }

  function refreshSceneUi() {
    populateSceneSelect();
    renderLineList();
    updatePreviewMax();
    renderAt(currentPreviewTime());
  }

  function addScene() {
    captureCurrentScene();
    const currentName = getCurrentScene()?.name || "";
    const typedName = String(sceneNameInput.value || "").trim();
    const name = typedName && typedName !== currentName ? typedName : `${t("scene")}${state.scenes.length + 1}`;
    const scene = createScene(name);
    state.scenes.push(scene);
    applySceneToState(scene);
    refreshSceneUi();
  }

  function renameScene() {
    const scene = getCurrentScene();
    if (!scene) return;

    const name = String(sceneNameInput.value || "").trim();
    if (!name) {
      alert(t("enterSceneName"));
      return;
    }

    scene.name = name;
    populateSceneSelect();
  }

  function duplicateScene() {
    captureCurrentScene();
    const source = getCurrentScene();
    if (!source) return;

    const copy = createScene(t("sceneCopy", { name: source.name || t("scene") }), {
      lines: source.lines,
      audioDataUrl: source.audioDataUrl,
      audioFileName: source.audioFileName,
      audioMimeType: source.audioMimeType
    });
    state.scenes.push(copy);
    applySceneToState(copy);
    refreshSceneUi();
  }

  function deleteScene() {
    ensureScenes();
    if (state.scenes.length <= 1) {
      alert(t("needScene"));
      return;
    }

    const scene = getCurrentScene();
    if (!scene) return;
    if (!confirm(t("confirmDeleteScene", { name: scene.name || t("currentScene") }))) return;

    const index = state.scenes.findIndex((target) => target.id === scene.id);
    state.scenes = state.scenes.filter((target) => target.id !== scene.id);
    const nextScene = state.scenes[Math.max(0, Math.min(index, state.scenes.length - 1))];
    applySceneToState(nextScene);
    refreshSceneUi();
  }

  function setAudioFromDataUrl(dataUrl, fileName = "", mimeType = "") {
    state.audioDataUrl = dataUrl || null;
    state.audioFileName = fileName || "";
    state.audioMimeType = mimeType || "";

    if (state.audioObjectUrl) {
      URL.revokeObjectURL(state.audioObjectUrl);
      state.audioObjectUrl = null;
    }

    stopPreviewLoop();
    audioPlayer.pause();
    previewVideoPlayer?.pause();
    audioPlayer.removeAttribute("src");
    audioPlayer.load();
    previewVideoPlayer?.removeAttribute("src");
    previewVideoPlayer?.load();

    if (state.audioDataUrl) {
      if (hasPreviewVideo()) {
        previewVideoPlayer.src = state.audioDataUrl;
        previewVideoPlayer.load();
        audioFileInfo.textContent = t("savedMp4", { name: state.audioFileName || t("unnamed") });
      } else {
        audioPlayer.src = state.audioDataUrl;
        audioPlayer.load();
        audioFileInfo.textContent = t("savedAudio", { name: state.audioFileName || t("unnamed") });
      }
    } else {
      audioFileInfo.textContent = t("savedMaterialNone");
      previewTimeRange.max = Math.max(30, Number(exportEndInput.value) || 0);
    }

    syncMediaVisibility();
    populateSceneSelect();
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

  function getFormPreviewLine(time) {
    const text = lineTextInput.value.trim();
    const characterId = lineCharacterSelect.value;
    const start = Number(lineStartInput.value);
    const end = Number(lineEndInput.value);

    if (!text || !characterId) return null;
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) return null;
    if (time < start || time > end) return null;

    return {
      id: state.selectedLineId || "__form_preview__",
      characterId,
      text,
      start,
      end,
      charsPerSecond: normalizeCps(lineCpsInput.value),
      animation: normalizeAnimation(lineAnimationSelect?.value),
      scaleRevealMin: normalizeScaleRevealMin(lineScaleRevealMinInput?.value || 18),
      _isFormPreview: true
    };
  }

  function getActiveLine(time, options = {}) {
    const useFormPreview = options.useFormPreview !== false;
    const formPreviewLine = useFormPreview ? getFormPreviewLine(time) : null;

    if (formPreviewLine) return formPreviewLine;

    return [...state.lines]
      .sort((a, b) => Number(b.start) - Number(a.start))
      .find((line) => Number(line.start) <= time && time <= Number(line.end)) || null;
  }

  function getLineAnimation(line) {
    return normalizeAnimation(line?.animation || "typewriter");
  }

  function getAnimatedText(line, time) {
    const animation = getLineAnimation(line);
    if (animation === "normal" || animation === "scaleReveal") return String(line.text || "");

    const cps = normalizeCps(line.charsPerSecond || 24);
    const elapsed = Math.max(0, time - Number(line.start));
    const visibleLength = Math.floor(elapsed * cps);
    return Array.from(line.text || "").slice(0, visibleLength).join("");
  }

  function easeOutCubic(value) {
    const t = clampNumber(value, 0, 1);
    return 1 - Math.pow(1 - t, 3);
  }

  function clearTextShadow(context) {
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowColor = "rgba(0,0,0,0)";
  }

  function paintBodyGlyphLayer(context, char, x, y, options, layer) {
    const fontFamily = options.fontFamily || state.settings.font?.family || "\"Noto Sans JP\", sans-serif";
    context.font = `${options.fontSize}px ${fontFamily}`;
    context.textBaseline = "top";
    context.textAlign = "left";
    context.lineJoin = "round";

    if (layer === "shadow") {
      const shadow = state.settings.shadow || {};
      const blur = Number(shadow.blur) || 0;
      const offsetX = Number(shadow.offsetX) || 0;
      const offsetY = Number(shadow.offsetY) || 0;
      if (!blur && !offsetX && !offsetY) return;
      context.shadowBlur = blur;
      context.shadowOffsetX = offsetX;
      context.shadowOffsetY = offsetY;
      context.shadowColor = shadow.color || "#000000";
      context.fillStyle = options.color || "#ffffff";
      context.fillText(char, x, y);
      clearTextShadow(context);
      return;
    }

    clearTextShadow(context);
    if (layer === "stroke") {
      if (Number(options.strokeWidth) > 0) {
        context.lineWidth = Number(options.strokeWidth);
        context.strokeStyle = options.strokeColor || "#1c3b52";
        context.strokeText(char, x, y);
      }
      return;
    }

    context.fillStyle = options.color || "#ffffff";
    context.fillText(char, x, y);
  }

  function drawScaleRevealBodyText(context, fullText, startX, startY, style, line, time) {
    const elapsed = Math.max(0, time - Number(line.start));
    const revealSpeed = normalizeCps(line.charsPerSecond || 24);
    const minScale = normalizeScaleRevealMin(line.scaleRevealMin || 18) / 100;

    context.save();
    const bodyFontFamily = style.fontFamily || state.settings.font?.family || "\"Noto Sans JP\", sans-serif";
    context.font = `${style.fontSize}px ${bodyFontFamily}`;
    const wrappedLines = splitTextByWidth(context, fullText, Number(style.width) || 1200).slice(0, Number(style.maxLines) || 3);
    const plans = [];
    let globalCharIndex = 0;

    wrappedLines.forEach((textLine, lineIndex) => {
      let cursorX = startX;
      const y = startY + lineIndex * style.lineHeight;
      for (const char of Array.from(textLine)) {
        context.font = `${style.fontSize}px ${bodyFontFamily}`;
        const width = context.measureText(char).width;
        const localProgress = elapsed * revealSpeed - globalCharIndex;
        if (localProgress >= 0) {
          const revealProgress = easeOutCubic(clampNumber(localProgress, 0, 1));
          plans.push({
            char,
            x: cursorX,
            y,
            width,
            scale: minScale + (1 - minScale) * revealProgress,
            alpha: revealProgress
          });
        }
        cursorX += width;
        globalCharIndex += 1;
      }
    });

    const drawPlan = (plan, layer) => {
      if (plan.alpha <= 0) return;
      const previousAlpha = context.globalAlpha;
      context.save();
      context.globalAlpha = previousAlpha * plan.alpha;
      context.translate(plan.x + plan.width / 2, plan.y + style.fontSize / 2);
      context.scale(plan.scale, plan.scale);
      paintBodyGlyphLayer(context, plan.char, -plan.width / 2, -style.fontSize / 2, style, layer);
      context.restore();
      context.globalAlpha = previousAlpha;
    };

    ["shadow", "stroke", "fill"].forEach((layer) => {
      plans.forEach((plan) => drawPlan(plan, layer));
    });
    context.restore();
  }

  function renderAt(time, options = {}) {
    const currentTime = Number(time) || 0;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const w = state.settings.window;
    if (state.windowImage) {
      ctx.drawImage(state.windowImage, w.x, w.y, w.width, w.height);
    } else {
      drawFallbackWindow(ctx);
    }

    const activeLine = getActiveLine(currentTime, options);
    if (!activeLine) {
      activeLineInfo.textContent = t("noActiveLine");
      return;
    }

    const character = findCharacter(activeLine.characterId);
    const characterName = character?.name || "";
    const visibleText = getAnimatedText(activeLine, currentTime);

    const nameStyle = state.settings.nameText;
    drawStrokedText(ctx, characterName, nameStyle.x, nameStyle.y, nameStyle);

    const bodyStyle = state.settings.bodyText;
    const animation = getLineAnimation(activeLine);
    if (animation === "scaleReveal") {
      drawScaleRevealBodyText(ctx, String(activeLine.text || ""), bodyStyle.x, bodyStyle.y, bodyStyle, activeLine, currentTime);
    } else {
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
    }

    const previewLabel = activeLine._isFormPreview ? t("formPreview") : "";
    activeLineInfo.textContent = `${previewLabel}${characterName}：${activeLine.text}`;
  }

  function currentPreviewTime() {
    const media = activeMediaPlayer();
    if (media?.src && !media.paused) return media.currentTime || 0;
    return Number(previewTimeInput.value) || 0;
  }

  function syncPreviewInputs(time) {
    const value = toFixedSafe(time, 2);
    previewTimeInput.value = value;
    previewTimeRange.value = value;
  }

  function getLiveFormPreviewTime() {
    const start = Number(lineStartInput.value);
    const end = Number(lineEndInput.value);
    let time = currentPreviewTime();

    if (!lineTextInput.value.trim() || !Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      return time;
    }

    if (time < start || time > end) {
      const previewOffset = Math.min(1, Math.max(0.05, (end - start) * 0.35));
      time = Math.min(end, start + previewOffset);
      syncPreviewInputs(time);
    }

    return time;
  }

  function updateSelectedLineFromForm() {
    if (!state.selectedLineId) return false;
    const line = state.lines.find((target) => target.id === state.selectedLineId);
    if (!line) return false;

    const characterId = lineCharacterSelect.value;
    const text = lineTextInput.value.trim();
    const start = Number(lineStartInput.value);
    const end = Number(lineEndInput.value);

    if (characterId) line.characterId = characterId;
    if (text) line.text = text;
    if (Number.isFinite(start) && start >= 0) line.start = start;
    if (Number.isFinite(end) && end > (Number.isFinite(start) ? start : Number(line.start))) line.end = end;
    line.charsPerSecond = normalizeCps(lineCpsInput.value);
    line.animation = normalizeAnimation(lineAnimationSelect?.value);
    line.scaleRevealMin = normalizeScaleRevealMin(lineScaleRevealMinInput?.value || 18);
    return true;
  }

  function livePreviewLineForm({ updateList = false } = {}) {
    updateSelectedLineFromForm();
    if (updateList) renderLineList();
    populateSceneSelect();
    updatePreviewMax();
    renderAt(getLiveFormPreviewTime());
  }

  function updatePreviewMax() {
    const maxLineEnd = state.lines.reduce((max, line) => Math.max(max, Number(line.end) || 0), 0);
    const media = activeMediaPlayer();
    const mediaDuration = Number.isFinite(media?.duration) ? media.duration : 0;
    const max = Math.max(30, maxLineEnd, mediaDuration, Number(exportEndInput.value) || 0);
    previewTimeRange.max = toFixedSafe(max, 2);
  }


  function normalizeCharacterName(name) {
    return String(name || "").trim();
  }

  function findCharacterByName(name) {
    const normalized = normalizeCharacterName(name);
    return state.characters.find((character) => normalizeCharacterName(character.name) === normalized) || null;
  }

  function getOrCreateCharacterByName(name) {
    const normalized = normalizeCharacterName(name);
    if (!normalized) return null;

    const existing = findCharacterByName(normalized);
    if (existing) return existing;

    const character = { id: uniqueId("char"), name: normalized };
    state.characters.push(character);
    return character;
  }

  function normalizeSpeechText(text, opener) {
    let output = String(text || "").trim();
    if (opener === "「") output = output.replace(/」\s*$/, "").trim();
    if (opener === "『") output = output.replace(/』\s*$/, "").trim();
    if (opener === "“") output = output.replace(/[”"]\s*$/, "").trim();
    if (opener === "\"") output = output.replace(/[\"”]\s*$/, "").trim();
    if (opener === "'") output = output.replace(/'\s*$/, "").trim();
    if (opener === "(" || opener === "（") output = output.replace(/[)）]\s*$/, "").trim();
    return output;
  }

  function parseSpeechLine(rawLine) {
    const raw = String(rawLine || "").trim();
    if (!raw) return null;

    const numbered = raw.match(/^(\d{3})(?:[\s.．、_\-:：]+)([\s\S]+)$/);
    const speechNumber = numbered ? numbered[1] : "";
    const line = (numbered ? numbered[2] : raw).trim();
    const match = line.match(/^(.+?)(：|:|「|『|“|"|'|\(|（)([\s\S]*)$/);
    if (!match) return null;

    const characterName = normalizeCharacterName(match[1]);
    const text = normalizeSpeechText(match[3], match[2]);
    if (!characterName || !text) return null;

    return { characterName, text, speechNumber, raw };
  }

  function importSpeechText(text) {
    const rows = String(text || "").split(/\r?\n/);
    let added = 0;
    let createdCharacters = 0;
    let skipped = 0;

    for (let index = 0; index < rows.length; index += 1) {
      const parsed = parseSpeechLine(rows[index]);
      if (!parsed) {
        if (String(rows[index] || "").trim()) skipped += 1;
        continue;
      }

      const beforeCount = state.characters.length;
      const character = getOrCreateCharacterByName(parsed.characterName);
      if (!character) {
        skipped += 1;
        continue;
      }
      if (state.characters.length > beforeCount) createdCharacters += 1;

      state.speechButtons.push({
        id: uniqueId("speech"),
        characterId: character.id,
        text: parsed.text,
        speechNumber: parsed.speechNumber || "",
        sourceLineNumber: index + 1,
        raw: parsed.raw
      });
      added += 1;
    }

    state.speechButtons.sort((a, b) => {
      const charA = findCharacter(a.characterId)?.name || "";
      const charB = findCharacter(b.characterId)?.name || "";
      const charCompare = charA.localeCompare(charB, localeForLanguage(activeInputLanguage));
      if (charCompare) return charCompare;
      const numA = a.speechNumber ? Number(a.speechNumber) : Number.POSITIVE_INFINITY;
      const numB = b.speechNumber ? Number(b.speechNumber) : Number.POSITIVE_INFINITY;
      return numA - numB || (a.sourceLineNumber || 0) - (b.sourceLineNumber || 0);
    });

    populateCharacterSelect();
    renderCharacterList();
    renderSpeechButtonGroups();
    renderAt(currentPreviewTime());

    if (speechBankStatus) {
      speechBankStatus.textContent = t("speechImported", { added, created: createdCharacters, skipped });
    }
  }

  function insertSpeechButton(buttonId) {
    const button = state.speechButtons.find((item) => item.id === buttonId);
    if (!button) return;

    const character = findCharacter(button.characterId);
    if (!character) {
      alert(t("speechCharMissing"));
      return;
    }

    const insertedLine = state.lines.find((line) => line.speechButtonId === button.id);
    if (insertedLine) {
      state.lines = state.lines.filter((line) => line.speechButtonId !== button.id);
      if (state.selectedLineId === insertedLine.id) {
        state.selectedLineId = null;
        lineTextInput.value = "";
      }
      renderLineList();
      renderSpeechButtonGroups();
      populateSceneSelect();
      renderAt(currentPreviewTime());
      if (speechBankStatus) speechBankStatus.textContent = t("speechInsertCanceled", { text: button.text });
      return;
    }

    const media = activeMediaPlayer();
    const now = media?.src ? media.currentTime : Number(previewTimeInput.value) || 0;
    const currentStart = Number(lineStartInput.value);
    const currentEnd = Number(lineEndInput.value);
    const duration = Number.isFinite(currentStart) && Number.isFinite(currentEnd) && currentEnd > currentStart
      ? Math.max(0.1, currentEnd - currentStart)
      : 3;
    const start = Math.max(0, now);
    const end = start + duration;
    const newLine = {
      id: uniqueId("line"),
      characterId: character.id,
      text: button.text,
      start,
      end,
      charsPerSecond: normalizeCps(lineCpsInput.value),
      animation: normalizeAnimation(lineAnimationSelect?.value),
      scaleRevealMin: normalizeScaleRevealMin(lineScaleRevealMinInput?.value || 18),
      speechButtonId: button.id
    };

    state.lines.push(newLine);
    state.selectedLineId = newLine.id;
    state.lastCharacterId = character.id;
    localStorage.setItem("adv-message-tool-last-character", character.id);

    lineCharacterSelect.value = character.id;
    lineTextInput.value = button.text;
    lineStartInput.value = toFixedSafe(start);
    lineEndInput.value = toFixedSafe(end);
    syncPreviewInputs(start);

    exportStartInput.value = toFixedSafe(Math.min(Number(exportStartInput.value) || start, start));
    exportEndInput.value = toFixedSafe(Math.max(Number(exportEndInput.value) || end, end));

    renderLineList();
    renderSpeechButtonGroups();
    populateSceneSelect();
    renderAt(start);
    if (speechBankStatus) speechBankStatus.textContent = t("speechInserted", { text: button.text, time: toFixedSafe(start) });
  }

  function removeSpeechButton(buttonId) {
    state.speechButtons = state.speechButtons.filter((item) => item.id !== buttonId);
    renderSpeechButtonGroups();
  }

  function renderSpeechButtonGroups() {
    if (!speechButtonGroups) return;
    speechButtonGroups.innerHTML = "";

    const validButtons = state.speechButtons.filter((button) => findCharacter(button.characterId));
    state.speechButtons = validButtons;

    if (validButtons.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-text";
      empty.textContent = t("speechEmpty");
      speechButtonGroups.appendChild(empty);
      return;
    }

    const grouped = new Map();
    for (const button of validButtons) {
      const character = findCharacter(button.characterId);
      if (!character) continue;
      if (!grouped.has(character.id)) grouped.set(character.id, { character, buttons: [] });
      grouped.get(character.id).buttons.push(button);
    }

    for (const { character, buttons } of grouped.values()) {
      const group = document.createElement("section");
      group.className = "speech-button-group";

      const head = document.createElement("div");
      head.className = "speech-button-group-head";

      const title = document.createElement("strong");
      title.textContent = character.name;

      const count = document.createElement("span");
      count.textContent = t("countItems", { count: buttons.length });

      head.append(title, count);

      const list = document.createElement("div");
      list.className = "speech-button-list";

      for (const item of buttons) {
        const wrap = document.createElement("div");
        const insertedLine = state.lines.find((line) => line.speechButtonId === item.id);
        wrap.className = `speech-button-item${insertedLine ? " is-inserted" : ""}`;

        if (item.speechNumber) {
          const number = document.createElement("span");
          number.className = "speech-button-number";
          number.textContent = item.speechNumber;
          wrap.appendChild(number);
        }

        const insert = document.createElement("button");
        insert.type = "button";
        insert.className = `speech-insert-button${insertedLine ? " is-inserted" : ""}`;
        insert.textContent = item.text;
        insert.title = insertedLine
          ? t("speechInsertedTitle", { name: character.name, text: item.text })
          : t("speechInsertTitle", { name: character.name, text: item.text });
        insert.setAttribute("aria-pressed", insertedLine ? "true" : "false");
        insert.addEventListener("click", () => insertSpeechButton(item.id));

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "speech-remove-button danger";
        remove.textContent = "×";
        remove.title = t("removeSpeechButtonTitle");
        remove.addEventListener("click", () => removeSpeechButton(item.id));

        wrap.append(insert, remove);
        list.appendChild(wrap);
      }

      group.append(head, list);
      speechButtonGroups.appendChild(group);
    }
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
      remove.textContent = t("delete");
      remove.disabled = state.characters.length <= 1;
      remove.addEventListener("click", () => {
        captureCurrentScene();
        const used = state.scenes.some((scene) => (scene.lines || []).some((line) => line.characterId === character.id));
        if (used && !confirm(t("confirmDeleteCharacter"))) return;

        state.characters = state.characters.filter((target) => target.id !== character.id);
        state.scenes.forEach((scene) => {
          scene.lines = (scene.lines || []).filter((line) => line.characterId !== character.id);
        });
        state.lines = (getCurrentScene()?.lines || []).map(cloneLine);
        if (state.selectedLineId && !state.lines.some((line) => line.id === state.selectedLineId)) {
          state.selectedLineId = null;
          addOrUpdateLineBtn.textContent = t("addLine");
        }
        state.speechButtons = state.speechButtons.filter((button) => button.characterId !== character.id);
        if (state.lastCharacterId === character.id) state.lastCharacterId = state.characters[0]?.id || "";
        populateCharacterSelect();
        populateSceneSelect();
        renderCharacterList();
        renderSpeechButtonGroups();
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
      const animationLabel = getLineAnimation(line) === "scaleReveal" ? t("animShortScale") : getLineAnimation(line) === "normal" ? t("animShortNormal") : t("animShortType");
      meta.innerHTML = `<span>${escapeHtml(character?.name || t("unset"))}</span><span>${toFixedSafe(line.start)}s - ${toFixedSafe(line.end)}s / ${line.charsPerSecond}cps / ${animationLabel}</span>`;

      const text = document.createElement("div");
      text.className = "line-text";
      text.textContent = line.text;

      const actions = document.createElement("div");
      actions.className = "line-actions";

      const edit = document.createElement("button");
      edit.type = "button";
      edit.textContent = t("edit");
      edit.addEventListener("click", () => selectLineForEdit(line.id));

      const duplicate = document.createElement("button");
      duplicate.type = "button";
      duplicate.textContent = t("duplicate");
      duplicate.addEventListener("click", () => duplicateLine(line.id));

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "danger";
      remove.textContent = t("delete");
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
    syncCpsControls(line.charsPerSecond || 24);
    syncAnimationControls(line.animation || "typewriter");
    syncScaleRevealMinControls(line.scaleRevealMin || 18);
    addOrUpdateLineBtn.textContent = t("updateLine");
    const previewOffset = Math.min(1, Math.max(0.05, (Number(line.end) || 0) - (Number(line.start) || 0)) * 0.35);
    syncPreviewInputs(Math.min(Number(line.end) || Number(line.start) || 0, (Number(line.start) || 0) + previewOffset));
    renderLineList();
    renderAt(currentPreviewTime());
  }

  function clearLineEdit() {
    state.selectedLineId = null;
    lineTextInput.value = "";
    lineStartInput.value = toFixedSafe(Number(lineEndInput.value) || 0);
    lineEndInput.value = toFixedSafe((Number(lineStartInput.value) || 0) + 3);
    syncCpsControls(24);
    syncAnimationControls("typewriter");
    syncScaleRevealMinControls(18);
    addOrUpdateLineBtn.textContent = t("addLine");
    renderLineList();
  }

  function getLineFormData() {
    const characterId = lineCharacterSelect.value;
    const text = lineTextInput.value.trim();
    const start = Number(lineStartInput.value);
    const end = Number(lineEndInput.value);
    const charsPerSecond = normalizeCps(lineCpsInput.value);
    const animation = normalizeAnimation(lineAnimationSelect?.value);
    const scaleRevealMin = normalizeScaleRevealMin(lineScaleRevealMinInput?.value || 18);

    if (!characterId) throw new Error(t("needCharacter"));
    if (!text) throw new Error(t("needLineText"));
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) {
      throw new Error(t("invalidLineTime"));
    }

    return { characterId, text, start, end, charsPerSecond, animation, scaleRevealMin };
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
      renderSpeechButtonGroups();
      populateSceneSelect();
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
    populateSceneSelect();
    renderAt(currentPreviewTime());
  }

  function removeLine(id) {
    state.lines = state.lines.filter((line) => line.id !== id);
    if (state.selectedLineId === id) clearLineEdit();
    renderLineList();
    renderSpeechButtonGroups();
    populateSceneSelect();
    renderAt(currentPreviewTime());
  }

  function renderSettingsPanel() {
    settingsPanel.innerHTML = "";

    for (const definition of settingDefinitions) {
      const row = document.createElement("label");
      row.className = "setting-row";

      const label = document.createElement("span");
      label.textContent = t(SETTING_LABEL_KEYS[definition.path] || definition.label);

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

        const selectOptions = definition.path.endsWith("fontFamily") ? getFontOptions() : (definition.options || []);
        for (const optionData of selectOptions) {
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
        const selectOptions = definition.path.endsWith("fontFamily") ? getFontOptions() : (definition.options || []);
        const selected = selectOptions.find((option) => option.value === value);
        valueInput.textContent = selected?.label || t("selectActive");
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
          const selectOptions = definition.path.endsWith("fontFamily") ? getFontOptions() : (definition.options || []);
          const selected = selectOptions.find((option) => option.value === nextValue);
          valueInput.textContent = selected?.label || t("selectActive");
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
    captureCurrentScene();

    const scenes = state.scenes.map((scene) => ({
      id: scene.id,
      name: scene.name,
      lines: (scene.lines || []).map(cloneLine),
      audio: scene.audioDataUrl
        ? {
            dataUrl: scene.audioDataUrl,
            fileName: scene.audioFileName || "",
            mimeType: scene.audioMimeType || ""
          }
        : null
    }));

    return {
      version: 2,
      canvas: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
      },
      uiLanguage: activeUiLanguage,
      inputLanguage: activeInputLanguage,
      characters: state.characters,
      customFonts: (state.customFonts || []).map((font) => ({
        id: font.id,
        label: font.label,
        family: font.family,
        fileName: font.fileName,
        mimeType: font.mimeType,
        dataUrl: font.dataUrl
      })),
      speechButtons: state.speechButtons.map((button) => ({ ...button })),
      scenes,
      currentSceneId: state.currentSceneId,
      // 旧形式との互換用：現在のシーンもトップレベルへ残します。
      lines: state.lines.map(cloneLine),
      settings: state.settings,
      lastCharacterId: state.lastCharacterId,
      windowImageDataUrl: state.windowImageDataUrl,
      audioDataUrl: state.audioDataUrl,
      audioFileName: state.audioFileName,
      audioMimeType: state.audioMimeType
    };
  }

  async function applyProjectData(data) {
    state.uiLanguage = normalizeLanguage(data.uiLanguage || state.uiLanguage || activeUiLanguage);
    state.inputLanguage = normalizeLanguage(data.inputLanguage || state.inputLanguage || activeInputLanguage || state.uiLanguage);
    activeUiLanguage = state.uiLanguage;
    activeInputLanguage = state.inputLanguage;
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
      : [{ id: "char_default", name: t("defaultCharacter") }];
    state.customFonts = Array.isArray(data.customFonts)
      ? data.customFonts
          .filter((font) => font && font.family && font.dataUrl)
          .map((font) => ({ ...font, id: font.id || uniqueId("font"), _loaded: false }))
      : [];
    await hydrateCustomFonts();
    state.speechButtons = Array.isArray(data.speechButtons)
      ? data.speechButtons
          .filter((button) => button && button.characterId && button.text)
          .map((button) => ({ ...button, id: button.id || uniqueId("speech") }))
      : [];
    state.selectedLineId = null;
    state.lastCharacterId = data.lastCharacterId || state.characters[0]?.id || "";
    state.settings = settings;
    state.windowImageDataUrl = data.windowImageDataUrl || null;
    state.windowImage = await loadImageFromDataUrl(state.windowImageDataUrl);

    if (Array.isArray(data.scenes) && data.scenes.length > 0) {
      state.scenes = data.scenes.map((scene, index) => createScene(scene.name || `${t("scene")}${index + 1}`, {
        id: scene.id,
        name: scene.name,
        lines: scene.lines,
        audio: scene.audio,
        audioDataUrl: scene.audioDataUrl,
        audioFileName: scene.audioFileName,
        audioMimeType: scene.audioMimeType
      }));
      state.currentSceneId = data.currentSceneId && state.scenes.some((scene) => scene.id === data.currentSceneId)
        ? data.currentSceneId
        : state.scenes[0].id;
    } else {
      state.scenes = [
        createScene(t("scene1"), {
          lines: Array.isArray(data.lines) ? data.lines : [],
          audioDataUrl: data.audioDataUrl || null,
          audioFileName: data.audioFileName || "",
          audioMimeType: data.audioMimeType || ""
        })
      ];
      state.currentSceneId = state.scenes[0].id;
    }

    const currentScene = getCurrentScene();
    state.lines = (currentScene?.lines || []).map(cloneLine);
    setAudioFromDataUrl(currentScene?.audioDataUrl || null, currentScene?.audioFileName || "", currentScene?.audioMimeType || "");
    audioInput.value = "";
    resetLineFormAfterSceneSwitch();

    populateCharacterSelect();
    populateSceneSelect();
    renderCharacterList();
    renderSpeechButtonGroups();
    renderLineList();
    renderCustomFontList();
    renderSettingsPanel();
    updatePreviewMax();
    applyLanguage({ rerender: false });
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
        else reject(new Error(t("pngFailed")));
      }, "image/png");
    });
  }

  async function exportZip() {
    if (typeof JSZip === "undefined") {
      alert(t("jszipMissing"));
      return;
    }

    if (document.fonts?.ready) {
      exportProgress.textContent = t("checkingFonts");
      await hydrateCustomFonts();
      await document.fonts.ready;
    }

    const fps = clampNumber(exportFpsInput.value, 1, 60);
    const start = Number(exportStartInput.value);
    const end = Number(exportEndInput.value);
    const prefix = (exportPrefixInput.value.trim() || "frame").replace(/[\\/:*?"<>|]/g, "_");

    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) {
      alert(t("invalidExportTime"));
      return;
    }

    const totalFrames = Math.floor((end - start) * fps) + 1;
    if (totalFrames > 1800 && !confirm(t("confirmManyFrames", { count: totalFrames }))) {
      return;
    }

    exportZipBtn.disabled = true;
    exportProgress.textContent = t("creatingPng");

    const zip = new JSZip();
    const digits = Math.max(6, String(totalFrames).length);
    const originalPreviewTime = currentPreviewTime();

    try {
      for (let frame = 0; frame < totalFrames; frame += 1) {
        const time = start + frame / fps;
        renderAt(time, { useFormPreview: false });
        const blob = await canvasToPngBlob();
        const filename = `${prefix}_${String(frame + 1).padStart(digits, "0")}.png`;
        zip.file(filename, blob);

        if (frame % 5 === 0 || frame === totalFrames - 1) {
          exportProgress.textContent = t("creatingPngProgress", { current: frame + 1, total: totalFrames });
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }
      }

      exportProgress.textContent = t("creatingZip");
      const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" }, (metadata) => {
        exportProgress.textContent = t("creatingZipProgress", { percent: metadata.percent.toFixed(1) });
      });
      downloadBlob(zipBlob, `adv_message_frames_${Date.now()}.zip`);
      exportProgress.textContent = t("exportDone");
    } catch (error) {
      console.error(error);
      alert(error.message || t("exportError"));
      exportProgress.textContent = t("exportFailed");
    } finally {
      exportZipBtn.disabled = false;
      renderAt(originalPreviewTime);
    }
  }


  function openHelpModal() {
    if (!helpModal) return;
    helpModal.classList.remove("hidden");
    document.body.classList.add("modal-open");
    helpCloseBtn?.focus();
  }

  function closeHelpModal() {
    if (!helpModal) return;
    helpModal.classList.add("hidden");
    document.body.classList.remove("modal-open");
    helpBtn?.focus();
  }

  function bindEvents() {
    helpBtn?.addEventListener("click", openHelpModal);
    helpCloseBtn?.addEventListener("click", closeHelpModal);
    helpCloseFooterBtn?.addEventListener("click", closeHelpModal);
    helpModal?.addEventListener("click", (event) => {
      if (event.target === helpModal) closeHelpModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && helpModal && !helpModal.classList.contains("hidden")) {
        closeHelpModal();
      }
    });

    languageSelect?.addEventListener("change", () => {
      state.uiLanguage = normalizeLanguage(languageSelect.value);
      activeUiLanguage = state.uiLanguage;
      applyLanguage();
    });

    inputLanguageSelect?.addEventListener("change", () => {
      state.inputLanguage = normalizeLanguage(inputLanguageSelect.value);
      activeInputLanguage = state.inputLanguage;
      localStorage.setItem(INPUT_LANGUAGE_STORAGE_KEY, activeInputLanguage);
      if (speechBankStatus) speechBankStatus.textContent = inputT("speechBankStatusDefault");
      renderSpeechButtonGroups();
    });

    sceneSelect.addEventListener("change", () => {
      captureCurrentScene();
      const nextScene = state.scenes.find((scene) => scene.id === sceneSelect.value);
      if (!nextScene) return;
      applySceneToState(nextScene);
      refreshSceneUi();
    });

    addSceneBtn.addEventListener("click", addScene);
    renameSceneBtn.addEventListener("click", renameScene);
    duplicateSceneBtn.addEventListener("click", duplicateScene);
    deleteSceneBtn.addEventListener("click", deleteScene);

    sceneNameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") renameSceneBtn.click();
    });

    audioInput.addEventListener("change", async () => {
      const file = audioInput.files?.[0];
      if (!file) return;

      try {
        audioFileInfo.textContent = t("convertingMedia");
        const dataUrl = await readFileAsDataUrl(file);
        setAudioFromDataUrl(dataUrl, file.name, file.type || (isVideoMediaFile("", file.name) ? "video/mp4" : "audio/*"));
        populateSceneSelect();
      } catch (error) {
        console.error(error);
        alert(t("mediaLoadFailed"));
        audioFileInfo.textContent = state.audioDataUrl
          ? t("savedAudio", { name: state.audioFileName || t("unnamed") })
          : t("savedMaterialNone");
      }
    });

    clearAudioBtn.addEventListener("click", () => {
      audioInput.value = "";
      setAudioFromDataUrl(null);
      populateSceneSelect();
      updatePreviewMax();
      renderAt(currentPreviewTime());
    });

    mediaPlayPauseBtn?.addEventListener("click", async () => {
      const media = activeMediaPlayer();
      if (!media || !state.audioDataUrl) return;
      try {
        if (media.paused || media.ended) {
          await media.play();
        } else {
          media.pause();
        }
        updateMediaPlayPauseButton();
      } catch (error) {
        console.error(error);
        alert(t("mp4PlaybackFailed"));
      }
    });

    [audioPlayer, previewVideoPlayer].forEach((media) => {
      media?.addEventListener("loadedmetadata", () => {
        updatePreviewMax();
        exportEndInput.value = toFixedSafe(media.duration || Number(exportEndInput.value) || 3);
        renderAt(media.currentTime || 0);
      });

      media?.addEventListener("play", () => {
        updateMediaPlayPauseButton();
        startPreviewLoop();
      });

      media?.addEventListener("pause", () => {
        updateMediaPlayPauseButton();
        stopPreviewLoop();
        syncPreviewInputs(media.currentTime || 0);
        renderAt(media.currentTime || 0);
      });

      media?.addEventListener("timeupdate", () => {
        syncPreviewInputs(media.currentTime || 0);
        renderAt(media.currentTime || 0);
      });

      media?.addEventListener("seeked", () => {
        updateMediaPlayPauseButton();
        syncPreviewInputs(media.currentTime || 0);
        renderAt(media.currentTime || 0);
      });

      media?.addEventListener("ended", updateMediaPlayPauseButton);
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

    fontInput?.addEventListener("change", async () => {
      await importCustomFonts(fontInput.files);
      fontInput.value = "";
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

    speechTextInput?.addEventListener("change", async () => {
      const file = speechTextInput.files?.[0];
      if (!file) return;

      try {
        if (speechBankStatus) speechBankStatus.textContent = t("loadingSpeechTxt");
        const text = await readFileAsText(file);
        importSpeechText(text);
      } catch (error) {
        console.error(error);
        alert(t("speechTxtLoadFailed"));
        if (speechBankStatus) speechBankStatus.textContent = t("speechTxtLoadFailed");
      } finally {
        speechTextInput.value = "";
      }
    });

    clearSpeechButtonsBtn?.addEventListener("click", () => {
      if (state.speechButtons.length === 0) return;
      if (!confirm(t("confirmClearSpeechButtons"))) return;
      state.speechButtons = [];
      renderSpeechButtonGroups();
      if (speechBankStatus) speechBankStatus.textContent = t("speechButtonsCleared");
    });


    lineCharacterSelect.addEventListener("change", () => {
      state.lastCharacterId = lineCharacterSelect.value;
      localStorage.setItem("adv-message-tool-last-character", state.lastCharacterId);
      livePreviewLineForm({ updateList: Boolean(state.selectedLineId) });
    });

    lineTextInput.addEventListener("input", () => livePreviewLineForm({ updateList: Boolean(state.selectedLineId) }));

    [lineStartInput, lineEndInput].forEach((input) => {
      input.addEventListener("input", () => livePreviewLineForm({ updateList: Boolean(state.selectedLineId) }));
    });

    lineCpsInput.addEventListener("input", () => {
      syncCpsControls(lineCpsInput.value, lineCpsInput);
      livePreviewLineForm({ updateList: Boolean(state.selectedLineId) });
    });

    lineCpsRange.addEventListener("input", () => {
      syncCpsControls(lineCpsRange.value, lineCpsRange);
      livePreviewLineForm({ updateList: Boolean(state.selectedLineId) });
    });

    lineAnimationSelect?.addEventListener("change", () => {
      syncAnimationControls(lineAnimationSelect.value);
      livePreviewLineForm({ updateList: Boolean(state.selectedLineId) });
    });

    lineScaleRevealMinInput?.addEventListener("input", () => {
      syncScaleRevealMinControls(lineScaleRevealMinInput.value, lineScaleRevealMinInput);
      livePreviewLineForm({ updateList: Boolean(state.selectedLineId) });
    });

    lineScaleRevealMinRange?.addEventListener("input", () => {
      syncScaleRevealMinControls(lineScaleRevealMinRange.value, lineScaleRevealMinRange);
      livePreviewLineForm({ updateList: Boolean(state.selectedLineId) });
    });

    setStartFromAudioBtn.addEventListener("click", () => {
      const media = activeMediaPlayer();
      const value = media?.src ? media.currentTime : Number(previewTimeInput.value) || 0;
      lineStartInput.value = toFixedSafe(value);
      livePreviewLineForm({ updateList: Boolean(state.selectedLineId) });
    });

    setEndFromAudioBtn.addEventListener("click", () => {
      const media = activeMediaPlayer();
      const value = media?.src ? media.currentTime : Number(previewTimeInput.value) || 0;
      lineEndInput.value = toFixedSafe(value);
      livePreviewLineForm({ updateList: Boolean(state.selectedLineId) });
    });

    addOrUpdateLineBtn.addEventListener("click", addOrUpdateLine);
    cancelEditLineBtn.addEventListener("click", clearLineEdit);

    previewTimeInput.addEventListener("input", () => {
      previewTimeRange.value = previewTimeInput.value;
      const time = Number(previewTimeInput.value) || 0;
      syncActiveMediaTime(time);
      renderAt(time);
    });

    previewTimeRange.addEventListener("input", () => {
      previewTimeInput.value = previewTimeRange.value;
      const time = Number(previewTimeRange.value) || 0;
      syncActiveMediaTime(time);
      renderAt(time);
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
        alert(t("jsonLoadFailed"));
      } finally {
        loadJsonInput.value = "";
      }
    });

    saveCacheBtn.addEventListener("click", async () => {
      try {
        await saveProjectToCache();
        alert(t("cacheSaved"));
      } catch (error) {
        console.error(error);
        alert(t("cacheSaveFailed"));
      }
    });

    loadCacheBtn.addEventListener("click", async () => {
      try {
        const cache = await loadProjectFromCache();
        if (!cache) {
          alert(t("noSavedCache"));
          return;
        }
        await applyProjectData(cache.project);
      } catch (error) {
        console.error(error);
        alert(t("cacheRestoreFailed"));
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
    ensureScenes();
    populateSceneSelect();
    populateCharacterSelect();
    renderCharacterList();
    renderSpeechButtonGroups();
    renderLineList();
    renderCustomFontList();
    renderSettingsPanel();
    applyLanguage({ rerender: false });
    bindEvents();
    const currentScene = getCurrentScene();
    state.lines = (currentScene?.lines || []).map(cloneLine);
    setAudioFromDataUrl(currentScene?.audioDataUrl || null, currentScene?.audioFileName || "", currentScene?.audioMimeType || "");
    syncMediaVisibility();
    syncCpsControls(lineCpsInput.value || 24);
    syncAnimationControls(lineAnimationSelect?.value || "typewriter");
    syncScaleRevealMinControls(lineScaleRevealMinInput?.value || 18);
    renderAt(0);
  }

  init();
})();

# PHP lernen

Eine Lern-App für PHP, optimiert fürs Handy. Echtes PHP 8.4 läuft direkt im Browser, ganz ohne Server.

- 11 Lektionen, von `echo` bis Klassen und Exceptions
- Code-Editor mit Syntax-Farben und einer Sonderzeichen-Leiste über der Tastatur
- Programmieraufgaben mit automatischer Prüfung und deutschen Fehlererklärungen
- Quiz mit Eingabefeldern, XP und Fortschritt
- Spielwiese zum freien Programmieren

## Online stellen (GitHub Pages)

Einmalig: **Settings → Pages → Source: „GitHub Actions“** einstellen.

Danach baut der Workflow `.github/workflows/pages.yml` die App bei jedem Push auf `main` automatisch und veröffentlicht sie unter `https://<benutzername>.github.io/<repository>/`. Den Fortschritt siehst du im Tab **Actions**.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `site/index.html` | Oberfläche, Design, App-Logik |
| `site/lessons.js` | Alle Lektionen, Aufgaben und Quizfragen |
| `site/checker.js` | Prüflogik für Aufgaben und Quiz |
| `src/cm-entry.mjs` | Code-Editor (wird zu `editor.js` gebündelt) |
| `src/worker-entry.mjs` | Führt PHP in einem Web Worker aus, mit 5-Sekunden-Zeitlimit (wird zu `php-worker.js`) |
| `build.sh` | Baut alles nach `dist/` und kopiert PHP 8.4 als WebAssembly (`php84.wasm`, ca. 13 MB) dazu |

Lokal bauen und starten:

```sh
npm install
npm run build
python3 -m http.server 8000 --directory dist
```

Dann `http://localhost:8000` öffnen. Ein Doppelklick auf die HTML-Datei reicht nicht, weil der Browser PHP als WebAssembly nachlädt.

Neue Lektionen fügst du in `site/lessons.js` hinzu.

## Lizenzen

- PHP im Browser: [php-wasm](https://github.com/seanmorris/php-wasm), Apache-2.0 oder GPL-2.0
- Editor: [CodeMirror](https://codemirror.net), MIT
- Schriften: Bricolage Grotesque und JetBrains Mono über Google Fonts, SIL Open Font License

Der Build legt die Lizenztexte in `dist/lizenzen/` ab.

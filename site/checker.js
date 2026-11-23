// Prüflogik für Aufgaben und Quiz. Wird von der App UND von den Tests benutzt.

export const MARK = '@@PRUEFUNG@@';

export function normalize(s) {
  return String(s ?? '')
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.replace(/[ \t]+$/, '').replace(/ {2,}/g, ' '))
    .join('\n')
    .replace(/^\n+|\n+$/g, '')
    .trim();
}

// Antwort aus einem Eingabefeld vergleichen (Anführungszeichen drumherum sind ok).
export function sameAnswer(input, expected) {
  let a = normalize(input);
  const m = a.match(/^(["'„“])(.*)(["'“”])$/s);
  if (m && normalize(expected) !== a) a = m[2];
  return a === normalize(expected);
}

export function cleanOutput(out) {
  return String(out ?? '')
    .replace(/ in php-wasm run script on line (\d+)/g, ' in Zeile $1')
    .replace(/php-wasm run script\((\d+)\)/g, 'Zeile $1')
    .replace(/php-wasm run script:(\d+)/g, 'Zeile $1')
    .replace(/^\n+(?=(Warning|Fatal error|Parse error|Notice|Deprecated):)/, '');
}

export function hasFatal(out) {
  return /(^|\n)(Fatal error|Parse error):/.test(out);
}

// Deutsche Erklärung für typische Fehlermeldungen.
export function explainError(out) {
  const o = cleanOutput(out);
  let m;
  if ((m = o.match(/Parse error: syntax error, unexpected (.+?) in Zeile (\d+)/))) {
    const what = m[1];
    if (/expecting "[,;]" or "[,;]"/.test(what) || /end of file/.test(what))
      return `Syntaxfehler um Zeile ${m[2]}: Wahrscheinlich fehlt ein \`;\` oder eine schließende Klammer. Schau auch in die Zeile davor.`;
    return `Syntaxfehler in Zeile ${m[2]}: PHP hat dort etwas Unerwartetes gefunden. Oft fehlt in der Zeile davor ein \`;\`, eine Klammer oder ein Anführungszeichen.`;
  }
  if ((m = o.match(/Parse error: (.+?) in Zeile (\d+)/)))
    return `Syntaxfehler in Zeile ${m[2]}: Prüfe Klammern, Anführungszeichen und Semikolons.`;
  if ((m = o.match(/Undefined variable (\$\w+)/)))
    return `Die Variable \`${m[1]}\` hat keinen Wert. Tippfehler? Groß- und Kleinschreibung zählt.`;
  if ((m = o.match(/Call to undefined function (\w+)\(\)/)))
    return `Die Funktion \`${m[1]}()\` gibt es nicht. Tippfehler, oder hast du sie noch nicht geschrieben?`;
  if ((m = o.match(/Call to undefined method (\w+)::(\w+)\(\)/)))
    return `Die Klasse \`${m[1]}\` hat keine Methode \`${m[2]}()\`. Schreib sie, oder prüfe den Namen.`;
  if ((m = o.match(/Undefined array key ("?[^"\s]+"?)/)))
    return `Den Schlüssel ${m[1]} gibt es in diesem Array nicht. Arrays zählen ab 0.`;
  if (/UnhandledMatchError/.test(o))
    return 'Kein Fall in `match` passt. Ergänze einen `default => ...`-Zweig.';
  if (/DivisionByZeroError/.test(o)) return 'Durch 0 teilen geht nicht.';
  if ((m = o.match(/Return value must be of type (\w+), (\w+) returned/)))
    return `Die Funktion muss einen Wert vom Typ \`${m[1]}\` zurückgeben, gibt aber ${m[2] === 'none' ? 'nichts' : '`' + m[2] + '`'} zurück. Fehlt ein \`return\`?`;
  if (/TypeError/.test(o)) return 'Ein Wert hat den falschen Datentyp, zum Beispiel Text statt Zahl.';
  if (/Cannot access private property/.test(o)) return 'Auf `private`-Eigenschaften kommst du nur innerhalb der Klasse.';
  if (/Array to string conversion/.test(o)) return 'Ein ganzes Array kann `echo` nicht ausgeben. Nimm `print_r()` oder `implode()`.';
  return null;
}

// Baut die Programmläufe für eine Aufgabe.
export function prepareTask(task, code) {
  if (!/^\s*<\?php/.test(code)) return { error: 'Dein Code muss mit `<?php` beginnen.' };
  const base = code.replace(/\?>\s*$/, '');
  if (task.test) {
    return { runs: [{ code: `${base}\n;\necho "\\n${MARK}\\n";\n${task.test}\n`, expect: task.expect, test: true }] };
  }
  if (task.vary) {
    const { name, values, expect } = task.vary;
    const re = new RegExp('\\$' + name + '\\s*=\\s*[^;]*;');
    if (!re.test(base)) return { error: `Lass die Zeile \`$${name} = …;\` stehen. Wir setzen dort verschiedene Werte zum Testen ein.` };
    return {
      runs: values.map((v, i) => ({
        code: base.replace(re, () => `$${name} = ${JSON.stringify(v)};`),
        expect: expect[i],
        label: `$${name} = ${v}`,
      })),
    };
  }
  return { runs: [{ code: base, expect: task.expect }] };
}

// Wertet die Ergebnisse aus. results[i] = { output, timeout }
export function evaluateTask(task, code, runs, results) {
  const details = runs.map((run, i) => {
    const r = results[i] || {};
    let out = cleanOutput(r.output);
    let got = out;
    if (run.test) {
      const at = out.lastIndexOf(MARK);
      got = at >= 0 ? out.slice(at + MARK.length) : out;
    }
    const fatal = r.timeout || hasFatal(out);
    const ok = !fatal && normalize(got) === normalize(run.expect);
    return { label: run.label, expected: run.expect, got: normalize(got), output: out, ok, timeout: !!r.timeout, fatal };
  });

  const firstBad = details.find((d) => !d.ok);
  if (firstBad) {
    if (firstBad.timeout) return { ok: false, details, message: 'Abgebrochen nach 5 Sekunden. Läuft irgendwo eine Endlosschleife?' };
    if (firstBad.fatal) {
      const why = explainError(firstBad.output);
      return { ok: false, details, message: 'Dein Code bricht mit einem Fehler ab.' + (why ? ' ' + why : '') };
    }
    return { ok: false, details, message: task.vary ? `Bei ${firstBad.label} stimmt die Ausgabe noch nicht.` : 'Die Ausgabe stimmt noch nicht.' };
  }
  for (const rule of task.mustUse || []) {
    if (!new RegExp(rule.re).test(code)) return { ok: false, details, message: 'Die Ausgabe stimmt, aber: ' + rule.msg };
  }
  return { ok: true, details, message: 'Gelöst!' };
}

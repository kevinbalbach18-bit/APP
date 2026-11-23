// Lerninhalte. Textformat: `code` und **fett**. Code-Beispiele sind echt ausführbar.
const c = String.raw;

export const LESSONS = [
{
  id: 'hallo', title: 'Hallo PHP', sub: 'echo, Semikolon, Kommentare',
  blocks: [
    { p: 'PHP läuft normalerweise auf einem Server und baut dort Webseiten zusammen. Hier läuft echtes **PHP 8.4** direkt auf deinem Handy. Tippe auf **Ausführen**:' },
    { code: c`<?php
echo "Hallo Welt!";` },
    { p: 'Jedes PHP-Programm beginnt mit `<?php`. Jede Anweisung endet mit einem Semikolon `;`. Mit `echo` gibst du Text aus.' },
    { code: c`<?php
// Das ist ein Kommentar
echo "Zeile 1\n";
echo "Zeile 2\n";
# auch ein Kommentar
/* über mehrere
   Zeilen */
echo 'Fertig!';` },
    { p: 'Kommentare ignoriert PHP, sie sind Notizen für Menschen. `\\n` macht einen Zeilenumbruch, aber nur in doppelten Anführungszeichen.' },
    { tip: 'Du kannst jeden Code hier ändern und neu ausführen. Kaputt machen ist erlaubt: **Zurücksetzen** holt das Original zurück.' },
  ],
  task: {
    text: 'Gib genau `Ich lerne PHP!` aus.',
    starter: c`<?php
// Dein Code hier
`,
    solution: c`<?php
echo "Ich lerne PHP!";`,
    hint: 'Schreib `echo`, dann den Text in Anführungszeichen, dann `;`.',
    expect: 'Ich lerne PHP!',
  },
  quiz: [
    { q: 'Womit beginnt PHP-Code?', options: ['<php>', '<?php', '<script>', '#php'], answer: 1, why: 'PHP-Code beginnt mit `<?php`.' },
    { q: 'Was fehlt in dieser Zeile?', code: c`echo "Hi"`, options: ['Ein Punkt', 'Ein Semikolon', 'Ein Dollarzeichen', 'Nichts'], answer: 1, why: 'Anweisungen enden mit `;`.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
echo "A";
// echo "B";
echo "C";`, output: 'AC', why: 'Die mittlere Zeile ist auskommentiert und wird ignoriert.' },
    { q: 'Was ist KEIN PHP-Kommentar?', options: ['// Hallo', '# Hallo', '/* Hallo */', '<!-- Hallo -->'], answer: 3, why: '`<!-- -->` ist ein HTML-Kommentar. In PHP-Code wäre das ein Syntaxfehler.' },
  ],
},
{
  id: 'variablen', title: 'Variablen', sub: '$name, Zuweisung, Texte verbinden',
  blocks: [
    { p: 'Eine Variable speichert einen Wert. Ihr Name beginnt immer mit `$`.' },
    { code: c`<?php
$name = "Lena";
$alter = 17;

echo "Ich heiße " . $name . "\n";
echo "Ich bin $alter Jahre alt.";` },
    { p: 'Der Punkt `.` verbindet Texte. In **doppelten** Anführungszeichen setzt PHP Variablen direkt ein, in **einfachen** nicht:' },
    { code: c`<?php
$x = 5;
echo "Wert: $x\n";
echo 'Wert: $x';` },
    { p: 'Variablen kann man überschreiben und hochzählen:' },
    { code: c`<?php
$punkte = 10;
$punkte = $punkte + 5;
$punkte += 5;  // Kurzform
$punkte++;     // plus 1
echo $punkte;` },
    { tip: 'Groß- und Kleinschreibung zählt: `$Name` und `$name` sind zwei verschiedene Variablen.' },
  ],
  task: {
    text: 'Lege die Variable `$stadt` mit dem Wert `"Berlin"` an und gib damit genau `Ich wohne in Berlin.` aus.',
    starter: c`<?php
`,
    solution: c`<?php
$stadt = "Berlin";
echo "Ich wohne in $stadt.";`,
    hint: 'Erst `$stadt = "Berlin";`, dann `echo "Ich wohne in $stadt.";`',
    expect: 'Ich wohne in Berlin.',
    mustUse: [
      { re: '\\$stadt\\s*=', msg: 'Lege zuerst die Variable `$stadt` an.' },
      { re: '(echo|print)[^;]*\\$stadt', msg: 'Benutze `$stadt` in deinem `echo`, statt „Berlin“ direkt hinzuschreiben.' },
    ],
  },
  quiz: [
    { q: 'Welcher Variablenname ist gültig?', options: ['name', '$name', '@name', '$1name'], answer: 1, why: 'Variablen beginnen mit `$`, danach ein Buchstabe oder `_`. `$1name` ist ungültig.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
$a = 3;
echo 'a=$a';`, output: 'a=$a', why: 'In einfachen Anführungszeichen wird nichts eingesetzt.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
$x = "Hallo";
$x = $x . " Welt";
echo $x;`, output: 'Hallo Welt', why: '`.` hängt " Welt" an "Hallo" an.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
$n = 4;
$n += 3;
$n++;
echo $n;`, output: '8', why: '4 + 3 = 7, dann plus 1 = 8.' },
  ],
},
{
  id: 'zahlen', title: 'Zahlen & Datentypen', sub: 'int, float, bool, Rechnen, ===',
  blocks: [
    { p: 'Jeder Wert hat einen Typ. `var_dump()` zeigt Typ und Inhalt:' },
    { code: c`<?php
var_dump(42);       // int
var_dump(3.14);     // float
var_dump("Hallo");  // string
var_dump(true);     // bool
var_dump(null);     // nichts` },
    { p: 'Rechnen funktioniert wie im Matheunterricht. `%` gibt den Rest einer Division, `**` ist hoch:' },
    { code: c`<?php
$a = 10;
$b = 3;
echo $a + $b, "\n";
echo $a - $b, "\n";
echo $a * $b, "\n";
echo $a / $b, "\n";
echo $a % $b, "\n";
echo $a ** 2, "\n";
echo intdiv($a, $b);` },
    { p: '`==` vergleicht nur den Wert, `===` Wert **und** Typ. Nimm im Zweifel immer `===`.' },
    { code: c`<?php
var_dump(5 == "5");
var_dump(5 === "5");
var_dump(0.1 + 0.2 == 0.3);` },
    { tip: 'Kommazahlen sind nie ganz genau: 0.1 + 0.2 ist nicht exakt 0.3. Für Geld rechnet man deshalb oft in Cent.' },
    { code: c`<?php
echo round(19.999, 2), "\n";
echo number_format(1234.5, 2, ",", ".");` },
  ],
  task: {
    text: '`$preis` und `$menge` sind gegeben. Gib den Gesamtpreis aus, nur die Zahl.',
    starter: c`<?php
$preis = 4.5;
$menge = 3;

// Gesamtpreis ausgeben
`,
    solution: c`<?php
$preis = 4.5;
$menge = 3;

echo $preis * $menge;`,
    hint: 'Malnehmen geht mit `*`: `echo $preis * $menge;`',
    expect: '13.5',
    mustUse: [{ re: '\\$preis\\s*\\*\\s*\\$menge|\\$menge\\s*\\*\\s*\\$preis', msg: 'Rechne mit den Variablen: `$preis * $menge`.' }],
  },
  quiz: [
    { q: 'Was gibt dieser Code aus?', code: c`<?php
echo 10 % 4;`, output: '2', why: '10 geteilt durch 4 ist 2, Rest 2.' },
    { q: 'Was ergibt `5 === "5"`?', options: ['true', 'false', 'Einen Fehler', 'null'], answer: 1, why: '`===` prüft auch den Typ: int ist nicht string.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
echo 2 ** 3 + 1;`, output: '9', why: '2 hoch 3 ist 8, plus 1 ist 9.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
echo intdiv(17, 5);`, output: '3', why: '`intdiv` teilt ganzzahlig: 17 / 5 = 3 Rest 2.' },
  ],
},
{
  id: 'bedingungen', title: 'Bedingungen', sub: 'if, else, match, && und ||',
  blocks: [
    { p: 'Mit `if` entscheidet dein Programm, was passiert:' },
    { code: c`<?php
$note = 2;

if ($note === 1) {
    echo "Sehr gut";
} elseif ($note <= 3) {
    echo "Ordentlich";
} else {
    echo "Da geht noch was";
}` },
    { p: 'Vergleiche: `<` `>` `<=` `>=` `===` `!==`. Verknüpfen: `&&` (und), `||` (oder), `!` (nicht).' },
    { code: c`<?php
$alter = 17;
$mitEltern = true;

if ($alter >= 18 || $mitEltern) {
    echo "Darf rein";
}` },
    { p: 'Kurzformen: Der Ternary-Operator `? :` für ein schnelles Entweder-oder, und `match` für viele Fälle:' },
    { code: c`<?php
$punkte = 72;
echo $punkte >= 50 ? "bestanden" : "durchgefallen";
echo "\n";

$tag = "Sa";
echo match ($tag) {
    "Sa", "So" => "Wochenende",
    default => "Werktag",
};` },
  ],
  task: {
    text: 'Gib für `$note` das passende Wort aus: 1 → `sehr gut`, 2 → `gut`, 3 → `befriedigend`, alles andere → `anders`. Wir testen deinen Code mit mehreren Noten.',
    starter: c`<?php
$note = 2;

// Dein Code
`,
    solution: c`<?php
$note = 2;

echo match ($note) {
    1 => "sehr gut",
    2 => "gut",
    3 => "befriedigend",
    default => "anders",
};`,
    hint: 'Mit `match ($note) { 1 => "sehr gut", ... default => "anders" }` ist das in wenigen Zeilen erledigt.',
    vary: { name: 'note', values: [1, 2, 3, 4, 6], expect: ['sehr gut', 'gut', 'befriedigend', 'anders', 'anders'] },
  },
  quiz: [
    { q: 'Was gibt dieser Code aus?', code: c`<?php
$x = 7;
if ($x > 5 && $x < 10) {
    echo "ja";
} else {
    echo "nein";
}`, output: 'ja', why: '7 ist größer als 5 und kleiner als 10.' },
    { q: 'Was bedeutet `||`?', options: ['und', 'oder', 'nicht', 'gleich'], answer: 1, why: '`||` ist das logische ODER.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
$a = 0;
echo $a ? "voll" : "leer";`, output: 'leer', why: '0 zählt als false.' },
    { q: 'Was passiert, wenn bei `match` kein Fall passt und `default` fehlt?', options: ['Es kommt null heraus', 'Es kommt false heraus', 'Fehler: UnhandledMatchError', 'Es wird nichts ausgegeben'], answer: 2, why: '`match` ist streng: ohne passenden Fall gibt es einen Fehler.' },
  ],
},
{
  id: 'schleifen', title: 'Schleifen', sub: 'for, while, break, continue',
  blocks: [
    { p: 'Schleifen wiederholen Code. `for` nimmst du, wenn du weißt, wie oft:' },
    { code: c`<?php
for ($i = 1; $i <= 5; $i++) {
    echo $i . " ";
}` },
    { p: 'Die drei Teile in der Klammer: Start, Bedingung, Schritt. `while` läuft, solange eine Bedingung stimmt:' },
    { code: c`<?php
$countdown = 3;
while ($countdown > 0) {
    echo $countdown . "...\n";
    $countdown--;
}
echo "Start!";` },
    { p: '`continue` springt zum nächsten Durchlauf, `break` beendet die Schleife sofort:' },
    { code: c`<?php
for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 === 0) {
        continue; // gerade überspringen
    }
    if ($i > 7) {
        break; // ganz aufhören
    }
    echo $i, " ";
}` },
    { tip: 'Aus Versehen eine Endlosschleife gebaut? Kein Problem: Nach 5 Sekunden bricht die App automatisch ab.' },
  ],
  task: {
    text: 'Gib mit einer `for`-Schleife alle geraden Zahlen von 2 bis 20 aus, getrennt durch Leerzeichen.',
    starter: c`<?php
`,
    solution: c`<?php
for ($i = 2; $i <= 20; $i += 2) {
    echo $i . " ";
}`,
    hint: 'Starte bei 2 und zähle mit `$i += 2` in Zweierschritten bis 20.',
    expect: '2 4 6 8 10 12 14 16 18 20',
    mustUse: [{ re: '\\bfor\\s*\\(', msg: 'Benutze eine `for`-Schleife.' }],
  },
  quiz: [
    { q: 'Wie oft läuft `for ($i = 0; $i < 5; $i++)`?', options: ['4-mal', '5-mal', '6-mal', 'Endlos'], answer: 1, why: '`$i` ist 0, 1, 2, 3, 4: also 5 Durchläufe.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
for ($i = 3; $i > 0; $i--) {
    echo $i;
}`, output: '321', why: 'Die Schleife zählt rückwärts von 3 bis 1.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
$s = 0;
for ($i = 1; $i <= 4; $i++) {
    $s += $i;
}
echo $s;`, output: '10', why: '1 + 2 + 3 + 4 = 10.' },
    { q: 'Was macht `continue`?', options: ['Beendet das Skript', 'Beendet die Schleife', 'Springt zum nächsten Durchlauf', 'Nichts'], answer: 2, why: '`continue` überspringt den Rest des aktuellen Durchlaufs.' },
  ],
},
{
  id: 'arrays', title: 'Arrays', sub: 'Listen, Schlüssel, foreach',
  blocks: [
    { p: 'Ein Array speichert mehrere Werte. Gezählt wird ab **0**:' },
    { code: c`<?php
$farben = ["rot", "grün", "blau"];
echo $farben[0], "\n";

$farben[] = "gelb"; // anhängen
echo count($farben), "\n";
print_r($farben);` },
    { p: 'Assoziative Arrays haben Namen statt Nummern als Schlüssel. Mit `foreach` gehst du alle Einträge durch:' },
    { code: c`<?php
$person = [
    "name" => "Tom",
    "alter" => 20,
];
echo $person["name"], "\n";

foreach ($person as $key => $wert) {
    echo "$key: $wert\n";
}` },
    { p: 'PHP hat viele fertige Array-Funktionen:' },
    { code: c`<?php
$zahlen = [5, 3, 9, 1];
sort($zahlen);
echo implode(", ", $zahlen), "\n";
echo max($zahlen), "\n";
echo array_sum($zahlen), "\n";
var_dump(in_array(9, $zahlen));` },
  ],
  task: {
    text: 'Gib jedes Element von `$einkauf` mit `foreach` in einer eigenen Zeile aus, mit `- ` davor:<br>`- Milch`<br>`- Brot`<br>`- Eier`',
    starter: c`<?php
$einkauf = ["Milch", "Brot", "Eier"];

`,
    solution: c`<?php
$einkauf = ["Milch", "Brot", "Eier"];

foreach ($einkauf as $teil) {
    echo "- $teil\n";
}`,
    hint: '`foreach ($einkauf as $teil) { ... }` und darin `echo "- $teil\\n";`',
    expect: '- Milch\n- Brot\n- Eier',
    mustUse: [{ re: '\\bforeach\\s*\\(', msg: 'Benutze `foreach`.' }],
  },
  quiz: [
    { q: 'Was gibt dieser Code aus?', code: c`<?php
$a = ["x", "y", "z"];
echo $a[1];`, output: 'y', why: 'Index 0 ist x, Index 1 ist y.' },
    { q: 'Wie hängst du ein Element an `$a` an?', options: ['$a + "neu";', '$a[] = "neu";', '$a.push("neu");', 'add($a, "neu");'], answer: 1, why: '`$a[] = ...` hängt ans Ende an.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
$p = ["a" => 1, "b" => 2];
echo $p["b"] + count($p);`, output: '4', why: '`$p["b"]` ist 2, `count($p)` ist 2, zusammen 4.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
$z = [3, 1, 2];
sort($z);
echo implode("-", $z);`, output: '1-2-3', why: '`sort` sortiert aufsteigend, `implode` verbindet mit "-".' },
  ],
},
{
  id: 'funktionen', title: 'Funktionen', sub: 'Parameter, return, Arrow Functions',
  blocks: [
    { p: 'Mit einer Funktion packst du Code unter einen Namen und kannst ihn immer wieder aufrufen:' },
    { code: c`<?php
function begruessen(string $name): string
{
    return "Hallo, $name!";
}

echo begruessen("Mia"), "\n";
echo begruessen("Ben");` },
    { p: '`return` gibt das Ergebnis zurück. Parameter können Standardwerte haben:' },
    { code: c`<?php
function brutto(float $netto, float $mwst = 0.19): float
{
    return round($netto * (1 + $mwst), 2);
}

echo brutto(100), "\n";
echo brutto(100, 0.07);` },
    { p: 'Kurze Funktionen schreibst du als Arrow Function mit `fn`, zum Beispiel für `array_map` und `array_filter`:' },
    { code: c`<?php
$zahlen = [1, 2, 3, 4];
$doppelt = array_map(fn($x) => $x * 2, $zahlen);
$gerade = array_filter($zahlen, fn($x) => $x % 2 === 0);

echo implode(" ", $doppelt), "\n";
echo implode(" ", $gerade);` },
    { tip: 'Typangaben wie `string`, `int` oder `float` sind freiwillig. Mit ihnen meldet PHP aber sofort, wenn etwas Falsches übergeben wird.' },
  ],
  task: {
    text: 'Vervollständige `quadrat`: Die Funktion soll die Zahl mit sich selbst malnehmen und das Ergebnis mit `return` zurückgeben.',
    starter: c`<?php
function quadrat(int $x): int
{
    // Dein Code
}
`,
    solution: c`<?php
function quadrat(int $x): int
{
    return $x * $x;
}`,
    hint: 'Eine Zeile reicht: `return $x * $x;`',
    test: c`echo json_encode([quadrat(3), quadrat(0), quadrat(-4)]);`,
    expect: '[9,0,16]',
    testInfo: 'Getestet mit quadrat(3), quadrat(0) und quadrat(-4).',
  },
  quiz: [
    { q: 'Womit gibt eine Funktion einen Wert zurück?', options: ['echo', 'return', 'give', 'out'], answer: 1, why: '`return` beendet die Funktion und liefert den Wert.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
function f($x = 5) {
    return $x * 2;
}
echo f() + f(1);`, output: '12', why: '`f()` nutzt den Standardwert 5: 10. `f(1)` ist 2. Zusammen 12.' },
    { q: 'Womit beginnt eine Arrow Function?', options: ['=>', 'arrow', 'fn', 'lambda'], answer: 2, why: '`fn($x) => ...` ist eine Arrow Function.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
$a = array_map(fn($n) => $n + 1, [1, 2]);
echo implode(",", $a);`, output: '2,3', why: 'Jede Zahl wird um 1 erhöht.' },
  ],
},
{
  id: 'strings', title: 'Texte bearbeiten', sub: 'strlen, substr, explode, printf',
  blocks: [
    { p: 'Texte heißen in PHP **Strings**. Dafür gibt es Dutzende fertige Funktionen:' },
    { code: c`<?php
$t = "PHP ist toll";

echo strlen($t), "\n";
echo strtoupper($t), "\n";
echo str_replace("toll", "super", $t), "\n";
echo substr($t, 0, 3), "\n";
echo ucfirst("hallo"), "\n";
var_dump(str_contains($t, "ist"));` },
    { p: '`explode` zerlegt einen String in ein Array, `implode` klebt ein Array wieder zusammen:' },
    { code: c`<?php
$liste = "Äpfel,Birnen,Kiwis";
$teile = explode(",", $liste);
print_r($teile);
echo implode(" & ", $teile);` },
    { p: 'Mit `printf` und `sprintf` formatierst du Ausgaben: `%s` steht für Text, `%d` für ganze Zahlen, `%.1f` für eine Kommazahl mit einer Nachkommastelle.' },
    { code: c`<?php
$name = "Ada";
$punkte = 9.5;
printf("%s hat %.1f Punkte\n", $name, $punkte);
echo sprintf("%05d", 42);` },
    { tip: '`strlen("ä")` ergibt 2, weil Umlaute zwei Bytes brauchen. Auf echten Servern nimmt man dafür `mb_strlen()`. Diese Erweiterung ist im Handy-PHP hier nicht eingebaut.' },
  ],
  task: {
    text: 'Vervollständige `initialen`: Sie soll die Anfangsbuchstaben aller Wörter groß zurückgeben. Aus `"Ada Lovelace"` wird `"AL"`.',
    starter: c`<?php
function initialen(string $name): string
{
    return "";
}
`,
    solution: c`<?php
function initialen(string $name): string
{
    $ergebnis = "";
    foreach (explode(" ", $name) as $wort) {
        $ergebnis .= strtoupper($wort[0]);
    }
    return $ergebnis;
}`,
    hint: '`explode(" ", $name)` zerlegt in Wörter. `$wort[0]` ist der erste Buchstabe, `strtoupper()` macht ihn groß, `.=` hängt an.',
    test: c`echo json_encode([initialen("Ada Lovelace"), initialen("max mustermann"), initialen("Guido van Rossum")]);`,
    expect: '["AL","MM","GVR"]',
    testInfo: 'Getestet mit "Ada Lovelace", "max mustermann" und "Guido van Rossum".',
  },
  quiz: [
    { q: 'Was gibt dieser Code aus?', code: c`<?php
echo substr("Hallo", 1, 3);`, output: 'all', why: 'Ab Position 1 (das a) drei Zeichen: a, l, l.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
echo strlen("PHP 8");`, output: '5', why: 'Das Leerzeichen zählt mit: P, H, P, Leerzeichen, 8.' },
    { q: 'Was macht `explode(",", "a,b,c")`?', options: ['Löscht die Kommas', 'Teilt den Text in ein Array', 'Verbindet Texte', 'Zählt Zeichen'], answer: 1, why: 'Ergebnis: `["a", "b", "c"]`.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
echo str_repeat("ab", 3);`, output: 'ababab', why: '`str_repeat` wiederholt den Text dreimal.' },
  ],
},
{
  id: 'formulare', title: 'Formulare & Sicherheit', sub: '$_GET, $_POST, htmlspecialchars',
  blocks: [
    { p: 'Daten aus einem Formular landen in `$_GET` (aus der URL) oder `$_POST` (aus dem Formular). Hier gibt es keinen echten Server, also tun wir so, als käme etwas an:' },
    { code: c`<?php
// Die URL wäre: seite.php?name=Mia
$_GET = ["name" => "Mia"];

$name = $_GET["name"] ?? "Gast";
echo "Hallo $name!";` },
    { p: '`??` nimmt den Wert rechts, wenn es links nichts gibt. Das verhindert Fehler bei fehlenden Feldern.' },
    { p: 'Gefährlich wird es, wenn jemand HTML oder JavaScript einschleust. Deshalb jede Eingabe vor der Ausgabe mit `htmlspecialchars()` entschärfen:' },
    { code: c`<?php
$_GET = ["name" => "<b>Hacker</b>"];

$name = $_GET["name"] ?? "Gast";
echo "Unsicher: $name\n";
echo "Sicher: " . htmlspecialchars($name);` },
    { p: 'Eingaben prüfen geht mit `filter_var`:' },
    { code: c`<?php
$_POST = ["email" => "mia@example"];

$email = $_POST["email"] ?? "";
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Danke!";
} else {
    echo "Bitte gültige E-Mail eingeben.";
}` },
    { tip: 'Für Datenbanken gilt: Eingaben nie direkt in SQL einbauen. Immer Prepared Statements mit PDO nutzen, zum Beispiel `$pdo->prepare("SELECT * FROM users WHERE email = ?")`.' },
  ],
  task: {
    text: 'Vervollständige `begruessung`: Sie gibt `Hallo, NAME!` zurück. Fehlt der Name, nimm `Gast`. Sichere den Namen mit `htmlspecialchars()` ab.',
    starter: c`<?php
function begruessung(array $get): string
{
    // $get ist wie $_GET, z. B. ["name" => "Tom"]
    return "";
}
`,
    solution: c`<?php
function begruessung(array $get): string
{
    $name = $get["name"] ?? "Gast";
    return "Hallo, " . htmlspecialchars($name) . "!";
}`,
    hint: '`$name = $get["name"] ?? "Gast";` und dann `return "Hallo, " . htmlspecialchars($name) . "!";`',
    test: c`echo json_encode([begruessung(["name" => "Tom"]), begruessung([]), begruessung(["name" => "<i>"])]);`,
    expect: '["Hallo, Tom!","Hallo, Gast!","Hallo, &lt;i&gt;!"]',
    testInfo: 'Getestet mit Name „Tom“, ohne Namen und mit dem Namen „<i>“.',
  },
  quiz: [
    { q: 'Wo landen Daten aus `<form method="post">`?', options: ['$_GET', '$_POST', '$_FORM', '$_DATA'], answer: 1, why: 'POST-Daten stehen in `$_POST`.' },
    { q: 'Wofür ist `htmlspecialchars()` da?', options: ['Für schöneres HTML', 'Gegen eingeschleusten Code (XSS)', 'Für schnellere Seiten', 'Für Datenbanken'], answer: 1, why: 'Es macht aus `<` ein harmloses `&lt;` usw.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
$_GET = [];
$id = $_GET["id"] ?? 0;
echo $id + 1;`, output: '1', why: '`id` fehlt, also nimmt `??` die 0.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
echo htmlspecialchars("<b>");`, output: '&lt;b&gt;', why: '`<` wird zu `&lt;` und `>` zu `&gt;`.' },
  ],
},
{
  id: 'klassen', title: 'Klassen & Objekte', sub: 'class, new, $this, extends',
  blocks: [
    { p: 'Eine Klasse ist ein Bauplan. Mit `new` baust du daraus Objekte:' },
    { code: c`<?php
class Hund
{
    public function __construct(
        public string $name,
        private int $alter = 1,
    ) {}

    public function bellen(): string
    {
        return "{$this->name} sagt Wuff!";
    }

    public function geburtstag(): void
    {
        $this->alter++;
        echo "{$this->name} ist jetzt {$this->alter}.\n";
    }
}

$bello = new Hund("Bello", 3);
echo $bello->bellen(), "\n";
$bello->geburtstag();` },
    { p: '`__construct` läuft beim Erzeugen. `$this` ist das aktuelle Objekt, mit `->` greifst du auf Eigenschaften und Methoden zu. `private` heißt: nur innerhalb der Klasse sichtbar.' },
    { p: 'Mit `extends` erbt eine Klasse alles von einer anderen und kann Teile überschreiben:' },
    { code: c`<?php
class Tier
{
    public function __construct(public string $name) {}

    public function laut(): string
    {
        return "...";
    }

    public function vorstellen(): string
    {
        return "{$this->name} macht " . $this->laut();
    }
}

class Katze extends Tier
{
    public function laut(): string
    {
        return "Miau";
    }
}

$mia = new Katze("Mia");
echo $mia->vorstellen();` },
  ],
  task: {
    text: 'Ergänze die Klasse `Konto` um `einzahlen(float $betrag)`, das den Betrag zu `$stand` addiert, und `getStand(): float`, das den Stand zurückgibt.',
    starter: c`<?php
class Konto
{
    private float $stand = 0;

    // einzahlen() und getStand() ergänzen
}
`,
    solution: c`<?php
class Konto
{
    private float $stand = 0;

    public function einzahlen(float $betrag): void
    {
        $this->stand += $betrag;
    }

    public function getStand(): float
    {
        return $this->stand;
    }
}`,
    hint: 'In Methoden kommst du mit `$this->stand` an die Eigenschaft. Einzahlen: `$this->stand += $betrag;`',
    test: c`$k = new Konto();
$k->einzahlen(50);
$k->einzahlen(25.5);
echo json_encode($k->getStand());`,
    expect: '75.5',
    testInfo: 'Getestet: neues Konto, 50 und 25.5 einzahlen, dann getStand().',
    mustUse: [{ re: 'private\\s+(float\\s+)?\\$stand', msg: 'Lass `$stand` private.' }],
  },
  quiz: [
    { q: 'Wie erzeugst du ein Objekt?', options: ['make Hund()', 'new Hund()', 'Hund.create()', 'object Hund'], answer: 1, why: '`new` erzeugt ein Objekt aus einer Klasse.' },
    { q: 'Womit rufst du eine Methode auf?', options: ['.', '::', '->', '=>'], answer: 2, why: '`$objekt->methode()`.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
class Zaehler {
    public int $n = 1;
    public function plus(): static {
        $this->n++;
        return $this;
    }
}
echo (new Zaehler())->plus()->plus()->n;`, output: '3', why: 'Startwert 1, zweimal plus: 3.' },
    { q: 'Was bedeutet `private`?', options: ['Überall sichtbar', 'Nur innerhalb der Klasse sichtbar', 'Nur in Unterklassen sichtbar', 'Nicht änderbar'], answer: 1, why: 'Von außen kommt man nicht an `private`-Eigenschaften.' },
  ],
},
{
  id: 'fehler', title: 'Fehler finden', sub: 'Fehlermeldungen, try, catch, throw',
  blocks: [
    { p: 'Fehlermeldungen sind deine Freunde: Sie nennen Grund und Zeile. Führe das aus und lies die Meldung:' },
    { code: c`<?php
$zahlen = [1, 2, 3];
echo $zahlen[5];
echo "\nEs geht weiter.";` },
    { p: 'Eine **Warning** ist ein Hinweis, das Programm läuft weiter. Ein **Fatal error** stoppt es. Ein **Parse error** heißt: Der Code ist falsch geschrieben, oft fehlt ein `;` oder eine Klammer, manchmal in der Zeile davor.' },
    { p: 'Eigene Fehler wirfst du mit `throw` und fängst sie mit `try` und `catch` ab:' },
    { code: c`<?php
function teilen(int $a, int $b): float
{
    if ($b === 0) {
        throw new InvalidArgumentException("Teilen durch 0!");
    }
    return $a / $b;
}

try {
    echo teilen(10, 2), "\n";
    echo teilen(1, 0), "\n";
} catch (InvalidArgumentException $e) {
    echo "Fehler: " . $e->getMessage();
}` },
  ],
  task: {
    text: 'Dieser Code hat **drei Fehler**. Repariere ihn, sodass er `Summe: 6` ausgibt. Tipp: Führe ihn zuerst mit **Prüfen** aus und lies die Meldung.',
    starter: c`<?php
$zahlen = [1, 2, 3]
$summe = 0;
foreach ($zahlen as $z) {
    $summe += $Z;
}
echo "Summe: " . $sume;
`,
    solution: c`<?php
$zahlen = [1, 2, 3];
$summe = 0;
foreach ($zahlen as $z) {
    $summe += $z;
}
echo "Summe: " . $summe;`,
    hint: 'Fehler 1: ein fehlendes `;`. Fehler 2 und 3 sind Tippfehler in Variablennamen. Groß- und Kleinschreibung zählt.',
    expect: 'Summe: 6',
  },
  quiz: [
    { q: 'Was bedeutet „Parse error: syntax error“?', options: ['Der Code ist falsch geschrieben', 'Eine Variable ist leer', 'Der Server ist kaputt', 'Eine Datei fehlt'], answer: 0, why: 'PHP kann den Code nicht lesen, z. B. wegen eines fehlenden `;`.' },
    { q: 'Was gibt dieser Code aus?', code: c`<?php
try {
    throw new Exception("Ups");
} catch (Exception $e) {
    echo $e->getMessage();
} finally {
    echo "!";
}`, output: 'Ups!', why: '`catch` gibt „Ups“ aus, `finally` läuft immer und hängt „!“ an.' },
    { q: 'Läuft ein Skript nach einer Warning weiter?', options: ['Ja', 'Nein', 'Nur auf Servern', 'Nur mit try'], answer: 0, why: 'Warnings sind Hinweise. Nur Fatal errors stoppen das Skript.' },
    { q: 'Womit wirfst du selbst eine Exception?', options: ['throw', 'raise', 'error', 'catch'], answer: 0, why: '`throw new Exception("...")`.' },
  ],
},
];

export const SNIPPETS = [
  { name: 'Hallo', code: c`<?php
$name = "Welt";
echo "Hallo $name!";
` },
  { name: 'FizzBuzz', code: c`<?php
for ($i = 1; $i <= 15; $i++) {
    echo match (true) {
        $i % 15 === 0 => "FizzBuzz",
        $i % 3 === 0 => "Fizz",
        $i % 5 === 0 => "Buzz",
        default => $i,
    }, "\n";
}
` },
  { name: 'Wörter zählen', code: c`<?php
$text = "der Hund und der Ball und die Katze";
$woerter = explode(" ", $text);
$anzahl = array_count_values($woerter);
arsort($anzahl);

foreach ($anzahl as $wort => $n) {
    echo str_pad($wort, 8) . str_repeat("■", $n) . "\n";
}
` },
  { name: 'Datum', code: c`<?php
date_default_timezone_set("Europe/Berlin");
echo "Heute: " . date("d.m.Y") . "\n";

$silvester = new DateTime("last day of december");
$heute = new DateTime("today");
$tage = $heute->diff($silvester)->days;
echo "Noch $tage Tage bis Silvester";
` },
  { name: 'Notenschnitt', code: c`<?php
$noten = [
    "Mathe" => 2,
    "Deutsch" => 1,
    "Englisch" => 3,
    "Informatik" => 1,
];

$schnitt = array_sum($noten) / count($noten);
printf("Schnitt: %.2f\n", $schnitt);
echo "Beste Fächer: ";
echo implode(", ", array_keys($noten, min($noten)));
` },
];

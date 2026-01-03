# Copilot Briefing: Landingpage – vollkommen.Braut (Mobile First)

## Ziel

Überarbeite die Landingpage so, dass sie **in der Mobilansicht emotional, ruhig und hochwertig** wirkt.
Die Seite soll sich **weich, feminin und elegant** anfühlen – visuell wie sprachlich.

Fokus:

* Plus Size Brautmode (Größen 46–60+)
* Exklusive, private Anprobe
* Wertschätzung, Ruhe, Vertrauen
* Eine klare Conversion: **Anprobe buchen**

---

## Grundprinzipien

* **Emotion vor Information**
* **Weiche Formen statt harter Kanten**
* **Scannen statt Lesen**
* **Weniger Elemente, mehr Wirkung**
* Bewegung und Typografie unterstützen das Gefühl von Eleganz

---

## Above the Fold (Mobile First)

* Funktioniert **ohne Scrollen**
* Kurzer, emotionaler Hero-Text (2–4 Zeilen)
* Eine Haupt-CTA
* Keine sachlichen Hinweise direkt nach dem Hero

### Beispiel-Hero

**Dein Kleid.
Deine Kurven.
Dein Moment.**

Plus Size Brautmode in Hamburg
Größen 46–60+ · exklusiv & ohne Druck

**CTA:** „Deine Anprobe erleben“

---

## Text & Content

* Keine langen Absätze auf Mobile
* Max. **2–3 Zeilen pro Block**
* Inhalte als **emotionale Mini-Module**
* Direkte Ansprache („du“, „dein Moment“)

### Scanbare Vorteile (Beispiel)

* ✨ **Exklusive Anprobe** – Boutique nur für dich
* 🤍 **Für echte Kurven** – Größen 46–60+
* 🪡 **Perfekt angepasst** – Änderungen im Haus
* 💬 **Beratung mit Herz** – ehrlich & ohne Druck

---

## „Wir sind umgezogen“

* **Nicht** als großer Textblock direkt nach dem Hero
* Stark kürzen oder weiter unten platzieren

### Mobile-Version

📍 **Neuer Standort:** Valentinskamp 62 · 20355 Hamburg

---

## Social Proof

* Früh platzieren
* Kurz, emotional, authentisch
* Ersetzt erklärende Texte

### Beispiel

„Selten so viel Exklusivität erlebt.
Man merkt, dass hier jede Braut mit Herz begleitet wird.“
— Venja

---

## Call-to-Action (CTA)

* Eine Haupt-CTA auf der Seite
* Einheitlicher Text & Stil
* Emotional statt technisch

**Empfohlen:**

* „Deine Anprobe erleben“
* „Deinen Moment buchen“

---

## Formen & Kanten (sehr wichtig)

* **Keine scharfen Kanten**
* Weiche, feminine Radien überall konsequent einsetzen

### Empfehlungen

* Buttons: `border-radius: 999px` oder sehr weich (Pill-Form)
* Karten / Boxen: `12–20px` (mobil)
* Bilder: `8–16px` (mobil)
* Keine harten Trennlinien → lieber Abstand & Weißraum

Ziel:
Alles soll sich **weich, einladend und wertschätzend** anfühlen.

---

## Bildsprache

* Große, ruhige Bilder
* Fokus auf:

    * Emotion
    * Stoffe & Details
    * Spiegel- & Anprobemomente
* Kein aggressives Cropping
* Kein starkes Zoomen
* Leichte Abrundungen an allen Bildern

---

## Motion & Animation (Smooth & Elegant)

* Bewegung ist **dezent und feminin**
* Keine technischen oder verspielten Effekte

### Empfohlene Animationen

* Fade + leichte Y-Translation

    * `opacity: 0 → 1`
    * `transform: translateY(12–24px) → 0`
* Dauer: **400–700 ms**
* Easing:

    * `ease-out`
    * oder `cubic-bezier(0.22, 1, 0.36, 1)`
* Animationen nur **einmal beim Sichtbarwerden**
* Inhalte nicht gleichzeitig animieren (kleine Delays: 100–150 ms)

### Accessibility

* `prefers-reduced-motion` berücksichtigen
* Animationen dann reduzieren oder deaktivieren

---

## Typografie (feminin & elegant)

* Schriftbild soll **weich, ruhig und hochwertig** wirken
* Keine harten Groteskschriften
* Gute Lesbarkeit auf Mobile hat Priorität

### Empfehlungen

* Headline-Fonts:

    * Serif oder Soft-Serif (modern, elegant)
    * zarte Kontraste, keine extremen Schnitte
* Fließtext:

    * humanistische Sans oder sehr ruhige Serif
* Großzügige Zeilenhöhe (`line-height: 1.4–1.6`)
* Keine aggressiven Versalien-Blöcke auf Mobile

Typografie soll sich anfühlen wie:

> ruhig · feminin · wertschätzend · zeitlos

---

## Nicht tun

* Keine scharfen Kanten
* Keine Parallax-Effekte auf Mobile
* Kein starkes Scaling (> 1.03)
* Keine Bounce- oder Slide-In-Animationen
* Keine wechselnden CTA-Texte ohne System
* Keine Textwüsten

---

## Zielwirkung

Die Seite soll sich anfühlen wie:

* ein ruhiger Atemzug
* ein privater Moment
* ein sanftes Öffnen eines Vorhangs

Die Braut soll nach wenigen Sekunden denken:

> „Hier bin ich richtig.“

---

## Output-Erwartung

Erzeuge:

* mobile-optimierte Sections / Komponenten
* reduzierte, emotionale Copy
* weiche Formen & konsistente Radien
* elegante Typografie
* ruhige, feminine Motion-Patterns
* klare CTA-Führung

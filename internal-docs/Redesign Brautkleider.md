# Anforderungskatalog: Umbau der Brautkleider-Seite von VollkommenBraut

## Ziel

Die bestehende Brautkleider-Seite von VollkommenBraut soll grundlegend überarbeitet werden. Das Design und die Benutzerführung orientieren sich an der Seite „Unsere Brautkleider“ von „Durch dick & dünn“.

Die Seite soll weniger wie ein klassischer Online-Shop und stärker wie eine inspirierende Galerie wirken. Besucherinnen sollen zunächst verschiedene Stilrichtungen entdecken und anschließend die passende Kategorie auswählen.

Die Navigation erfolgt ausschließlich über Kategorien. Es gibt keine klassische Filterfunktion, keine Sortierung und keine Anzeige der Anzahl der verfügbaren Kleider.

---

# Grundprinzip

Die Seite dient ausschließlich als Inspiration und stellt nur einen kleinen Ausschnitt des tatsächlichen Sortiments dar.

Ziel ist nicht, sämtliche Kleider online abzubilden, sondern Besucherinnen dazu zu motivieren, einen persönlichen Termin im Geschäft zu vereinbaren.

Über der Kategorieliste soll daher folgender Hinweis angezeigt werden:

> Auf unserer Webseite findest du eine kleine Auswahl unserer Modelle. Im Geschäft wartet noch eine deutlich größere Auswahl auf dich.

---

# Kategorien

Folgende Kategorien sollen dargestellt werden:

* Brautkleider mit Ärmeln
* Schlichte und moderne Brautkleider
* Leichte und fließende Brautkleider
* Brautkleider mit Spitze

Ein Kleid kann gleichzeitig mehreren Kategorien zugeordnet sein.

Beispiele:

* Ein Kleid kann sowohl „mit Ärmeln“ als auch „mit Spitze“ sein.
* Ein Kleid kann gleichzeitig „schlicht und modern“ sowie „leicht und fließend“ sein.

Die Zuordnung der Kleider zu den Kategorien ist bereits vorhanden und muss nicht automatisch berechnet werden.

---

# Aufbau der Übersichtsseite

Die Hauptseite `/brautkleider` dient als Einstieg in die verschiedenen Stilrichtungen.

Unterhalb des Einführungstextes werden die vier Kategorien als große Bildkacheln dargestellt.

Jede Kachel enthält:

* ein repräsentatives Titelbild
* den Namen der Kategorie
* optional einen kurzen Untertitel
* einen Link zur jeweiligen Unterseite

Beispiel:

```text
┌────────────────────────────────────┐
│                                    │
│                                    │
│            TITELBILD               │
│                                    │
│      Brautkleider mit Ärmeln       │
│                                    │
└────────────────────────────────────┘
```

---

# Darstellung der Kategorien

Die Kacheln sollen hochwertig und emotional wirken.

Anforderungen:

* große Bilder
* dezentes Text-Overlay
* gut lesbare Schrift
* leichter Schatten oder Farbverlauf hinter der Schrift
* Hover-Effekt auf Desktop
* vollständige Klickbarkeit der Kachel

Mögliche Effekte:

* leichtes Heranzoomen beim Überfahren mit der Maus
* sanftes Einblenden des Textes
* dezente Animation

---

# Responsive Verhalten

## Desktop

* zwei Kategorien pro Zeile
* große Bildflächen
* großzügige Abstände

## Tablet

* zwei Kategorien pro Zeile
* leicht reduzierte Bildhöhe

## Smartphone

* eine Kategorie pro Zeile
* volle Breite
* gut lesbare Beschriftung

---

# URLs

Jede Kategorie erhält eine eigene URL.

## Hauptseite

```text
/brautkleider
```

## Unterseiten

```text
/brautkleider/mit-aermeln
/brautkleider/schlicht-modern
/brautkleider/leicht-fliessend
/brautkleider/mit-spitze
```

---

# Kategorieseiten

Jede Kategorieseite enthält:

* einen Seitentitel
* ein großes Titelbild
* einen kurzen Einführungstext
* die Galerie der passenden Kleider
* einen Button zur Terminvereinbarung

Beispiel:

```text
Brautkleider mit Spitze

Romantisch, elegant und zeitlos:
Entdecke unsere Auswahl an Brautkleidern mit Spitze.

[Galerie]

[Termin vereinbaren]
```

---

# Galerie

Die Galerie zeigt ausschließlich die Kleider der jeweiligen Kategorie.

Anforderungen:

* große Bilder
* einheitliches Seitenverhältnis
* harmonische Abstände
* keine sichtbaren Dateinamen
* keine Produktnummern
* keine Preise
* keine Filter
* keine Sortierung
* keine Anzeige der Anzahl der Kleider

---

# Vollansicht

Beim Anklicken eines Bildes öffnet sich eine Vollansicht.

Die Vollansicht soll Folgendes unterstützen:

* Anzeige in maximaler Auflösung
* Zoom-Funktion auf Mobilgeräten
* Swipe zwischen den Bildern
* Navigation mit Pfeiltasten
* Schließen per ESC-Taste
* Schließen per Klick außerhalb des Bildes

---

# Bildgrößen

Die Website soll verschiedene Bildgrößen verwenden.

## Galerie

### Mobil

500 Pixel Breite

### Desktop

1200 Pixel Breite

## Vollansicht

Originalauflösung

Die Vollansicht soll immer die höchste verfügbare Qualität anzeigen.

---

# Anforderungen zur Bildgenerierung

## Grundprinzip

Die vorhandene Ordnerstruktur mit den Originalbildern soll unverändert bleiben. Die Originaldateien dürfen weder verschoben noch überschrieben werden.

Die Bilder sind bereits in vier verschiedenen Kategorien sortiert und liegen in separaten Verzeichnissen.

Beispiel:

```text
site/assets/sorted/chiffron
site/assets/sorted/cleanundschlicht
site/assets/sorted/mitaermeln
site/assets/sorted/tuelandspitze
```

Die Originalbilder bleiben dauerhaft in diesen Ordnern erhalten.

---

## Manuelle Bildgenerierung mit Copilot

1. Copilot erzeugt die verschiedenen Auflösungen.
2. Die generierten Bilder werden im selben Ordner wie die Originalbilder abgelegt mit dem Zusatz `-500`, `-1200` oder `-full` im Dateinamen.
---


## Zu erzeugende Varianten

Für jedes Originalbild sollen folgende Varianten erzeugt werden:

* **500 Pixel Breite** für Mobilgeräte
* **1200 Pixel Breite** für Desktop-Geräte
* **Originalauflösung** für die Vollansicht

Namensschema:

```text
kleid-01-500.webp
kleid-01-1200.webp
kleid-01-full.webp


---

## Technische Anforderungen

* Node.js
* Bibliothek `sharp`
* manuelle Ausführung über die Kommandozeile

Beispiel:

```bash
npm run generate-images
```

---

## Wichtig

* Keine automatische Generierung beim Commit.
* Keine GitHub Actions.
* Keine Änderung der bestehenden Ordnerstruktur.
* Keine Änderung der Originalbilder.
* Alle generierten Dateien sollen im Git-Repository gespeichert werden.

# Datenmodell

Die Kleider werden in einer zentralen JSON-Datei verwaltet.

Beispiel:

```json
{
  "id": "kleid-001",
  "title": "Aurora",
  "image": "/images/originals/kleid-001.jpg",
  "categories": [
    "mit-aermeln",
    "mit-spitze"
  ]
}
```

Zusätzlich soll jede Kategorie ein eigenes Titelbild besitzen:

```json
{
  "slug": "mit-spitze",
  "title": "Brautkleider mit Spitze",
  "heroImage": "/images/categories/spitze.jpg"
}
```

---

# SEO

Jede Kategorie soll eine eigene Landingpage darstellen.

Für jede Seite werden benötigt:

* eigener Seitentitel
* eigene Meta-Beschreibung
* eigene URL
* eigene Überschrift
* eigene Einleitung

Beispiele:

* Brautkleider mit Ärmeln in Hamburg
* Schlichte und moderne Brautkleider in Hamburg
* Leichte und fließende Brautkleider in Hamburg
* Brautkleider mit Spitze in Hamburg

---

# Technische Anforderungen

* statische Website
* Hosting über GitHub Pages
* mobile Optimierung
* schnelle Ladezeiten
* Lazy Loading
* responsive Bilder
* moderne Bildformate (WebP)
* keine Server-Komponente erforderlich
* zentrale Datenverwaltung über JSON

---

# Wichtig

Die Seite soll bewusst nicht wie ein Online-Shop wirken.

Stattdessen soll sie:

* inspirieren
* emotional wirken
* hochwertig aussehen
* die verschiedenen Stilrichtungen präsentieren
* Besucherinnen zur Terminvereinbarung motivieren
* die persönliche Beratung im Geschäft in den Mittelpunkt stellen

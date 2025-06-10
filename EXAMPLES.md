# 📚 Příklady použití Construction Plans Analyzer

Tento soubor obsahuje praktické příklady použití MCP serveru pro analýzu konstrukčních plánů.

## 🔍 Příklad 1: Analýza půdorysu rodinného domu

### Vstupní data
```
Půdorys přízemí rodinného domu obsahuje:
- Obývací pokoj (25 m²) s francouzskými okny
- Kuchyň (12 m²) s oknem 1500/1200(900)
- Chodbu (8 m²) 
- WC (2 m²)
- Schodiště do patra
- Všechny místnosti jsou zakótované
- Měřítko výkresu 1:50
```

### Nástroj: `analyze_plan`
```json
{
  "planDescription": "Půdorys přízemí rodinného domu s obývacím pokojem (25 m²), kuchyní (12 m²), chodbou (8 m²), WC (2 m²) a schodištěm. Obsahuje francouzská okna, normální okna s kótováním 1500/1200(900) a kompletní kótování.",
  "planType": "pudorys",
  "scale": "1:50"
}
```

### Očekávaný výstup
- Identifikace všech místností a jejich funkcí
- Kontrola kótování podle normy ČSN 01 3420
- Ověření označení oken a dveří
- Kontrolní seznam pro půdorysy
- Doporučení pro doplnění (např. směr severu, řezy)

## 🏗️ Příklad 2: Identifikace stavebních symbolů

### Vstupní data
```
Na výkrese jsou následující značky:
- Silné černé čáry pro stěny
- Vlnovka pro izolaci
- Rovnoběžné čáry s křížením pro zdivo
- Čárkovaná čára s tečkou pro osu
- Číslice 1500/1200(900) u okna
```

### Nástroj: `identify_symbols`
```json
{
  "symbols": [
    "silná čára",
    "vlnovka",
    "rovnoběžné čáry s křížením", 
    "čárkovaná čára s tečkou",
    "1500/1200(900)"
  ],
  "category": "konstrukce"
}
```

### Očekávaný výstup
- **Silná čára**: Konstrukce v řezu (ČSN ISO 128-23)
- **Vlnovka**: Tepelná izolace (ČSN 01 3406)
- **Rovnoběžné čáry s křížením**: Cihlové zdivo (ČSN 01 3406)
- **Čárkovaná čára s tečkou**: Osové čáry (ČSN ISO 128-23)
- **1500/1200(900)**: Kótování okna - šířka/výška(parapet)

## 📐 Příklad 3: Výpočet skutečných rozměrů

### Scénář
Architekt měří na výkrese v měřítku 1:50 rozměr místnosti. Na výkrese naměří 7.2 cm na délku a 5.4 cm na šířku.

### Nástroj: `calculate_dimensions`

**Pro délku:**
```json
{
  "drawingDimension": 7.2,
  "scale": "1:50",
  "unit": "m"
}
```

**Pro šířku:**
```json
{
  "drawingDimension": 5.4,
  "scale": "1:50", 
  "unit": "m"
}
```

### Očekávaný výstup
- **Délka**: 3.6 m (7.2 cm × 50 = 360 cm = 3.6 m)
- **Šířka**: 2.7 m (5.4 cm × 50 = 270 cm = 2.7 m)
- **Plocha místnosti**: ~9.7 m²

## ⚖️ Příklad 4: Kontrola souladu s normami

### Scénář
Kontrola schodiště v rodinném domě podle českých norem.

### Nástroj: `check_standards`
```json
{
  "element": "schodiště v rodinném domě - výška stupně 180mm, šířka stupně 280mm, šířka schodiště 1000mm",
  "standardType": "konstrukce"
}
```

### Očekávaný výstup podle ČSN 73 4130
- ✅ **Výška stupně**: 180 mm (max. 190 mm) - VYHOVUJE
- ✅ **Šířka stupně**: 280 mm (min. 250 mm) - VYHOVUJE  
- ✅ **Šířka schodiště**: 1000 mm (min. 900 mm) - VYHOVUJE
- **Doporučení**: Zábradlí min. 1000 mm, neklouzavý povrch

## 📊 Příklad 5: Generování kompletní zprávy

### Vstupní data z předchozích analýz
```json
{
  "planData": {
    "typ_vykresu": "pudorys",
    "meritko": "1:50",
    "analyza": "Půdorys obsahuje 4 místnosti s kompletním kótováním...",
    "identifikovane_prvky": [
      {
        "nazev": "Stěny",
        "popis": "Nosné a dělicí konstrukce",
        "typ": "konstrukce"
      },
      {
        "nazev": "Okna",
        "popis": "Okenní otvory s kótováním 1500/1200(900)",
        "typ": "otvor"
      }
    ],
    "kontrolni_seznam": [
      {"popis": "Měřítko uvedeno", "splneno": true},
      {"popis": "Směr severu označen", "splneno": false}
    ],
    "doporuceni": [
      "Doplnit označení směru severu",
      "Zkontrolovat úplnost kótování"
    ]
  },
  "reportType": "kompletni"
}
```

### Očekávaný výstup
Strukturovaná zpráva obsahující:
- Základní informace o výkrese
- Systematickou analýzu podle typu
- Identifikované konstrukční prvky
- Kontrolní seznam s hodnocením
- Doporučení pro zlepšení
- Celkové hodnocení kvality

## 🎯 Pracovní postupy

### Postup 1: Kompletní analýza nového projektu
1. **analyze_plan** - základní analýza výkresu
2. **identify_symbols** - kontrola použitých značek
3. **check_standards** - ověření souladu s normami
4. **generate_report** - vytvoření zprávy pro klienta

### Postup 2: Rychlá kontrola kvality
1. **analyze_plan** s kontrolním seznamem
2. **check_standards** pro kritické prvky
3. **generate_report** typu "souhrn"

### Postup 3: Výukové využití
1. **identify_symbols** - výuka čtení symbolů
2. **calculate_dimensions** - procvičování měřítek
3. **check_standards** - seznámení s normami

## 💡 Tipy pro efektivní použití

### Pro architekty
- Používejte `analyze_plan` na začátku každého projektu
- Kombinujte `check_standards` s různými typy kontrol
- Generujte "souhrn" zprávy pro klienty

### Pro studenty
- Začněte s `identify_symbols` pro základní orientaci
- Procvičujte `calculate_dimensions` s různými měřítky
- Používejte kontrolní seznamy pro systematické učení

### Pro stavební dozor
- Využívejte "kontrolni" typ zpráv pro dokumentaci
- Kombinujte nástroje pro komplexní posouzení
- Ukládejte zprávy jako součást stavebního deníku

## ⚠️ Častá upozornění

### Analýza půdorysů
- Vždy zkontrolujte označení směru severu
- Ověřte úplnost tabulky místností
- Kontrolujte formát kótování oken

### Kontrola řezů
- Výškové kóty musí být v metrech
- Skladby konstrukcí musí být specifikovány
- Řezová rovina musí procházet schodištěm

### Výpočty rozměrů
- Zkontrolujte správnost měřítka
- Převody provádějte systematicky
- Ověřte výsledky kontrolním výpočtem

---

*Tyto příklady demonstrují praktické využití Construction Plans Analyzer MCP serveru pro každodenní práci s konstrukčními plány.*

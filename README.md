# 🏗️ Construction Plans Analyzer MCP Server

Specializovaný MCP server pro systematickou analýzu konstrukčních plánů a architektonických výkresů podle českých norem ČSN.

## 📋 Přehled

Tento MCP server poskytuje pokročilé nástroje pro:
- **Systematickou analýzu** konstrukčních plánů
- **Identifikaci stavebních značek a symbolů**
- **Výpočty rozměrů** podle měřítka
- **Kontrolu souladu** s českými normami ČSN
- **Generování komplexních zpráv**

## 🚀 Instalace

### Předpoklady
- Node.js 18.0.0 nebo novější
- npm nebo yarn

### Kroky instalace

1. **Klonování repository:**
```bash
git clone https://github.com/Tisik79/mcp-construction-plans-analyzer.git
cd mcp-construction-plans-analyzer
```

2. **Instalace závislostí:**
```bash
npm install
```

3. **Kompilace TypeScript:**
```bash
npm run build
```

4. **Spuštění serveru:**
```bash
npm start
```

## 🔧 Konfigurace MCP klienta

### Claude Desktop

Přidejte do `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "construction-plans-analyzer": {
      "command": "node",
      "args": ["/path/to/mcp-construction-plans-analyzer/dist/index.js"],
      "env": {}
    }
  }
}
```

### Cline/Continue VS Code

Přidejte do konfigurace MCP:

```json
{
  "mcpServers": {
    "construction-plans-analyzer": {
      "command": "node",
      "args": ["/path/to/mcp-construction-plans-analyzer/dist/index.js"]
    }
  }
}
```

## 🛠️ Dostupné nástroje

### 1. `analyze_plan`
Systematická analýza konstrukčního plánu podle typu výkresu.

**Parametry:**
- `planDescription` (povinný): Popis plánu k analýze
- `planType`: `pudorys` | `rez` | `pohled` | `detail` | `situace`
- `scale`: Měřítko výkresu (např. "1:50")

**Příklad použití:**
```javascript
{
  "planDescription": "Půdorys přízemí rodinného domu se třemi místnostmi, kuchyní, obývacím pokojem a chodbou. Obsahuje okna a dveře s kótováním.",
  "planType": "pudorys",
  "scale": "1:50"
}
```

### 2. `identify_symbols`
Identifikace stavebních značek a symbolů podle českých norem.

**Parametry:**
- `symbols` (povinný): Seznam symbolů k identifikaci
- `category`: `konstrukce` | `materialy` | `instalace` | `kotovani` | `obecne`

**Příklad použití:**
```javascript
{
  "symbols": ["silná čára", "cihlová šrafa", "okno půdorys", "kótovací čára"],
  "category": "konstrukce"
}
```

### 3. `calculate_dimensions`
Výpočet skutečných rozměrů z měřítka výkresu.

**Parametry:**
- `drawingDimension` (povinný): Rozměr na výkrese v cm
- `scale` (povinný): Měřítko výkresu
- `unit`: `mm` | `cm` | `m` (výchozí: `m`)

**Příklad použití:**
```javascript
{
  "drawingDimension": 8.5,
  "scale": "1:50",
  "unit": "m"
}
```

### 4. `check_standards`
Kontrola souladu s českými normami ČSN.

**Parametry:**
- `element` (povinný): Konstrukční prvek ke kontrole
- `standardType`: `kresleni` | `konstrukce` | `materialy` | `bezpecnost`

**Příklad použití:**
```javascript
{
  "element": "schodiště v rodinném domě",
  "standardType": "konstrukce"
}
```

### 5. `generate_report`
Generování strukturovaných zpráv z analýzy.

**Parametry:**
- `planData` (povinný): Data z provedené analýzy
- `reportType`: `kompletni` | `souhrn` | `kontrolni`

**Příklad použití:**
```javascript
{
  "planData": {
    "typ_vykresu": "pudorys",
    "meritko": "1:50",
    "analyza": "...",
    "identifikovane_prvky": [...]
  },
  "reportType": "kompletni"
}
```

## 📚 Podporované normy

### České normy ČSN
- **ČSN 01 3420** - Výkresy pozemních staveb
- **ČSN ISO 128-23** - Typy čar na technických výkresech
- **ČSN 01 3406** - Označování materiálů na výkresech
- **ČSN 73 4130** - Schodiště a šikmé rampy
- **ČSN 73 0540** - Tepelná ochrana budov
- **ČSN 73 0802** - Požární bezpečnost staveb
- **ČSN 74 3305** - Ochranná zábradlí
- **Vyhláška 398/2009 Sb.** - Bezbariérovost

### Podporované typy výkresů
- **Půdorysy** - vodorovné řezy objektem
- **Řezy** - svislé řezy objektem
- **Pohledy** - vnější pohledy na průčelí
- **Detaily** - konstrukční detaily
- **Situace** - situační plány

## 💡 Příklady použití

### Analýza půdorysu
```bash
# Pomocí analyze_plan
Analyzujte půdorys přízemí s místnostmi: obývací pokoj (25 m²), 
kuchyň (12 m²), chodba (8 m²). Měřítko 1:50.
```

### Identifikace symbolů
```bash
# Pomocí identify_symbols  
Identifikujte tyto značky: "tenká čára", "betonová šrafa", 
"výšková kóta", "označení severu"
```

### Výpočet rozměrů
```bash
# Pomocí calculate_dimensions
Na výkrese v měřítku 1:50 je rozměr 6.8 cm. 
Jaký je skutečný rozměr v metrech?
```

## 🔍 Funkcionalita

### Automatická identifikace prvků
- Stěny a jejich materiály
- Okna a dveře s kótováním
- Schodiště a komunikace
- Technické instalace
- Kótovací systémy

### Kontrola norem
- Formální náležitosti výkresů
- Konstrukční požadavky
- Rozměrové kontroly
- Bezpečnostní standardy

### Generování zpráv
- **Kompletní zprávy** - detailní analýza všech aspektů
- **Souhrnné zprávy** - klíčové poznatky a doporučení
- **Kontrolní seznamy** - systematické ověření požadavků

## 🎯 Výhody

### Pro architekty a projektanty
- Rychlá kontrola projektové dokumentace
- Automatická identifikace chyb a nedostatků
- Soulad s českými normami
- Strukturované reporty pro klienty

### Pro studenty
- Výukový nástroj pro čtení výkresů
- Praktické příklady symbolů a značek
- Pochopení českých stavebních norem
- Systematický přístup k analýze

### Pro stavební dozor
- Kontrola kvality projektů
- Ověření souladu s normami
- Dokumentace pro stavební povolení
- Rychlá orientace v projektech

## 🔧 Vývoj

### Spuštění ve vývojovém režimu
```bash
npm run dev
```

### Testování
```bash
npm test
```

### Linting
```bash
npm run lint
```

## 📁 Struktura projektu

```
mcp-construction-plans-analyzer/
├── src/
│   ├── index.ts              # Hlavní MCP server
│   ├── tools/                # Implementace nástrojů
│   │   ├── analyzePlan.ts    # Analýza plánů
│   │   ├── identifySymbols.ts # Identifikace značek
│   │   ├── calculateDimensions.ts # Výpočty rozměrů
│   │   ├── checkStandards.ts # Kontrola norem
│   │   └── generateReport.ts # Generování zpráv
│   └── data/                 # Databáze symbolů a norem
│       ├── symbols.ts        # Databáze značek
│       └── checklist.ts      # Kontrolní seznamy
├── dist/                     # Kompilované JS soubory
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Přispívání

1. Forkněte repository
2. Vytvořte feature branch (`git checkout -b feature/nova-funkcionalita`)
3. Commitněte změny (`git commit -am 'Přidání nové funkcionality'`)
4. Pushněte do branch (`git push origin feature/nova-funkcionalita`)
5. Vytvořte Pull Request

## 📄 Licence

MIT License - viz [LICENSE](LICENSE) soubor.

## 🆘 Podpora

### Problémy s instalací
- Ověřte verzi Node.js (min. 18.0.0)
- Zkontrolujte instalaci závislostí
- Zkuste reinstalaci: `rm -rf node_modules && npm install`

### Problémy s konfigurací
- Ověřte cestu k serveru v MCP konfiguraci
- Zkontrolujte, že server je zkompilovaný (`npm run build`)
- Restartujte MCP klienta

### Často kladené otázky

**Q: Podporuje server i jiné než české normy?**
A: Aktuálně je zaměřen na české normy ČSN, ale architektura umožňuje snadné rozšíření.

**Q: Lze přidat vlastní symboly a značky?**
A: Ano, symboly jsou definovány v `src/data/symbols.ts` a lze je rozšířit.

**Q: Funguje server offline?**
A: Ano, veškerá funkcionalita funguje offline bez potřeby internetového připojení.

## 🔗 Souvisící projekty

- [Model Context Protocol](https://github.com/modelcontextprotocol/typescript-sdk)
- [Claude Desktop](https://claude.ai/desktop)
- [Cline VS Code Extension](https://github.com/cline/cline)

---

**Vytvořeno s ❤️ pro českou stavební komunitu**

*Construction Plans Analyzer MCP Server v1.0.0*

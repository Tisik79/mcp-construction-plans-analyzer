interface CalculateDimensionsArgs {
  drawingDimension: number;
  scale: string;
  unit?: 'mm' | 'cm' | 'm';
}

interface DimensionResult {
  real_dimension: number;
  unit: string;
  scale_factor: number;
  conversions: {
    mm: number;
    cm: number;
    m: number;
  };
}

export async function calculateDimensions(args: CalculateDimensionsArgs) {
  const { drawingDimension, scale, unit = 'm' } = args;
  
  try {
    const result = calculateRealDimension(drawingDimension, scale, unit);
    
    return {
      content: [
        {
          type: 'text',
          text: generateDimensionReport(drawingDimension, scale, result),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Chyba při výpočtu rozměrů: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
}

function calculateRealDimension(drawingDimension: number, scale: string, unit: string): DimensionResult {
  // Parsování měřítka
  const scaleFactor = parseScale(scale);
  
  if (scaleFactor === 0) {
    throw new Error(`Neplatné měřítko: ${scale}`);
  }
  
  // Výpočet skutečného rozměru v centimetrech
  const realDimensionCm = drawingDimension * scaleFactor;
  
  // Převody do všech jednotek
  const conversions = {
    mm: realDimensionCm * 10,
    cm: realDimensionCm,
    m: realDimensionCm / 100,
  };
  
  // Hlavní výsledek v požadované jednotce
  const realDimension = conversions[unit as keyof typeof conversions];
  
  return {
    real_dimension: realDimension,
    unit,
    scale_factor: scaleFactor,
    conversions,
  };
}

function parseScale(scale: string): number {
  // Standardní měřítka ve stavebnictví
  const scaleMap: { [key: string]: number } = {
    '1:1': 1,
    '1:2': 2,
    '1:5': 5,
    '1:10': 10,
    '1:20': 20,
    '1:25': 25,
    '1:50': 50,
    '1:100': 100,
    '1:200': 200,
    '1:250': 250,
    '1:500': 500,
    '1:1000': 1000,
    '1:2000': 2000,
    '1:5000': 5000,
    '1:10000': 10000,
  };
  
  // Normalizace vstupu
  const normalizedScale = scale.trim().replace(/\s/g, '');
  
  if (scaleMap[normalizedScale]) {
    return scaleMap[normalizedScale];
  }
  
  // Pokus o ruční parsování formátu "1:X"
  const match = normalizedScale.match(/^1:(\d+)$/);
  if (match) {
    return parseInt(match[1], 10);
  }
  
  // Pokus o parsování formátu "M 1:X"
  const matchM = normalizedScale.match(/^M1:(\d+)$/i);
  if (matchM) {
    return parseInt(matchM[1], 10);
  }
  
  throw new Error(`Nepodařilo se zparsovat měřítko: ${scale}`);
}

function generateDimensionReport(drawingDimension: number, scale: string, result: DimensionResult): string {
  return `# Výpočet skutečných rozměrů

## Vstupní data
- **Rozměr na výkrese:** ${drawingDimension} cm
- **Měřítko:** ${scale}
- **Měřítkový faktor:** 1:${result.scale_factor}

## Výsledek
- **Skutečný rozměr:** ${formatNumber(result.real_dimension)} ${result.unit}

## Převody do všech jednotek
- **Milimetry:** ${formatNumber(result.conversions.mm)} mm
- **Centimetry:** ${formatNumber(result.conversions.cm)} cm  
- **Metry:** ${formatNumber(result.conversions.m)} m

## Kontrolní výpočet
\`\`\`
Skutečný rozměr = Rozměr na výkrese × Měřítkový faktor
${formatNumber(result.conversions.cm)} cm = ${drawingDimension} cm × ${result.scale_factor}
\`\`\`

## Vysvětlení měřítka
Měřítko ${scale} znamená:
- 1 cm na výkrese odpovídá ${result.scale_factor} cm ve skutečnosti
- 1 mm na výkrese odpovídá ${result.scale_factor} mm ve skutečnosti

## Častá měřítka ve stavebnictví
- **1:50** - nejčastější pro půdorysy a řezy
- **1:100** - pohledy na budovy  
- **1:200** - situační plány
- **1:10, 1:20** - konstrukční detaily
- **1:500, 1:1000** - urbanistické studie

${generateScaleTable()}
`;
}

function formatNumber(num: number): string {
  // Zaokrouhlení na 3 desetinná místa a odstranění zbytečných nul
  return parseFloat(num.toFixed(3)).toString();
}

function generateScaleTable(): string {
  return `## Tabulka převodů pro běžná měřítka

| Měřítko | 1 cm na výkrese = | Příklad použití |
|---------|-------------------|-----------------|
| 1:10    | 10 cm = 0.1 m    | Detaily |
| 1:20    | 20 cm = 0.2 m    | Detaily |
| 1:50    | 50 cm = 0.5 m    | Půdorysy, řezy |
| 1:100   | 100 cm = 1.0 m   | Pohledy |
| 1:200   | 200 cm = 2.0 m   | Situace |
| 1:500   | 500 cm = 5.0 m   | Širší okolí |
| 1:1000  | 1000 cm = 10.0 m | Územní plány |

## Další užitečné nástroje
Pro rychlé výpočty můžete použít:
- **Měřítko 1:50:** Násobte rozměr na výkrese × 50
- **Měřítko 1:100:** Násobte rozměr na výkrese × 100
- **Pro kontrolu:** Výsledek by měl dávat smysl (např. místnost 4×3 m, ne 40×30 m)`;
}

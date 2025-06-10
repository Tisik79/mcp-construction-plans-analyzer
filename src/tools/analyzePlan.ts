import { symbolDatabase } from '../data/symbols.js';
import { analysisChecklist } from '../data/checklist.js';

interface AnalyzePlanArgs {
  planDescription: string;
  planType?: 'pudorys' | 'rez' | 'pohled' | 'detail' | 'situace';
  scale?: string;
}

export async function analyzePlan(args: AnalyzePlanArgs) {
  const { planDescription, planType = 'pudorys', scale = '1:50' } = args;

  // Systematická analýza podle typu výkresu
  const analysis = {
    typ_vykresu: planType,
    meritko: scale,
    analyza: await performSystematicAnalysis(planDescription, planType),
    identifikovane_prvky: await identifyElements(planDescription),
    doporuceni: await generateRecommendations(planDescription, planType),
    kontrolni_seznam: getChecklistForType(planType),
  };

  return {
    content: [
      {
        type: 'text',
        text: `# Analýza konstrukčního plánu

## Základní informace
- **Typ výkresu:** ${planType.toUpperCase()}
- **Měřítko:** ${scale}
- **Skutečný rozměr:** ${scale} znamená ${getScaleExplanation(scale)}

## Systematická analýza
${analysis.analyza}

## Identifikované prvky
${analysis.identifikovane_prvky.map((prvek: any) => `- **${prvek.nazev}:** ${prvek.popis}`).join('\n')}

## Doporučení pro další analýzu
${analysis.doporuceni.map((item: string) => `- ${item}`).join('\n')}

## Kontrolní seznam
${analysis.kontrolni_seznam.map((item: any) => `- [ ] ${item.popis} ${item.splneno ? '✅' : '❌'}`).join('\n')}
`,
      },
    ],
  };
}

async function performSystematicAnalysis(description: string, type: string): Promise<string> {
  const keywords = description.toLowerCase();
  let analysis = '';

  switch (type) {
    case 'pudorys':
      analysis = analyzeFloorPlan(keywords);
      break;
    case 'rez':
      analysis = analyzeSection(keywords);
      break;
    case 'pohled':
      analysis = analyzeElevation(keywords);
      break;
    case 'detail':
      analysis = analyzeDetail(keywords);
      break;
    case 'situace':
      analysis = analyzeSitePlan(keywords);
      break;
  }

  return analysis;
}

function analyzeFloorPlan(description: string): string {
  let analysis = `### Analýza půdorysu\n\n`;
  
  // Kontrola základních prvků půdorysu
  if (description.includes('stěn') || description.includes('zdí')) {
    analysis += `**Stěny:** Identifikovány nosné a dělicí stěny.\n`;
    analysis += `- Silné čáry = stěny v řezu\n`;
    analysis += `- Různé šrafy označují různé materiály\n\n`;
  }

  if (description.includes('okn') || description.includes('dveř')) {
    analysis += `**Otvory:** Nalezena okna nebo dveře.\n`;
    analysis += `- Okna: dvě rovnoběžné čáry (rám) + vysunuté čáry (parapet)\n`;
    analysis += `- Kótování: šířka/výška(parapet)\n\n`;
  }

  if (description.includes('kót') || description.includes('rozměr')) {
    analysis += `**Kótování:** Přítomno rozměrové označení.\n`;
    analysis += `- Všechny kóty v milimetrech\n`;
    analysis += `- Kontrola úplnosti kótování\n\n`;
  }

  if (description.includes('místnost')) {
    analysis += `**Místnosti:** Identifikované prostory.\n`;
    analysis += `- Čísla místností odkazují do tabulky místností\n`;
    analysis += `- Kontrola ploch a označení\n\n`;
  }

  return analysis;
}

function analyzeSection(description: string): string {
  return `### Analýza řezu\n\n**Svislý řez objektem:**\n- Zobrazuje výšky podlaží\n- Konstrukční skladby\n- Výškové kóty v metrech (±0,000)\n- Schodiště a jeho konstrukce\n`;
}

function analyzeElevation(description: string): string {
  return `### Analýza pohledu\n\n**Pohled na průčelí:**\n- Architektonické řešení\n- Materiály fasády\n- Proporce otvorů\n- Střešní konstrukce\n`;
}

function analyzeDetail(description: string): string {
  return `### Analýza detailu\n\n**Konstrukční detail:**\n- Velké měřítko (1:10, 1:5)\n- Přesné konstrukční řešení\n- Materiálové skladby\n- Napojení konstrukcí\n`;
}

function analyzeSitePlan(description: string): string {
  return `### Analýza situace\n\n**Situační plán:**\n- Umístění objektu na pozemku\n- Odstupy od hranic\n- Zpevněné plochy\n- Terénní úpravy\n`;
}

async function identifyElements(description: string) {
  const elements = [];
  const keywords = description.toLowerCase();

  // Identifikace podle klíčových slov
  if (keywords.includes('stěn') || keywords.includes('zdí')) {
    elements.push({
      nazev: 'Stěny',
      popis: 'Nosné a dělicí konstrukce, označené silnými čarami v řezu',
      typ: 'konstrukce'
    });
  }

  if (keywords.includes('okn')) {
    elements.push({
      nazev: 'Okna',
      popis: 'Okenní otvory s rámem a parapetem, kótování formát šířka/výška(parapet)',
      typ: 'otvor'
    });
  }

  if (keywords.includes('dveř')) {
    elements.push({
      nazev: 'Dveře',
      popis: 'Dveřní otvory se směrem otevírání',
      typ: 'otvor'
    });
  }

  if (keywords.includes('schodišt')) {
    elements.push({
      nazev: 'Schodiště',
      popis: 'Svislá komunikace mezi podlažími',
      typ: 'komunikace'
    });
  }

  return elements;
}

async function generateRecommendations(description: string, type: string): Promise<string[]> {
  const recommendations = [];
  
  recommendations.push('Zkontrolovat úplnost kótování');
  recommendations.push('Ověřit správnost měřítka');
  recommendations.push('Zkontrolovat legendu materiálů');
  
  if (type === 'pudorys') {
    recommendations.push('Ověřit tabulku místností');
    recommendations.push('Zkontrolovat označení řezů a pohledů');
  }
  
  if (type === 'rez') {
    recommendations.push('Zkontrolovat výškové kóty');
    recommendations.push('Ověřit skladby konstrukcí');
  }

  return recommendations;
}

function getChecklistForType(type: string) {
  const baseChecklist = [
    { popis: 'Měřítko je uvedeno a správné', splneno: false },
    { popis: 'Legenda materiálů je přítomna', splneno: false },
    { popis: 'Kótování je úplné', splneno: false },
    { popis: 'Čáry mají správnou tloušťku', splneno: false },
  ];

  switch (type) {
    case 'pudorys':
      return [
        ...baseChecklist,
        { popis: 'Tabulka místností je vyplněna', splneno: false },
        { popis: 'Označení řezů je přítomno', splneno: false },
        { popis: 'Směr severu je označen', splneno: false },
      ];
    
    case 'rez':
      return [
        ...baseChecklist,
        { popis: 'Výškové kóty jsou uvedeny', splneno: false },
        { popis: 'Skladby konstrukcí jsou specifikovány', splneno: false },
      ];
    
    default:
      return baseChecklist;
  }
}

function getScaleExplanation(scale: string): string {
  const scales: { [key: string]: string } = {
    '1:50': '1 cm na výkrese = 50 cm ve skutečnosti',
    '1:100': '1 cm na výkrese = 1 m ve skutečnosti',
    '1:200': '1 cm na výkrese = 2 m ve skutečnosti',
    '1:500': '1 cm na výkrese = 5 m ve skutečnosti',
    '1:1000': '1 cm na výkrese = 10 m ve skutečnosti',
    '1:10': '1 cm na výkrese = 10 cm ve skutečnosti',
    '1:20': '1 cm na výkrese = 20 cm ve skutečnosti',
  };

  return scales[scale] || `${scale} (neznámé měřítko)`;
}

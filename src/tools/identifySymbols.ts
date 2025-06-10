interface IdentifySymbolsArgs {
  symbols: string[];
  category?: 'konstrukce' | 'materialy' | 'instalace' | 'kotovani' | 'obecne';
}

interface Symbol {
  nazev: string;
  popis: string;
  kategorie: string;
  norma?: string;
  poznamka?: string;
  graficky_popis?: string;
}

export async function identifySymbols(args: IdentifySymbolsArgs) {
  const { symbols, category } = args;
  
  const identifiedSymbols: Symbol[] = [];
  
  for (const symbol of symbols) {
    const identified = await identifySymbol(symbol, category);
    if (identified) {
      identifiedSymbols.push(identified);
    }
  }

  return {
    content: [
      {
        type: 'text',
        text: generateSymbolReport(identifiedSymbols),
      },
    ],
  };
}

async function identifySymbol(symbol: string, category?: string): Promise<Symbol | null> {
  const symbolLower = symbol.toLowerCase();
  
  // Databáze značek a symbolů podle kategorií
  const symbolDatabase: { [key: string]: Symbol } = {
    // Konstrukce
    'silná čára': {
      nazev: 'Silná čára',
      popis: 'Označuje konstrukce v řezu (stěny, sloupy, nosníky)',
      kategorie: 'konstrukce',
      norma: 'ČSN ISO 128-23',
      graficky_popis: 'Tloušťka 0.7-1.0 mm'
    },
    'tenká čára': {
      nazev: 'Tenká čára',
      popis: 'Konstrukce v pohledu, pomocné čáry',
      kategorie: 'konstrukce',
      norma: 'ČSN ISO 128-23',
      graficky_popis: 'Tloušťka 0.35 mm'
    },
    'čerchovaná čára': {
      nazev: 'Čerchovaná čára',
      popis: 'Konstrukce za řezovou rovinou nebo skryté hrany',
      kategorie: 'konstrukce',
      norma: 'ČSN ISO 128-23',
      graficky_popis: 'Střídavě čára-mezera-čára'
    },

    // Materiály
    'cihlová šrafa': {
      nazev: 'Cihlová šrafa',
      popis: 'Pálené cihlové zdivo',
      kategorie: 'materialy',
      graficky_popis: 'Rovnoběžné čáry s křížením'
    },
    'betonová šrafa': {
      nazev: 'Betonová šrafa',
      popis: 'Železobeton nebo prostý beton',
      kategorie: 'materialy',
      graficky_popis: 'Husté tečkování s čarami'
    },
    'izolační šrafa': {
      nazev: 'Izolační šrafa',
      popis: 'Tepelná nebo zvuková izolace',
      kategorie: 'materialy',
      graficky_popis: 'Vlnovka nebo zubatá čára'
    },
    'dřevo šrafa': {
      nazev: 'Dřevěná šrafa',
      popis: 'Dřevěné konstrukce',
      kategorie: 'materialy',
      graficky_popis: 'Rovnoběžné čáry se zakřivením'
    },

    // Kótování
    'kótovací čára': {
      nazev: 'Kótovací čára',
      popis: 'Určuje rozměr mezi dvěma body',
      kategorie: 'kotovani',
      norma: 'ČSN 01 3420',
      graficky_popis: 'Tenká čára s šipkami na koncích'
    },
    'pomocná čára': {
      nazev: 'Pomocná čára',
      popis: 'Prodloužení obrysových čar pro kótování',
      kategorie: 'kotovani',
      norma: 'ČSN 01 3420',
      graficky_popis: 'Tenká čára přesahující kótovací čáru'
    },
    'výšková kóta': {
      nazev: 'Výšková kóta',
      popis: 'Označení absolutní výšky v metrech',
      kategorie: 'kotovani',
      poznamka: 'Relativně k ±0,000 (úroveň přízemí)',
      graficky_popis: 'Číslo v rámeček nebo "kačena"'
    },

    // Okna a dveře
    'okno půdorys': {
      nazev: 'Okno v půdorysu',
      popis: 'Okenní otvor s rámem a parapetem',
      kategorie: 'konstrukce',
      graficky_popis: 'Dvě rovnoběžné čáry + vysunuté čáry parapetu',
      poznamka: 'Kótování: šířka/výška(parapet)'
    },
    'dveře půdorys': {
      nazev: 'Dveře v půdorysu',
      popis: 'Dveřní otvor se směrem otevírání',
      kategorie: 'konstrukce',
      graficky_popis: 'Obdélník s obloukem směru otevření'
    },

    // Schodiště
    'schodiště': {
      nazev: 'Schodiště',
      popis: 'Svislá komunikace mezi podlažími',
      kategorie: 'konstrukce',
      graficky_popis: 'Rovnoběžné čáry stupňů se šipkou směru',
      poznamka: 'Šipka ukazuje směr výstupu nahoru'
    },

    // Instalace
    'voda studená': {
      nazev: 'Studená voda',
      popis: 'Rozvod studené užitkové vody',
      kategorie: 'instalace',
      graficky_popis: 'Plná čára označená SV'
    },
    'voda teplá': {
      nazev: 'Teplá voda',
      popis: 'Rozvod teplé užitkové vody',
      kategorie: 'instalace',
      graficky_popis: 'Plná čára označená TV'
    },
    'kanalizace': {
      nazev: 'Kanalizace',
      popis: 'Odpadní kanalizační potrubí',
      kategorie: 'instalace',
      graficky_popis: 'Čárkovaná čára nebo dvojitá čára'
    },
    'elektro': {
      nazev: 'Elektrické vedení',
      popis: 'Silnoproudé rozvody',
      kategorie: 'instalace',
      graficky_popis: 'Tenká čára s označením počtu vodičů'
    },

    // Obecné
    'sever': {
      nazev: 'Orientace severu',
      popis: 'Označení světových stran',
      kategorie: 'obecne',
      graficky_popis: 'Šipka označená S nebo N',
      poznamka: 'Povinné v půdorysech'
    },
    'řez': {
      nazev: 'Označení řezu',
      popis: 'Poloha a směr řezové roviny',
      kategorie: 'obecne',
      graficky_popis: 'Čára s písmeny na koncích (A-A, B-B)',
      poznamka: 'Šipky ukazují směr pohledu'
    },
  };

  // Hledání podle klíčových slov
  for (const [key, symbolInfo] of Object.entries(symbolDatabase)) {
    if (symbolLower.includes(key) || key.includes(symbolLower)) {
      if (!category || symbolInfo.kategorie === category) {
        return symbolInfo;
      }
    }
  }

  // Pokud symbol není nalezen, vrátíme základní informaci
  return {
    nazev: symbol,
    popis: 'Symbol nebyl rozpoznán',
    kategorie: category || 'neznama',
    poznamka: 'Doporučujeme konzultaci s projektovou dokumentací nebo normami'
  };
}

function generateSymbolReport(symbols: Symbol[]): string {
  if (symbols.length === 0) {
    return '# Identifikace symbolů\n\nŽádné symboly nebyly identifikovány.';
  }

  let report = '# Identifikace stavebních symbolů\n\n';
  
  // Seskupení podle kategorií
  const categories = symbols.reduce((acc, symbol) => {
    if (!acc[symbol.kategorie]) {
      acc[symbol.kategorie] = [];
    }
    acc[symbol.kategorie].push(symbol);
    return acc;
  }, {} as { [key: string]: Symbol[] });

  for (const [category, categorySymbols] of Object.entries(categories)) {
    report += `## ${getCategoryName(category)}\n\n`;
    
    for (const symbol of categorySymbols) {
      report += `### ${symbol.nazev}\n`;
      report += `**Popis:** ${symbol.popis}\n\n`;
      
      if (symbol.graficky_popis) {
        report += `**Grafické zobrazení:** ${symbol.graficky_popis}\n\n`;
      }
      
      if (symbol.norma) {
        report += `**Norma:** ${symbol.norma}\n\n`;
      }
      
      if (symbol.poznamka) {
        report += `**Poznámka:** ${symbol.poznamka}\n\n`;
      }
      
      report += '---\n\n';
    }
  }

  return report;
}

function getCategoryName(category: string): string {
  const categoryNames: { [key: string]: string } = {
    'konstrukce': 'Konstrukční prvky',
    'materialy': 'Materiálové značky',
    'instalace': 'Technické instalace',
    'kotovani': 'Kótování a rozměry',
    'obecne': 'Obecné značky',
    'neznama': 'Neidentifikované symboly'
  };
  
  return categoryNames[category] || category;
}

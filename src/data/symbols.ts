// Databáze stavebních symbolů a značek podle českých norem

export const symbolDatabase = {
  // Typy čar podle ČSN ISO 128-23
  lines: {
    'silna_cara': {
      nazev: 'Silná čára',
      popis: 'Konstrukce v řezu (stěny, sloupy, nosníky)',
      tloustka: '0.7-1.0 mm',
      norma: 'ČSN ISO 128-23',
      pouziti: ['pudorys', 'rez']
    },
    'tenka_cara': {
      nazev: 'Tenká čára',
      popis: 'Konstrukce v pohledu, pomocné čáry',
      tloustka: '0.35 mm',
      norma: 'ČSN ISO 128-23',
      pouziti: ['pohled', 'kotovani']
    },
    'cerchovana_cara': {
      nazev: 'Čerchovaná čára',
      popis: 'Konstrukce za řezovou rovinou nebo skryté hrany',
      tloustka: '0.35 mm',
      norma: 'ČSN ISO 128-23',
      vzor: 'čára-mezera-čára'
    },
    'cara_tecka': {
      nazev: 'Čárkovaná čára s tečkou',
      popis: 'Osy, středy, řezové roviny',
      tloustka: '0.35 mm',
      norma: 'ČSN ISO 128-23',
      vzor: 'čára-tečka-čára-tečka'
    }
  },

  // Materiálové šrafy podle ČSN 01 3406
  materials: {
    'cihla': {
      nazev: 'Pálené cihlové zdivo',
      srafa: 'Rovnoběžné čáry s křížením pod 45°',
      norma: 'ČSN 01 3406',
      oznaceni: 'Ci'
    },
    'beton': {
      nazev: 'Železobeton',
      srafa: 'Husté tečkování s čarami',
      norma: 'ČSN 01 3406',
      oznaceni: 'ŽB'
    },
    'beton_prosty': {
      nazev: 'Prostý beton',
      srafa: 'Řidší tečkování',
      norma: 'ČSN 01 3406',
      oznaceni: 'B'
    },
    'drevo': {
      nazev: 'Dřevěné konstrukce',
      srafa: 'Rovnoběžné čáry se zakřivením (letokruhy)',
      norma: 'ČSN 01 3406',
      oznaceni: 'D'
    },
    'ocel': {
      nazev: 'Ocelové konstrukce',
      srafa: 'Husté rovnoběžné čáry',
      norma: 'ČSN 01 3406',
      oznaceni: 'S'
    },
    'izolace_tepelna': {
      nazev: 'Tepelná izolace',
      srafa: 'Vlnovka nebo zubatá čára',
      norma: 'ČSN 01 3406',
      oznaceni: 'TI'
    },
    'izolace_hydro': {
      nazev: 'Hydroizolace',
      srafa: 'Černé plné plochy',
      norma: 'ČSN 01 3406',
      oznaceni: 'HI'
    },
    'kamen': {
      nazev: 'Kamenné zdivo',
      srafa: 'Nepravidelné čáry se křižováním',
      norma: 'ČSN 01 3406',
      oznaceni: 'K'
    },
    'pena': {
      nazev: 'Pěnové materiály',
      srafa: 'Malé kroužky',
      norma: 'ČSN 01 3406',
      oznaceni: 'PE'
    }
  },

  // Okna a dveře podle ČSN 01 3420
  openings: {
    'okno_pudorys': {
      nazev: 'Okno v půdorysu',
      popis: 'Dvě rovnoběžné čáry + vysunuté čáry parapetu',
      kotovani: 'šířka/výška(parapet)',
      priklad: '1500/1200(900) = š.1500mm, v.1200mm, parapet 900mm'
    },
    'okno_rez': {
      nazev: 'Okno v řezu',
      popis: 'Profil rámu s vyznačením zasklení',
      kotovani: 'výška parapetu, výška nadpraží'
    },
    'dvere_pudorys': {
      nazev: 'Dveře v půdorysu',
      popis: 'Obdélník s obloukem směru otevření',
      kotovani: 'šířka/výška',
      smer: 'Oblouk ukazuje směr otevírání'
    },
    'okno_francuzske': {
      nazev: 'Francouzské okno',
      popis: 'Okno sahající k podlaze',
      bezpecnost: 'Vyžaduje zábradlí dle ČSN 74 3305'
    }
  },

  // Schodiště podle ČSN 73 4130
  stairs: {
    'schodiste_pudorys': {
      nazev: 'Schodiště v půdorysu',
      popis: 'Rovnoběžné čáry stupňů se šipkou směru výstupu',
      poznamky: 'Šipka směřuje nahoru'
    },
    'schodiste_rez': {
      nazev: 'Schodiště v řezu',
      popis: 'Profil schodišťových ramen a podest',
      kotovani: 'výška stupňů, šířka stupňů'
    }
  },

  // Kótování podle ČSN 01 3420
  dimensioning: {
    'kotovaci_cara': {
      nazev: 'Kótovací čára',
      popis: 'Tenká čára s šipkami na koncích',
      norma: 'ČSN 01 3420',
      jednotky: 'mm (délkové), m (výškové)'
    },
    'pomocna_cara': {
      nazev: 'Pomocná čára',
      popis: 'Prodloužení obrysových čar',
      norma: 'ČSN 01 3420',
      presah: '2-3 mm za kótovací čáru'
    },
    'vyskova_kota': {
      nazev: 'Výšková kóta',
      popis: 'Absolutní výška v metrech',
      format: '±0,000',
      reference: 'Úroveň přízemí = ±0,000'
    },
    'kacena': {
      nazev: 'Kačena (výšková kóta)',
      popis: 'Výšková kóta v řezu',
      format: 'Číslo v rámečku nebo se šipkou'
    }
  },

  // Technické instalace
  installations: {
    'voda_studena': {
      nazev: 'Studená voda',
      znacka: 'SV nebo modrá čára',
      norma: 'ČSN 06 0830'
    },
    'voda_tepla': {
      nazev: 'Teplá voda',
      znacka: 'TV nebo červená čára',
      norma: 'ČSN 06 0830'
    },
    'kanalizace': {
      nazev: 'Kanalizace',
      znacka: 'Čárkovaná nebo dvojitá čára',
      norma: 'ČSN 06 0830'
    },
    'plyn': {
      nazev: 'Plynovodní přípojka',
      znacka: 'Žlutá čára s označením G',
      norma: 'ČSN 38 6411'
    },
    'elektro_nn': {
      nazev: 'Nízké napětí',
      znacka: 'Plná čára s označením počtu vodičů',
      norma: 'ČSN 33 0165'
    },
    'telefon': {
      nazev: 'Telekomunikace',
      znacka: 'Čárkovaná čára s T',
      norma: 'ČSN 33 0165'
    }
  },

  // Obecné značky
  general: {
    'sever': {
      nazev: 'Orientace severu',
      znacka: 'Šipka označená S nebo N',
      povinnost: 'Povinné v půdorysech'
    },
    'rez_oznaceni': {
      nazev: 'Označení řezu',
      znacka: 'Čára s písmeny na koncích (A-A, B-B)',
      smer: 'Šipky ukazují směr pohledu'
    },
    'detail_oznaceni': {
      nazev: 'Označení detailu',
      znacka: 'Kroužek s číslem nebo písmenem',
      reference: 'Odkaz na list s detailem'
    },
    'mira_meritko': {
      nazev: 'Grafické měřítko',
      popis: 'Grafické znázornění skutečných rozměrů',
      pouziti: 'Pro kontrolu správnosti tisku'
    }
  }
};

// Export jednotlivých kategorií pro snadnější přístup
export const lineTypes = symbolDatabase.lines;
export const materialHatching = symbolDatabase.materials;
export const windowsDoors = symbolDatabase.openings;
export const stairSymbols = symbolDatabase.stairs;
export const dimensioningSymbols = symbolDatabase.dimensioning;
export const installationSymbols = symbolDatabase.installations;
export const generalSymbols = symbolDatabase.general;

// Funkce pro vyhledávání symbolů
export function findSymbolByKeyword(keyword: string, category?: string) {
  const results = [];
  const searchTerm = keyword.toLowerCase();
  
  for (const [categoryName, categoryData] of Object.entries(symbolDatabase)) {
    if (category && categoryName !== category) continue;
    
    for (const [symbolKey, symbolData] of Object.entries(categoryData as any)) {
      if (
        symbolKey.includes(searchTerm) ||
        symbolData.nazev?.toLowerCase().includes(searchTerm) ||
        symbolData.popis?.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          category: categoryName,
          key: symbolKey,
          ...symbolData
        });
      }
    }
  }
  
  return results;
}

// Funkce pro získání všech symbolů v kategorii
export function getSymbolsByCategory(category: string) {
  return symbolDatabase[category as keyof typeof symbolDatabase] || {};
}

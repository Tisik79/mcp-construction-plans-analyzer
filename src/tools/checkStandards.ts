interface CheckStandardsArgs {
  element: string;
  standardType?: 'kresleni' | 'konstrukce' | 'materialy' | 'bezpecnost';
}

interface StandardCheck {
  norma: string;
  popis: string;
  pozadavky: string[];
  doporuceni: string[];
  splneno?: boolean;
  poznamky?: string;
}

export async function checkStandards(args: CheckStandardsArgs) {
  const { element, standardType } = args;
  
  const checks = await performStandardsCheck(element, standardType);
  
  return {
    content: [
      {
        type: 'text',
        text: generateStandardsReport(element, checks),
      },
    ],
  };
}

async function performStandardsCheck(element: string, standardType?: string): Promise<StandardCheck[]> {
  const elementLower = element.toLowerCase();
  const checks: StandardCheck[] = [];
  
  // Databáze kontrolních bodů podle českých norem
  const standardsDatabase = getStandardsDatabase();
  
  for (const [keyword, standardInfo] of Object.entries(standardsDatabase)) {
    if (elementLower.includes(keyword) || keyword.includes(elementLower)) {
      if (!standardType || standardInfo.kategorie === standardType) {
        checks.push(standardInfo);
      }
    }
  }
  
  // Pokud nebyl nalezen specifický standard, přidáme obecné kontroly
  if (checks.length === 0) {
    checks.push(getGeneralStandards(standardType));
  }
  
  return checks;
}

function getStandardsDatabase(): { [key: string]: StandardCheck & { kategorie: string } } {
  return {
    // Kreslení výkresů
    'výkres': {
      norma: 'ČSN 01 3420',
      popis: 'Výkresy pozemních staveb - Kreslení výkresů stavební části',
      kategorie: 'kresleni',
      pozadavky: [
        'Jednotná tloušťka čar podle normy',
        'Správné měřítko a jeho označení',
        'Úplná legenda materiálů',
        'Kompletní kótování',
        'Označení řezů a pohledů'
      ],
      doporuceni: [
        'Použití standardních formátů A0-A4',
        'Umístění hlavního pohledu vlevo',
        'Konzistentní použití šraf',
        'Čitelnost všech popisů'
      ]
    },
    
    'půdorys': {
      norma: 'ČSN 01 3420',
      popis: 'Kreslení půdorysů podle české normy',
      kategorie: 'kresleni',
      pozadavky: [
        'Řezová rovina ve výšce 1.0-1.5 m',
        'Silné čáry pro stěny v řezu',
        'Označení místností číslováním',
        'Tabulka místností s plochami',
        'Označení směru severu',
        'Kótování v milimetrech'
      ],
      doporuceni: [
        'Měřítko 1:50 pro obytné budovy',
        'Vyznačení polohy řezů',
        'Označení materiálů šrafami',
        'Výškové kóty v metrech'
      ]
    },

    'řez': {
      norma: 'ČSN 01 3420',
      popis: 'Kreslení svislých řezů',
      kategorie: 'kresleni',
      pozadavky: [
        'Řezová rovina vedená schodištěm',
        'Výškové kóty od ±0,000',
        'Skladby konstrukcí',
        'Označení všech úrovní',
        'Materiálové šrafy'
      ],
      doporuceni: [
        'Zakreslení terénu',
        'Označení konstrukčních výšek',
        'Detail napojení konstrukcí',
        'Izolace a hydroizolace'
      ]
    },

    // Konstrukce
    'stěna': {
      norma: 'ČSN 73 0540',
      popis: 'Tepelná ochrana budov',
      kategorie: 'konstrukce',
      pozadavky: [
        'Minimální tloušťka dle účelu',
        'Tepelně technické vlastnosti',
        'Požární odolnost',
        'Akustické vlastnosti',
        'Statické posouzení'
      ],
      doporuceni: [
        'Kontrola tepelných mostů',
        'Paropropustnost konstrukce',
        'Životnost materiálů',
        'Ekonomická optimalizace'
      ]
    },

    'okno': {
      norma: 'ČSN 74 3305',
      popis: 'Ochranná zábradlí',
      kategorie: 'konstrukce',
      pozadavky: [
        'Minimální rozměry otvorů',
        'Tepelně technické vlastnosti',
        'Bezpečnostní požadavky',
        'Označení kótami šířka/výška(parapet)',
        'Zábradlí u francouzských oken'
      ],
      doporuceni: [
        'Orientace oken ke světovým stranám',
        'Poměr oken k podlahové ploše',
        'Zasklení dle energetických požadavků',
        'Protisluneční ochrana'
      ]
    },

    'schodiště': {
      norma: 'ČSN 73 4130',
      popis: 'Schodiště a šikmé rampy',
      kategorie: 'konstrukce',
      pozadavky: [
        'Minimální šířka 900 mm pro obytné budovy',
        'Výška stupně max. 190 mm',
        'Šířka stupně min. 250 mm',
        'Zábradlí výšky min. 1000 mm',
        'Osvětlení schodiště'
      ],
      doporuceni: [
        'Optimální poměr výška/šířka stupně',
        'Materiál neklouzavý',
        'Ergonomické navržení',
        'Dostatečná únosnost'
      ]
    },

    // Materiály
    'beton': {
      norma: 'ČSN EN 206-1',
      popis: 'Specifikace betonu',
      kategorie: 'materialy',
      pozadavky: [
        'Specifikace pevnostní třídy',
        'Označení expozičních tříd',
        'Maximální velikost kameniva',
        'Konzistence betonu',
        'Chloridová třída'
      ],
      doporuceni: [
        'Volba vhodného typu cementu',
        'Přísady pro zlepšení vlastností',
        'Kontrola kvality dodávky',
        'Technologie zpracování'
      ]
    },

    'zdivo': {
      norma: 'ČSN EN 1996-1-1',
      popis: 'Navrhování zděných konstrukcí',
      kategorie: 'materialy',
      pozadavky: [
        'Pevnost zdících prvků',
        'Kvalita malty',
        'Způsob zdění',
        'Statické posouzení',
        'Tepelně technické vlastnosti'
      ],
      doporuceni: [
        'Správné ukládání zdících prvků',
        'Kvalitní spárování',
        'Ochrana proti vlhkosti',
        'Detaily napojení konstrukcí'
      ]
    },

    // Bezpečnost
    'požární': {
      norma: 'ČSN 73 0802',
      popis: 'Požární bezpečnost staveb',
      kategorie: 'bezpecnost',
      pozadavky: [
        'Požární úseky a jejich velikost',
        'Únikové cesty',
        'Požární odolnost konstrukcí',
        'Odstupové vzdálenosti',
        'Zdroje požární vody'
      ],
      doporuceni: [
        'Použití nehořlavých materiálů',
        'EPS - elektronická požární signalizace',
        'Hasicí přístroje',
        'Požární řády'
      ]
    },

    'bezbariérovost': {
      norma: 'Vyhláška 398/2009 Sb.',
      popis: 'Obecné technické požadavky zabezpečující bezbariérové užívání staveb',
      kategorie: 'bezpecnost',
      pozadavky: [
        'Šířka komunikací min. 1500 mm',
        'Rampy max. sklon 8.33%',
        'Výtahy s rozměry kabiny min. 1100×1400 mm',
        'Dveře min. šířka 800 mm',
        'Označení pro zrakově postižené'
      ],
      doporuceni: [
        'Kontrastní označení překážek',
        'Dostatečné osvětlení',
        'Protiskluzné povrchy',
        'Orientační systém'
      ]
    }
  };
}

function getGeneralStandards(standardType?: string): StandardCheck {
  const generalStandards: { [key: string]: StandardCheck } = {
    'kresleni': {
      norma: 'ČSN 01 3420',
      popis: 'Obecné požadavky na výkresy pozemních staveb',
      pozadavky: [
        'Dodržení normových formátů',
        'Správná tloušťka čar',
        'Kompletní kótování',
        'Legenda materiálů'
      ],
      doporuceni: [
        'Použití CAD standardů',
        'Konzistentní styl kreslení',
        'Přehlednost výkresu'
      ]
    },
    'konstrukce': {
      norma: 'ČSN 73 série',
      popis: 'Obecné konstrukční požadavky',
      pozadavky: [
        'Statické posouzení',
        'Tepelně technické vlastnosti',
        'Požární bezpečnost',
        'Životnost konstrukce'
      ],
      doporuceni: [
        'Ekonomická optimalizace',
        'Udržitelnost materiálů',
        'Technologičnost řešení'
      ]
    }
  };

  return generalStandards[standardType || 'kresleni'] || generalStandards['kresleni'];
}

function generateStandardsReport(element: string, checks: StandardCheck[]): string {
  let report = `# Kontrola souladu s českými normami ČSN\n\n`;
  report += `**Kontrolovaný prvek:** ${element}\n\n`;

  for (const check of checks) {
    report += `## ${check.norma}\n`;
    report += `${check.popis}\n\n`;

    report += `### Požadavky normy\n`;
    for (const pozadavek of check.pozadavky) {
      report += `- [ ] ${pozadavek}\n`;
    }
    report += `\n`;

    report += `### Doporučení\n`;
    for (const doporuceni of check.doporuceni) {
      report += `- 💡 ${doporuceni}\n`;
    }
    report += `\n`;

    if (check.poznamky) {
      report += `### Poznámky\n${check.poznamky}\n\n`;
    }

    report += `---\n\n`;
  }

  report += `## Užitečné odkazy\n`;
  report += `- [Úřad pro technickou normalizaci](https://www.unmz.cz/)\n`;
  report += `- [České technické normy](https://www.technicke-normy-csn.cz/)\n`;
  report += `- [Stavební zákon a vyhlášky](https://www.mmr.cz/)\n`;
  
  return report;
}

// Kontrolní seznamy pro systematickou analýzu konstrukčních plánů

export const analysisChecklist = {
  // Obecný kontrolní seznam pro všechny typy výkresů
  general: {
    nazev: 'Obecné požadavky na výkresy',
    norma: 'ČSN 01 3420',
    body: [
      {
        id: 'G001',
        popis: 'Formát výkresu odpovídá normě (A0-A4)',
        kategorie: 'format',
        kriticky: true,
        kontrola: 'Vizuální kontrola rozměrů'
      },
      {
        id: 'G002', 
        popis: 'Měřítko je uvedeno a správné',
        kategorie: 'meritko',
        kriticky: true,
        kontrola: 'Ověření v razítku a kontrolním měřítku'
      },
      {
        id: 'G003',
        popis: 'Legenda materiálů je přítomna a úplná',
        kategorie: 'legenda',
        kriticky: true,
        kontrola: 'Porovnání použitých šraf s legendou'
      },
      {
        id: 'G004',
        popis: 'Razítko obsahuje všechny povinné údaje',
        kategorie: 'razitko',
        kriticky: true,
        kontrola: 'Projektant, datum, číslo výkresu, stupeň'
      },
      {
        id: 'G005',
        popis: 'Čáry mají správnou tloušťku podle normy',
        kategorie: 'cary',
        kriticky: false,
        kontrola: 'Silné čáry pro řez, tenké pro pohled'
      },
      {
        id: 'G006',
        popis: 'Výkres je čitelný a přehledný',
        kategorie: 'citelnost',
        kriticky: false,
        kontrola: 'Subjektivní hodnocení'
      }
    ]
  },

  // Kontrolní seznam specifický pro půdorysy
  floorPlan: {
    nazev: 'Půdorys podlaží',
    norma: 'ČSN 01 3420',
    body: [
      {
        id: 'P001',
        popis: 'Označení místností číslováním',
        kategorie: 'mistnosti',
        kriticky: true,
        kontrola: 'Každá místnost má číslo'
      },
      {
        id: 'P002',
        popis: 'Tabulka místností je vyplněna',
        kategorie: 'tabulka',
        kriticky: true,
        kontrola: 'Číslo, název, plocha, podlaha, stěny, strop'
      },
      {
        id: 'P003',
        popis: 'Označení směru severu',
        kategorie: 'orientace',
        kriticky: true,
        kontrola: 'Šipka označená S nebo N'
      },
      {
        id: 'P004',
        popis: 'Kótování je úplné a správné',
        kategorie: 'kotovani',
        kriticky: true,
        kontrola: 'Všechny rozměry, kontrolní součty'
      },
      {
        id: 'P005',
        popis: 'Označení řezů a pohledů',
        kategorie: 'rezy',
        kriticky: true,
        kontrola: 'Písmena řezů (A-A, B-B) se šipkami'
      },
      {
        id: 'P006',
        popis: 'Okna správně zakótovaná',
        kategorie: 'okna',
        kriticky: true,
        kontrola: 'Formát: šířka/výška(parapet)'
      },
      {
        id: 'P007',
        popis: 'Dveře se směrem otevírání',
        kategorie: 'dvere',
        kriticky: false,
        kontrola: 'Oblouk směru otevření'
      },
      {
        id: 'P008',
        popis: 'Schodiště s označením směru',
        kategorie: 'schodiste',
        kriticky: false,
        kontrola: 'Šipka směřující nahoru'
      },
      {
        id: 'P009',
        popis: 'Tloušťky stěn odpovídají konstrukci',
        kategorie: 'steny',
        kriticky: false,
        kontrola: 'Porovnání s konstrukční částí'
      },
      {
        id: 'P010',
        popis: 'Označení stěn kroužky s čísly',
        kategorie: 'oznaceni_sten',
        kriticky: false,
        kontrola: 'Odkaz do výkazu stěn'
      }
    ]
  },

  // Kontrolní seznam pro řezy
  section: {
    nazev: 'Svislý řez',
    norma: 'ČSN 01 3420',
    body: [
      {
        id: 'R001',
        popis: 'Řezová rovina vedena schodištěm',
        kategorie: 'pozice_rezu',
        kriticky: true,
        kontrola: 'Řez prochází schodištěm a hlavními prostory'
      },
      {
        id: 'R002',
        popis: 'Výškové kóty od ±0,000',
        kategorie: 'vyskove_koty',
        kriticky: true,
        kontrola: 'Všechny úrovně zakótované v metrech'
      },
      {
        id: 'R003',
        popis: 'Skladby konstrukcí specifikovány',
        kategorie: 'skladby',
        kriticky: true,
        kontrola: 'Podlahy, stěny, střecha s materiály'
      },
      {
        id: 'R004',
        popis: 'Označení všech úrovní',
        kategorie: 'urovne',
        kriticky: true,
        kontrola: 'Úroveň podlah, stropů, atiky'
      },
      {
        id: 'R005',
        popis: 'Materiálové šrafy použity správně',
        kategorie: 'materialy',
        kriticky: false,
        kontrola: 'Podle legendy materiálů'
      },
      {
        id: 'R006',
        popis: 'Schodiště správně zakótováno',
        kategorie: 'schodiste_rez',
        kriticky: false,
        kontrola: 'Výška a šířka stupňů'
      },
      {
        id: 'R007',
        popis: 'Izolace a hydroizolace vyznačeny',
        kategorie: 'izolace',
        kriticky: false,
        kontrola: 'TI, HI podle šraf'
      },
      {
        id: 'R008',
        popis: 'Terén a okolí zakresleno',
        kategorie: 'teren',
        kriticky: false,
        kontrola: 'Původní a upravený terén'
      }
    ]
  },

  // Kontrolní seznam pro pohledy
  elevation: {
    nazev: 'Pohled na průčelí',
    norma: 'ČSN 01 3420',
    body: [
      {
        id: 'V001',
        popis: 'Označení podle světových stran',
        kategorie: 'oznaceni',
        kriticky: true,
        kontrola: 'Pohled od jihu, západní pohled, atd.'
      },
      {
        id: 'V002',
        popis: 'Všechny otvory zakresleny',
        kategorie: 'otvory',
        kriticky: true,
        kontrola: 'Okna, dveře, větrací otvory'
      },
      {
        id: 'V003',
        popis: 'Materiály fasády označeny',
        kategorie: 'fasada',
        kriticky: false,
        kontrola: 'Omítka, obklad, barvy'
      },
      {
        id: 'V004',
        popis: 'Střešní konstrukce kompletní',
        kategorie: 'strecha',
        kriticky: false,
        kontrola: 'Krytina, okapy, svody'
      },
      {
        id: 'V005',
        popis: 'Terén a okolí',
        kategorie: 'okoli',
        kriticky: false,
        kontrola: 'Přilehlé objekty, zeleň'
      }
    ]
  },

  // Kontrolní seznam pro detaily
  detail: {
    nazev: 'Konstrukční detail',
    norma: 'ČSN 01 3420',
    body: [
      {
        id: 'D001',
        popis: 'Velké měřítko (1:10, 1:5, 1:2)',
        kategorie: 'meritko_detail',
        kriticky: true,
        kontrola: 'Dostatečná podrobnost'
      },
      {
        id: 'D002',
        popis: 'Všechny materiály specifikovány',
        kategorie: 'materialy_detail',
        kriticky: true,
        kontrola: 'Tloušťky, vlastnosti, značky'
      },
      {
        id: 'D003',
        popis: 'Napojení konstrukcí řešeno',
        kategorie: 'napojeni',
        kriticky: true,
        kontrola: 'Kotvení, spoje, těsnění'
      },
      {
        id: 'D004',
        popis: 'Rozměry a tolerance uvedeny',
        kategorie: 'rozmery_detail',
        kriticky: true,
        kontrola: 'Přesné rozměry pro realizaci'
      },
      {
        id: 'D005',
        popis: 'Tepelné mosty ošetřeny',
        kategorie: 'tepelne_mosty',
        kriticky: false,
        kontrola: 'Přerušení tepelných mostů'
      }
    ]
  },

  // Kontrolní seznam pro situace
  sitePlan: {
    nazev: 'Situační plán',
    norma: 'ČSN 01 3420',
    body: [
      {
        id: 'S001',
        popis: 'Umístění objektu na pozemku',
        kategorie: 'umisteni',
        kriticky: true,
        kontrola: 'Souřadnice, orientace'
      },
      {
        id: 'S002',
        popis: 'Odstupy od hranic pozemku',
        kategorie: 'odstupy',
        kriticky: true,
        kontrola: 'Minimální vzdálenosti dle stavebního zákona'
      },
      {
        id: 'S003',
        popis: 'Zpevněné plochy zakótované',
        kategorie: 'plochy',
        kriticky: true,
        kontrola: 'Příjezdy, chodníky, terasy'
      },
      {
        id: 'S004',
        popis: 'Přípojky inženýrských sítí',
        kategorie: 'pripojky',
        kriticky: true,
        kontrola: 'Elektro, voda, plyn, kanalizace'
      },
      {
        id: 'S005',
        popis: 'Terénní úpravy vyznačeny',
        kategorie: 'teren_situace',
        kriticky: false,
        kontrola: 'Vrstevnice, svahy, odvodnění'
      }
    ]
  }
};

// Funkce pro získání kontrolního seznamu podle typu výkresu
export function getChecklistByType(type: string) {
  const checklists: { [key: string]: any } = {
    'pudorys': analysisChecklist.floorPlan,
    'rez': analysisChecklist.section,
    'pohled': analysisChecklist.elevation,
    'detail': analysisChecklist.detail,
    'situace': analysisChecklist.sitePlan
  };
  
  const specificChecklist = checklists[type];
  const generalChecklist = analysisChecklist.general;
  
  if (!specificChecklist) {
    return generalChecklist;
  }
  
  // Sloučení obecného a specifického checklistu
  return {
    nazev: specificChecklist.nazev,
    norma: specificChecklist.norma,
    body: [...generalChecklist.body, ...specificChecklist.body]
  };
}

// Funkce pro kontrolu kritických bodů
export function getCriticalChecks(type?: string) {
  const checklist = type ? getChecklistByType(type) : analysisChecklist.general;
  return checklist.body.filter((item: any) => item.kriticky);
}

// Funkce pro generování kontrolního reportu
export function generateChecklistReport(checkedItems: { [key: string]: boolean }, type?: string) {
  const checklist = type ? getChecklistByType(type) : analysisChecklist.general;
  const totalItems = checklist.body.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionRate = Math.round((checkedCount / totalItems) * 100);
  
  const criticalItems = checklist.body.filter((item: any) => item.kriticky);
  const criticalChecked = criticalItems.filter((item: any) => checkedItems[item.id]).length;
  const criticalRate = Math.round((criticalChecked / criticalItems.length) * 100);
  
  return {
    nazev: checklist.nazev,
    norma: checklist.norma,
    celkem_bodu: totalItems,
    splneno_bodu: checkedCount,
    mira_splneni: completionRate,
    kriticke_celkem: criticalItems.length,
    kriticke_splneno: criticalChecked,
    kriticka_mira: criticalRate,
    hodnoceni: getQualityGrade(completionRate, criticalRate)
  };
}

// Funkce pro hodnocení kvality
function getQualityGrade(overall: number, critical: number) {
  if (critical < 100) {
    return {
      stupen: 'NEVYHOVUJÍCÍ',
      barva: 'red',
      popis: 'Nejsou splněny všechny kritické požadavky'
    };
  }
  
  if (overall >= 90) {
    return {
      stupen: 'VÝBORNÁ',
      barva: 'green',
      popis: 'Projekt splňuje všechny požadavky na vysoké úrovni'
    };
  }
  
  if (overall >= 75) {
    return {
      stupen: 'DOBRÁ',
      barva: 'lightgreen',
      popis: 'Projekt splňuje většinu požadavků'
    };
  }
  
  if (overall >= 60) {
    return {
      stupen: 'PŘIJATELNÁ',
      barva: 'yellow',
      popis: 'Projekt vyžaduje doplnění některých údajů'
    };
  }
  
  return {
    stupen: 'NEDOSTATEČNÁ',
    barva: 'orange',
    popis: 'Projekt vyžaduje značné doplnění'
  };
}

// Export dalších užitečných konstant
export const drawingTypes = {
  'pudorys': 'Půdorys podlaží',
  'rez': 'Svislý řez',
  'pohled': 'Pohled na průčelí', 
  'detail': 'Konstrukční detail',
  'situace': 'Situační plán'
};

export const commonScales = {
  'details': ['1:1', '1:2', '1:5', '1:10'],
  'plans': ['1:50', '1:100'],
  'elevations': ['1:100', '1:200'],
  'sites': ['1:200', '1:500', '1:1000']
};

export const czechStandards = {
  'ČSN 01 3420': 'Výkresy pozemních staveb - Kreslení výkresů stavební části',
  'ČSN ISO 128-23': 'Technické výkresy - Typy čar',
  'ČSN 01 3406': 'Označování materiálů na výkresech',
  'ČSN 73 4130': 'Schodiště a šikmé rampy',
  'ČSN 73 0540': 'Tepelná ochrana budov',
  'ČSN 73 0802': 'Požární bezpečnost staveb'
};

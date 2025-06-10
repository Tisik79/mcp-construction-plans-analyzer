interface GenerateReportArgs {
  planData: any;
  reportType?: 'kompletni' | 'souhrn' | 'kontrolni';
}

interface ReportSection {
  nazev: string;
  obsah: string;
  priorita: number;
}

export async function generateReport(args: GenerateReportArgs) {
  const { planData, reportType = 'kompletni' } = args;
  
  try {
    const report = await createReport(planData, reportType);
    
    return {
      content: [
        {
          type: 'text',
          text: report,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Chyba při generování zprávy: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
}

async function createReport(planData: any, reportType: string): Promise<string> {
  const timestamp = new Date().toLocaleString('cs-CZ');
  
  switch (reportType) {
    case 'kompletni':
      return generateCompleteReport(planData, timestamp);
    case 'souhrn':
      return generateSummaryReport(planData, timestamp);
    case 'kontrolni':
      return generateChecklistReport(planData, timestamp);
    default:
      throw new Error(`Neznámý typ zprávy: ${reportType}`);
  }
}

function generateCompleteReport(planData: any, timestamp: string): string {
  return `# Kompletní analýza konstrukčního plánu

**Datum vytvoření:** ${timestamp}

## 📋 Základní informace

${extractBasicInfo(planData)}

## 🔍 Systematická analýza

${extractSystematicAnalysis(planData)}

## 🏗️ Identifikované konstrukční prvky

${extractIdentifiedElements(planData)}

## 📐 Rozměrová analýza

${extractDimensionalAnalysis(planData)}

## 📏 Měřítkové převody

${generateScaleConversions(planData)}

## ⚖️ Soulad s normami ČSN

${extractStandardsCompliance(planData)}

## ✅ Kontrolní seznam

${generateChecklistSection(planData)}

## 🔧 Doporučení a návrhy

${extractRecommendations(planData)}

## 📊 Souhrn problémů

${generateProblemSummary(planData)}

## 📎 Přílohy

${generateAttachments(planData)}

---
*Zpráva vygenerována automaticky pomocí Construction Plans Analyzer MCP*
`;
}

function generateSummaryReport(planData: any, timestamp: string): string {
  return `# Souhrnná zpráva - Analýza konstrukčního plánu

**Datum:** ${timestamp}

## 🎯 Klíčové poznatky

${extractKeyFindings(planData)}

## ⚠️ Kritické body

${extractCriticalIssues(planData)}

## ✅ Splněné požadavky

${extractCompletedRequirements(planData)}

## 🔴 Nesplněné požadavky

${extractFailedRequirements(planData)}

## 💡 Hlavní doporučení

${extractTopRecommendations(planData)}

## 📈 Hodnocení kvality

${generateQualityAssessment(planData)}

---
*Souhrnná zpráva - Construction Plans Analyzer MCP*
`;
}

function generateChecklistReport(planData: any, timestamp: string): string {
  return `# Kontrolní seznam - Konstrukční plán

**Datum kontroly:** ${timestamp}

## 📋 Formální náležitosti

${generateFormalChecklist(planData)}

## 🏗️ Konstrukční kontrola

${generateConstructionChecklist(planData)}

## 📐 Rozměrová kontrola

${generateDimensionalChecklist(planData)}

## ⚖️ Normová kontrola

${generateStandardsChecklist(planData)}

## 🏁 Celkové hodnocení

${generateOverallAssessment(planData)}

## 📝 Akční plán

${generateActionPlan(planData)}

---
*Kontrolní zpráva - Construction Plans Analyzer MCP*
`;
}

// Pomocné funkce pro extrakci dat

function extractBasicInfo(planData: any): string {
  return `
- **Typ výkresu:** ${planData?.typ_vykresu || 'Neurčeno'}
- **Měřítko:** ${planData?.meritko || 'Neurčeno'}
- **Formát:** ${planData?.format || 'Neurčeno'}
- **Projektant:** ${planData?.projektant || 'Neurčeno'}
- **Datum vytvoření:** ${planData?.datum || 'Neurčeno'}
`;
}

function extractSystematicAnalysis(planData: any): string {
  return planData?.analyza || `
Systematická analýza nebyla provedena. Doporučujeme použít nástroj \`analyze_plan\` 
pro podrobnou analýzu konstrukčního plánu.
`;
}

function extractIdentifiedElements(planData: any): string {
  if (!planData?.identifikovane_prvky?.length) {
    return 'Žádné konstrukční prvky nebyly automaticky identifikovány.';
  }
  
  return planData.identifikovane_prvky
    .map((prvek: any) => `### ${prvek.nazev}\n- **Typ:** ${prvek.typ}\n- **Popis:** ${prvek.popis}\n`)
    .join('\n');
}

function extractDimensionalAnalysis(planData: any): string {
  return planData?.rozmery || `
Pro rozměrovou analýzu použijte nástroj \`calculate_dimensions\` s konkrétními 
rozměry z výkresu.
`;
}

function generateScaleConversions(planData: any): string {
  const scale = planData?.meritko || '1:50';
  
  return `
### Rychlé převody pro měřítko ${scale}

| Rozměr na výkrese | Skutečný rozměr |
|------------------|-----------------|
| 1 cm             | ${getScaleMultiplier(scale)} cm |
| 2 cm             | ${getScaleMultiplier(scale) * 2} cm |
| 5 cm             | ${getScaleMultiplier(scale) * 5} cm |
| 10 cm            | ${getScaleMultiplier(scale) * 10} cm |
`;
}

function extractStandardsCompliance(planData: any): string {
  return planData?.normy || `
Kontrola souladu s normami nebyla provedena. Použijte nástroj \`check_standards\` 
pro ověření konkrétních konstrukčních prvků.
`;
}

function generateChecklistSection(planData: any): string {
  if (!planData?.kontrolni_seznam?.length) {
    return 'Kontrolní seznam nebyl vygenerován.';
  }
  
  return planData.kontrolni_seznam
    .map((item: any) => `- [${item.splneno ? 'x' : ' '}] ${item.popis}`)
    .join('\n');
}

function extractRecommendations(planData: any): string {
  if (!planData?.doporuceni?.length) {
    return 'Žádná specifická doporučení nebyla vygenerována.';
  }
  
  return planData.doporuceni
    .map((item: string) => `- ${item}`)
    .join('\n');
}

function generateProblemSummary(planData: any): string {
  const problems = [];
  
  if (!planData?.meritko) {
    problems.push('❌ Měřítko není specifikováno');
  }
  
  if (!planData?.legenda) {
    problems.push('❌ Chybí legenda materiálů');
  }
  
  if (!planData?.kotovani) {
    problems.push('⚠️ Kótování není kompletní');
  }
  
  if (problems.length === 0) {
    return '✅ Nebyly identifikovány žádné závažné problémy.';
  }
  
  return problems.join('\n');
}

function generateAttachments(planData: any): string {
  return `
- 📄 Originální plán (referenční)
- 📊 Výkaz materiálů
- 📐 Kótovací schéma
- 🔍 Detail problematických míst
- 📋 Kompletní kontrolní seznam
`;
}

// Funkce pro souhrnnou zprávu

function extractKeyFindings(planData: any): string {
  return `
- Typ výkresu: ${planData?.typ_vykresu || 'Neurčeno'}
- Celková kvalita: ${assessOverallQuality(planData)}
- Hlavní problémové oblasti: ${identifyProblemAreas(planData)}
`;
}

function extractCriticalIssues(planData: any): string {
  return '- Žádné kritické problémy nebyly automaticky identifikovány';
}

function extractCompletedRequirements(planData: any): string {
  const completed = planData?.kontrolni_seznam?.filter((item: any) => item.splneno) || [];
  return completed.length > 0 
    ? completed.map((item: any) => `- ✅ ${item.popis}`).join('\n')
    : '- Žádné automaticky kontrolované požadavky nejsou splněny';
}

function extractFailedRequirements(planData: any): string {
  const failed = planData?.kontrolni_seznam?.filter((item: any) => !item.splneno) || [];
  return failed.length > 0 
    ? failed.map((item: any) => `- ❌ ${item.popis}`).join('\n')
    : '- Všechny kontrolované požadavky jsou splněny';
}

function extractTopRecommendations(planData: any): string {
  const recommendations = planData?.doporuceni?.slice(0, 3) || [];
  return recommendations.length > 0
    ? recommendations.map((item: string) => `- 💡 ${item}`).join('\n')
    : '- Použijte nástroje pro detailní analýzu konkrétních prvků';
}

function generateQualityAssessment(planData: any): string {
  const score = calculateQualityScore(planData);
  return `
**Celkové hodnocení:** ${score}/100 bodů

${getQualityGrade(score)}
`;
}

// Funkce pro kontrolní seznam

function generateFormalChecklist(planData: any): string {
  return `
- [ ] Formát výkresu odpovídá normě
- [ ] Měřítko je uvedeno a správné
- [ ] Legenda materiálů je přítomna
- [ ] Razítko a podpis projektanta
- [ ] Datum vytvoření/revize
`;
}

function generateConstructionChecklist(planData: any): string {
  return `
- [ ] Všechny konstrukce jsou zakótované
- [ ] Materiály jsou specifikovány
- [ ] Detaily jsou dostatečně podrobné
- [ ] Napojení konstrukcí je řešeno
`;
}

function generateDimensionalChecklist(planData: any): string {
  return `
- [ ] Kótování je úplné a správné
- [ ] Rozměry se sčítají
- [ ] Výškové kóty jsou uvedeny
- [ ] Tolerancie jsou specifikovány
`;
}

function generateStandardsChecklist(planData: any): string {
  return `
- [ ] Splnění ČSN 01 3420 (kreslení výkresů)
- [ ] Požární bezpečnost dle ČSN 73 0802
- [ ] Tepelná ochrana dle ČSN 73 0540
- [ ] Bezbariérovost dle vyhl. 398/2009
`;
}

function generateOverallAssessment(planData: any): string {
  return `
📊 **Míra splnění:** ${calculateCompletionRate(planData)}%
🎯 **Doporučení:** ${getMainRecommendation(planData)}
⏰ **Priorita:** ${getPriority(planData)}
`;
}

function generateActionPlan(planData: any): string {
  return `
1. **Okamžitě:** Doplnit chybějící základní údaje
2. **Do týdne:** Zkontrolovat kótování a rozměry  
3. **Do měsíce:** Provést komplexní revizi projektu
4. **Průběžně:** Aktualizovat podle připomínek
`;
}

// Pomocné funkce

function getScaleMultiplier(scale: string): number {
  const match = scale.match(/1:(\d+)/);
  return match ? parseInt(match[1], 10) : 50;
}

function assessOverallQuality(planData: any): string {
  const score = calculateQualityScore(planData);
  if (score >= 80) return 'Vysoká';
  if (score >= 60) return 'Střední';
  return 'Nízká';
}

function identifyProblemAreas(planData: any): string {
  return 'Kótování, legenda materiálů';
}

function calculateQualityScore(planData: any): number {
  let score = 50; // Základní skóre
  
  if (planData?.meritko) score += 10;
  if (planData?.legenda) score += 10;
  if (planData?.kotovani) score += 10;
  if (planData?.kontrolni_seznam?.some((item: any) => item.splneno)) score += 20;
  
  return Math.min(score, 100);
}

function getQualityGrade(score: number): string {
  if (score >= 90) return '🏆 Výborná kvalita';
  if (score >= 70) return '✅ Dobrá kvalita';
  if (score >= 50) return '⚠️ Přijatelná kvalita';
  return '❌ Nevyhovující kvalita';
}

function calculateCompletionRate(planData: any): number {
  const items = planData?.kontrolni_seznam || [];
  if (items.length === 0) return 0;
  
  const completed = items.filter((item: any) => item.splneno).length;
  return Math.round((completed / items.length) * 100);
}

function getMainRecommendation(planData: any): string {
  return planData?.doporuceni?.[0] || 'Proveďte kompletní analýzu plánu';
}

function getPriority(planData: any): string {
  const score = calculateQualityScore(planData);
  if (score < 50) return 'Vysoká';
  if (score < 70) return 'Střední';
  return 'Nízká';
}

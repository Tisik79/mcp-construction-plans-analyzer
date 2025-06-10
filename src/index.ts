#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

// Import nástrojů
import { analyzePlan } from './tools/analyzePlan.js';
import { identifySymbols } from './tools/identifySymbols.js';
import { calculateDimensions } from './tools/calculateDimensions.js';
import { checkStandards } from './tools/checkStandards.js';
import { generateReport } from './tools/generateReport.js';

const server = new Server(
  {
    name: 'construction-plans-analyzer',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Registrace nástrojů
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'analyze_plan',
        description: 'Systematická analýza konstrukčního plánu s identifikací všech klíčových prvků podle českých norem ČSN',
        inputSchema: {
          type: 'object',
          properties: {
            planDescription: {
              type: 'string',
              description: 'Popis konstrukčního plánu nebo jeho části pro analýzu',
            },
            planType: {
              type: 'string',
              enum: ['pudorys', 'rez', 'pohled', 'detail', 'situace'],
              description: 'Typ výkresu (půdorys, řez, pohled, detail, situace)',
            },
            scale: {
              type: 'string',
              description: 'Měřítko výkresu (např. 1:50, 1:100)',
            },
          },
          required: ['planDescription'],
        },
      },
      {
        name: 'identify_symbols',
        description: 'Identifikace stavebních značek a symbolů ve výkresu podle českých norem',
        inputSchema: {
          type: 'object',
          properties: {
            symbols: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Seznam značek nebo symbolů k identifikaci',
            },
            category: {
              type: 'string',
              enum: ['konstrukce', 'materialy', 'instalace', 'kotovani', 'obecne'],
              description: 'Kategorie značek pro filtrování',
            },
          },
          required: ['symbols'],
        },
      },
      {
        name: 'calculate_dimensions',
        description: 'Výpočet skutečných rozměrů z kót na výkresu podle měřítka',
        inputSchema: {
          type: 'object',
          properties: {
            drawingDimension: {
              type: 'number',
              description: 'Rozměr naměřený na výkresu (v cm)',
            },
            scale: {
              type: 'string',
              description: 'Měřítko výkresu (např. 1:50, 1:100)',
            },
            unit: {
              type: 'string',
              enum: ['mm', 'cm', 'm'],
              description: 'Požadovaná jednotka výsledku',
              default: 'm',
            },
          },
          required: ['drawingDimension', 'scale'],
        },
      },
      {
        name: 'check_standards',
        description: 'Kontrola souladu s českými normami ČSN pro stavebnictví',
        inputSchema: {
          type: 'object',
          properties: {
            element: {
              type: 'string',
              description: 'Konstrukční prvek nebo řešení ke kontrole',
            },
            standardType: {
              type: 'string',
              enum: ['kresleni', 'konstrukce', 'materialy', 'bezpecnost'],
              description: 'Typ normy ke kontrole',
            },
          },
          required: ['element'],
        },
      },
      {
        name: 'generate_report',
        description: 'Generování strukturované analýzy konstrukčního plánu',
        inputSchema: {
          type: 'object',
          properties: {
            planData: {
              type: 'object',
              description: 'Data z analýzy plánu',
            },
            reportType: {
              type: 'string',
              enum: ['kompletni', 'souhrn', 'kontrolni'],
              description: 'Typ generované zprávy',
              default: 'kompletni',
            },
          },
          required: ['planData'],
        },
      },
    ],
  };
});

// Zpracování volání nástrojů
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'analyze_plan':
        return await analyzePlan(args);
      
      case 'identify_symbols':
        return await identifySymbols(args);
      
      case 'calculate_dimensions':
        return await calculateDimensions(args);
      
      case 'check_standards':
        return await checkStandards(args);
      
      case 'generate_report':
        return await generateReport(args);
      
      default:
        throw new Error(`Neznámý nástroj: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Chyba při vykonávání nástroje ${name}:`, errorMessage);
    
    return {
      content: [
        {
          type: 'text',
          text: `Chyba při vykonávání nástroje ${name}: ${errorMessage}`,
        },
      ],
    };
  }
});

// Spuštění serveru
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('🏗️ Construction Plans Analyzer MCP server úspěšně spuštěn');
    console.error('📋 Dostupné nástroje: analyze_plan, identify_symbols, calculate_dimensions, check_standards, generate_report');
  } catch (error) {
    console.error('❌ Chyba při spuštění serveru:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.error('🔄 Ukončování Construction Plans Analyzer MCP serveru...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('🔄 Ukončování Construction Plans Analyzer MCP serveru...');
  process.exit(0);
});

main().catch((error) => {
  console.error('💥 Kritická chyba při spuštění serveru:', error);
  process.exit(1);
});

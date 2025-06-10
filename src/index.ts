#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
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
        description: 'Systematická analýza konstrukčního plánu s identifikací všech klíčových prvků',
        inputSchema: {
          type: 'object',
          properties: {
            planDescription: {
              type: 'string',
              description: 'Popis konstrukčního plánu nebo jeho části',
            },
            planType: {
              type: 'string',
              enum: ['pudorys', 'rez', 'pohled', 'detail', 'situace'],
              description: 'Typ výkresu',
            },
            scale: {
              type: 'string',
              description: 'Měřítko výkresu (např. 1:50)',
            },
          },
          required: ['planDescription'],
        },
      },
      {
        name: 'identify_symbols',
        description: 'Identifikace stavebních značek a symbolů ve výkresu',
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
              description: 'Kategorie značek',
            },
          },
          required: ['symbols'],
        },
      },
      {
        name: 'calculate_dimensions',
        description: 'Výpočet skutečných rozměrů z kót na výkresu',
        inputSchema: {
          type: 'object',
          properties: {
            drawingDimension: {
              type: 'number',
              description: 'Rozměr naměřený na výkresu (v cm)',
            },
            scale: {
              type: 'string',
              description: 'Měřítko výkresu (např. 1:50)',
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
        description: 'Kontrola souladu s českými normami ČSN',
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
    return {
      content: [
        {
          type: 'text',
          text: `Chyba při vykonávání nástroje ${name}: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
});

// Spuštění serveru
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Construction Plans Analyzer MCP server spuštěn');
}

main().catch((error) => {
  console.error('Chyba při spuštění serveru:', error);
  process.exit(1);
});

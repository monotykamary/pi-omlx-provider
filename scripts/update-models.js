#!/usr/bin/env node

/**
 * Update models list from the OMLX server.
 *
 * Fetches available models from the /v1/models endpoint and
 * replaces models.json with the server's reported model IDs.
 *
 * Usage:
 *   OMLX_API_KEY=your-key node scripts/update-models.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODELS_JSON_PATH = path.join(__dirname, "..", "models.json");

const OMLX_BASE_URL = "http://toms-mac-mini.taild0936.ts.net:8000/v1";

async function fetchModels() {
  const apiKey = process.env.OMLX_API_KEY;
  if (!apiKey) {
    console.error("Error: OMLX_API_KEY environment variable is required");
    process.exit(1);
  }

  const response = await fetch(`${OMLX_BASE_URL}/models`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  const data = await response.json();
  return data.data;
}

function generateModels(modelsFromApi) {
  const models = modelsFromApi.map((model) => ({
    id: model.id,
    name: model.id,
    reasoning: model.id.toLowerCase().includes("thinking") || model.id.toLowerCase().includes("reason"),
    input: ["text"],
    cost: {
      input: 0,
      output: 0,
      cacheRead: 0,
      cacheWrite: 0,
    },
    contextWindow: 131072,
    maxTokens: 32768,
    compat: {
      maxTokensField: "max_completion_tokens",
      thinkingFormat: model.id.toLowerCase().includes("qwen") ? "qwen-chat-template" : undefined,
      supportsDeveloperRole: false,
      supportsStore: false,
    },
  }));

  return models;
}

async function main() {
  console.log("Fetching models from OMLX server...");
  const models = await fetchModels();
  console.log(`Found ${models.length} model(s)`);

  const output = generateModels(models);
  fs.writeFileSync(MODELS_JSON_PATH, JSON.stringify(output, null, 2) + "\n");
  console.log(`✓ Saved ${output.length} models to models.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

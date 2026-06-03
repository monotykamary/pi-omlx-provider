<div align="center">

# 🍎 pi-omlx-provider

**Local Qwen models via MLX on [Apple Silicon](https://developer.apple.com/metal/)**

_Qwen3.6-27B, Qwen3.6-35B — self-hosted over Tailscale for [pi](https://github.com/earendil-works/pi-coding-agent)._

[![pi extension](https://img.shields.io/badge/pi-extension-blueviolet)](https://github.com/earendil-works/pi-coding-agent)
[![license](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

</div>

---

## Models

| Model | Context | Reasoning |
|-------|---------|-----------|
| `Qwen3.6-27B-4bit` | 128K | Yes |
| `Qwen3.6-35B-A3B-4bit` | 128K | Yes |

## Installation

### Option 1: Using `pi install` (Recommended)

Install directly from GitHub:

```bash
pi install https://github.com/monotykamary/pi-omlx-provider
```

Then run pi:
```bash
# Recommended: add your API key to auth.json
# See Authentication section below

pi
```

### Option 2: Manual Clone

1. Clone this repository:
   ```bash
   git clone https://github.com/monotykamary/pi-omlx-provider.git
   cd pi-omlx-provider
   ```

2. Run pi with the extension:
   ```bash
   pi -e /path/to/pi-omlx-provider
   ```

## Authentication

Add to `~/.pi/agent/auth.json`:

```json
{
  "omlx": {
    "type": "api_key",
    "key": "your-omlx-api-key"
  }
}
```

Or set the environment variable:

```bash
export OMLX_API_KEY=your-omlx-api-key
```

## Usage

Run pi with the extension:

```bash
pi -e /path/to/pi-omlx-provider
```

Then use `/model` to select an available model.

## Server Details

- **Base URL:** `http://toms-mac-mini.taild0936.ts.net:8000/v1`
- **API Type:** OpenAI Completions (`openai-completions`)

Models are served via an OpenAI-compatible API over a local Tailscale connection.

## Updating Models

If the available models on your OMLX server change, run:

```bash
OMLX_API_KEY=your-key node scripts/update-models.js
```

This fetches the current model list from `/v1/models` and prints an updated `models.json`.

## License

MIT

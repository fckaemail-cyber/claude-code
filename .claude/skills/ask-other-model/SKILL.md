---
name: ask-other-model
description: Consult another AI model (OpenAI GPT / Codex, or xAI Grok) and relay its answer. Use when the user wants a second opinion, wants to compare models, or wants GPT or Grok to handle a sub-question while Claude orchestrates.
---

# Ask another model

Lets Claude work *between* models. Claude stays the orchestrator, calls out to
OpenAI (GPT / Codex) or xAI (Grok) for a sub-question, then brings the answer
back into the conversation.

## Requirements

- `OPENAI_API_KEY` set in the environment (to use GPT).
- `XAI_API_KEY` set in the environment (to use Grok).
- Outbound network access to `api.openai.com` and/or `api.x.ai`. The "Trusted"
  network policy allows this.

Keys are read from the environment, never hardcoded here.

## Usage

Run the helper script in this folder:

```bash
python3 .claude/skills/ask-other-model/ask.py gpt  "Your question here"
python3 .claude/skills/ask-other-model/ask.py grok "Your question here"
```

Optionally pass a model name as a third argument to override the default:

```bash
python3 .claude/skills/ask-other-model/ask.py gpt "Explain this diff" gpt-4o-mini
```

Defaults: `gpt` -> `gpt-5.5`, `grok` -> `grok-4`. Pass a third argument to use a
different model you have access to, e.g. `gpt-5.4`.

## How to present results

Print the returned answer to the user, clearly labelled (e.g. "**GPT says:**"
or "**Grok says:**"), then continue orchestrating. When comparing models, run
the script once per model and summarize the differences.

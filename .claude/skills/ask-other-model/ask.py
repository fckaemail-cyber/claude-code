#!/usr/bin/env python3
"""Consult another AI model (OpenAI GPT / xAI Grok) and print its answer.

Usage:
    python3 ask.py <gpt|grok> "your question" [model]

Reads the API key from the environment (OPENAI_API_KEY for gpt,
XAI_API_KEY for grok). Prints the model's reply to stdout.
"""
import json
import os
import sys
import urllib.error
import urllib.request

# provider -> (endpoint, env var holding the key, default model)
PROVIDERS = {
    "gpt": ("https://api.openai.com/v1/chat/completions", "OPENAI_API_KEY", "gpt-4o"),
    "grok": ("https://api.x.ai/v1/chat/completions", "XAI_API_KEY", "grok-2-latest"),
}


def main() -> None:
    if len(sys.argv) < 3:
        sys.exit('usage: ask.py <gpt|grok> "your question" [model]')

    provider = sys.argv[1].lower()
    question = sys.argv[2]
    if provider not in PROVIDERS:
        sys.exit(f"unknown provider {provider!r}; choose from {list(PROVIDERS)}")

    url, key_env, default_model = PROVIDERS[provider]
    model = sys.argv[3] if len(sys.argv) > 3 else default_model

    api_key = os.environ.get(key_env)
    if not api_key:
        sys.exit(f"{key_env} is not set in this environment")

    payload = json.dumps(
        {"model": model, "messages": [{"role": "user", "content": question}]}
    ).encode()
    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.load(resp)
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code} from {provider}: {e.read().decode(errors='replace')}")
    except urllib.error.URLError as e:
        sys.exit(f"could not reach {provider} ({url}): {e.reason}")

    print(data["choices"][0]["message"]["content"])


if __name__ == "__main__":
    main()

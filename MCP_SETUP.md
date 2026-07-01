# MCP Setup

This project connects Claude Code to external services via MCP servers,
configured in [`.mcp.json`](./.mcp.json).

## Firecrawl (web scraping / crawling)

Lets Claude scrape web pages and crawl sites via the
[Firecrawl](https://firecrawl.dev) API.

### 1. Get an API key

Sign up at https://firecrawl.dev and copy your API key (it starts with `fc-`).

### 2. Add the key as an environment variable — do NOT paste it into this repo

The `.mcp.json` reads the key from an environment variable named
`FIRECRAWL_API_KEY`. Keeping the key out of the repo is why it is written as
`${FIRECRAWL_API_KEY}` rather than the raw value.

**On Claude Code for web:** open your environment's settings and add an
environment variable:

- Name: `FIRECRAWL_API_KEY`
- Value: your `fc-...` key

See https://code.claude.com/docs/en/claude-code-on-the-web for where
environment variables are configured.

### 3. Make sure the network policy allows Firecrawl

The Firecrawl MCP server needs outbound access to `api.firecrawl.dev`. If your
environment uses a restrictive network policy, that host must be allowed or the
tools will fail to connect.

### 4. Start a fresh session

MCP servers are loaded when a session starts. After adding the key, start a new
session so Claude picks up the `firecrawl` server. Approve/trust the MCP server
when prompted. You can confirm it loaded with the `/mcp` command.

Once connected, just ask Claude to scrape or crawl a URL and it will use the
Firecrawl tools automatically.

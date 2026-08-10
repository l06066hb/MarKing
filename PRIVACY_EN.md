# Privacy Policy

**Last updated**: 2026-08-10

MarKing respects and protects your privacy. This policy explains how MarKing collects, uses, and safeguards your data.

---

## 1. Data Storage

MarKing is a **local-first** desktop application. All user data is stored on your local device:

- **Note content**: Stored as Markdown files in your designated Vault directory
- **Metadata**: Stored in a local SQLite database (in the app data directory)
- **App configuration**: Stored in local config files
- **API Keys**: Encrypted with AES-256-GCM and stored locally; master key file has 0600 permissions

MarKing **does not** upload your note content, metadata, or configuration to any MarKing-operated server.

## 2. AI Feature Data Flow

MarKing provides AI-assisted writing features (AI Format, Inline AI, Compose, Outline). When using these features:

- Your selected text or note content is sent to **a third-party AI service you configure** (e.g., OpenAI or other compatible APIs)
- Requests are transmitted via HTTPS
- Data processing follows the privacy policy of your chosen AI service — please review their terms before use
- MarKing itself does not store, relay, or log the content you send to AI services
- API Keys are stored locally only and are never sent to any server other than your chosen AI provider

**Note**: You are responsible for ensuring that content sent to third-party AI services does not contain sensitive or confidential information.

## 3. Update Checks

When checking for updates, MarKing sends the following information to the update server (`api.markingmd.com`):

- Current app version
- Operating system platform (Windows / macOS / Linux)
- System architecture (x64 / arm64)

This information is used solely to determine if a newer applicable version exists. It is not linked to your identity and is not used for tracking.

You can disable automatic update checks in Settings → Update.

## 4. MCP Server

MarKing includes a built-in MCP Server that allows clients like Claude Desktop, Cursor, and Cline to read and write your vault via local JSON-RPC protocol.

- MCP Server binds only to `127.0.0.1` (localhost) — not exposed to the network
- A random token is generated on each launch for authentication; the token exists only in memory
- All MCP operations are recorded in an audit log
- MCP Server is disabled by default and must be manually enabled

## 5. Information We Do Not Collect

MarKing **does not** collect:

- Personal identity information (name, email, phone, etc.)
- Device fingerprints
- Usage analytics or telemetry data
- Browsing history
- Location information

## 6. Data Export and Deletion

- **Export**: You can export all data (note files + database + config) at any time via Settings → Backup
- **Deletion**: Uninstall the app and manually delete the Vault directory and app data directory to completely remove all data

## 7. Third-Party Components

MarKing uses open-source third-party components. See `THIRD-PARTY-NOTICES.md` for details. License requirements for all components have been satisfied.

## 8. Contact

For privacy-related questions, please report via [GitHub Issues](https://github.com/l06066hb/MarKing/issues).

---

*This policy may be updated with new versions. Updates will be announced in-app or via GitHub Releases.*

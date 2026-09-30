# Privacy Policy

**Last updated**: 2026-09-30

MarKing respects and protects your privacy. This policy explains how MarKing collects, uses, and safeguards your data.

---

## 1. Data Storage

MarKing is a **local-first** desktop application. All user data is stored on your local device:

- **Note content**: Stored as Markdown files in your designated Vault directory
- **Metadata**: Stored in a local SQLite database (in the app data directory)
- **App configuration**: Stored in local config files
- **API Keys**: Encrypted with AES-256-GCM and stored locally; the key file is readable only by your user account (0600 permissions on Unix, user-directory isolation on Windows)

MarKing **does not** upload your note content, metadata, or configuration to any MarKing-operated server.

> Exceptions: the sync feature uploads data to **a third-party remote you configure yourself** (not a MarKing server — see Section 3); update checks send basic system info to the update server (see Section 4).

## 2. AI Feature Data Flow

MarKing provides AI-assisted writing features (AI Format, Inline AI, Compose, Outline). When using these features:

- Your selected text or note content is sent to **a third-party AI service you configure** (e.g., OpenAI or other compatible APIs)
- Requests are transmitted via HTTPS
- Data processing follows the privacy policy of your chosen AI service — please review their terms before use
- MarKing itself does not store, relay, or log the content you send to AI services
- API Keys are stored locally only and are never sent to any server other than your chosen AI provider

**Note**: You are responsible for ensuring that content sent to third-party AI services does not contain sensitive or confidential information.

## 3. Sync Feature Data Flow (Third-Party Remote)

MarKing's sync feature **does not go through MarKing's servers**. It connects directly to **a storage location you choose yourself**. The security and availability of synced data are the responsibility of the remote provider you select — **MarKing cannot guarantee them**.

### 3.1 Git Channel (currently available)

Once enabled, MarKing initializes a Git repository in your Vault directory and commits/pushes your notes to **a remote repository you configure** (e.g., GitHub, GitLab, Gitee, or a self-hosted Git service):

- Pushed note content is **plain text**. MarKing **does not provide end-to-end encryption**; the remote provider, and anyone granted access to that repository, can read your notes
- Transport encryption is provided by Git itself (HTTPS / SSH); MarKing is not involved
- Credentials (Personal Access Tokens, SSH keys, etc.) are **managed by your system's Git credential helper / SSH agent**. MarKing does not read, store, or transmit them
- Access control, retention, and cross-border transfer for the remote repository follow **your agreement with the remote provider** and their privacy policy — please review their terms before use

**Note**: Do not push notes containing sensitive or confidential information to a remote you do not fully trust. MarKing blocks remote URLs that embed a username with a password/token, so credentials are not written to your local repository config in plain text.

### 3.2 Channels Not Yet Implemented

Syncthing / iCloud / WebDAV / MarKing Hosted Sync are **not implemented yet**. The app labels them honestly as "coming soon" and performs no sync or data transfer for them.

## 4. Update Checks

When checking for updates, MarKing sends the following information to the update server (`api.markingmd.com`):

- Current app version
- Operating system platform (Windows / macOS / Linux)
- System architecture (x64 / arm64)

This information is used solely to determine if a newer applicable version exists. It is not linked to your identity and is not used for tracking.

You can disable automatic update checks in Settings → About.

## 5. MCP Server

MarKing includes a built-in MCP Server that allows clients like Claude Desktop, Cursor, and Cline to read and write your vault via local JSON-RPC protocol.

- MCP Server communicates with clients over a **stdio pipe** (clients spawn the app process directly) and **listens on no network port**
- Each client authenticates with its own token. Tokens are persisted at `.marking/mcp-tokens.json` (AES-256-GCM encrypted at rest, excluded from sync and backups) and can be revoked anytime in Settings
- All MCP **write** operations are recorded in an audit log (`.marking/mcp-audit.log`)
- MCP Server is off by default and must be enabled manually; per-token read/write permissions are supported

## 6. Information We Do Not Collect

MarKing **does not** collect:

- Personal identity information (name, email, phone, etc.)
- Device fingerprints
- Usage analytics or telemetry data
- Browsing history
- Location information

MarKing is not directed at children under 13, and we do not knowingly collect personal information from children.

## 7. Data Export and Deletion

- **Export**: You can export all data (note files + database + config) at any time via Settings → Backup
- **Deletion**: Uninstall the app and manually delete the Vault directory and app data directory to completely remove all local data
- **Synced data**: Uninstalling MarKing **does not** delete note copies already pushed to a remote repository — you must delete them yourself on the remote provider's side
- **Backup note**: backup archives are **unencrypted** and contain your notes, database, and history snapshots (credentials and runtime caches excluded) — keep them somewhere safe

## 8. Third-Party Components

MarKing uses open-source third-party components. See `THIRD-PARTY-NOTICES.md` for details. License requirements for all components have been satisfied.

The sync feature invokes the **Git command-line tool installed on your system**; MarKing does not bundle or distribute Git.

## 9. Contact

For privacy-related questions, please report via [GitHub Issues](https://github.com/l06066hb/MarKing/issues).

---

*This policy may be updated with new versions. Updates will be announced in-app or via GitHub Releases.*

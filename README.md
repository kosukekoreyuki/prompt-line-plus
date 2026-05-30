# 🧑‍💻 Prompt Line Plus

<!-- Keep these links. Translations will automatically update with the README. -->
English |
[日本語](README_ja.md)

> **Prompt Line Plus** is a derivative of [nkmr-jp/prompt-line](https://github.com/nkmr-jp/prompt-line) (MIT). It keeps the fast floating-input core of the original and reshapes the editing experience around outlines, a glass UI, and a window that stays put. See [Credits](#credits).

## Overview

Prompt Line Plus is a macOS floating text window for composing prompts to terminal AI coding agents — [Claude Code](https://github.com/anthropics/claude-code), [Codex CLI](https://github.com/openai/codex), [Gemini CLI](https://github.com/google-gemini/gemini-cli), and anything else that accepts pasted text. Call it up with a shortcut from wherever you are, write comfortably in a real text area, and drop the result into the app you were just in.

This build is an opinionated take on the original Prompt Line, tuned around three ideas:

1. **Write outlines, not one-liners** — Enter and Tab behave like an outliner so bullet lists stay tidy as you type.
2. **A window that floats, not blocks** — a translucent, backdrop-blurred panel that sits over your work instead of covering it.
3. **It stays until you dismiss it** — losing focus no longer closes the window; you close it on purpose with `Esc`.

## Features

> 📸 Screenshots and GIFs of the Prompt Line Plus UI (glass / transparent) are on the way. The original demo media was removed because it showed the upstream UI, which looks different from this build.

### Summon anywhere, paste anywhere
Open the window from any text field with `Cmd+Shift+Space`, type, and paste into the previously focused app with `Cmd+Enter`. It works in the terminal and in ordinary apps alike, which makes it handy for reusing the same prompt across tools.

### Bullet-list auto-formatting
The input area treats bullet lists like an outliner:

- `Enter` continues the current bullet, or exits the list when the bullet is empty.
- `Tab` / `Shift+Tab` indent and outdent.
- A new window starts you on a fresh `- ` bullet, ready to type.

### Glass, transparent window
The panel is transparent with a backdrop blur, so it reads as an overlay floating above your editor or terminal rather than an opaque box.

### Stays open on focus loss
The window is no longer hidden the moment it loses focus. It remains open while you glance elsewhere and is dismissed only with `Esc` — convenient when you are copying context from another window into your prompt.

### Edit like a normal editor
Behaves like any text editor, so it pairs well with voice input (for example [superwhisper](https://superwhisper.com/)). `Enter` never sends on its own, so line breaks are safe.

### Searchable prompt history
Every prompt is saved and reusable from the side menu, with search via `Cmd+f`.

### Context search and autocomplete
Type `/` or `@` to search and autocomplete agent skills, built-in commands, files, and code symbols. Extend these with plugins — see the [Plugin Guide](docs/en/plugins.md) and [prompt-line-plugins](https://github.com/nkmr-jp/prompt-line-plugins).

## 📦 Installation

### Requirements

- macOS 10.14 or later
- Node.js 20 or later
- [pnpm](https://pnpm.io/installation)
- Xcode Command Line Tools (to compile the native helpers)
- [fd](https://github.com/sharkdp/fd) and [ripgrep](https://github.com/BurntSushi/ripgrep) (for file and symbol search)

### Build and install

```bash
git clone https://github.com/kosukekoreyuki/prompt-line-plus.git
cd prompt-line-plus
git checkout v0.x.x        # optional: pick a release tag
pnpm install
pnpm run install-app       # builds and installs to /Applications (sets up code signing)
```

Once installed, a tray icon appears and you can summon the window with `Cmd+Shift+Space`.

<div><img src="assets/doc6.png" width="200"></div>

### Accessibility permission

Pasting into other apps requires accessibility permission. macOS prompts you on first use — follow the dialog to grant it.

<div><img src="assets/doc7.png" width="200"></div>

If the prompt never appears, or paste stops working:

1. Open **System Settings → Privacy & Security → Accessibility**.
2. Enable **Prompt Line Plus** (add it from Applications with **+** if it is missing).
3. If it is already enabled but still failing, remove it with **−** to reset, then re-add it.

You can also reset the permission from the command line:

```bash
pnpm run reset-accessibility
```

### Updating

```bash
git pull
pnpm install
pnpm run install-app
pnpm run migrate-settings   # refresh settings to the latest defaults (auto-backup)
```

## Usage

1. Go to wherever you want to type.
2. Press `Cmd+Shift+Space` to open the window.
3. Write your prompt (use `Enter` / `Tab` for outlines).
4. Press `Cmd+Enter` to paste it into the app you came from.
5. Press `Esc` to dismiss the window when you are done.

Handy extras:

- **History** — reuse past prompts from the side menu; search with `Cmd+f`.
- **Draft autosave** — your in-progress text is kept automatically.
- **Image paste** — paste clipboard images with `Cmd+V`.
- **Open file paths** — turn a file path into an open action with `Ctrl+Enter` or `Cmd+Click`.
- **File search** — type `@` to find files.
- **Symbol search** — type `@<lang>:<query>` (e.g. `@ts:Config`).
- **Custom search** — type `@prefix:` for agents, plans, history, and more (extensible via [plugins](docs/en/plugins.md)).

## ⚙️ Settings

Settings live in `~/.prompt-line/settings.yaml` and hot-reload without a restart.

See the [Settings Reference](docs/en/settings.md), [settings.example.yaml](settings.example.yaml), and [Migration Guide](docs/en/migration.md).

## 🔌 Plugins

Plugins are YAML files that add agent skills (`/`), custom search (`@prefix:`), and built-in commands for CLI tools.

The quickest path needs no GitHub repo at all — drop a YAML file into `~/.prompt-line/agent-skills/`, `~/.prompt-line/custom-search/`, or `~/.prompt-line/agent-built-in/`.

To install shared plugins from a repository:

```bash
pnpm link                                                  # one-time global CLI setup
prompt-line-plugin install github.com/nkmr-jp/prompt-line-plugins
prompt-line-plugin install github.com/user/repo@branch     # pin a version
```

Details: [docs/en/plugins.md](docs/en/plugins.md). Example repository: [prompt-line-plugins](https://github.com/nkmr-jp/prompt-line-plugins).

## Prompt history & privacy

Everything stays on your Mac — no network connection is required. History is appended to `~/.prompt-line/history.jsonl` in JSON Lines format, so you can query it with tools like [DuckDB](https://duckdb.org/).

## Contributing

See the [Contribution Guide](CONTRIBUTING.md).

## Credits

Prompt Line Plus stands on **[Prompt Line](https://github.com/nkmr-jp/prompt-line)** by **[nkmr-jp](https://github.com/nkmr-jp)** (© 2025 nkmr-jp, MIT License). The original application — its architecture, native macOS integration, search, history, and plugin system — is entirely their work, and all credit for that foundation belongs to them. Background docs: [Ask DeepWiki](https://deepwiki.com/nkmr-jp/prompt-line).

What this fork changes on top of the original:

- **Bullet-list auto-formatting** in the input area (`Enter` continues/exits, `Tab` / `Shift+Tab` indent).
- **A glassmorphic, transparent window** in place of the solid panel.
- **No auto-hide on blur** — the window closes only with `Esc`.

## License

MIT License — see [LICENSE](./LICENSE) and [NOTICE](./NOTICE). The original copyright notice (© 2025 nkmr-jp) is retained as the MIT License requires.

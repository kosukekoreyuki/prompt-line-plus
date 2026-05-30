# 🧑‍💻 Prompt Line Plus

[English](README.md) |
日本語

> **Prompt Line Plus** は [nkmr-jp/prompt-line](https://github.com/nkmr-jp/prompt-line)（MIT）の派生版です。オリジナルの「素早く呼び出せるフローティング入力」の核はそのままに、アウトライン編集・グラス UI・閉じないウィンドウを軸に編集体験を作り直しています。詳細は [クレジット](#クレジット) を参照。

## 概要

Prompt Line Plus は、ターミナルの AI コーディングエージェント — [Claude Code](https://github.com/anthropics/claude-code)、[Codex CLI](https://github.com/openai/codex)、[Gemini CLI](https://github.com/google-gemini/gemini-cli) など、テキストを貼り付けられるものすべて — へプロンプトを書くための macOS フローティング入力ウィンドウです。どこからでもショートカットで呼び出し、本物のテキストエリアで快適に書き、直前のアプリへ貼り付けます。

本ビルドは、オリジナルの Prompt Line に対する一つの解釈で、次の 3 点を軸にしています。

1. **一行ではなくアウトラインを書く** — Enter と Tab がアウトライナのように振る舞い、入力しながら箇条書きが整います。
2. **塞がず、浮かぶ** — backdrop blur の半透明パネルが作業を覆わず、その上に重なります。
3. **消すまで残る** — フォーカスを失っても閉じず、`Esc` で意図的に閉じます。

## 特徴

> 📸 Prompt Line Plus の UI（グラス／透過）を写したスクリーンショット・GIF は今後追加予定です。オリジナルのデモ画像は upstream の UI を写したもので本ビルドとは見た目が異なるため削除しました。

### どこでも呼び出し、どこへでも貼り付け
任意のテキストフィールドで `Cmd+Shift+Space` を押して開き、入力し、`Cmd+Enter` で直前のアプリへ貼り付けます。ターミナルでも一般的なアプリでも動くので、同じプロンプトを複数のツールで使い回すのに便利です。

### 箇条書きの自動整形
入力エリアは箇条書きをアウトライナのように扱います。

- `Enter` は箇条書きを継続し、空の項目では一段戻る／リストを抜けます。
- `Tab` / `Shift+Tab` でインデントを増減します。
- 新規ウィンドウは `- ` から始まり、すぐ書き始められます。

### グラスな透過ウィンドウ
パネルは backdrop blur 付きの透過表示で、不透明な箱ではなくエディタやターミナルの上に浮かぶオーバーレイとして見えます。

### フォーカス離脱で閉じない
フォーカスを失っても即座には隠れません。別のウィンドウに目を移している間も開いたままで、閉じるのは `Esc` のみ — 別ウィンドウからコンテキストをコピーしてプロンプトに取り込むときに便利です。

### 普通のエディタのように編集できる
一般的なテキストエディタと同じ操作性なので、音声入力アプリ（例: [superwhisper](https://superwhisper.com/)）とも相性が良好です。`Enter` で勝手に送信されないため、改行も安心です。

### 検索できるプロンプト履歴
すべてのプロンプトが保存され、サイドメニューから再利用できます。`Cmd+f` で検索も可能です。

### コンテキスト検索と入力補完
`/` や `@` を入力すると、エージェントスキル・組み込みコマンド・ファイル・コードシンボルを検索して補完できます。プラグインで拡張可能です — [プラグインガイド](docs/ja/plugins.md) と [prompt-line-plugins](https://github.com/nkmr-jp/prompt-line-plugins) を参照してください。

## 📦 インストール

### 必要環境

- macOS 10.14 以降
- Node.js 20 以上
- [pnpm](https://pnpm.io/installation)
- Xcode Command Line Tools（ネイティブヘルパーのコンパイル用）
- [fd](https://github.com/sharkdp/fd) と [ripgrep](https://github.com/BurntSushi/ripgrep)（ファイル検索・シンボル検索用）

### ビルドとインストール

```bash
git clone https://github.com/kosukekoreyuki/prompt-line-plus.git
cd prompt-line-plus
git checkout v0.x.x        # 任意: リリースタグを指定
pnpm install
pnpm run install-app       # ビルドして /Applications にインストール（コード署名セットアップ含む）
```

インストールするとトレイにアイコンが表示され、`Cmd+Shift+Space` で呼び出せます。

<div><img src="assets/doc6.png" width="200"></div>

### アクセシビリティ権限

他のアプリへ貼り付けるにはアクセシビリティ権限が必要です。初回使用時に macOS がダイアログを表示するので、指示に従って許可してください。

<div><img src="assets/doc7.png" width="200"></div>

ダイアログが出ない、または貼り付けできなくなった場合:

1. **システム設定 → プライバシーとセキュリティ → アクセシビリティ** を開く。
2. **Prompt Line Plus** を有効にする（一覧にない場合は **+** で Applications から追加）。
3. 有効なのに失敗する場合は **−** で一度削除してリセットし、再追加する。

権限はコマンドからもリセットできます。

```bash
pnpm run reset-accessibility
```

### アップデート

```bash
git pull
pnpm install
pnpm run install-app
pnpm run migrate-settings   # 設定を最新のデフォルトに更新（自動バックアップ）
```

## 使い方

1. 入力したい場所へ移動する。
2. `Cmd+Shift+Space` でウィンドウを開く。
3. プロンプトを書く（アウトラインは `Enter` / `Tab`）。
4. `Cmd+Enter` で直前のアプリへ貼り付ける。
5. 終わったら `Esc` でウィンドウを閉じる。

便利な機能:

- **履歴** — サイドメニューから過去のプロンプトを再利用。`Cmd+f` で検索。
- **ドラフト自動保存** — 入力中のテキストを自動的に保持。
- **画像貼り付け** — `Cmd+V` でクリップボード画像を貼り付け。
- **ファイルパスを開く** — `Ctrl+Enter` または `Cmd+クリック` でファイルパスを開く。
- **ファイル検索** — `@` でファイルを検索。
- **シンボル検索** — `@<言語>:<クエリ>`（例: `@ts:Config`）。
- **カスタム検索** — `@prefix:` でエージェント・プラン・履歴などを検索（[プラグイン](docs/ja/plugins.md)で拡張可能）。

## ⚙️ 設定

設定は `~/.prompt-line/settings.yaml` にあり、再起動なしでホットリロードされます。

[設定リファレンス](docs/ja/settings.md)、[settings.example.yaml](settings.example.yaml)、[マイグレーションガイド](docs/ja/migration.md) を参照してください。

## 🔌 プラグイン

プラグインは、エージェントスキル（`/`）、カスタム検索（`@prefix:`）、CLI ツール向けの組み込みコマンドを追加する YAML ファイルです。

最も簡単な方法は GitHub リポジトリすら不要で、`~/.prompt-line/agent-skills/`、`~/.prompt-line/custom-search/`、`~/.prompt-line/agent-built-in/` のいずれかに YAML を置くだけです。

リポジトリから共有プラグインをインストールする場合:

```bash
pnpm link                                                  # グローバル CLI の初回セットアップ
prompt-line-plugin install github.com/nkmr-jp/prompt-line-plugins
prompt-line-plugin install github.com/user/repo@branch     # バージョン指定
```

詳細: [docs/ja/plugins.md](docs/ja/plugins.md)。リポジトリ例: [prompt-line-plugins](https://github.com/nkmr-jp/prompt-line-plugins)。

## プロンプト履歴とプライバシー

すべて Mac 内に保存され、ネットワーク接続は不要です。履歴は `~/.prompt-line/history.jsonl` に JSON Lines 形式で追記されるため、[DuckDB](https://duckdb.org/) などで分析できます。

## 貢献

[Contribution Guide](CONTRIBUTING.md) を参照してください。

## クレジット

Prompt Line Plus は、**[nkmr-jp](https://github.com/nkmr-jp)** による **[Prompt Line](https://github.com/nkmr-jp/prompt-line)**（© 2025 nkmr-jp, MIT License）の上に成り立っています。オリジナルアプリケーション — そのアーキテクチャ、ネイティブ macOS 連携、検索、履歴、プラグインシステム — はすべて作者の成果であり、その土台に関する功績はすべて作者に帰属します。背景資料: [Ask DeepWiki](https://deepwiki.com/nkmr-jp/prompt-line)。

本フォークがオリジナルに加えた変更点:

- 入力エリアの **箇条書き自動整形**（`Enter` で継続/解除、`Tab` / `Shift+Tab` でインデント）。
- 不透明パネルに代わる **グラスモーフィックな透過ウィンドウ**。
- **フォーカス離脱で閉じない** — 閉じるのは `Esc` のみ。

## ライセンス

MIT License — [LICENSE](./LICENSE) と [NOTICE](./NOTICE) を参照してください。MIT License の要件に従い、オリジナルの著作権表示（© 2025 nkmr-jp）を保持しています。

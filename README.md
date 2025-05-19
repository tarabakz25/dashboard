## 📘 アプリケーション仕様書：VSCode作業時間可視化プラットフォーム

### 1. サービス概要

VSCodeでのコーディング作業量（時間、言語、リポジトリ単位）をリアルタイムに収集・可視化するプラットフォーム。

* **目的**：日々の開発活動を定量化・可視化し、自己管理や振り返りを支援
* **対象ユーザー**：個人開発者、開発チーム

---

### 2. システム構成

```
┌────────────────────────────┐
│        Webダッシュボード   │ ← React / Next.js
│  ・ログイン（GitHub OAuth  │
│  ・APIキー発行/表示        │
│  ・作業時間グラフ表示      │
└────────────┬───────────---─┘
             │ Supabase JS SDK
┌────────────▼────────---────┐
│        Supabase Backend    │
│  ・Auth（GitHub連携）      │
│  ・PostgreSQL（作業ログDB）│
│  ・RLS & セキュリティ      │
└────────────┬────────---────┘
             │ HTTP (insert)
┌────────────▼───────---─────┐
│     VSCode拡張機能         │
│  ・ローカル編集状況を検出  │
│  ・リポジトリ/言語情報取得 │
│  ・APIキー設定に基づき送信 │
└────────────────────────────┘
```

---

### 3. 主要機能

#### 📦 VSCode拡張機能

* ファイル変更/保存/編集中の言語・リポジトリ検出
* セッション単位（1分）での作業時間ログ生成
* SupabaseへAPIキー認証で送信

#### 🌐 Webダッシュボード

* GitHubログインによる認証
* APIキーの発行と提示
* 日別棒グラフ、言語別円グラフ、貢献度カレンダーの表示

---

### 4. Supabase DB設計

#### users

| カラム      | 型    | 説明   |
| -------- | ---- | ---- |
| id       | UUID | 認証ID |
| username | text | 表示名  |

#### repositories

| カラム      | 型    | 説明         |
| -------- | ---- | ---------- |
| id       | UUID |            |
| user\_id | UUID | users.id参照 |
| name     | text | リポジトリ名     |
| path     | text | ローカルまたはURL |

#### languages

| カラム  | 型    | 説明                 |
| ---- | ---- | ------------------ |
| id   | UUID |                    |
| name | text | 言語名（例: TypeScript） |

#### coding\_sessions

| カラム               | 型         | 説明                |
| ----------------- | --------- | ----------------- |
| id                | UUID      |                   |
| user\_id          | UUID      | users.id参照        |
| repo\_id          | UUID      | repositories.id参照 |
| language\_id      | UUID      | languages.id参照    |
| start\_time       | timestamp | セッション開始時刻         |
| end\_time         | timestamp | セッション終了時刻         |
| duration\_minutes | int       | 作業時間（分）           |

---

### 5. プロジェクト構成

#### ルート構成

```
/project-root/
├── vscode-extension/       # 拡張機能プロジェクト
├── web-dashboard/          # Webアプリ（Next.js）
└── docs/                   # ドキュメント類
```

#### vscode-extension/

```
├── src/
│   ├── extension.ts
│   ├── activityTracker.ts
│   ├── gitUtils.ts
│   ├── supabaseClient.ts
│   └── sessionSender.ts
├── package.json
├── tsconfig.json
└── README.md
```

#### web-dashboard/

```
├── pages/
│   ├── index.tsx
│   └── api-key.tsx
├── components/
│   ├── Graphs/
│   └── Layout/
├── lib/
│   ├── supabaseClient.ts
│   └── queries.ts
├── styles/
├── public/
├── supabase/
└── README.md
```

---

### 6. 補足事項

* APIキーによる認証方式を採用（拡張機能に貼り付け）
* RLSでユーザーごとのデータ分離を実現
* グラフにはRechartsやGitHub風カレンダーライブラリを使用
* 今後モバイル対応やチーム機能追加も拡張可能

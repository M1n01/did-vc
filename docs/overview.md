# DID/VC認証サービス プロジェクト概要

## 目的
- DID/VC（分散型ID/検証可能な証明書）を活用し、サービスごとにアカウント作成が不要な、直感的で安全な認証体験を提供する。
- OAuth2.0のようなSDK＋リダイレクト認証フローで、ユーザーは「ログインボタンを押すだけ」で認証が完了するUXを目指す。

## 技術スタック・設計方針
- モノレポ構成（yarn workspaces）
- TypeScript（主にWeb/サーバー/SDK）
- Rust（DID/VCコアロジック、WASM連携も視野）
- 主要ライブラリ・ツール
  - Honojs（APIサーバー）
  - Next.js（デモクライアント）
  - zod（型・バリデーション）
  - OpenAPI（APIドキュメント）
  - biome.js（Lint/Format統一）
  - Storybook（UI開発・ドキュメント）

## ディレクトリ構成（例）
```
did-vc/
├── apps/
│   ├── api/           # Honojs APIサーバー
│   ├── demo-client/   # Next.jsデモクライアント
│   └── issuer/        # VC発行サーバー（TypeScript）
├── packages/
│   ├── sdk/           # クライアントSDK
│   ├── core/          # コアロジック（Rust/WASM）
│   └── types/         # 共通型定義・zodスキーマ
├── docs/              # 仕様・設計・OpenAPI
├── .github/           # CI/CD
├── .gitignore
├── package.json       # yarn workspaces
├── yarn.lock
├── tsconfig.base.json
├── Cargo.toml
└── README.md
```

## セットアップ状況
- モノレポの初期化（yarn workspaces）
- VC発行サーバー（TypeScript, Honojs）の雛形作成
- 必要な依存パッケージ導入
- `.gitignore`の整備（Node.js, Rust, Next.js, Storybook, etc.）

## 認証フロー（初回ログイン例）
1. ユーザーが「Sign in with Trust Rails」ボタンをタップ
2. OSネイティブのPasskeyダイアログで生体認証
3. DID生成・登録
4. VC（KYC等）発行リクエスト
5. OIDC4VCIフローでVC発行
6. サーバーからSDKへVC+VP返却
7. アプリにコールバック、ログイン完了

## セキュリティ観点
- パスワードレス＋生体認証
- 秘密鍵は端末のみ、公開鍵のみサーバー
- 通信はTLS必須
- 秘密鍵リカバリ、SDKの堅牢化、VCの安全な保存・利用、リプレイ攻撃対策なども考慮 

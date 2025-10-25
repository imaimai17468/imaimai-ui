# imaimai UI

他のライブラリには無い、実装が面倒なコンポーネントを集めたshadcn/ui互換のコンポーネントレジストリ。

## 概要

網羅的なライブラリではないので過度な期待はせずに。
欲しいニッチなコンポーネントがあれば、[issue](https://github.com/imaimai17468/imaimai-ui/issues)でリクエストしてください。

## 特徴

- **shadcn/ui互換**: shadcn CLIで簡単にインストール可能
- **カスタムレジストリ**: 独自のコンポーネントレジストリとして機能
- **コピペ可能**: コンポーネントのコードをプロジェクトに直接コピー
- **TypeScript**: 完全な型安全性
- **Tailwind CSS**: モダンなスタイリング

## インストール

### 方法1: 直接URLを指定

```bash
npx shadcn@latest add https://imaimai-ui.vercel.app/r/multi-select-combobox.json
```

### 方法2: components.jsonに設定

`components.json`に以下を追加：

```json
{
  "registryUrl": "https://imaimai-ui.vercel.app/r"
}
```

その後：

```bash
npx shadcn@latest add multi-select-combobox
```

## 利用可能なコンポーネント

### Multi Select Combobox

複数選択可能な検索機能付きコンボボックス。選択済みアイテムはバッジ表示され、個別に削除可能。

```tsx
import { MultiSelectCombobox } from "@/components/registry/multi-select-combobox";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];

function Example() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <MultiSelectCombobox
      options={options}
      selected={selected}
      onChange={setSelected}
      placeholder="Select frameworks..."
    />
  );
}
```

## 開発環境

このレジストリ自体の開発に参加する場合：

### 前提条件

- Node.js 18.0.0 以上
- Bun (推奨) または npm/yarn/pnpm

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/imaimai17468/imaimai-ui.git
cd imaimai-ui

# 依存関係をインストール
bun install

# 開発サーバーを起動
bun run dev
```

### 利用可能なコマンド

```bash
# 開発
bun run dev              # 開発サーバーを起動
bun run build            # プロダクション用ビルド
bun run start            # プロダクションサーバーを起動

# レジストリ
bun run registry:build   # レジストリファイルを生成

# コード品質
bun run check            # Biome linter/formatter チェック
bun run check:fix        # Biome 自動修正
bun run typecheck        # TypeScript型チェック

# テスト
bun run test             # Vitestでテスト実行

# Storybook
bun run storybook        # Storybook開発サーバーを起動
```

## プロジェクト構成

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css              # グローバルスタイル
│   ├── layout.tsx               # ルートレイアウト
│   └── page.tsx                 # ランディングページ
├── components/
│   ├── ui/                      # shadcn/ui 基本コンポーネント
│   ├── registry/                # 公開コンポーネント
│   │   └── multi-select-combobox.tsx
│   ├── docs/                    # ドキュメントコンポーネント
│   └── shared/                  # 共有コンポーネント
├── config/
│   └── components.ts            # コンポーネント設定
└── lib/
    └── utils.ts                 # ユーティリティ関数

registry.json                     # レジストリ定義
public/r/                         # ビルドされたレジストリファイル
```

## 新しいコンポーネントの追加

1. `src/components/registry/` に新しいコンポーネントを作成
2. `registry.json` にコンポーネント定義を追加
3. `src/config/components.ts` に設定を追加
4. `bun run registry:build` でレジストリファイルを生成

## 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Code Quality**: Biome (linting & formatting)
- **Testing**: Vitest + Testing Library
- **Storybook**: Component development & documentation
- **Package Manager**: Bun
- **Git Hooks**: Lefthook
- **Registry**: shadcn CLI compatible

## コントリビューション

コントリビュートは大歓迎です！以下の方法で参加できます：

1. **コンポーネントのリクエスト**: [issue](https://github.com/imaimai17468/imaimai-ui/issues)を作成
2. **バグ報告**: [issue](https://github.com/imaimai17468/imaimai-ui/issues)を作成
3. **Pull Request**: 新しいコンポーネントの実装やバグ修正

## ライセンス

MIT

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Biome](https://biomejs.dev/)

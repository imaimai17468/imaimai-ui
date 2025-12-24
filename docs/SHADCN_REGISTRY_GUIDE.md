自家製 UI ライブラリ・デザインシステム構築には shadcn/ui Registry がおすすめ

この記事では、shadcn/ui の Registry 機能を活用して、企業の自家製の UI ライブラリやデザインシステムを構築・配布する方法を解説します。

## はじめに

UI コンポーネントライブラリを作成・配布する方法として、npm パッケージとして公開するのが一般的です。shadcn/ui が提唱する **Registry 方式** は、それとは異なるアプローチを提供します。どちらが優れているというわけではなく、ユースケースに応じて使い分けるのが理想です。

Headless Components をベースに独自のスタイリングを施し、Registry として公開する。そしてそれを AI ツールと連携させて開発を進めるこのワークフローが、今後の UI 開発のスタンダードになる可能性を秘めています。

この記事では、[imaimai-ui](https://imaimai-ui.vercel.app) を具体例として、Registry 方式のメリットと実装方法を紹介します。

## shadcn/ui Registry とは

公式ドキュメントでは、Registry を次のように定義しています。

> **A distribution system for code**
> （コードの配布システム）

![shadcn/ui Registry の概念図](https://ui.shadcn.com/_next/image?url=%2Fimages%2Fregistry-light.png&w=1920&q=75)

_出典: [shadcn/ui Registry ドキュメント](https://ui.shadcn.com/docs/registry)_

shadcn/ui Registry は、**自分自身のコードレジストリを運用できる仕組み**です。配布できるのは UI コンポーネントだけではありません。

- React、Vue、Svelte などの UI コンポーネント
- `useDebounce`、`formatDate` などのフックやユーティリティ
- ESLint、Prettier、TypeScript などの設定ファイル
- ダッシュボード、認証画面などのページテンプレート
- コーディング規約やベストプラクティスのドキュメント

重要なポイントとして、Registry は **React に限定されず、あらゆるプロジェクトタイプ・フレームワークで動作**します。

:::message
この記事では UI コンポーネントとデザインシステムに焦点を当てて解説しますが、上記のあらゆるコードに同じ仕組みが適用できます。
:::

### 従来の npm パッケージ方式との違い

| 観点           | npm パッケージ                  | shadcn/ui Registry                  |
| -------------- | ------------------------------- | ----------------------------------- |
| コードの所有   | node_modules 内（読み取り専用） | プロジェクト内（完全に編集可能）    |
| カスタマイズ   | 限定的（props 経由のみ）        | 自由自在（ソースコードを直接編集）  |
| バージョン管理 | package.json で管理             | コードとして Git で管理             |
| 依存関係       | npm の依存ツリー                | registryDependencies で明示的に管理 |
| AI 連携        | 型定義やドキュメントを参照      | ソースコード全体を参照可能          |

### Directory Registry とは

shadcn/ui は公式の [Directory](https://ui.shadcn.com/docs/directory) を提供しています。Directory に登録されたレジストリは、CLI から簡単にアクセスできます。

#### 分散化という思想

Directory Registry の重要な特徴は、**完全に分散化**されていることです。[公式の Changelog](https://ui.shadcn.com/docs/changelog) では次のように説明されています。

> The system is completely decentralized, meaning there is no central registrar, which grants users the flexibility to create any namespace and organize components in a way that best suits their team's needs.
>
> （このシステムは完全に分散化されており、中央の登録機関が存在しない。これにより、ユーザーは自由に namespace を作成し、チームのニーズに最も適した方法でコンポーネントを整理できる。）

npm のような中央集権的なパッケージレジストリとは異なり、各チームや個人が自分の Registry を自由に運用し、必要に応じて Directory に登録することで発見可能性を高めるという設計思想です。

これにより、チームのニーズに最も適した方法でコンポーネントを整理でき、自分の Registry は自分で管理・運用できます。Directory への登録は任意なので、プライベートな Registry として運用することも可能です。

#### 登録のメリット

Directory に登録すると、他の開発者があなたのコンポーネントを見つけやすくなります。`@registry-name/component` 形式で CLI から簡単にインストールでき、MCP Server 対応により AI エージェントからもアクセス可能になります。

#### 登録方法

[Add a Registry](https://ui.shadcn.com/docs/registry/add-a-registry) のドキュメントに従って、プルリクエストを送信します。

## Registry 方式のメリット

### 1. Copy-Paste 式の利点：コードを直接所有する

```bash
# 従来の方法
npm install @your-company/ui-library

# Registry 方式
npx shadcn add @your-registry/component-name
```

Registry 方式では、コンポーネントのソースコードがプロジェクトに直接コピーされます。node_modules に隠れることなく実装の詳細が見え、必要な部分だけを取り込めます。プロジェクト固有の要件に合わせて直接編集することも可能です。

### 2. カスタマイズの容易さ：コードを直接所有

コンポーネントのソースコードがプロジェクト内に存在するため、プロジェクト固有の要件に合わせて自由にカスタマイズできます。

```tsx
// コピーされたコンポーネントを自由に編集可能
export function MultiSelectCombobox({
  options,
  selected,
  onChange,
  // プロジェクト固有のpropsを追加
  customValidation,
}: MultiSelectComboboxProps) {
  // 実装を自由にカスタマイズ
}
```

### 3. AI 連携：AI 時代の開発に最適化

今後 AI を活用した開発がますます盛んになる中で、Registry 方式は AI-friendly な設計として大きなアドバンテージを持っています。

#### Registry が「UI 生成の拠点」になる

AI によるコンポーネント生成において、Registry は単なるコード配布の仕組みを超えた役割を果たします。

Registry に豊富な「実装サンプル」が蓄積されていれば、AI に要件を伝えるだけで、表層・骨格は既存のコンポーネントライブラリから継承し、構造は Registry 内の実装サンプルから推論し、文脈情報を基に要件に適合させるという形で、精度の高いコンポーネント生成が可能になります。つまり、Registry は AI にとっての「学習済みパターン集」として機能するのです。

#### コードがプロジェクト内にあることの強み

npm パッケージ方式では node_modules 内にコードが配置されますが、Registry 方式ではコンポーネントのソースコードがプロジェクト内に直接存在します。

Cursor や Claude などの AI ツールは、プロジェクト内のコードを直接参照できます。ソースコードが見えるため実装の詳細を把握でき、関連コンポーネントとの整合性を保った提案ができます。既存のパターンを学習し、それに沿った新規コンポーネントを生成することも可能です。

Registry 方式なら、AI がコンポーネントの内部実装まで理解した上で開発を支援できます。npm パッケージでも型定義やドキュメントから情報を得られますが、ソースコードが直接見える Registry 方式はより深い理解が可能です。

#### 文脈情報を持たせた AI との協調

Registry のメタデータ（`description` や `title`）に、コンポーネントの用途や設計意図といった文脈情報を記述しておくことで、AI がその情報を活用できます。

例えば「このコンポーネントは管理画面のフィルター用途で使う」といった文脈があれば、AI は類似のユースケースで適切なコンポーネントを提案したり、既存コンポーネントを適切に拡張したりできるようになります。

MCP Server を通じて AI エージェントが直接 Registry を操作することも可能になっており、今後さらに AI と Registry の連携は深まっていくでしょう。

### 4. JSON Schema：機械可読性による拡張性

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "your-registry",
  "homepage": "https://your-registry.example.com",
  "items": [
    {
      "name": "component-name",
      "type": "registry:ui",
      "title": "Component Title",
      "description": "Component description for AI and humans",
      "registryDependencies": ["button", "popover"],
      "files": [
        {
          "path": "src/components/registry/component-name.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

この構造化されたフォーマットにより、ドキュメントの自動生成、依存関係の可視化、AI による理解と生成の支援が可能になります。

### 5. CLI サポート：簡便なインストール

```bash
# 公式ディレクトリに登録されたレジストリから
npx shadcn add @registry-name/component-name

# カスタムURLから
npx shadcn add https://your-registry.example.com/r/component-name.json
```

## Registry 方式のデメリット

### バージョン管理の難しさ

Registry 方式の最大のデメリットは、**コンポーネントのバージョン管理が難しい**ことです。

npm パッケージ方式では、`package.json` でバージョンを明示的に管理でき、`npm update` で一括更新が可能です。一方、Registry 方式ではコンポーネントがプロジェクト内にコピーされるため、上流の更新が自動的には反映されません。更新を取り込むには再度 `npx shadcn add` を実行するか手動でマージする必要があり、ローカルでカスタマイズした部分と競合する可能性もあります。

:::message alert
このデメリットは、Registry 方式の「コードを直接所有する」というメリットの裏返しでもあります。自由度と引き換えに、管理の責任がプロジェクト側に移ることを理解しておく必要があります。
:::

### 対策

対策としては、以下が挙げられます。

- Registry 元のリリースノートや Changelog をウォッチして重要なセキュリティ修正を定期的に確認する
- カスタマイズは最小限に抑えて上流との差分を小さく保つ
- Git で変更履歴を管理して更新時に差分を確認しやすくする

### npm パッケージ方式との使い分け

Registry 方式と npm パッケージ方式は、どちらかが優れているというわけではなく、ユースケースに応じて使い分けるのが理想です。

| ユースケース                                           | 推奨方式         |
| ------------------------------------------------------ | ---------------- |
| 安定した API を提供し、多くのプロジェクトで共有したい  | npm パッケージ   |
| カスタマイズ前提で、プロジェクト固有の要件に合わせたい | Registry         |
| バージョン管理を厳密に行いたい                         | npm パッケージ   |
| AI ツールと連携して開発を加速したい                    | Registry         |
| 社内の複数チームで統一したコンポーネントを使いたい     | 両方の併用も可能 |

実際には、プリミティブなコンポーネント（Button、Input など）は npm パッケージとして提供し、それらを組み合わせた複合コンポーネント（UserAvatar、SearchForm など）は Registry として提供する、というハイブリッドなアプローチも有効です。

## ユースケース別ガイド

### 個人の実装サンプル集として

デザイナーが自分だけの参考デザイン集を持っているように、エンジニアも「参考実装集」として Registry を活用できます。デザインシステムほど堅牢な運用は必要なく、純粋に「よく使うパターンの蓄積」として機能させることも可能です。

- よく使うパターンをコンポーネント化
- プロジェクト間で再利用
- 個人のスキルセットの可視化

### 企業のデザインシステムとして

- ブランドに合わせたカスタマイズ済みコンポーネント
- 社内プロジェクト間での一貫した UI
- デザイナーとエンジニアの共通言語

### プロジェクト横断の共通資産として

- マイクロフロントエンド間での共有
- モノレポ内での再利用
- チーム間でのベストプラクティス共有

## セットアップ手順

### 1. registry.json の作成

プロジェクトのルートに `registry.json` を作成します。

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "your-registry-name",
  "homepage": "https://your-site.com",
  "items": []
}
```

### 2. コンポーネントファイルの配置

コンポーネントを作成し、適切なディレクトリに配置します。

```
src/components/registry/your-component.tsx
```

### 3. registry.json にコンポーネントを追加

```json
{
  "items": [
    {
      "name": "your-component",
      "type": "registry:ui",
      "title": "Your Component",
      "description": "Description of your component",
      "registryDependencies": ["button"],
      "files": [
        {
          "path": "src/components/registry/your-component.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

:::details registryDependencies について
`registryDependencies` で shadcn/ui の他のコンポーネントへの依存を明示的に管理できます。これにより、コンポーネントをインストールする際に必要な依存コンポーネントも自動的にインストールされます。
:::

### 4. Registry のビルド・公開

shadcn CLI を使用して Registry をビルドします。

```bash
npx shadcn build
```

これにより、`public/r/` ディレクトリに各コンポーネントの JSON ファイルが生成されます。

### 5. 利用方法

公開後、他のプロジェクトから以下のように利用できます。

```bash
# URL 直接指定
npx shadcn add https://your-site.com/r/your-component.json

# Directory に登録済みの場合
npx shadcn add @your-registry/your-component
```

## 具体例: imaimai-ui

[imaimai-ui](https://imaimai-ui.vercel.app) は、この Registry 方式を採用した実例です。

### プロジェクト構成

```
imaimai-ui/
├── registry.json          # Registry 定義
├── public/r/              # ビルドされた Registry JSON
│   ├── registry.json
│   ├── multi-select-combobox.json
│   ├── ellipsis-pagination.json
│   └── ...
└── src/components/registry/  # コンポーネントソース
    ├── multi-select-combobox.tsx
    ├── ellipsis-pagination.tsx
    ├── exponential-pagination.tsx
    └── icon-transition-toggle.tsx
```

### コンポーネント例：Multi Select Combobox

複数の shadcn/ui コンポーネント（Button, Command, Popover, Badge）を組み合わせた、複雑な依存関係を持つコンポーネントの例です。

```tsx
"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectComboboxProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  maxVisibleItems?: number;
}

export function MultiSelectCombobox({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
}: // ... 実装
MultiSelectComboboxProps) {
  // コンポーネント実装
}
```

### registry.json への登録

コンポーネントを作成したら、registry.json に登録します。

`name` はコンポーネントの識別子で、`npx shadcn add <name>` でインストールする際に使用します。`title` と `description` は人間向けのドキュメントとして機能しますが、AI がコンポーネントの用途を理解する際にも活用されます。

`registryDependencies` は、このコンポーネントが依存する shadcn/ui の他のコンポーネントを指定します。Multi Select Combobox の場合、Button、Command、Popover、Badge の 4 つに依存しています。ユーザーがこのコンポーネントをインストールすると、これらの依存コンポーネントも自動的にインストールされます。

`files` には、コンポーネントのソースファイルのパスを指定します。

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "imaimai-ui",
  "homepage": "https://imaimai-ui.vercel.app",
  "items": [
    {
      "name": "multi-select-combobox",
      "type": "registry:ui",
      "title": "Multi Select Combobox",
      "description": "A searchable multi-select combobox component with badge display",
      "registryDependencies": ["button", "command", "popover", "badge"],
      "files": [
        {
          "path": "src/components/registry/multi-select-combobox.tsx",
          "type": "registry:component"
        }
      ]
    },
    {
      "name": "ellipsis-pagination",
      "type": "registry:ui",
      "title": "Ellipsis Pagination",
      "description": "A pagination component that automatically truncates page numbers with ellipsis when there are many pages",
      "registryDependencies": ["pagination"],
      "files": [
        {
          "path": "src/components/registry/ellipsis-pagination.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

## まとめ

shadcn/ui Registry は、UI コンポーネントライブラリの新しい配布方式として、多くのメリットを提供します。

| メリット             | 説明                                                                 |
| -------------------- | -------------------------------------------------------------------- |
| **コード所有**       | プロジェクト内にソースコードを持ち、自由にカスタマイズ可能           |
| **依存関係の明確化** | registryDependencies で依存を明示的に管理                            |
| **AI-friendly**      | ソースコードが可視化され、AI がコンテキストを理解・修正しやすい      |
| **AI 連携**          | JSON Schema により Cursor、MCP Server など AI ツールとの親和性が高い |
| **CLI 統合**         | 簡単なコマンドでコンポーネントをインストール                         |
| **段階的採用**       | 必要なコンポーネントだけを選択的に導入                               |

特に **AI を活用した開発が主流になりつつある現在**、ソースコードがプロジェクト内にあることで AI がコンテキストを正確に理解し、適切な修正や拡張を提案できるのは Registry 方式の大きな強みです。

Registry 方式が普及すれば、デザイナーとエンジニアが最初からペアで作業し、Figma を介さずに直接コードでデザインを表現する世界も現実味を帯びてきます。Registry 方式は、デザインとエンジニアリングの境界を曖昧にし、AI と協調したより効率的な UI 開発を可能にする可能性を秘めています。

## 参考リンク

- [shadcn/ui Registry ドキュメント](https://ui.shadcn.com/docs/registry)
- [shadcn/ui Directory](https://ui.shadcn.com/docs/directory)
- [Registry Item JSON Schema](https://ui.shadcn.com/docs/registry/registry-item-json)
- [imaimai-ui](https://imaimai-ui.vercel.app)

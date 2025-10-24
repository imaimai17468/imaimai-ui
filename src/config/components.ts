// コンポーネントカテゴリ
export type ComponentCategory = "form" | "layout" | "data-display" | "feedback";

// コンポーネント設定の型定義
export interface ComponentConfig {
	slug: string; // URL用スラッグ
	name: string; // 表示名
	category: ComponentCategory; // カテゴリ
	description: string; // 説明
	registryName: string; // レジストリ名（CLIインストール用）

	// デモ用のprops
	demoProps: Record<string, unknown>;

	// コード例
	codeExample: string;

	// Props定義
	props: Array<{
		name: string;
		type: string;
		required: boolean;
		default?: string;
		description: string;
	}>;

	// 依存関係
	dependencies?: string[];
	registryDependencies?: string[];
}

// コンポーネント一覧
export const components: ComponentConfig[] = [
	{
		slug: "multi-select-combobox",
		name: "Multi Select Combobox",
		category: "form",
		description:
			"検索機能付きの複数選択可能なコンボボックスコンポーネント。選択したアイテムはバッジとして表示され、個別に削除可能です。",
		registryName: "multi-select-combobox",
		demoProps: {
			options: [
				{ value: "react", label: "React" },
				{ value: "vue", label: "Vue" },
				{ value: "angular", label: "Angular" },
				{ value: "svelte", label: "Svelte" },
				{ value: "next", label: "Next.js" },
				{ value: "nuxt", label: "Nuxt.js" },
			],
			selected: ["react", "next"],
			placeholder: "フレームワークを選択...",
			searchPlaceholder: "検索...",
		},
		codeExample: `import { MultiSelectCombobox } from "@/components/multi-select-combobox";
import { useState } from "react";

export default function Example() {
  const [selected, setSelected] = useState<string[]>(["react"]);

  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];

  return (
    <MultiSelectCombobox
      options={options}
      selected={selected}
      onChange={setSelected}
      placeholder="フレームワークを選択..."
      searchPlaceholder="検索..."
    />
  );
}`,
		props: [
			{
				name: "options",
				type: "MultiSelectOption[]",
				required: true,
				description:
					"選択可能なオプションの配列。各オプションはvalueとlabelを持つ。",
			},
			{
				name: "selected",
				type: "string[]",
				required: true,
				description: "選択されているアイテムのvalue配列。",
			},
			{
				name: "onChange",
				type: "(selected: string[]) => void",
				required: true,
				description: "選択が変更されたときに呼ばれるコールバック関数。",
			},
			{
				name: "placeholder",
				type: "string",
				required: false,
				default: '"Select items..."',
				description:
					"アイテムが選択されていないときに表示されるプレースホルダー。",
			},
			{
				name: "searchPlaceholder",
				type: "string",
				required: false,
				default: '"Search..."',
				description: "検索入力欄のプレースホルダー。",
			},
			{
				name: "className",
				type: "string",
				required: false,
				description: "追加のCSSクラス名。",
			},
		],
		registryDependencies: ["button", "command", "popover", "badge"],
	},
];

// カテゴリごとにグループ化
export const componentsByCategory = components.reduce(
	(acc, component) => {
		if (!acc[component.category]) {
			acc[component.category] = [];
		}
		acc[component.category].push(component);
		return acc;
	},
	{} as Record<ComponentCategory, ComponentConfig[]>,
);

// スラッグからコンポーネント設定を取得
export function getComponentBySlug(slug: string): ComponentConfig | undefined {
	return components.find((component) => component.slug === slug);
}

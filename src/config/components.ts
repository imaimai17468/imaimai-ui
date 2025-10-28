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
	{
		slug: "ellipsis-pagination",
		name: "Ellipsis Pagination",
		category: "layout",
		description:
			"ページ数が多い時に自動的に省略記号（...）を表示するPaginationコンポーネント。現在ページ周辺とページ境界のページ番号のみを表示します。",
		registryName: "ellipsis-pagination",
		demoProps: {
			currentPage: 5,
			totalPages: 20,
		},
		codeExample: `import { EllipsisPagination } from "@/components/ellipsis-pagination";
import { useState } from "react";

export default function Example() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;

  return (
    <EllipsisPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}`,
		props: [
			{
				name: "currentPage",
				type: "number",
				required: true,
				description: "現在のページ（1-indexed）。",
			},
			{
				name: "totalPages",
				type: "number",
				required: true,
				description: "総ページ数。",
			},
			{
				name: "onPageChange",
				type: "(page: number) => void",
				required: true,
				description: "ページが変更されたときに呼ばれるコールバック関数。",
			},
			{
				name: "siblingCount",
				type: "number",
				required: false,
				default: "1",
				description: "現在ページの前後に表示するページ数。",
			},
			{
				name: "boundaryCount",
				type: "number",
				required: false,
				default: "1",
				description: "最初と最後に表示するページ数。",
			},
			{
				name: "edgeCount",
				type: "number",
				required: false,
				default: "2",
				description: "端（最初または最後のページ）にいる時に表示するページ数。",
			},
		],
		registryDependencies: ["pagination"],
	},
	{
		slug: "exponential-pagination",
		name: "Exponential Pagination",
		category: "layout",
		description:
			"指数的なページジャンプを持つPaginationコンポーネント（省略記号なし）。ページ数が500以上など非常に多い場合に適しており、現在ページ周辺は連続表示、その外側は2の累乗（2, 4, 8, 16, 32...）でジャンプします。",
		registryName: "exponential-pagination",
		demoProps: {
			currentPage: 256,
			totalPages: 500,
		},
		codeExample: `import { ExponentialPagination } from "@/components/exponential-pagination";
import { useState } from "react";

export default function Example() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 500;

  return (
    <ExponentialPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}`,
		props: [
			{
				name: "currentPage",
				type: "number",
				required: true,
				description: "現在のページ（1-indexed）。",
			},
			{
				name: "totalPages",
				type: "number",
				required: true,
				description: "総ページ数。",
			},
			{
				name: "onPageChange",
				type: "(page: number) => void",
				required: true,
				description: "ページが変更されたときに呼ばれるコールバック関数。",
			},
			{
				name: "siblingCount",
				type: "number",
				required: false,
				default: "3",
				description: "現在ページの前後に表示する連続ページ数。",
			},
		],
		registryDependencies: ["pagination"],
	},
	{
		slug: "icon-transition-toggle",
		name: "Icon Transition Toggle",
		category: "feedback",
		description:
			"アイコン切り替え時に滑らかなトランジションを持つトグルボタン。opacity、blur、scaleを組み合わせた自然なアニメーションです。",
		registryName: "icon-transition-toggle",
		demoProps: {
			isToggled: false,
		},
		codeExample: `import { IconTransitionToggle } from "@/components/icon-transition-toggle";
import { Copy, CircleCheck } from "lucide-react";
import { useState } from "react";

export default function Example() {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <IconTransitionToggle
      icon={Copy}
      toggledIcon={CircleCheck}
      isToggled={isCopied}
      onToggle={() => setIsCopied(!isCopied)}
      autoResetTimeout={2000}
      aria-label="コピー"
    />
  );
}`,
		props: [
			{
				name: "icon",
				type: "LucideIcon",
				required: true,
				description:
					"最初に表示するアイコン（lucide-reactのアイコンコンポーネント）。",
			},
			{
				name: "toggledIcon",
				type: "LucideIcon",
				required: true,
				description:
					"トグル時に表示するアイコン（lucide-reactのアイコンコンポーネント）。",
			},
			{
				name: "isToggled",
				type: "boolean",
				required: true,
				description: "現在の状態（true: toggledIcon表示、false: icon表示）。",
			},
			{
				name: "onToggle",
				type: "() => void",
				required: true,
				description: "トグル時に呼ばれるコールバック関数。",
			},
			{
				name: "iconSize",
				type: "number",
				required: false,
				default: "24",
				description: "アイコンのサイズ（px単位）。",
			},
			{
				name: "className",
				type: "string",
				required: false,
				description: "ボタンに追加するCSSクラス名。",
			},
			{
				name: "aria-label",
				type: "string",
				required: false,
				description: "アクセシビリティ用のラベル（推奨）。",
			},
			{
				name: "variant",
				type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
				required: false,
				default: '"ghost"',
				description: "ボタンのバリアント（shadcn/ui Buttonのvariant）。",
			},
			{
				name: "size",
				type: '"default" | "sm" | "lg" | "icon"',
				required: false,
				default: '"icon"',
				description: "ボタンのサイズ（shadcn/ui Buttonのsize）。",
			},
			{
				name: "iconProps",
				type: "React.ComponentProps<LucideIcon>",
				required: false,
				description:
					"アイコンコンポーネントに渡す追加のプロパティ（className、strokeWidthなど）。",
			},
			{
				name: "toggledIconProps",
				type: "React.ComponentProps<LucideIcon>",
				required: false,
				description:
					"トグル後のアイコンコンポーネントに渡す追加のプロパティ（className、strokeWidthなど）。",
			},
			{
				name: "tooltip",
				type: "string",
				required: false,
				description: "ホバー時に表示するtooltipテキスト。",
			},
			{
				name: "toggledTooltip",
				type: "string",
				required: false,
				description: "トグル後にホバー時に表示するtooltipテキスト。",
			},
			{
				name: "autoResetTimeout",
				type: "number",
				required: false,
				description:
					"トグル後、自動で元に戻るまでのミリ秒（例: 2000 = 2秒後）。指定しない場合は自動リセットしない。",
			},
		],
		dependencies: ["framer-motion", "lucide-react"],
		registryDependencies: ["button", "tooltip"],
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

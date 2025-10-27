import type { ComponentConfig } from "@/config/components";
import { DefaultDemo } from "./default-demo/DefaultDemo";
import { EllipsisPaginationDemo } from "./ellipsis-pagination-demo/EllipsisPaginationDemo";
import { MultiSelectComboboxDemo } from "./multi-select-combobox-demo/MultiSelectComboboxDemo";

/**
 * デモコンポーネントの型定義
 * 全てのデモコンポーネントはこのインターフェースに従う
 */
export type DemoComponent = React.ComponentType<{
	component: ComponentConfig;
}>;

/**
 * デモコンポーネントレジストリ
 * コンポーネントslugからデモコンポーネントへのマッピング
 *
 * 新しいコンポーネントを追加する場合:
 * 1. デモコンポーネントファイルを作成
 * 2. このレジストリに1行追加
 */
export const demoRegistry: Record<string, DemoComponent> = {
	"multi-select-combobox": MultiSelectComboboxDemo,
	"ellipsis-pagination": EllipsisPaginationDemo,
};

/**
 * コンポーネントslugに対応するデモコンポーネントを取得
 * レジストリに存在しない場合はDefaultDemoを返す
 *
 * @param slug - コンポーネントのslug識別子
 * @returns 対応するデモコンポーネント
 */
export function getDemoComponent(slug: string): DemoComponent {
	return demoRegistry[slug] ?? DefaultDemo;
}

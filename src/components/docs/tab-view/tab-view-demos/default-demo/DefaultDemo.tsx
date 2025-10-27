import type { ComponentConfig } from "@/config/components";

interface DefaultDemoProps {
	component: ComponentConfig;
}

/**
 * デフォルトデモコンポーネント
 * コンポーネント固有のデモが未実装の場合に表示
 */
export function DefaultDemo({ component }: DefaultDemoProps) {
	return (
		<div className="rounded-lg border bg-card p-8">
			<div className="mx-auto flex max-w-md items-center justify-center">
				<p className="text-muted-foreground">デモは準備中です</p>
			</div>
		</div>
	);
}

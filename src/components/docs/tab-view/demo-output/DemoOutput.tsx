interface DemoOutputProps {
	label: string;
	value: unknown;
}

/**
 * デモ出力の共通コンポーネント
 * デモの出力値を整形して表示
 */
export function DemoOutput({ label, value }: DemoOutputProps) {
	return (
		<div className="rounded-lg border bg-muted/50 p-4">
			<p className="mb-2 font-medium text-sm">{label}</p>
			<code className="font-mono text-sm">
				{typeof value === "string" ? value : JSON.stringify(value, null, 2)}
			</code>
		</div>
	);
}

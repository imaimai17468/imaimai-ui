interface DemoSectionProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

/**
 * デモセクションの共通コンポーネント
 * タイトル、説明、コンテンツを含むセクションを表示
 */
export function DemoSection({
	title,
	description,
	children,
}: DemoSectionProps) {
	return (
		<div className="space-y-4">
			<div>
				<h3 className="mb-1 font-semibold text-lg">{title}</h3>
				{description && (
					<p className="text-muted-foreground text-sm">{description}</p>
				)}
			</div>
			{children}
		</div>
	);
}

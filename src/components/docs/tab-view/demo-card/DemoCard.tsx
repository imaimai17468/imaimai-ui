import { cn } from "@/lib/utils";

interface DemoCardProps {
	children: React.ReactNode;
	centered?: boolean;
}

/**
 * デモカードの共通コンポーネント
 * デモコンポーネントを表示するカードコンテナ
 */
export function DemoCard({ children, centered = false }: DemoCardProps) {
	return (
		<div className="rounded-lg border bg-card p-8">
			<div
				className={cn(
					centered && "flex justify-center",
					!centered && "mx-auto max-w-md",
				)}
			>
				{children}
			</div>
		</div>
	);
}

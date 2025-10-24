import { DocsSidebar } from "@/components/docs/docs-sidebar";

interface ComponentsLayoutProps {
	children: React.ReactNode;
}

/**
 * コンポーネントドキュメントページのレイアウト
 * サイドバーナビゲーションを含む
 */
export default function ComponentsLayout({ children }: ComponentsLayoutProps) {
	return (
		<div className="flex w-full gap-8">
			{/* サイドバー */}
			<DocsSidebar />

			{/* メインコンテンツ */}
			<main className="flex-1 pt-4 pb-16">{children}</main>
		</div>
	);
}

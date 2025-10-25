"use client";

import { ComponentHeader } from "@/components/docs/component-header";
import { ComponentTabs } from "@/components/docs/component-tabs";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import type { ComponentConfig } from "@/config/components";

interface ComponentDetailPageProps {
	component: ComponentConfig;
}

/**
 * コンポーネント詳細ページ
 * サイドバーとメインコンテンツ（ヘッダー + タブ）を含むクライアントコンポーネント
 */
export function ComponentDetailPage({ component }: ComponentDetailPageProps) {
	return (
		<div className="flex w-full gap-8">
			<DocsSidebar />
			<main className="flex-1 space-y-8 pt-4 pb-16">
				<ComponentHeader component={component} />
				<ComponentTabs component={component} />
			</main>
		</div>
	);
}

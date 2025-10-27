"use client";

import type { ComponentConfig } from "@/config/components";
import { getDemoComponent } from "./tab-view-demos/demo-registry";

interface TabViewProps {
	component: ComponentConfig;
}

/**
 * コンポーネントデモタブ
 * 実際に動作するコンポーネントを表示
 *
 * このコンポーネントはオーケストレーターとして機能し、
 * 実際のデモロジックは各コンポーネント固有のデモファイルに委譲される
 */
export function TabView({ component }: TabViewProps) {
	const DemoComponent = getDemoComponent(component.slug);

	return (
		<div className="space-y-8">
			{/* デモ説明 */}
			<p className="text-muted-foreground text-sm">
				実際に動作するコンポーネントです。インタラクションを試してみてください。
			</p>
			<DemoComponent component={component} />
		</div>
	);
}

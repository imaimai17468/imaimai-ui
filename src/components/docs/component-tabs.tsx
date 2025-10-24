import { TabCode } from "@/components/docs/tab-code";
import { TabProps } from "@/components/docs/tab-props";
import { TabView } from "@/components/docs/tab-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ComponentConfig } from "@/config/components";

interface ComponentTabsProps {
	component: ComponentConfig;
}

/**
 * コンポーネントタブコンテナ
 * View / Code / Props の3つのタブを提供
 */
export function ComponentTabs({ component }: ComponentTabsProps) {
	return (
		<Tabs defaultValue="view" className="w-full">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="view">プレビュー</TabsTrigger>
				<TabsTrigger value="code">コード</TabsTrigger>
				<TabsTrigger value="props">Props</TabsTrigger>
			</TabsList>

			<TabsContent value="view" className="mt-6">
				<TabView component={component} />
			</TabsContent>

			<TabsContent value="code" className="mt-6">
				<TabCode component={component} />
			</TabsContent>

			<TabsContent value="props" className="mt-6">
				<TabProps component={component} />
			</TabsContent>
		</Tabs>
	);
}

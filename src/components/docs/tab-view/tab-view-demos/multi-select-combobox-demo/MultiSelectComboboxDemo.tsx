"use client";

import { useState } from "react";
import { MultiSelectCombobox } from "@/components/registry/multi-select-combobox";
import type { ComponentConfig } from "@/config/components";
import { DemoCard } from "../../demo-card/DemoCard";
import { DemoOutput } from "../../demo-output/DemoOutput";
import { DemoSection } from "../../demo-section/DemoSection";

interface MultiSelectComboboxDemoProps {
	component: ComponentConfig;
}

/**
 * MultiSelectCombobox デモコンポーネント
 * 全バッジ表示とバッジ数制限の2つのデモを表示
 */
export function MultiSelectComboboxDemo({
	component,
}: MultiSelectComboboxDemoProps) {
	// デモ用の状態管理
	const [selectedNoLimit, setSelectedNoLimit] = useState<string[]>(
		(component.demoProps.selected as string[]) || [],
	);
	// バッジ数制限デモ用：デフォルトで4つ選択
	const [selectedWithLimit, setSelectedWithLimit] = useState<string[]>([
		"react",
		"next",
		"vue",
		"angular",
	]);

	return (
		<>
			{/* デモ1: maxVisibleItems未指定（全バッジ表示） */}
			<DemoSection title="全バッジ表示">
				<DemoCard>
					<MultiSelectCombobox
						{...(component.demoProps as {
							options: Array<{ value: string; label: string }>;
							placeholder?: string;
							searchPlaceholder?: string;
						})}
						selected={selectedNoLimit}
						onChange={setSelectedNoLimit}
					/>
				</DemoCard>
				<DemoOutput label="選択されているアイテム:" value={selectedNoLimit} />
			</DemoSection>

			{/* デモ2: maxVisibleItems指定（+Nバッジ表示） */}
			<DemoSection
				title="バッジ数制限"
				description="maxVisibleItemsを指定することで、表示するバッジ数を制限できます。残りは&quot;+N&quot; バッジで表示されます。"
			>
				<DemoCard>
					<MultiSelectCombobox
						{...(component.demoProps as {
							options: Array<{ value: string; label: string }>;
							placeholder?: string;
							searchPlaceholder?: string;
						})}
						selected={selectedWithLimit}
						onChange={setSelectedWithLimit}
						maxVisibleItems={3}
					/>
				</DemoCard>
				<DemoOutput label="選択されているアイテム:" value={selectedWithLimit} />
			</DemoSection>
		</>
	);
}

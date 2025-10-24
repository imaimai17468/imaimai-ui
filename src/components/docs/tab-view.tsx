"use client";

import { useState } from "react";
import { MultiSelectCombobox } from "@/components/registry/multi-select-combobox";
import type { ComponentConfig } from "@/config/components";

interface TabViewProps {
	component: ComponentConfig;
}

/**
 * コンポーネントデモタブ
 * 実際に動作するコンポーネントを表示
 */
export function TabView({ component }: TabViewProps) {
	// デモ用の状態管理
	// 現在はMultiSelectComboboxのみサポート
	const [selected, setSelected] = useState<string[]>(
		(component.demoProps.selected as string[]) || [],
	);

	return (
		<div className="space-y-4">
			{/* デモ説明 */}
			<p className="text-muted-foreground text-sm">
				実際に動作するコンポーネントです。インタラクションを試してみてください。
			</p>

			{/* デモエリア */}
			<div className="rounded-lg border bg-card p-8">
				<div className="mx-auto flex max-w-md items-center justify-center">
					{component.slug === "multi-select-combobox" && (
						<MultiSelectCombobox
							{...(component.demoProps as {
								options: Array<{ value: string; label: string }>;
								placeholder?: string;
								searchPlaceholder?: string;
							})}
							selected={selected}
							onChange={setSelected}
						/>
					)}
				</div>
			</div>

			{/* 選択状態の表示 */}
			{component.slug === "multi-select-combobox" && (
				<div className="rounded-lg border bg-muted/50 p-4">
					<p className="mb-2 font-medium text-sm">選択されているアイテム:</p>
					<code className="font-mono text-sm">
						{JSON.stringify(selected, null, 2)}
					</code>
				</div>
			)}
		</div>
	);
}

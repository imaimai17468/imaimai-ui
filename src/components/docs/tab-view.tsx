"use client";

import { useState } from "react";
import { EllipsisPagination } from "@/components/registry/ellipsis-pagination";
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

	// EllipsisPagination用の状態管理（7ページ用）
	const [currentPageSmall, setCurrentPageSmall] = useState<number>(1);
	// EllipsisPagination用の状態管理（10ページ・デフォルト設定）
	const [currentPageDefault, setCurrentPageDefault] = useState<number>(
		(component.demoProps.currentPage as number) || 1,
	);
	// EllipsisPagination用の状態管理（siblingCount=2）
	const [currentPageSibling2, setCurrentPageSibling2] = useState<number>(1);
	// EllipsisPagination用の状態管理（boundaryCount=2）
	const [currentPageBoundary2, setCurrentPageBoundary2] = useState<number>(1);
	// EllipsisPagination用の状態管理（edgeCount=3）
	const [currentPageEdge3, setCurrentPageEdge3] = useState<number>(1);

	return (
		<div className="space-y-8">
			{/* デモ説明 */}
			<p className="text-muted-foreground text-sm">
				実際に動作するコンポーネントです。インタラクションを試してみてください。
			</p>

			{component.slug === "multi-select-combobox" ? (
				<>
					{/* デモ1: maxVisibleItems未指定（全バッジ表示） */}
					<div className="space-y-4">
						<h3 className="mb-2 font-semibold text-lg">全バッジ表示</h3>
						<div className="rounded-lg border bg-card p-8">
							<div className="mx-auto max-w-md">
								<MultiSelectCombobox
									{...(component.demoProps as {
										options: Array<{ value: string; label: string }>;
										placeholder?: string;
										searchPlaceholder?: string;
									})}
									selected={selectedNoLimit}
									onChange={setSelectedNoLimit}
								/>
							</div>
						</div>
						<div className="rounded-lg border bg-muted/50 p-4">
							<p className="mb-2 font-medium text-sm">
								選択されているアイテム:
							</p>
							<code className="font-mono text-sm">
								{JSON.stringify(selectedNoLimit, null, 2)}
							</code>
						</div>
					</div>

					{/* デモ2: maxVisibleItems指定（+Nバッジ表示） */}
					<div className="space-y-4">
						<div>
							<h3 className="mb-1 font-semibold text-lg">バッジ数制限</h3>
							<p className="text-muted-foreground text-sm">
								maxVisibleItemsを指定することで、表示するバッジ数を制限できます。残りは
								"+N" バッジで表示されます。
							</p>
						</div>
						<div className="rounded-lg border bg-card p-8">
							<div className="mx-auto max-w-md">
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
							</div>
						</div>
						<div className="rounded-lg border bg-muted/50 p-4">
							<p className="mb-2 font-medium text-sm">
								選択されているアイテム:
							</p>
							<code className="font-mono text-sm">
								{JSON.stringify(selectedWithLimit, null, 2)}
							</code>
						</div>
					</div>
				</>
			) : component.slug === "ellipsis-pagination" ? (
				// EllipsisPaginationデモ
				<div className="space-y-8">
					<div className="space-y-4">
						<div>
							<h3 className="mb-1 font-semibold text-lg">
								ページ数が少ない場合
							</h3>
							<p className="text-muted-foreground text-sm">
								省略記号が表示されず、すべてのページ番号が表示されます。
							</p>
						</div>
						<div className="flex justify-center rounded-lg border bg-card p-8">
							<EllipsisPagination
								currentPage={currentPageSmall}
								totalPages={7}
								onPageChange={setCurrentPageSmall}
							/>
						</div>
						<div className="rounded-lg border bg-muted/50 p-4">
							<p className="mb-2 font-medium text-sm">現在のページ:</p>
							<code className="font-mono text-sm">{currentPageSmall}</code>
						</div>
					</div>

					<div className="space-y-4">
						<div>
							<h3 className="mb-1 font-semibold text-lg">ページ数が多い場合</h3>
							<p className="text-muted-foreground text-sm">
								省略記号（...）が表示され、現在ページ周辺とページ境界のみが表示されます。
							</p>
						</div>
						<div className="flex justify-center rounded-lg border bg-card p-8">
							<EllipsisPagination
								currentPage={currentPageDefault}
								totalPages={10}
								onPageChange={setCurrentPageDefault}
							/>
						</div>
						<div className="rounded-lg border bg-muted/50 p-4">
							<p className="mb-2 font-medium text-sm">現在のページ:</p>
							<code className="font-mono text-sm">{currentPageDefault}</code>
						</div>
					</div>

					<div className="space-y-4">
						<div>
							<h3 className="mb-1 font-semibold text-lg">siblingCount</h3>
							<p className="text-muted-foreground text-sm">
								現在ページの前後に表示するページ数を指定します。この例では2に設定。
							</p>
						</div>
						<div className="flex justify-center rounded-lg border bg-card p-8">
							<EllipsisPagination
								currentPage={currentPageSibling2}
								totalPages={10}
								onPageChange={setCurrentPageSibling2}
								siblingCount={2}
								edgeCount={0}
							/>
						</div>
						<div className="rounded-lg border bg-muted/50 p-4">
							<p className="mb-2 font-medium text-sm">現在のページ:</p>
							<code className="font-mono text-sm">{currentPageSibling2}</code>
						</div>
					</div>

					<div className="space-y-4">
						<div>
							<h3 className="mb-1 font-semibold text-lg">boundaryCount</h3>
							<p className="text-muted-foreground text-sm">
								最初と最後に表示するページ数を指定します。この例では2に設定。
							</p>
						</div>
						<div className="flex justify-center rounded-lg border bg-card p-8">
							<EllipsisPagination
								currentPage={currentPageBoundary2}
								totalPages={10}
								onPageChange={setCurrentPageBoundary2}
								boundaryCount={2}
								edgeCount={2}
							/>
						</div>
						<div className="rounded-lg border bg-muted/50 p-4">
							<p className="mb-2 font-medium text-sm">現在のページ:</p>
							<code className="font-mono text-sm">{currentPageBoundary2}</code>
						</div>
					</div>

					<div className="space-y-4">
						<div>
							<h3 className="mb-1 font-semibold text-lg">edgeCount</h3>
							<p className="text-muted-foreground text-sm">
								端（最初または最後のページ）にいる時に表示するページ数を指定します。この例では3に設定。
							</p>
						</div>
						<div className="flex justify-center rounded-lg border bg-card p-8">
							<EllipsisPagination
								currentPage={currentPageEdge3}
								totalPages={10}
								onPageChange={setCurrentPageEdge3}
								edgeCount={3}
							/>
						</div>
						<div className="rounded-lg border bg-muted/50 p-4">
							<p className="mb-2 font-medium text-sm">現在のページ:</p>
							<code className="font-mono text-sm">{currentPageEdge3}</code>
						</div>
					</div>
				</div>
			) : (
				// 他のコンポーネント用のフォールバック
				<div className="rounded-lg border bg-card p-8">
					<div className="mx-auto flex max-w-md items-center justify-center">
						<p className="text-muted-foreground">デモは準備中です</p>
					</div>
				</div>
			)}
		</div>
	);
}

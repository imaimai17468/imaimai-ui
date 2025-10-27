"use client";

import { useState } from "react";
import { EllipsisPagination } from "@/components/registry/ellipsis-pagination";
import type { ComponentConfig } from "@/config/components";
import { DemoCard } from "../../demo-card/DemoCard";
import { DemoOutput } from "../../demo-output/DemoOutput";
import { DemoSection } from "../../demo-section/DemoSection";

interface EllipsisPaginationDemoProps {
	component: ComponentConfig;
}

/**
 * EllipsisPagination デモコンポーネント
 * 5つの異なる設定パターンのデモを表示
 */
export function EllipsisPaginationDemo({
	component,
}: EllipsisPaginationDemoProps) {
	// EllipsisPagination用の状態管理（7ページ用）
	const [currentPageSmall, setCurrentPageSmall] = useState<number>(1);
	// EllipsisPagination用の状態管理（10ページ・デフォルト設定）
	const [currentPageDefault, setCurrentPageDefault] = useState<number>(
		(component.demoProps.currentPage as number) || 1,
	);
	// EllipsisPagination用の状態管理（siblingCount=2）
	const [currentPageSibling2, setCurrentPageSibling2] = useState<number>(5);
	// EllipsisPagination用の状態管理（boundaryCount=2）
	const [currentPageBoundary2, setCurrentPageBoundary2] = useState<number>(5);
	// EllipsisPagination用の状態管理（edgeCount=3）
	const [currentPageEdge3, setCurrentPageEdge3] = useState<number>(1);

	return (
		<div className="space-y-8">
			{/* デモ1: ページ数が少ない場合 */}
			<DemoSection
				title="ページ数が少ない場合"
				description="省略記号が表示されず、すべてのページ番号が表示されます。"
			>
				<DemoCard centered>
					<EllipsisPagination
						currentPage={currentPageSmall}
						totalPages={7}
						onPageChange={setCurrentPageSmall}
					/>
				</DemoCard>
				<DemoOutput label="現在のページ:" value={currentPageSmall} />
			</DemoSection>

			{/* デモ2: ページ数が多い場合 */}
			<DemoSection
				title="ページ数が多い場合"
				description="省略記号（...）が表示され、現在ページ周辺とページ境界のみが表示されます。"
			>
				<DemoCard centered>
					<EllipsisPagination
						currentPage={currentPageDefault}
						totalPages={10}
						onPageChange={setCurrentPageDefault}
					/>
				</DemoCard>
				<DemoOutput label="現在のページ:" value={currentPageDefault} />
			</DemoSection>

			{/* デモ3: siblingCount */}
			<DemoSection
				title="siblingCount"
				description="現在ページの前後に表示するページ数を指定します。この例では2に設定。"
			>
				<DemoCard centered>
					<EllipsisPagination
						currentPage={currentPageSibling2}
						totalPages={10}
						onPageChange={setCurrentPageSibling2}
						siblingCount={2}
						edgeCount={0}
					/>
				</DemoCard>
				<DemoOutput label="現在のページ:" value={currentPageSibling2} />
			</DemoSection>

			{/* デモ4: boundaryCount */}
			<DemoSection
				title="boundaryCount"
				description="最初と最後に表示するページ数を指定します。この例では2に設定。"
			>
				<DemoCard centered>
					<EllipsisPagination
						currentPage={currentPageBoundary2}
						totalPages={10}
						onPageChange={setCurrentPageBoundary2}
						boundaryCount={2}
					/>
				</DemoCard>
				<DemoOutput label="現在のページ:" value={currentPageBoundary2} />
			</DemoSection>

			{/* デモ5: edgeCount */}
			<DemoSection
				title="edgeCount"
				description="端（最初または最後のページ）にいる時に表示するページ数を指定します。この例では3に設定。"
			>
				<DemoCard centered>
					<EllipsisPagination
						currentPage={currentPageEdge3}
						totalPages={10}
						onPageChange={setCurrentPageEdge3}
						edgeCount={3}
					/>
				</DemoCard>
				<DemoOutput label="現在のページ:" value={currentPageEdge3} />
			</DemoSection>
		</div>
	);
}

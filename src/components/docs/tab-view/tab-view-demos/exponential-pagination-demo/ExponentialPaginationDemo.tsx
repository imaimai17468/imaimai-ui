"use client";

import { useState } from "react";
import { ExponentialPagination } from "@/components/registry/exponential-pagination";
import type { ComponentConfig } from "@/config/components";
import { DemoCard } from "../../demo-card/DemoCard";
import { DemoOutput } from "../../demo-output/DemoOutput";
import { DemoSection } from "../../demo-section/DemoSection";

interface ExponentialPaginationDemoProps {
	component: ComponentConfig;
}

/**
 * ExponentialPagination デモコンポーネント
 * 3つの異なるページ数パターンのデモを表示
 */
export function ExponentialPaginationDemo({
	component,
}: ExponentialPaginationDemoProps) {
	// デモ1: ページ1から開始（500ページ）
	const [currentPage1, setCurrentPage1] = useState<number>(1);

	// デモ2: ページ256（中間ページ）
	const [currentPage2, setCurrentPage2] = useState<number>(
		(component.demoProps.currentPage as number) || 256,
	);

	// デモ3: 最終ページ付近（500ページ）
	const [currentPage3, setCurrentPage3] = useState<number>(500);

	const totalPages = 500;

	return (
		<div className="space-y-8">
			{/* デモ1: 最初のページ */}
			<DemoSection
				title="最初のページ"
				description="現在ページの前後3ページは連続で表示され、その外側は2の累乗（4, 8, 16, 32...）でジャンプします。"
			>
				<DemoCard centered>
					<ExponentialPagination
						currentPage={currentPage1}
						totalPages={totalPages}
						onPageChange={setCurrentPage1}
					/>
				</DemoCard>
				<DemoOutput label="現在のページ:" value={currentPage1} />
			</DemoSection>

			{/* デモ2: 中間ページ */}
			<DemoSection
				title="中間ページ"
				description="現在ページの前後3ページは連続で表示され、それ以外は2の累乗でジャンプします。"
			>
				<DemoCard centered>
					<ExponentialPagination
						currentPage={currentPage2}
						totalPages={totalPages}
						onPageChange={setCurrentPage2}
					/>
				</DemoCard>
				<DemoOutput label="現在のページ:" value={currentPage2} />
			</DemoSection>

			{/* デモ3: 最終ページ付近 */}
			<DemoSection
				title="最終ページ付近"
				description="最終ページ付近では、前方の連続ページと2の累乗のページが表示されます。"
			>
				<DemoCard centered>
					<ExponentialPagination
						currentPage={currentPage3}
						totalPages={totalPages}
						onPageChange={setCurrentPage3}
					/>
				</DemoCard>
				<DemoOutput label="現在のページ:" value={currentPage3} />
			</DemoSection>
		</div>
	);
}

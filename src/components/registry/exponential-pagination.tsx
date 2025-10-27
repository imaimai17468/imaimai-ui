"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export interface ExponentialPaginationProps {
	/** 現在のページ（1-indexed） */
	currentPage: number;
	/** 総ページ数 */
	totalPages: number;
	/** ページ変更時のコールバック */
	onPageChange: (page: number) => void;
	/** 現在ページの前後に表示する連続ページ数（デフォルト: 3） */
	siblingCount?: number;
}

type PageItem =
	| { type: "page"; value: number }
	| { type: "ellipsis"; id: string };

/**
 * 指数的なページ番号の配列を生成する
 * 例: 1, 2, 3, 4, 8, 16, 32, 64, ...（4以降は2の累乗）
 * 現在ページの前後はsiblingCount分連続で表示
 */
function generateExponentialPages(
	currentPage: number,
	totalPages: number,
	siblingCount: number,
): PageItem[] {
	const pages = new Set<number>();

	// 1, 2, 3 は常に表示
	pages.add(1);
	if (totalPages >= 2) pages.add(2);
	if (totalPages >= 3) pages.add(3);

	// 2の累乗のページ（4以降: 4, 8, 16, 32, 64, ...）
	let power = 2; // 2^2 = 4 から開始
	while (2 ** power <= totalPages) {
		pages.add(2 ** power);
		power++;
	}

	// 現在ページの前後siblingCount分を連続表示
	for (
		let i = Math.max(1, currentPage - siblingCount);
		i <= Math.min(totalPages, currentPage + siblingCount);
		i++
	) {
		pages.add(i);
	}

	// 最後のページは常に表示
	pages.add(totalPages);

	// ソートして配列に変換
	const sortedPages = Array.from(pages).sort((a, b) => a - b);

	// 省略記号を挿入（連続していない箇所）
	const result: PageItem[] = [];
	for (let i = 0; i < sortedPages.length; i++) {
		if (i > 0 && sortedPages[i] - sortedPages[i - 1] > 1) {
			result.push({ type: "ellipsis", id: `ellipsis-${i}` });
		}
		result.push({ type: "page", value: sortedPages[i] });
	}

	return result;
}

/**
 * 指数的なページジャンプを持つPaginationコンポーネント
 * AtCoderのstandingsページのようなページ数が多い場合に適している
 *
 * @example
 * ```tsx
 * <ExponentialPagination
 *   currentPage={256}
 *   totalPages={500}
 *   onPageChange={(page) => console.log(page)}
 *   siblingCount={3}
 * />
 * ```
 */
export function ExponentialPagination({
	currentPage,
	totalPages,
	onPageChange,
	siblingCount = 3,
}: ExponentialPaginationProps) {
	const pages = generateExponentialPages(currentPage, totalPages, siblingCount);

	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<Pagination>
			<PaginationContent>
				{/* 前へボタン */}
				<PaginationItem>
					<PaginationPrevious
						onClick={handlePrevious}
						aria-disabled={currentPage === 1}
						className={
							currentPage === 1 ? "pointer-events-none opacity-50" : ""
						}
					/>
				</PaginationItem>

				{/* ページ番号 */}
				{pages.map((item) => (
					<PaginationItem
						key={
							item.type === "page"
								? `page-${item.value}`
								: `ellipsis-${item.id}`
						}
					>
						{item.type === "ellipsis" ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink
								onClick={() => onPageChange(item.value)}
								isActive={item.value === currentPage}
							>
								{item.value}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				{/* 次へボタン */}
				<PaginationItem>
					<PaginationNext
						onClick={handleNext}
						aria-disabled={currentPage === totalPages}
						className={
							currentPage === totalPages ? "pointer-events-none opacity-50" : ""
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

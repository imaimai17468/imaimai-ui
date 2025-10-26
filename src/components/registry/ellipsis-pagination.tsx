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

export interface EllipsisPaginationProps {
	/** 現在のページ（1-indexed） */
	currentPage: number;
	/** 総ページ数 */
	totalPages: number;
	/** ページ変更時のコールバック */
	onPageChange: (page: number) => void;
	/** 現在ページの前後に表示するページ数 */
	siblingCount?: number;
	/** 最初と最後に表示するページ数 */
	boundaryCount?: number;
}

type PageItem =
	| { type: "page"; value: number }
	| { type: "ellipsis"; id: string };

/**
 * ページ番号の配列を生成する
 * 例: generatePageNumbers(50, 100, 1, 1) => [1, null, 49, 50, 51, null, 100]
 *     null は省略記号（...）を表す
 */
function generatePageNumbers(
	currentPage: number,
	totalPages: number,
	siblingCount: number,
	boundaryCount: number,
): PageItem[] {
	// 総ページ数が少ない場合は全て表示
	const totalNumbers = siblingCount * 2 + 1 + boundaryCount * 2 + 2; // +2 は省略記号の最大数
	if (totalPages <= totalNumbers) {
		return Array.from({ length: totalPages }, (_, i) => ({
			type: "page",
			value: i + 1,
		}));
	}

	// 最初と最後のページ番号
	const firstPages = Array.from({ length: boundaryCount }, (_, i) => ({
		type: "page" as const,
		value: i + 1,
	}));
	const lastPages = Array.from({ length: boundaryCount }, (_, i) => ({
		type: "page" as const,
		value: totalPages - boundaryCount + i + 1,
	}));

	// 現在ページ周辺のページ番号
	const startPage = Math.max(boundaryCount + 1, currentPage - siblingCount);
	const endPage = Math.min(
		totalPages - boundaryCount,
		currentPage + siblingCount,
	);

	// middlePagesを生成（firstPages/lastPagesと重複しない範囲）
	const middlePages: PageItem[] = [];
	for (let i = startPage; i <= endPage; i++) {
		// boundaryCountの範囲と重複しないページのみ追加
		if (i > boundaryCount && i <= totalPages - boundaryCount) {
			middlePages.push({
				type: "page" as const,
				value: i,
			});
		}
	}

	// 省略記号が必要か判定
	const hasLeftEllipsis = startPage > boundaryCount + 1;
	const hasRightEllipsis = endPage < totalPages - boundaryCount;

	// ページ番号配列を構築
	const pages: PageItem[] = [...firstPages];

	if (hasLeftEllipsis) {
		pages.push({ type: "ellipsis", id: "left" }); // 省略記号
	}

	pages.push(...middlePages);

	if (hasRightEllipsis) {
		pages.push({ type: "ellipsis", id: "right" }); // 省略記号
	}

	pages.push(...lastPages);

	return pages;
}

/**
 * ページ数が多い時に自動的に省略記号（...）を表示するPaginationコンポーネント
 *
 * @example
 * ```tsx
 * <EllipsisPagination
 *   currentPage={5}
 *   totalPages={100}
 *   onPageChange={(page) => console.log(page)}
 *   siblingCount={1}
 *   boundaryCount={1}
 * />
 * ```
 */
export function EllipsisPagination({
	currentPage,
	totalPages,
	onPageChange,
	siblingCount = 1,
	boundaryCount = 3,
}: EllipsisPaginationProps) {
	const pages = generatePageNumbers(
		currentPage,
		totalPages,
		siblingCount,
		boundaryCount,
	);

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

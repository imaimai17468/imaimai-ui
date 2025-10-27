"use client";

import {
	Pagination,
	PaginationContent,
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

/**
 * 指数的なページ番号の配列を生成する（省略記号なし）
 * 現在ページから累積的に2の累乗でジャンプ
 */
function generateExponentialPages(
	currentPage: number,
	totalPages: number,
	siblingCount: number,
): number[] {
	const pages = new Set<number>();

	// 1と最終ページは常に表示
	pages.add(1);
	pages.add(totalPages);

	// 現在ページの前後siblingCount分を連続表示
	const rangeStart = Math.max(1, currentPage - siblingCount);
	const rangeEnd = Math.min(totalPages, currentPage + siblingCount);
	for (let i = rangeStart; i <= rangeEnd; i++) {
		pages.add(i);
	}

	// 前方向: rangeStartから累積的に2の累乗を引いていく
	let prevPage = rangeStart;
	let prevPower = 2; // 2^2 = 4 から開始
	while (prevPage > 1) {
		prevPage = prevPage - 2 ** prevPower;
		if (prevPage >= 1) {
			pages.add(prevPage);
		}
		prevPower++;
	}

	// 後方向: rangeEndから累積的に2の累乗を足していく
	let nextPage = rangeEnd;
	let nextPower = 2; // 2^2 = 4 から開始
	while (nextPage < totalPages) {
		nextPage = nextPage + 2 ** nextPower;
		if (nextPage <= totalPages) {
			pages.add(nextPage);
		}
		nextPower++;
	}

	// ソートして配列に変換（省略記号なし）
	return Array.from(pages).sort((a, b) => a - b);
}

/**
 * 指数的なページジャンプを持つPaginationコンポーネント（省略記号なし）
 * AtCoderのstandingsページのようなページ数が多い場合に適している
 * 現在ページから累積的に2の累乗でジャンプ
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
			{/* モバイルレイアウト */}
			<div className="flex w-full flex-col gap-2 sm:hidden">
				{/* Prev/Nextボタン */}
				<div className="grid grid-cols-2 gap-2">
					<PaginationPrevious
						onClick={handlePrevious}
						aria-disabled={currentPage === 1}
						className={
							currentPage === 1 ? "pointer-events-none opacity-50" : ""
						}
					/>
					<PaginationNext
						onClick={handleNext}
						aria-disabled={currentPage === totalPages}
						className={`justify-self-end ${
							currentPage === totalPages ? "pointer-events-none opacity-50" : ""
						}`}
					/>
				</div>
				{/* ページ番号（grid表示） */}
				<div className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-1">
					{pages.map((page) => (
						<PaginationLink
							key={`page-${page}`}
							onClick={() => onPageChange(page)}
							isActive={page === currentPage}
							className="justify-center"
						>
							{page}
						</PaginationLink>
					))}
				</div>
			</div>

			{/* デスクトップレイアウト */}
			<PaginationContent className="hidden sm:flex">
				<PaginationItem>
					<PaginationPrevious
						onClick={handlePrevious}
						aria-disabled={currentPage === 1}
						className={
							currentPage === 1 ? "pointer-events-none opacity-50" : ""
						}
					/>
				</PaginationItem>

				{pages.map((page) => (
					<PaginationItem key={`page-${page}`}>
						<PaginationLink
							onClick={() => onPageChange(page)}
							isActive={page === currentPage}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

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

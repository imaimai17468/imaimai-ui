"use client";

import { GripVertical } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ImageComparisonSliderProps
	extends Omit<React.ComponentProps<"div">, "children"> {
	/** 1枚目の画像URL（左側/ビフォー） */
	beforeImage: string;
	/** 2枚目の画像URL（右側/アフター） */
	afterImage: string;
	/** 1枚目の画像のラベル */
	beforeLabel?: string;
	/** 2枚目の画像のラベル */
	afterLabel?: string;
	/** 初期スライダー位置（0-100のパーセンテージ、デフォルト: 50） */
	initialPosition?: number;
	/** 1枚目の画像のalt属性 */
	beforeAlt?: string;
	/** 2枚目の画像のalt属性 */
	afterAlt?: string;
	/** スライダー（縦線）に適用する追加のCSSクラス */
	sliderClassName?: string;
	/** ハンドル（円形ボタン）に適用する追加のCSSクラス */
	handleClassName?: string;
}

/**
 * 画像比較スライダーコンポーネント
 * 2枚の画像を重ねて表示し、スライダーをドラッグして比較できる
 *
 * @example
 * ```tsx
 * <ImageComparisonSlider
 *   beforeImage="/before.jpg"
 *   afterImage="/after.jpg"
 *   beforeLabel="Before"
 *   afterLabel="After"
 * />
 * ```
 */
export function ImageComparisonSlider({
	beforeImage,
	afterImage,
	beforeLabel,
	afterLabel,
	initialPosition = 50,
	beforeAlt = "Before image",
	afterAlt = "After image",
	sliderClassName,
	handleClassName,
	className,
	...props
}: ImageComparisonSliderProps) {
	// スライダーの位置（0-100のパーセンテージ）
	const [sliderPosition, setSliderPosition] = React.useState(initialPosition);
	// ドラッグ中かどうか
	const [isDragging, setIsDragging] = React.useState(false);
	// コンテナの参照
	const containerRef = React.useRef<HTMLDivElement>(null);

	/**
	 * マウスまたはタッチイベントからスライダー位置を計算
	 */
	const updateSliderPosition = React.useCallback((clientX: number) => {
		if (!containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		const x = clientX - rect.left;
		const percentage = (x / rect.width) * 100;

		// 0-100の範囲に制限
		const clampedPercentage = Math.max(0, Math.min(100, percentage));
		setSliderPosition(clampedPercentage);
	}, []);

	/**
	 * マウスドラッグ開始
	 */
	const handleMouseDown = React.useCallback(() => {
		setIsDragging(true);
	}, []);

	/**
	 * マウス移動
	 */
	const handleMouseMove = React.useCallback(
		(e: MouseEvent) => {
			if (!isDragging) return;
			updateSliderPosition(e.clientX);
		},
		[isDragging, updateSliderPosition],
	);

	/**
	 * マウスドラッグ終了
	 */
	const handleMouseUp = React.useCallback(() => {
		setIsDragging(false);
	}, []);

	/**
	 * タッチドラッグ開始
	 */
	const handleTouchStart = React.useCallback(() => {
		setIsDragging(true);
	}, []);

	/**
	 * タッチ移動
	 */
	const handleTouchMove = React.useCallback(
		(e: TouchEvent) => {
			if (!isDragging || !e.touches[0]) return;
			updateSliderPosition(e.touches[0].clientX);
		},
		[isDragging, updateSliderPosition],
	);

	/**
	 * キーボード操作対応（左右矢印キー）
	 */
	const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			setSliderPosition((prev) => Math.max(0, prev - 1));
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			setSliderPosition((prev) => Math.min(100, prev + 1));
		}
	}, []);

	// マウスイベントのグローバルリスナーを設定
	React.useEffect(() => {
		if (isDragging) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
			window.addEventListener("touchmove", handleTouchMove);
			window.addEventListener("touchend", handleMouseUp);

			return () => {
				window.removeEventListener("mousemove", handleMouseMove);
				window.removeEventListener("mouseup", handleMouseUp);
				window.removeEventListener("touchmove", handleTouchMove);
				window.removeEventListener("touchend", handleMouseUp);
			};
		}
	}, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

	return (
		<div
			ref={containerRef}
			className={cn(
				"relative w-full select-none overflow-hidden",
				// アスペクト比を維持（デフォルト16:9）
				"aspect-video",
				className,
			)}
			{...props}
		>
			{/* 2枚目の画像（下層・右側・アフター） */}
			<div className="absolute inset-0">
				{/* biome-ignore lint/performance/noImgElement: コンポーネントライブラリとして外部URLを受け取るためimgタグを使用 */}
				<img
					src={afterImage}
					alt={afterAlt}
					className="size-full object-cover"
					draggable={false}
				/>
				{afterLabel && (
					<div className="absolute top-4 right-4 rounded-md bg-background/80 px-3 py-1 font-medium text-sm backdrop-blur-sm">
						{afterLabel}
					</div>
				)}
			</div>

			{/* 1枚目の画像（上層・左側・ビフォー） */}
			<div
				className="absolute inset-0"
				style={{
					clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
				}}
			>
				{/* biome-ignore lint/performance/noImgElement: コンポーネントライブラリとして外部URLを受け取るためimgタグを使用 */}
				<img
					src={beforeImage}
					alt={beforeAlt}
					className="size-full object-cover"
					draggable={false}
				/>
				{beforeLabel && (
					<div className="absolute top-4 left-4 rounded-md bg-background/80 px-3 py-1 font-medium text-sm backdrop-blur-sm">
						{beforeLabel}
					</div>
				)}
			</div>

			{/* スライダー（縦線とハンドル） */}
			<div
				className={cn(
					"absolute top-0 bottom-0 w-1 cursor-ew-resize bg-primary",
					sliderClassName,
				)}
				style={{ left: `${sliderPosition}%` }}
			>
				{/* ドラッグハンドル */}
				<div
					role="slider"
					aria-label="Image comparison slider"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={Math.round(sliderPosition)}
					tabIndex={0}
					onMouseDown={handleMouseDown}
					onTouchStart={handleTouchStart}
					onKeyDown={handleKeyDown}
					className={cn(
						"-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2",
						"size-10 rounded-full bg-primary",
						"flex items-center justify-center",
						"shadow-lg",
						"transition-transform hover:scale-110 active:scale-95",
						"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						isDragging && "scale-110",
						handleClassName,
					)}
				>
					<GripVertical className="size-5 text-primary-foreground" />
				</div>
			</div>
		</div>
	);
}

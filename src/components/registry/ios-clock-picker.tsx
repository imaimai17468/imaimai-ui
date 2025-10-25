"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * iOS風時計ピッカーのProps
 */
export interface IosClockPickerProps {
	/** 選択された時刻 (HH:mm形式) */
	value: string;
	/** 時刻変更時のコールバック */
	onChange: (value: string) => void;
	/** カスタムクラス名 */
	className?: string;
}

/**
 * 単一ホイールのProps
 */
interface WheelProps {
	/** 表示する項目の配列 */
	items: string[];
	/** 現在選択されているインデックス */
	selectedIndex: number;
	/** 選択変更時のコールバック */
	onSelect: (index: number) => void;
	/** カスタムクラス名 */
	className?: string;
	/** 無限ループを有効化 */
	enableInfiniteLoop?: boolean;
	/** アイテムの高さ（px）- 指定しない場合はデフォルト値 */
	itemHeight?: number;
}

/** アイテムの高さ（px） */
const ITEM_HEIGHT = 48;
/** 円筒の半径 - CodePenと同じ */
const CYLINDER_RADIUS = 150;
/** perspective値 - CodePenと同じ */
const PERSPECTIVE = 60;
/** wheelのtranslateZ - CodePenと同じ */
const WHEEL_TRANSLATE_Z = 146;

/**
 * スクロールホイールコンポーネント（CodePenと同じアプローチ）
 */
function Wheel({
	items,
	selectedIndex,
	onSelect,
	className,
	enableInfiniteLoop = true,
	itemHeight = ITEM_HEIGHT,
}: WheelProps) {
	const itemsLength = items.length;
	// 各アイテムの角度（アイテム数に基づく）
	const itemAngle = 360 / itemsLength;

	// 単一のy値（ドラッグと表示で共通）
	const y = useMotionValue(-selectedIndex * itemHeight);
	const [isDragging, setIsDragging] = useState(false);
	const [startY, setStartY] = useState(0);

	// y値からrotation角度への変換
	const rotation = useTransform(y, (latest) => {
		const index = -latest / itemHeight;
		return index * itemAngle;
	});

	// wheelコンテナのtransform文字列
	const wheelTransform = useTransform(rotation, (r) => {
		return `translateZ(${WHEEL_TRANSLATE_Z}px) rotateX(${-r}deg)`;
	});

	// 選択インデックスが変わったときにアニメーション
	useEffect(() => {
		if (!isDragging) {
			const targetY = -selectedIndex * itemHeight;
			animate(y, targetY, {
				type: "spring",
				stiffness: 300,
				damping: 30,
			});
		}
	}, [selectedIndex, y, isDragging, itemHeight]);

	// ポインターダウン
	const handlePointerDown = (e: React.PointerEvent) => {
		setIsDragging(true);
		setStartY(e.clientY);
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	};

	// ポインタームーブ
	const handlePointerMove = (e: React.PointerEvent) => {
		if (!isDragging) return;
		const deltaY = e.clientY - startY;
		setStartY(e.clientY);
		// 下にドラッグ（正のdeltaY）で数値が増える方向に回転
		y.set(y.get() - deltaY);
	};

	// ポインターアップ
	const handlePointerUp = () => {
		if (!isDragging) return;

		const currentY = y.get();
		let index = Math.round(-currentY / itemHeight);

		if (enableInfiniteLoop) {
			// 無限ループ：Modulo演算でインデックスを正規化
			index = ((index % itemsLength) + itemsLength) % itemsLength;
		} else {
			// 通常モード：境界内にクランプ
			index = Math.max(0, Math.min(itemsLength - 1, index));
		}

		// スナップアニメーション
		const targetY = -index * itemHeight;
		animate(y, targetY, {
			type: "spring",
			stiffness: 300,
			damping: 30,
		});

		// 選択を更新
		if (index !== selectedIndex) {
			onSelect(index);
		}

		setIsDragging(false);
	};

	return (
		<div
			className={cn("relative h-64 w-24", "touch-none select-none", className)}
			style={{
				perspective: `${PERSPECTIVE}px`,
				perspectiveOrigin: "50% 50%",
				clipPath: "inset(0 0 0 0)",
				maskImage:
					"linear-gradient(transparent, black 20%, black 80%, transparent)",
				WebkitMaskImage:
					"linear-gradient(transparent, black 20%, black 80%, transparent)",
			}}
		>
			{/* 選択エリアの背景バー */}
			<div className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-0 left-0 z-0 h-12 rounded-md bg-muted" />

			{/* Wheelコンテナ（回転するが位置は固定） */}
			<motion.div
				className="pointer-events-none absolute top-1/2 right-0 left-0"
				style={{
					height: `${itemHeight}px`,
					marginTop: `-${itemHeight / 2}px`,
					transformStyle: "preserve-3d",
					transform: wheelTransform,
				}}
			>
				{/* すべてのアイテムを固定位置に配置 */}
				{items.map((item, index) => {
					// 回転と一致させるため、indexに直接itemAngleを掛ける
					const angle = index * itemAngle;

					return (
						<div
							key={`${index}-${item}`}
							className="pointer-events-none absolute inset-0 flex items-center justify-center"
							style={{
								height: `${itemHeight}px`,
								transformStyle: "preserve-3d",
								backfaceVisibility: "hidden",
								transform: `rotateX(${angle}deg) translateZ(${-CYLINDER_RADIUS}px)`,
							}}
						>
							<span className="font-medium text-lg">{item}</span>
						</div>
					);
				})}
			</motion.div>

			{/* ドラッグ用の透明オーバーレイ */}
			<div
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerCancel={handlePointerUp}
				className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
			/>
		</div>
	);
}

/**
 * iOS風時計ピッカーコンポーネント
 */
export function IosClockPicker({
	value,
	onChange,
	className,
}: IosClockPickerProps) {
	// 時刻をパース
	const [hours, minutes] = value.split(":").map(Number);
	const isPM = hours >= 12;

	// 12時間形式に変換
	const displayHours = hours % 12 || 12;

	// 各ホイールのデータを生成
	const hourItems = Array.from({ length: 12 }, (_, i) =>
		String(i + 1).padStart(2, "0"),
	);
	const minuteItems = Array.from({ length: 60 }, (_, i) =>
		String(i).padStart(2, "0"),
	);
	const periodItems = ["AM", "PM"];

	// 選択変更ハンドラー
	const handleHourChange = (index: number) => {
		// index: 0-11, displayHours: 1-12
		const newDisplayHours = index + 1;
		// 24時間形式に変換
		const hour24 = isPM
			? newDisplayHours === 12
				? 12
				: newDisplayHours + 12
			: newDisplayHours === 12
				? 0
				: newDisplayHours;
		onChange(
			`${String(hour24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
		);
	};

	const handleMinuteChange = (index: number) => {
		onChange(
			`${String(hours).padStart(2, "0")}:${String(index).padStart(2, "0")}`,
		);
	};

	const handlePeriodChange = (index: number) => {
		const newIsPM = index === 1;
		const newHours = newIsPM
			? displayHours === 12
				? 12
				: displayHours + 12
			: displayHours === 12
				? 0
				: displayHours;
		onChange(
			`${String(newHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
		);
	};

	return (
		<div
			className={cn(
				"relative inline-flex items-center justify-center gap-0.5",
				className,
			)}
		>
			{/* 時 */}
			<Wheel
				items={hourItems}
				selectedIndex={displayHours - 1}
				onSelect={handleHourChange}
				enableInfiniteLoop={true}
			/>

			{/* 分 */}
			<Wheel
				items={minuteItems}
				selectedIndex={minutes}
				onSelect={handleMinuteChange}
				enableInfiniteLoop={true}
				itemHeight={60}
			/>

			{/* AM/PM */}
			<Wheel
				items={periodItems}
				selectedIndex={isPM ? 1 : 0}
				onSelect={handlePeriodChange}
				className="w-20"
				enableInfiniteLoop={true}
			/>
		</div>
	);
}

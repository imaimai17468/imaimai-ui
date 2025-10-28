"use client";

import type { VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { useState } from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface IconTransitionToggleProps
	extends Omit<
		React.ComponentProps<"button"> &
			VariantProps<typeof buttonVariants> & {
				asChild?: boolean;
			},
		"children" | "onClick"
	> {
	/** 最初に表示するアイコン */
	icon: LucideIcon;
	/** トグル時に表示するアイコン */
	toggledIcon: LucideIcon;
	/** 現在の状態（true: toggledIcon表示、false: icon表示） */
	isToggled: boolean;
	/** トグル時のコールバック */
	onToggle: () => void;
	/** アイコンのサイズ（デフォルト: 24px） */
	iconSize?: number;
	/** アイコンコンポーネントに渡す追加のプロパティ */
	iconProps?: React.ComponentProps<LucideIcon>;
	/** トグル後のアイコンコンポーネントに渡す追加のプロパティ */
	toggledIconProps?: React.ComponentProps<LucideIcon>;
	/** ホバー時に表示するtooltipテキスト */
	tooltip?: string;
	/** トグル後にホバー時に表示するtooltipテキスト */
	toggledTooltip?: string;
}

/**
 * アイコントランジション付きトグルボタン
 * アイコン切り替え時に滑らかなトランジションを持つトグルボタン
 *
 * アニメーション仕様:
 * - ボタン本体: 0.15s cubic-bezier(0.4, 0, 0.2, 1)で背景色遷移
 * - アイコン切り替え: opacity + blur + scale の組み合わせ
 * - exit: opacity 0, blur 4px, scale 0.8
 * - enter: opacity 1, blur 0, scale 1
 *
 * @example
 * ```tsx
 * const [isLiked, setIsLiked] = useState(false);
 *
 * <IconTransitionToggle
 *   icon={Heart}
 *   toggledIcon={Heart}
 *   isToggled={isLiked}
 *   onToggle={() => setIsLiked(!isLiked)}
 *   aria-label="いいね"
 * />
 * ```
 */
export function IconTransitionToggle({
	icon: Icon,
	toggledIcon: ToggledIcon,
	isToggled,
	onToggle,
	iconSize,
	iconProps,
	toggledIconProps,
	tooltip,
	toggledTooltip,
	variant = "outline",
	size = "icon",
	className,
	...buttonProps
}: IconTransitionToggleProps) {
	// size に応じて自動的に iconSize を設定
	const computedIconSize =
		iconSize ??
		(size === "sm" ? 12 : size === "lg" ? 20 : size === "default" ? 16 : 16);

	// size に応じてボタンを正方形にする
	const sizeClassName =
		size === "sm" ? "size-8" : size === "lg" ? "size-10" : "";

	// 現在の状態に応じたtooltipテキストを取得
	const currentTooltip = isToggled ? toggledTooltip : tooltip;

	// Tooltipの表示制御（クリック時に再表示して内容を更新）
	const [isTooltipOpen, setIsTooltipOpen] = useState(false);

	// クリック時の処理
	const handleToggle = () => {
		// Tooltipを一瞬閉じて再度開くことで内容を更新
		setIsTooltipOpen(false);
		onToggle();
		// 次のフレームでTooltipを再表示
		setTimeout(() => setIsTooltipOpen(true), 0);
	};

	// Button要素を定義
	const button = (
		<Button
			type="button"
			variant={variant}
			size="icon"
			onClick={currentTooltip ? handleToggle : onToggle}
			onMouseEnter={() => currentTooltip && setIsTooltipOpen(true)}
			onMouseLeave={() => currentTooltip && setIsTooltipOpen(false)}
			className={cn(
				"transition-transform active:scale-[0.97]",
				sizeClassName,
				className,
			)}
			{...buttonProps}
		>
			<div
				className="relative"
				style={{ width: computedIconSize, height: computedIconSize }}
			>
				<AnimatePresence initial={false}>
					<motion.div
						key={isToggled ? "toggled" : "default"}
						className="absolute inset-0 flex items-center justify-center"
						// will-change-transformを設定
						style={{ willChange: "transform" }}
						initial={{
							opacity: 0,
							filter: "blur(2px)",
							scale: 0.97,
						}}
						animate={{
							opacity: 1,
							filter: "blur(0px)",
							scale: 1,
						}}
						exit={{
							opacity: 0,
							filter: "blur(2px)",
							scale: 0.97,
						}}
						transition={{
							duration: 0.15,
							ease: [0.4, 0, 0.2, 1], // cubic-bezier(0.4, 0, 0.2, 1)
						}}
					>
						{isToggled ? (
							<ToggledIcon
								size={computedIconSize}
								{...toggledIconProps}
								className={cn("size-auto", toggledIconProps?.className)}
							/>
						) : (
							<Icon
								size={computedIconSize}
								{...iconProps}
								className={cn("size-auto", iconProps?.className)}
							/>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</Button>
	);

	// tooltipが指定されていない場合は通常のButtonを返す
	if (!currentTooltip) {
		return button;
	}

	// tooltipがある場合はTooltipでラップ（controlled mode）
	return (
		<Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
			<TooltipTrigger asChild>{button}</TooltipTrigger>
			<TooltipContent>
				<p>{currentTooltip}</p>
			</TooltipContent>
		</Tooltip>
	);
}

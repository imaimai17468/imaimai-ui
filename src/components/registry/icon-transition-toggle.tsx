"use client";

import type { VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
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
}

/**
 * アイコントランジション付きトグルボタン
 * animations.devの「良いアニメーション」を参考にした実装
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
	iconSize = 24,
	variant = "ghost",
	size = "icon",
	className,
	...props
}: IconTransitionToggleProps) {
	return (
		<Button
			type="button"
			variant={variant}
			size={size}
			onClick={onToggle}
			className={cn("[&_svg]:!text-current", className)}
			{...props}
		>
			<div className="relative" style={{ width: iconSize, height: iconSize }}>
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={isToggled ? "toggled" : "default"}
						className="absolute inset-0 flex items-center justify-center"
						// will-change-transformを設定
						style={{ willChange: "transform" }}
						initial={{
							opacity: 0,
							filter: "blur(4px)",
							scale: 0.8,
						}}
						animate={{
							opacity: 1,
							filter: "blur(0px)",
							scale: 1,
						}}
						exit={{
							opacity: 0,
							filter: "blur(4px)",
							scale: 0.8,
						}}
						transition={{
							duration: 0.15,
							ease: [0.4, 0, 0.2, 1], // cubic-bezier(0.4, 0, 0.2, 1)
						}}
					>
						{isToggled ? (
							<ToggledIcon size={iconSize} />
						) : (
							<Icon size={iconSize} />
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</Button>
	);
}

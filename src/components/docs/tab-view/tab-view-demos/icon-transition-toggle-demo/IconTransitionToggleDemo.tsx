"use client";

import { CircleCheck, Copy } from "lucide-react";
import { useState } from "react";
import { IconTransitionToggle } from "@/components/registry/icon-transition-toggle";
import { Button } from "@/components/ui/button";
import { DemoCard } from "../../demo-card/DemoCard";
import { DemoSection } from "../../demo-section/DemoSection";

/**
 * IconTransitionToggle デモコンポーネント
 * コピーボタンのトグルアニメーションを表示
 */
export function IconTransitionToggleDemo() {
	const [isCopied1, setIsCopied1] = useState<boolean>(false);
	const [isCopied2, setIsCopied2] = useState<boolean>(false);

	// Variants
	const [isCopied3, setIsCopied3] = useState<boolean>(false);
	const [isCopied4, setIsCopied4] = useState<boolean>(false);
	const [isCopied5, setIsCopied5] = useState<boolean>(false);
	const [isCopied6, setIsCopied6] = useState<boolean>(false);
	const [isCopied7, setIsCopied7] = useState<boolean>(false);

	// Sizes
	const [isCopied8, setIsCopied8] = useState<boolean>(false);
	const [isCopied9, setIsCopied9] = useState<boolean>(false);
	const [isCopied10, setIsCopied10] = useState<boolean>(false);

	return (
		<div className="space-y-8">
			{/* 比較デモ */}
			<DemoSection
				title="比較"
				description="blur + scale + opacity を組み合わせることで、滑らかで自然なトランジションを実現。アニメーションなしと比較してみてください。"
			>
				<DemoCard centered>
					<div className="flex items-center justify-center gap-12">
						{/* blur + scale + opacity */}
						<div className="flex flex-col items-center gap-4">
							<IconTransitionToggle
								icon={Copy}
								toggledIcon={CircleCheck}
								isToggled={isCopied1}
								onToggle={() => setIsCopied1(!isCopied1)}
								aria-label="コピー"
							/>
							<div className="text-muted-foreground text-sm">
								blur + scale + opacity
							</div>
						</div>

						{/* アニメーションなし */}
						<div className="flex flex-col items-center gap-4">
							<Button
								type="button"
								variant="outline"
								size="icon"
								onClick={() => setIsCopied2(!isCopied2)}
								aria-label="コピー"
							>
								{isCopied2 ? <CircleCheck size={24} /> : <Copy size={24} />}
							</Button>
							<div className="text-muted-foreground text-sm">
								アニメーションなし
							</div>
						</div>
					</div>
				</DemoCard>
			</DemoSection>

			{/* Variants デモ */}
			<DemoSection
				title="Variants"
				description="shadcn/ui Button の全ての variant に対応。default、destructive、outline（デフォルト）、secondary、ghost が使用できます。"
			>
				<DemoCard centered>
					<div className="grid grid-cols-3 gap-8 md:grid-cols-5">
						<div className="flex flex-col items-center gap-3">
							<IconTransitionToggle
								icon={Copy}
								toggledIcon={CircleCheck}
								isToggled={isCopied3}
								onToggle={() => setIsCopied3(!isCopied3)}
								variant="default"
								aria-label="コピー"
							/>
							<div className="text-muted-foreground text-xs">default</div>
						</div>
						<div className="flex flex-col items-center gap-3">
							<IconTransitionToggle
								icon={Copy}
								toggledIcon={CircleCheck}
								isToggled={isCopied4}
								onToggle={() => setIsCopied4(!isCopied4)}
								variant="destructive"
								aria-label="コピー"
							/>
							<div className="text-muted-foreground text-xs">destructive</div>
						</div>
						<div className="flex flex-col items-center gap-3">
							<IconTransitionToggle
								icon={Copy}
								toggledIcon={CircleCheck}
								isToggled={isCopied5}
								onToggle={() => setIsCopied5(!isCopied5)}
								variant="outline"
								aria-label="コピー"
							/>
							<div className="text-muted-foreground text-xs">
								outline (default)
							</div>
						</div>
						<div className="flex flex-col items-center gap-3">
							<IconTransitionToggle
								icon={Copy}
								toggledIcon={CircleCheck}
								isToggled={isCopied6}
								onToggle={() => setIsCopied6(!isCopied6)}
								variant="secondary"
								aria-label="コピー"
							/>
							<div className="text-muted-foreground text-xs">secondary</div>
						</div>
						<div className="flex flex-col items-center gap-3">
							<IconTransitionToggle
								icon={Copy}
								toggledIcon={CircleCheck}
								isToggled={isCopied7}
								onToggle={() => setIsCopied7(!isCopied7)}
								variant="ghost"
								aria-label="コピー"
							/>
							<div className="text-muted-foreground text-xs">ghost</div>
						</div>
					</div>
				</DemoCard>
			</DemoSection>

			{/* Sizes デモ */}
			<DemoSection
				title="Sizes"
				description="size props でボタンとアイコンのサイズを自動調整。sm（32px, icon 12px）、default（36px, icon 16px）、lg（48px, icon 20px）の3つのサイズが使用できます。"
			>
				<DemoCard centered>
					<div className="grid grid-cols-3 gap-8 md:grid-cols-3">
						<div className="flex flex-col items-center gap-3">
							<IconTransitionToggle
								icon={Copy}
								toggledIcon={CircleCheck}
								isToggled={isCopied8}
								onToggle={() => setIsCopied8(!isCopied8)}
								size="sm"
								aria-label="コピー"
							/>
							<div className="text-muted-foreground text-xs">sm</div>
						</div>
						<div className="flex flex-col items-center gap-3">
							<IconTransitionToggle
								icon={Copy}
								toggledIcon={CircleCheck}
								isToggled={isCopied9}
								onToggle={() => setIsCopied9(!isCopied9)}
								aria-label="コピー"
							/>
							<div className="text-muted-foreground text-xs">default</div>
						</div>
						<div className="flex flex-col items-center gap-3">
							<IconTransitionToggle
								icon={Copy}
								toggledIcon={CircleCheck}
								isToggled={isCopied10}
								onToggle={() => setIsCopied10(!isCopied10)}
								size="lg"
								aria-label="コピー"
							/>
							<div className="text-muted-foreground text-xs">lg</div>
						</div>
					</div>
				</DemoCard>
			</DemoSection>
		</div>
	);
}

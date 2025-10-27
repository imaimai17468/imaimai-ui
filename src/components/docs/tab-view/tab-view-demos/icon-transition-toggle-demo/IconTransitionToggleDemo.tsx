"use client";

import { Check, Heart, Moon, Pause, Play, Sun, X } from "lucide-react";
import { useState } from "react";
import { IconTransitionToggle } from "@/components/registry/icon-transition-toggle";
import type { ComponentConfig } from "@/config/components";
import { DemoCard } from "../../demo-card/DemoCard";
import { DemoOutput } from "../../demo-output/DemoOutput";
import { DemoSection } from "../../demo-section/DemoSection";

interface IconTransitionToggleDemoProps {
	component: ComponentConfig;
}

/**
 * IconTransitionToggle デモコンポーネント
 * 様々なユースケースのトグルボタンを表示
 */
export function IconTransitionToggleDemo({
	component: _component,
}: IconTransitionToggleDemoProps) {
	// デモ1: いいねボタン
	const [isLiked, setIsLiked] = useState<boolean>(false);

	// デモ2: 成功/失敗トグル
	const [isSuccess, setIsSuccess] = useState<boolean>(true);

	// デモ3: 再生/一時停止
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	// デモ4: ライト/ダークモード
	const [isDark, setIsDark] = useState<boolean>(false);

	return (
		<div className="space-y-8">
			{/* デモ1: いいねボタン */}
			<DemoSection
				title="いいねボタン"
				description="シンプルなアイコントグル。同じアイコンを使用して、色の変化で状態を表現します。animations.devの「良いアニメーション」と同じ0.15秒のトランジションで、opacity、blur、scaleが滑らかに変化します。"
			>
				<DemoCard centered>
					<IconTransitionToggle
						icon={Heart}
						toggledIcon={Heart}
						isToggled={isLiked}
						onToggle={() => setIsLiked(!isLiked)}
						aria-label="いいね"
						className={isLiked ? "text-red-500" : ""}
					/>
				</DemoCard>
				<DemoOutput
					label="状態:"
					value={isLiked ? "いいね済み ❤️" : "未いいね"}
				/>
			</DemoSection>

			{/* デモ2: 成功/失敗トグル */}
			<DemoSection
				title="成功/失敗トグル"
				description="異なるアイコン間の切り替え。チェックマークとバツ印で状態を明確に表現します。"
			>
				<DemoCard centered>
					<IconTransitionToggle
						icon={Check}
						toggledIcon={X}
						isToggled={!isSuccess}
						onToggle={() => setIsSuccess(!isSuccess)}
						aria-label="成功/失敗切り替え"
						className={isSuccess ? "text-green-600" : "text-red-600"}
					/>
				</DemoCard>
				<DemoOutput label="状態:" value={isSuccess ? "成功 ✓" : "失敗 ✗"} />
			</DemoSection>

			{/* デモ3: 再生/一時停止 */}
			<DemoSection
				title="再生/一時停止"
				description="メディアコントロールのような機能的なトグル。アイコンの形状が変わることで操作が直感的になります。"
			>
				<DemoCard centered>
					<IconTransitionToggle
						icon={Play}
						toggledIcon={Pause}
						isToggled={isPlaying}
						onToggle={() => setIsPlaying(!isPlaying)}
						aria-label="再生/一時停止"
						className="text-blue-600"
					/>
				</DemoCard>
				<DemoOutput label="状態:" value={isPlaying ? "再生中 ▶" : "停止中 ⏸"} />
			</DemoSection>

			{/* デモ4: ライト/ダークモード */}
			<DemoSection
				title="ライト/ダークモード切り替え"
				description="テーマ切り替えのような対称的な状態のトグル。太陽と月のアイコンで視覚的に分かりやすく表現します。"
			>
				<DemoCard centered>
					<IconTransitionToggle
						icon={Sun}
						toggledIcon={Moon}
						isToggled={isDark}
						onToggle={() => setIsDark(!isDark)}
						aria-label="ライト/ダークモード切り替え"
						className={isDark ? "text-indigo-400" : "text-yellow-500"}
					/>
				</DemoCard>
				<DemoOutput
					label="現在のモード:"
					value={isDark ? "ダーク 🌙" : "ライト ☀️"}
				/>
			</DemoSection>
		</div>
	);
}

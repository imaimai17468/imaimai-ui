"use client";

import { ImageComparisonSlider } from "@/components/registry/image-comparison-slider";
import { DemoCard } from "../../demo-card/DemoCard";
import { DemoSection } from "../../demo-section/DemoSection";

/**
 * ImageComparisonSlider デモコンポーネント
 * 画像比較スライダーの動作を表示
 */
export function ImageComparisonSliderDemo() {
	return (
		<div className="space-y-8">
			{/* 基本デモ */}
			<DemoSection
				title="基本"
				description="2枚の画像を重ねて表示し、スライダーをドラッグして比較できます。マウスドラッグ、タッチ操作、キーボード（左右矢印キー）での操作に対応しています。"
			>
				<DemoCard>
					<ImageComparisonSlider
						beforeImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop"
						afterImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=450&fit=crop"
						beforeLabel="Before"
						afterLabel="After"
					/>
				</DemoCard>
			</DemoSection>

			{/* ラベルなし */}
			<DemoSection
				title="ラベルなし"
				description="beforeLabel と afterLabel を省略すると、ラベルが表示されません。"
			>
				<DemoCard>
					<ImageComparisonSlider
						beforeImage="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=450&fit=crop"
						afterImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop"
					/>
				</DemoCard>
			</DemoSection>

			{/* 初期位置カスタマイズ */}
			<DemoSection
				title="初期位置カスタマイズ"
				description="initialPosition props でスライダーの初期位置を指定できます（0-100のパーセンテージ）。"
			>
				<DemoCard>
					<ImageComparisonSlider
						beforeImage="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=450&fit=crop"
						afterImage="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=450&fit=crop"
						beforeLabel="25%"
						afterLabel="75%"
						initialPosition={25}
					/>
				</DemoCard>
			</DemoSection>

			{/* 色のカスタマイズ */}
			<DemoSection
				title="色のカスタマイズ"
				description="sliderClassName と handleClassName props でスライダーとハンドルのスタイルをカスタマイズできます。任意のTailwind CSSクラスを指定可能です。"
			>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					<div className="space-y-2">
						<p className="font-medium text-sm">デフォルト</p>
						<DemoCard>
							<ImageComparisonSlider
								beforeImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
								afterImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=225&fit=crop"
							/>
						</DemoCard>
					</div>

					<div className="space-y-2">
						<p className="font-medium text-sm">bg-secondary でカスタマイズ</p>
						<DemoCard>
							<ImageComparisonSlider
								beforeImage="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=225&fit=crop"
								afterImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=225&fit=crop"
								sliderClassName="bg-secondary"
								handleClassName="bg-secondary text-secondary-foreground"
							/>
						</DemoCard>
					</div>
				</div>
			</DemoSection>
		</div>
	);
}

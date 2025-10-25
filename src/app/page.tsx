"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ComponentHeader } from "@/components/docs/component-header";
import { ComponentTabs } from "@/components/docs/component-tabs";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { components, getComponentBySlug } from "@/config/components";

/**
 * ページコンテンツ（useSearchParams使用）
 */
function PageContent() {
	const searchParams = useSearchParams();
	const componentSlug = searchParams.get("component");

	// コンポーネント詳細表示
	if (componentSlug) {
		const component = getComponentBySlug(componentSlug);

		// 存在しないコンポーネント
		if (!component) {
			return (
				<div className="flex min-h-[50vh] items-center justify-center">
					<div className="text-center">
						<h1 className="mb-4 font-bold text-4xl">404</h1>
						<p className="mb-6 text-muted-foreground">
							コンポーネントが見つかりませんでした
						</p>
						<Button asChild>
							<Link href="/">トップに戻る</Link>
						</Button>
					</div>
				</div>
			);
		}

		// サイドバー付きコンポーネント詳細
		return (
			<div className="flex w-full gap-8">
				<DocsSidebar />
				<main className="flex-1 space-y-8 pt-4 pb-16">
					<ComponentHeader component={component} />
					<ComponentTabs component={component} />
				</main>
			</div>
		);
	}

	// ランディングページ
	return (
		<div className="space-y-20">
			{/* ヒーローセクション */}
			<section className="space-y-6 pt-12 text-center">
				<h1 className="font-bold text-5xl tracking-tight md:text-6xl">
					imaimai-ui
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
					shadcn/ui互換のカスタムコンポーネントレジストリ。
					<br />
					CLIで簡単にインストールできる、高品質なReactコンポーネント集。
				</p>
				<div className="flex items-center justify-center gap-4 pt-4">
					<Button asChild size="lg">
						<Link href={`/?component=${components[0].slug}`}>
							コンポーネントを見る
							<ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
					<Button variant="outline" size="lg" asChild>
						<a
							href="https://github.com/imaimai17468/imaimai-ui"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHubで見る
						</a>
					</Button>
				</div>
			</section>

			{/* 特徴セクション */}
			<section className="space-y-6">
				<h2 className="text-center font-bold text-3xl">特徴</h2>
				<div className="grid gap-6 md:grid-cols-3">
					<div className="space-y-2 rounded-lg border bg-card p-6">
						<h3 className="font-semibold text-xl">簡単インストール</h3>
						<p className="text-muted-foreground text-sm">
							shadcn
							CLIで1コマンドでインストール。プロジェクトに直接コピーされるため、自由にカスタマイズ可能。
						</p>
					</div>
					<div className="space-y-2 rounded-lg border bg-card p-6">
						<h3 className="font-semibold text-xl">TypeScript完全対応</h3>
						<p className="text-muted-foreground text-sm">
							すべてのコンポーネントは厳密な型定義を持ち、開発体験を向上させます。
						</p>
					</div>
					<div className="space-y-2 rounded-lg border bg-card p-6">
						<h3 className="font-semibold text-xl">ダークテーマ最適化</h3>
						<p className="text-muted-foreground text-sm">
							oklchカラー空間を使用した、美しいダークテーマに最適化されたデザイン。
						</p>
					</div>
				</div>
			</section>

			{/* コンポーネント一覧 */}
			<section className="space-y-6">
				<h2 className="text-center font-bold text-3xl">コンポーネント</h2>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{components.map((component) => (
						<Link
							key={component.slug}
							href={`/?component=${component.slug}`}
							className="group block rounded-lg border bg-card p-6 transition-colors hover:border-primary hover:bg-accent"
						>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<h3 className="font-semibold text-lg group-hover:text-primary">
										{component.name}
									</h3>
									<ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
								</div>
								<p className="text-muted-foreground text-sm">
									{component.description}
								</p>
								<div className="flex flex-wrap gap-1 pt-2">
									{component.registryDependencies?.map((dep) => (
										<Badge key={dep} variant="secondary" className="text-xs">
											{dep}
										</Badge>
									))}
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
}

/**
 * ルートページ
 * Suspenseでラップして useSearchParams を使用
 */
export default function Home() {
	return (
		<Suspense fallback={<div className="p-8">Loading...</div>}>
			<PageContent />
		</Suspense>
	);
}

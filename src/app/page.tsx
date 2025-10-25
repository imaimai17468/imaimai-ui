import Link from "next/link";
import { ComponentHeader } from "@/components/docs/component-header";
import { ComponentTabs } from "@/components/docs/component-tabs";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { Button } from "@/components/ui/button";
import { getComponentBySlug } from "@/config/components";

interface PageProps {
	searchParams: Promise<{
		component?: string;
	}>;
}

/**
 * ルートページ（サーバーコンポーネント）
 * searchParams を使用してクエリパラメータを取得
 * 常にサイドバーを表示し、コンポーネントが選択されている場合は詳細を表示
 */
export default async function Home({ searchParams }: PageProps) {
	const params = await searchParams;
	const componentSlug = params.component;

	// コンポーネントが指定されている場合は取得
	const component = componentSlug ? getComponentBySlug(componentSlug) : null;

	// 存在しないコンポーネントが指定された場合
	if (componentSlug && !component) {
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

	// サイドバー付きレイアウト（常に表示）
	return (
		<div className="flex h-full w-full gap-8">
			<DocsSidebar />
			<main className="flex-1 space-y-8 pt-4 pb-16">
				{component ? (
					// コンポーネント詳細表示
					<>
						<ComponentHeader component={component} />
						<ComponentTabs component={component} />
					</>
				) : (
					// ランディングページ（最小限の説明）
					<div className="space-y-8">
						<section className="space-y-4 pt-12">
							<h1 className="font-bold text-5xl tracking-tight md:text-6xl">
								imaimai UI
							</h1>
							<p className="max-w-2xl text-lg text-muted-foreground">
								他のライブラリにない、必要なコンポーネントを集めたレジストリ。
								<br />
								shadcn/ui互換のCLIで簡単にインストール可能。
							</p>
							<div className="flex items-center gap-4 pt-4">
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
					</div>
				)}
			</main>
		</div>
	);
}

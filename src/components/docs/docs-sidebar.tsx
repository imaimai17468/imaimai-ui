"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentCategory } from "@/config/components";
import { componentsByCategory } from "@/config/components";
import { cn } from "@/lib/utils";

// カテゴリ表示名のマッピング
const categoryLabels: Record<ComponentCategory, string> = {
	form: "フォーム",
	layout: "レイアウト",
	"data-display": "データ表示",
	feedback: "フィードバック",
};

/**
 * ドキュメントサイドバーコンポーネント
 * カテゴリ別にコンポーネントを一覧表示
 */
export function DocsSidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 border-r bg-sidebar pr-4 pb-8">
			<div className="sticky top-16">
				<nav className="space-y-6">
					{/* ホームリンク */}
					<div>
						<Link
							href="/"
							className={cn(
								"block rounded-md px-3 py-2 text-sm transition-colors",
								pathname === "/"
									? "bg-sidebar-accent text-sidebar-accent-foreground"
									: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
							)}
						>
							ホーム
						</Link>
					</div>

					{/* カテゴリ別コンポーネント一覧 */}
					{Object.entries(componentsByCategory).map(
						([category, components]) => (
							<div key={category}>
								<h3 className="mb-2 px-3 font-medium text-sidebar-foreground text-xs uppercase tracking-wider">
									{categoryLabels[category as ComponentCategory]}
								</h3>
								<ul className="space-y-1">
									{components.map((component) => {
										const href = `/components/${component.slug}`;
										const isActive = pathname === href;

										return (
											<li key={component.slug}>
												<Link
													href={href}
													className={cn(
														"block rounded-md px-3 py-2 text-sm transition-colors",
														isActive
															? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
															: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
													)}
												>
													{component.name}
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						),
					)}
				</nav>
			</div>
		</aside>
	);
}

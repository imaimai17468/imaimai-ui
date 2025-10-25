"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { ComponentCategory } from "@/config/components";
import { componentsByCategory } from "@/config/components";

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
	const searchParams = useSearchParams();
	const currentComponent = searchParams.get("component");

	return (
		<Sidebar>
			<SidebarHeader>
				<Link href="/" className="flex items-center gap-2 px-2 py-4">
					<Image
						src="/app-icon.png"
						alt="imaimai UI"
						width={32}
						height={32}
						className="rounded"
					/>
					<span className="font-semibold text-lg">imaimai UI</span>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				{/* ホームリンク */}
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								asChild
								isActive={pathname === "/" && !currentComponent}
							>
								<Link href="/">ホーム</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>

				{/* カテゴリ別コンポーネント一覧 */}
				{Object.entries(componentsByCategory).map(([category, components]) => (
					<SidebarGroup key={category}>
						<SidebarGroupLabel>
							{categoryLabels[category as ComponentCategory]}
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{components.map((component) => {
									const href = `/?component=${component.slug}`;
									const isActive = currentComponent === component.slug;

									return (
										<SidebarMenuItem key={component.slug}>
											<SidebarMenuButton asChild isActive={isActive}>
												<Link href={href}>{component.name}</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
		</Sidebar>
	);
}

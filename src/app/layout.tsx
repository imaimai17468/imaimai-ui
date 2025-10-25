import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { Header } from "@/components/shared/header/Header";
import { ThemeProvider } from "@/components/shared/theme-provider/ThemeProvider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
	metadataBase: new URL("https://imaimai-ui.vercel.app"),
	title: "imaimai UI",
	description: "他のライブラリには無い、実装が面倒なコンポーネント集",
	icons: {
		icon: "/app-icon.png",
		apple: "/app-icon.png",
	},
	openGraph: {
		title: "imaimai UI",
		description: "他のライブラリには無い、実装が面倒なコンポーネント集",
		siteName: "imaimai UI",
		type: "website",
		url: "https://imaimai-ui.vercel.app",
		images: [
			{
				url: "/app-ogp.png",
				width: 1200,
				height: 630,
				alt: "imaimai UI",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "imaimai UI",
		description: "他のライブラリには無い、実装が面倒なコンポーネント集",
		images: ["/app-ogp.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body
				className="antialiased"
				style={{
					fontFamily:
						'"Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", "メイリオ", Meiryo, "游ゴシック", YuGothic, sans-serif',
				}}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<SidebarProvider>
						<Suspense fallback={<div className="w-64 border-r bg-sidebar" />}>
							<DocsSidebar />
						</Suspense>
						<SidebarInset>
							<Header />
							{children}
						</SidebarInset>
					</SidebarProvider>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}

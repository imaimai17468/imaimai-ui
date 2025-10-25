import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/shared/header/Header";
import { ThemeProvider } from "@/components/shared/theme-provider/ThemeProvider";

export const metadata: Metadata = {
	metadataBase: new URL("https://imaimai-ui.vercel.app"),
	title: "imaimai UI",
	description: "他のライブラリにない、必要なコンポーネントを集めたレジストリ",
	icons: {
		icon: "/app-icon.png",
		apple: "/app-icon.png",
	},
	openGraph: {
		title: "imaimai UI",
		description: "他のライブラリにない、必要なコンポーネントを集めたレジストリ",
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
		description: "他のライブラリにない、必要なコンポーネントを集めたレジストリ",
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
					<div className="flex min-h-dvh flex-col gap-4">
						<Header />
						<div className="flex w-full flex-1 justify-center px-6 md:px-4">
							<div className="container w-full">{children}</div>
						</div>
					</div>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}

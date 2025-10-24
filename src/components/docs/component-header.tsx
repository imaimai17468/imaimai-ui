"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ComponentConfig } from "@/config/components";

interface ComponentHeaderProps {
	component: ComponentConfig;
}

/**
 * コンポーネントヘッダー
 * コンポーネントのタイトル、説明、インストールコマンドを表示
 */
export function ComponentHeader({ component }: ComponentHeaderProps) {
	const [copied, setCopied] = useState(false);
	const installCommand = `npx shadcn@latest add https://imaimai-ui.vercel.app/r/${component.registryName}.json`;

	const handleCopy = async () => {
		await navigator.clipboard.writeText(installCommand);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="space-y-4 border-b pb-6">
			{/* タイトル */}
			<h1 className="font-bold text-4xl tracking-tight">{component.name}</h1>

			{/* 説明 */}
			<p className="text-lg text-muted-foreground">{component.description}</p>

			{/* インストールコマンド */}
			<div className="flex items-center gap-2 rounded-lg border bg-card p-4">
				<code className="flex-1 font-mono text-sm">{installCommand}</code>
				<Button
					variant="ghost"
					size="sm"
					onClick={handleCopy}
					className="h-8 w-8 shrink-0 p-0"
				>
					{copied ? (
						<Check className="h-4 w-4 text-green-500" />
					) : (
						<Copy className="h-4 w-4" />
					)}
					<span className="sr-only">コマンドをコピー</span>
				</Button>
			</div>
		</div>
	);
}

"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
	code: string;
	language?: string;
	filename?: string;
	showLineNumbers?: boolean;
}

/**
 * コードブロックコンポーネント
 * シンタックスハイライト付きでコードを表示し、コピー機能を提供
 */
export function CodeBlock({
	code,
	language = "typescript",
	filename,
	showLineNumbers = false,
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="relative rounded-lg border bg-card">
			{/* ヘッダー: ファイル名とコピーボタン */}
			<div className="flex items-center justify-between border-b px-4 py-2">
				<div className="flex items-center gap-2">
					{filename && (
						<span className="font-mono text-muted-foreground text-sm">
							{filename}
						</span>
					)}
					{language && (
						<span className="rounded bg-muted px-2 py-0.5 font-mono text-muted-foreground text-xs">
							{language}
						</span>
					)}
				</div>
				<Button
					variant="ghost"
					size="sm"
					onClick={handleCopy}
					className="h-8 w-8 p-0"
				>
					{copied ? (
						<Check className="h-4 w-4 text-green-500" />
					) : (
						<Copy className="h-4 w-4" />
					)}
					<span className="sr-only">コードをコピー</span>
				</Button>
			</div>

			{/* コードブロック */}
			<div className="overflow-x-auto">
				<pre className="p-4">
					<code className={`language-${language} block font-mono text-sm`}>
						{showLineNumbers
							? code.split("\n").map((line, i) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: Line numbers are static and never reordered
									<div key={`line-${i}`} className="table-row">
										<span className="table-cell select-none pr-4 text-right text-muted-foreground">
											{i + 1}
										</span>
										<span className="table-cell">{line || " "}</span>
									</div>
								))
							: code}
					</code>
				</pre>
			</div>
		</div>
	);
}

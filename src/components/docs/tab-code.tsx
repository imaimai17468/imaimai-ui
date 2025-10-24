import { CodeBlock } from "@/components/docs/code-block";
import type { ComponentConfig } from "@/config/components";

interface TabCodeProps {
	component: ComponentConfig;
}

/**
 * コード例タブ
 * コンポーネントの使用例をコードで表示
 */
export function TabCode({ component }: TabCodeProps) {
	return (
		<div className="space-y-6">
			{/* 説明 */}
			<div>
				<h3 className="mb-2 font-semibold text-lg">使い方</h3>
				<p className="text-muted-foreground text-sm">
					以下は{component.name}
					の基本的な使用例です。コピーボタンでコードをコピーできます。
				</p>
			</div>

			{/* 基本的な使用例 */}
			<div>
				<h4 className="mb-3 font-medium text-base">基本的な例</h4>
				<CodeBlock
					code={component.codeExample}
					language="tsx"
					filename="example.tsx"
				/>
			</div>

			{/* インストール方法 */}
			<div>
				<h4 className="mb-3 font-medium text-base">インストール</h4>
				<p className="mb-3 text-muted-foreground text-sm">
					以下のコマンドでプロジェクトにコンポーネントを追加できます:
				</p>
				<CodeBlock
					code={`npx shadcn@latest add https://imaimai-ui.vercel.app/r/${component.registryName}.json`}
					language="bash"
				/>
			</div>

			{/* 依存関係 */}
			{component.registryDependencies &&
				component.registryDependencies.length > 0 && (
					<div>
						<h4 className="mb-3 font-medium text-base">依存関係</h4>
						<p className="mb-3 text-muted-foreground text-sm">
							このコンポーネントは以下のshadcn/ui
							コンポーネントに依存しています:
						</p>
						<ul className="list-inside list-disc space-y-1 text-sm">
							{component.registryDependencies.map((dep) => (
								<li key={dep} className="text-muted-foreground">
									<code className="font-mono">{dep}</code>
								</li>
							))}
						</ul>
					</div>
				)}
		</div>
	);
}

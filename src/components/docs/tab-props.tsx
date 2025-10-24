import { Badge } from "@/components/ui/badge";
import type { ComponentConfig } from "@/config/components";

interface TabPropsProps {
	component: ComponentConfig;
}

/**
 * Props APIドキュメントタブ
 * コンポーネントのpropsを表形式で表示
 */
export function TabProps({ component }: TabPropsProps) {
	return (
		<div className="space-y-4">
			{/* 説明 */}
			<p className="text-muted-foreground text-sm">
				{component.name}コンポーネントで使用可能なpropsの一覧です。
			</p>

			{/* Props テーブル */}
			<div className="overflow-x-auto rounded-lg border">
				<table className="w-full">
					<thead>
						<tr className="border-b bg-muted/50">
							<th className="px-4 py-3 text-left font-semibold text-sm">
								Props名
							</th>
							<th className="px-4 py-3 text-left font-semibold text-sm">型</th>
							<th className="px-4 py-3 text-left font-semibold text-sm">
								必須
							</th>
							<th className="px-4 py-3 text-left font-semibold text-sm">
								デフォルト
							</th>
							<th className="px-4 py-3 text-left font-semibold text-sm">
								説明
							</th>
						</tr>
					</thead>
					<tbody>
						{component.props.map((prop, index) => (
							<tr
								key={prop.name}
								className={
									index !== component.props.length - 1 ? "border-b" : ""
								}
							>
								<td className="px-4 py-3">
									<code className="rounded bg-muted px-2 py-1 font-mono text-sm">
										{prop.name}
									</code>
								</td>
								<td className="px-4 py-3">
									<code className="font-mono text-muted-foreground text-sm">
										{prop.type}
									</code>
								</td>
								<td className="px-4 py-3">
									{prop.required ? (
										<Badge variant="destructive" className="text-xs">
											必須
										</Badge>
									) : (
										<Badge variant="secondary" className="text-xs">
											任意
										</Badge>
									)}
								</td>
								<td className="px-4 py-3">
									{prop.default ? (
										<code className="font-mono text-muted-foreground text-sm">
											{prop.default}
										</code>
									) : (
										<span className="text-muted-foreground text-sm">-</span>
									)}
								</td>
								<td className="px-4 py-3 text-sm">{prop.description}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

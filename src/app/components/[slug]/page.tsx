import { notFound } from "next/navigation";
import { ComponentHeader } from "@/components/docs/component-header";
import { ComponentTabs } from "@/components/docs/component-tabs";
import { components, getComponentBySlug } from "@/config/components";

interface ComponentPageProps {
	params: Promise<{
		slug: string;
	}>;
}

/**
 * 動的コンポーネントドキュメントページ
 * [slug]パラメータからコンポーネントを取得し、詳細ページを表示
 */
export default async function ComponentPage({ params }: ComponentPageProps) {
	const { slug } = await params;
	const component = getComponentBySlug(slug);

	// コンポーネントが見つからない場合は404
	if (!component) {
		notFound();
	}

	return (
		<div className="space-y-8">
			{/* ヘッダー: タイトル、説明、インストールコマンド */}
			<ComponentHeader component={component} />

			{/* タブ: プレビュー、コード、Props */}
			<ComponentTabs component={component} />
		</div>
	);
}

/**
 * 静的パラメータ生成
 * ビルド時にすべてのコンポーネントページを生成
 */
export function generateStaticParams() {
	return components.map((component) => ({
		slug: component.slug,
	}));
}

/**
 * メタデータ生成
 * 各コンポーネントページのSEO情報
 */
export async function generateMetadata({ params }: ComponentPageProps) {
	const { slug } = await params;
	const component = getComponentBySlug(slug);

	if (!component) {
		return {
			title: "Component Not Found",
		};
	}

	return {
		title: `${component.name} - imaimai-ui`,
		description: component.description,
	};
}

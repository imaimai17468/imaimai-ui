import Link from "next/link";
import { ModeToggle } from "@/components/shared/mode-toggle/ModeToggle";

export const Header = () => {
	return (
		<header className="sticky top-0 z-50 bg-transparent backdrop-blur-md">
			<div className="flex items-center justify-between px-6 py-6">
				<div>
					<h1 className="font-medium text-2xl">
						<Link href="/">imaimai UI</Link>
					</h1>
				</div>
				<div className="flex items-center gap-5">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};

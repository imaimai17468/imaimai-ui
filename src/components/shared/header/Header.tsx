import { ModeToggle } from "@/components/shared/mode-toggle/ModeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
	return (
		<header className="sticky top-0 z-50 bg-transparent backdrop-blur-md">
			<div className="flex items-center justify-between px-6 py-6">
				<div className="flex items-center gap-4">
					<SidebarTrigger className="md:hidden" />
				</div>
				<div className="flex items-center gap-5">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};

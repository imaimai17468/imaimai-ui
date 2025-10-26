"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
	value: string;
	label: string;
}

export interface MultiSelectComboboxProps {
	options: MultiSelectOption[];
	selected: string[];
	onChange: (selected: string[]) => void;
	placeholder?: string;
	searchPlaceholder?: string;
	className?: string;
	/** 表示する最大バッジ数。これを超える場合は "+N" バッジで表示 */
	maxVisibleItems?: number;
}

export function MultiSelectCombobox({
	options,
	selected,
	onChange,
	placeholder = "Select items...",
	searchPlaceholder = "Search...",
	className,
	maxVisibleItems,
}: MultiSelectComboboxProps) {
	const [open, setOpen] = useState(false);

	const handleSelect = (value: string) => {
		const isSelected = selected.includes(value);
		if (isSelected) {
			onChange(selected.filter((item) => item !== value));
		} else {
			onChange([...selected, value]);
		}
	};

	const handleRemove = (value: string) => {
		onChange(selected.filter((item) => item !== value));
	};

	return (
		<div className={cn("w-full", className)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						aria-expanded={open}
						className="h-auto min-h-10 w-full justify-start gap-2 py-2"
					>
						{selected.length > 0 ? (
							<div className="flex flex-1 flex-wrap gap-1">
								{/* maxVisibleItems が指定されている場合は制限、未指定の場合は全表示 */}
								{(maxVisibleItems
									? selected.slice(0, maxVisibleItems)
									: selected
								).map((value) => {
									const label = options.find(
										(option) => option.value === value,
									)?.label;
									if (!label) return null;
									return (
										<Badge
											key={value}
											variant="secondary"
											className="font-normal dark:bg-input"
										>
											{label}
										</Badge>
									);
								})}
								{/* maxVisibleItems が指定されていて、残りがある場合は "+N" バッジで表示 */}
								{maxVisibleItems && selected.length > maxVisibleItems && (
									<Badge
										variant="secondary"
										className="font-normal dark:bg-input"
									>
										+{selected.length - maxVisibleItems}
									</Badge>
								)}
							</div>
						) : (
							<span className="flex-1 text-left text-muted-foreground">
								{placeholder}
							</span>
						)}
						<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-[var(--radix-popover-trigger-width)] p-0"
					align="start"
				>
					<Command>
						<CommandInput placeholder={searchPlaceholder} />
						<CommandList>
							<CommandEmpty>No items found.</CommandEmpty>
							<CommandGroup>
								{options.map((option) => {
									const isSelected = selected.includes(option.value);
									return (
										<CommandItem
											key={option.value}
											value={option.value}
											onSelect={() => handleSelect(option.value)}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													isSelected ? "opacity-100" : "opacity-0",
												)}
											/>
											{option.label}
										</CommandItem>
									);
								})}
							</CommandGroup>
						</CommandList>
						{/* Selected items as badges with remove button */}
						{selected.length > 0 && (
							<div className="border-t p-2">
								<div className="flex flex-wrap gap-1">
									{selected.map((value) => {
										const label = options.find(
											(option) => option.value === value,
										)?.label;
										if (!label) return null;
										return (
											<Badge
												key={value}
												variant="secondary"
												className="gap-1 pr-1 dark:bg-input"
											>
												<span>{label}</span>
												<button
													type="button"
													onClick={(e) => {
														e.stopPropagation();
														handleRemove(value);
													}}
													className="ml-1 cursor-pointer rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
													aria-label={`Remove ${label}`}
												>
													<X className="h-3 w-3" />
												</button>
											</Badge>
										);
									})}
								</div>
							</div>
						)}
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}

'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Logo } from './logo';
import { useScrollTop } from '@/hooks/use-scroll-top';
import { ModeToggle } from '@/components/mode-toggle';

export const Navbar = () => {
	const scrolled = useScrollTop();

	return (
		<div
			className={cn(
				'z-10 bg-background fixed top-0 flex items-center w-full p-4',
				scrolled ? 'shadow-md' : 'border-b shadow-sm'
			)}>
			<Logo />

			<div
				className='
				nd:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2
			'>
				<ModeToggle />
			</div>
		</div>
	);
};

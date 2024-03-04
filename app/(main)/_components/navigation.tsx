'use client';

import { cn } from '@/lib/utils';
import { ChevronsLeft, MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export const Navigation = () => {
	const pathanme = usePathname(); // Esto es para saber la ruta actual
	const isMobile = useMediaQuery('(max-width: 768px)'); // Esto es para saber si estamos en un dispositivo movil

	const isResizingRef = useRef(false); // Esto es para saber si se esta redimensionando el sidebar
	const sidebarRef = useRef<ElementRef<'aside'>>(null); // Esto es para referenciar el sidebar
	const navbarRef = useRef<ElementRef<'div'>>(null); // Esto es para referenciar el navbar
	const [isResetting, setIsResetting] = useState(false); // Esto es para saber si se esta reseteando el sidebar
	const [isCollapsed, setIsCollapsed] = useState(isMobile); // Esto es para saber si el sidebar esta colapsado

	// Funcion para redimensionar el sidebar
	const handleMauseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();

		isResizingRef.current = true; // Establecemos que se esta redimensionando el sidebar
		document.addEventListener('mousemove', handleMouseMove); // Agregamos el evento mousemove
		document.addEventListener('mouseup', handleMouseUp); // Agregamos el evento mouseup
	};

	// funcion para redimensionar el sidebar con el mouse
	const handleMouseMove = (event: MouseEvent) => {
		if (!isResizingRef.current) return;
		let newWidth = event.clientX;

		if (newWidth < 240) newWidth = 240;
		if (newWidth > 480) newWidth = 480;

		if (sidebarRef.current && navbarRef.current) {
			sidebarRef.current.style.width = `${newWidth}px`;
			navbarRef.current.style.setProperty('left', `${newWidth}px`);
			navbarRef.current.style.setProperty(
				'width',
				`calc(100% - ${newWidth}px)`
			);
		}
	};

	// Funcion para saber si se solto el mouse y quitar los eventos
	const handleMouseUp = () => {
		isResizingRef.current = false;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	// Funcion para colapsar el sidebar
	const resetWidth = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false);
			setIsResetting(true);

			sidebarRef.current.style.width = isMobile ? '100%' : '240px';
			navbarRef.current.style.setProperty(
				'width',
				isMobile ? '0' : 'calc(100% - 240px)'
			);
			navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
			setTimeout(() => setIsResetting(false), 300);
		}
	};

	const collapse = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true);
			setIsResetting(true);

			sidebarRef.current.style.width = '0';
			navbarRef.current.style.setProperty('width', '100%');
			navbarRef.current.style.setProperty('left', '0');
			setTimeout(() => setIsResetting(false), 300);
		}
	};

	return (
		<>
			<aside
				ref={sidebarRef} // Referencia al sidebar
				className={cn(
					'group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col w-60 z-[99999]',
					isResetting && 'transition-all ease-in-out duration-300',
					isMobile && 'w-0'
				)}>
				<div
					onClick={collapse}
					role='button'
					className={cn(
						'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition ',
						isMobile && 'opacity-100'
					)}>
					<ChevronsLeft className='w-6 h-6' />
				</div>
				<div>
					<p>Action items</p>
				</div>
				<div className='mt-4'>
					<p>Documents</p>
				</div>
				<div
					onMouseDown={handleMauseDown}
					onClick={resetWidth}
					className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 top-0 right-0'
				/>
			</aside>
			<div
				ref={navbarRef}
				className={cn(
					'absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]',
					isResetting && 'transition-all ease-in-out duration-300',
					isMobile && 'left-0 w-full'
				)}>
				<nav className='bg-transparent px-3 py-2 w-full'>
					{isCollapsed && (
						<MenuIcon role='button' className='h-6 w-6 text-muted-foreground' />
					)}
				</nav>
			</div>
		</>
	);
};

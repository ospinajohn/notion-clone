'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const DocumentsPage = () => {
	const router = useRouter();
	const { user } = useUser();
	const create = useMutation(api.documents.create);

	const onCreate = async () => {
		const promise = create({ title: 'Untitled' }).then(documentId =>
			router.push(`/documents/${documentId}`)
		);

		toast.promise(promise, {
			loading: 'Creating a new note...',
			success: 'New note created!',
			error: 'Failed to create a new note.',
		});
	};

	return (
		<div className='h-full flex flex-col items-center justify-center space-y-4'>
			<Image
				src='/Empty.png'
				height={300}
				width={300}
				alt='Empty'
				className='dark:hidden'
			/>
			<Image
				src='/Empty-dark.png'
				height={300}
				width={300}
				alt='Empty'
				className='hidden dark:block'
			/>
			<h2 className='text-lg font-medium'>
				Welcome to {user?.firstName}&apos;s Jotion
			</h2>
			<Button onClick={onCreate}>
				<PlusCircle className='w-4 h-4 mr-2' />
				Create a new note
			</Button>
		</div>
	);
};

export default DocumentsPage;

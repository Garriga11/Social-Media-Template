'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/app/feed/deletePost';

type Props = {
postId: string;
};

export default function DeleteButton({ postId }: Props) {
const router = useRouter();
const [isPending, startTransition] = useTransition();

const handleDelete = () => {
if (!confirm('Are you sure you want to delete this post?')) return;

startTransition(async () => {
  try {
    await deletePost(postId);
    router.refresh();
  } catch (err) {
    console.error(err);
    alert('Failed to delete post');
  }
});

};

return (
<button onClick={handleDelete} disabled={isPending} className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" >
{isPending ? 'Deleting...' : 'Delete'}
</button>
);
}
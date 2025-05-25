import { DeletePostButton } from '@/app/delete/DeletePostButton'

type Post = {
  id: number
  content: string
  author: {
    clerkId: string
    firstName?: string
    lastName?: string
  }
}

type Props = {
  posts: Post[]
}

export function PostList({ posts }: Props) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <DeletePostButton postId={post.id} postClerkId={post.author.clerkId} />
        </div>
      ))}
    </div>
  )
}

import type { NextApiRequest, NextApiResponse } from 'next';

export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  const posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the first post content.',
      author: 'John Doe',
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the second post content.',
      author: 'Jane Smith',
    },
    {
      id: 3,
      title: 'Third Post',
      content: 'This is the third post content.',
      author: 'Bob Johnson',
    },
  ];

  res.status(200).json(posts);
}
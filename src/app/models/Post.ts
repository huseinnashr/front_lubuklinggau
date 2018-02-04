export interface Post {
  id: string,
  title: string,
  authorId: number,
  author: { id: number, name: string },
  dinas: string,
  dinasId: number,
  isFollowed: boolean,
  follower: { id: number }[],
  categoryId: number,
  category: string, 
  isAnswered: boolean,
  createdAt: string,
  updatedAt: string,
  description: string,
  approved: boolean,
}

export interface PostToolbarData {
  id: number,
  author: { id: number },
  dinas: string,
  dinasId: number,
  isFollowed: boolean;
  isAnswered: boolean;
  follower: { id: number }[],
  approved: boolean,
}

export interface Reply {
  id: string,
  authorId: string,
  postId: string,
  body: string,
}

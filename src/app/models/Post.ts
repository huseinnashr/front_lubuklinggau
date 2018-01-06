export interface Post {
  id: string,
  title: string,
  authorId: number,
  author: { id: number, name: string },
  dinas: string,
  dinasId: number,
  categoryId: number,
  category: string, 
  isAnswered: boolean,
  createdAt: string,
  updatedAt: string,
  description: string,
}

export interface PostToolbarData {
  id: string,
  authorId: number,
  dinas: string,
  dinasId: number,
  isFollowed: boolean;
  isAnswered: boolean;
}

export interface Reply {
  id: string,
  authorId: string,
  postId: string,
  body: string,
}

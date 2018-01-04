export interface Post {
  id: string,
  title: string,
  author: string,
  keywords?: string[],
  hasAccess: boolean,
  isAnswered: boolean,
  isFollowed: boolean,
  isReported: boolean,
  followers: any,
  flaggers: any,
  category: string,
  created_at: string,
  address: string,
  location: {
    lat: number,
    lng: number
  },
  body: string,
}

export interface PostToolbarData {
  id: string,
  isFollowed: boolean;
  isReported: boolean;
  isAnswered: boolean;
  followers: any;
}

export interface Reply {
  id: string,
  postId: string,
  hasAccess: boolean,
  body: string,
}

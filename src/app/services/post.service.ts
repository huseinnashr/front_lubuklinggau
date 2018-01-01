import { Injectable } from '@angular/core';
import { Post, Reply } from '../models/Post';
import { Http } from '@angular/Http';

@Injectable()
export class PostService {

  private post: Post;
  private reply: Reply;

  constructor(public http: Http) { 
    this.post = {
      id: "1",
      title: "Apakah ada subsidi untuk pembelian panel surya?",
      author: "Husein",
      hasAccess: true,
      isAnswered: true,
      isFollowed: true,
      isReported: false,
      followers: 20,
      flaggers: null,
      address: "Jl Bakti",
      category: "Umum",
      created_at: "17-12-2017",
      location: { lat: 124, lng: 234 },
      body: "A rainbow is a meteorological phenomenon that is caused by reflection, refraction and dispersion of light in water droplets resulting in a spectrum of light appearing in the sky. It takes the form of a multicoloured circular arc. Rainbows caused by sunlight always appear in the section of sky directly opposite the sun."
    }

    this.reply = {
      id: "3",
      postId: "1",
      hasAccess: true,
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }
  }

  getPostsPreview(filter: string = ""){
    let posts: Post[] = [];
    for(let i = 0; i < 5; i++){
      posts.push(this.post);
    }

    // return this.http.get('https://jsonplaceholder.typicode.com/posts')
    //   .map(res => res.json());
    return posts;
  }

  getPostById(postId: string){
    return this.post;
  }

  getReplyByPostId(postId: string){
    return this.reply;
  }

}

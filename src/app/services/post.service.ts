import { Injectable } from '@angular/core';
import { Post, Reply } from '../models/Post';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../_config/index';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';

@Injectable()
export class PostService {

  constructor(
    public http: Http, 
    private snackBar: MatSnackBar,
    private aService: AuthService,
  ) { }

  getPosts(filters): Observable<{rows: Post[], count: number}> {
    const headers = new Headers();
    const options = new RequestOptions({headers: headers});
    options.headers.set('filters', JSON.stringify(filters));
    return this.http.get(`${CONFIG.API_ADDRESS}/post/`, options)
    .map((response: Response): { rows: Post[], count: number } => {
        let res = response.json();
        if (res.count > 0) {
            res.rows.map((post) => {
              post.category = post.category.name;
              post.dinas = post.dinas.name;
              return post;
            })
            return res;
        } else {
          this.snackBar.open(res.message, null, { duration: 3000 });
          return { rows: null, count: res.count }
        }
    })
    .catch((error, caught): Observable<{ rows: Post[], count: number}> => {
      return Observable.throw(error);
    });
  }

  addPost(title, category, description): Observable<number> {
    return this.http.post(`${CONFIG.API_ADDRESS}/post/`, { title, category, description }, this.aService.getHeader())
    .map((response: Response): number => {
        let postId = response.json() ? response.json().id : null;
        if (postId) {
            this.snackBar.open(response.json().message, null, { duration: 3000 });
            return postId;
        } else {
          this.snackBar.open('Post gagal dibuat', null, { duration: 3000 });
          return -1;
        }
    })
    .catch((error, caught): Observable<number> => {
      this.snackBar.open(error, null, { duration: 3000 });
      return Observable.throw(null);
    });
  }

  getPostById(id): Observable<Post> {
    return this.http.get(`${CONFIG.API_ADDRESS}/post/${id}`)
    .map((response: Response): Post => {
        let post = response.json();
        if (post) {
            post.category = post.category.name;
            post.dinas = post.dinas.name;
            return post;
        } else {
          return null;
        }
    })
    .catch((error, caught): Observable<Post> => {
      this.snackBar.open(error.json().message, null, { duration: 3000 });
      return Observable.of(null);
    });
  }

  updatePost(post): Observable<boolean>{
    return this.http.post(`${CONFIG.API_ADDRESS}/post/${post.id}`, { 
      title: post.title, categoryId: post.categoryId, description: post.description}, this.aService.getHeader())
    .map((response: Response): boolean => {
        let count = response.json() ? response.json().count : null;
        if (count > 0) {
            this.snackBar.open(response.json().message, null, { duration: 3000 });
            return true;
        } else if (count == 0) {
          this.snackBar.open(response.json().message, null, { duration: 3000 });
          return false;
        } else {
          this.snackBar.open('Post gagal diperbaharui', null, { duration: 3000 });
          return false;
        }
    })
    .catch((error, caught): Observable<boolean> => {
      this.snackBar.open('Kesalahan dalam mengaupdate post', null, { duration: 3000 });
      return Observable.of(false);
    });
  }

  deletePost(post): Observable<boolean>{
    return this.http.delete(`${CONFIG.API_ADDRESS}/post/${post.id}`, this.aService.getHeader())
    .map((response: Response): boolean => {
        let count = response.json() ? response.json().count : null;
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        return count > 0;
    })
    .catch((error, caught): Observable<boolean> => {
      this.snackBar.open('Gagal menghapus post', null, { duration: 3000 });
      return Observable.of(false);
    });
  }

  disposisi(post): Observable<{ dinasId: number, dinas: string }>{
    return this.http.post(`${CONFIG.API_ADDRESS}/post/${post.id}/disposisi`, { dinasId: post.dinasId }, this.aService.getHeader())
    .map((response: Response): { dinasId: number, dinas: string } => {
        let result = response.json();
        if (result.data) {
          this.snackBar.open(`Berhasil disposisi ke dinas ${result.data.dinas}`, null, { duration: 3000 });
          return result.data;
        } else {
          this.snackBar.open(result.message, null, { duration: 3000 });
          return;
        }
    })
    .catch((error, caught): Observable<{ dinasId: number, dinas: string }> => {
      this.snackBar.open('Gagal disposisi', null, { duration: 3000 });
      return Observable.of(null);
    });
  }

  addReply(reply, post): Observable<boolean>{
    return this.http.post(`${CONFIG.API_ADDRESS}/post/${post.id}/reply`, { body: reply, postDinas: post.dinasId }, this.aService.getHeader())
    .map((response: Response): boolean => {
        let replyId = response.json() ? response.json().id : null;
        if (replyId) {
            this.snackBar.open(response.json().message, null, { duration: 3000 });
            return true;
        } else {
          this.snackBar.open('Gagal dalam membuat jawaban', null, { duration: 3000 });
          return false;
        }
    })
    .catch((error, caught): Observable<boolean> => {
      this.snackBar.open('Kesalahan dalam membuat jawaban', null, { duration: 3000 });
      return Observable.of(false);
    });
  }

  getReplyByPostId(postId: string){
    return this.http.get(`${CONFIG.API_ADDRESS}/post/${postId}/reply`)
    .map((response: Response): Reply => {
        let reply = response.json();
        if (reply) {
            return reply;
        } else {
          return null;
        }
    })
    .catch((error, caught): Observable<Reply> => {
      this.snackBar.open('Gagal mendapatkan jawaban', null, { duration: 3000 });
      return Observable.of(null);
    });
  }

  updateReply(reply, post): Observable<boolean>{
    return this.http.post(`${CONFIG.API_ADDRESS}/post/${post.id}/reply/${reply.id}`, { body: reply.body, postDinas: post.dinasId }, this.aService.getHeader())
    .map((response: Response): boolean => {
        let replyId = response.json() ? response.json().reply : null;
        if (replyId > 0) {
            this.snackBar.open(response.json().message, null, { duration: 3000 });
            return true;
        } else if (replyId == 0) {
          this.snackBar.open(response.json().message, null, { duration: 3000 });
          return false;
        } else {
          this.snackBar.open('Jawaban gagal diperbaharui', null, { duration: 3000 });
          return false;
        }
    })
    .catch((error, caught): Observable<boolean> => {
      this.snackBar.open('Kesalahan dalam mengaupdate jawaban', null, { duration: 3000 });
      return Observable.of(false);
    });
  }

  deleteReply(reply, post): Observable<boolean>{
    return this.http.delete(`${CONFIG.API_ADDRESS}/post/${post.id}/reply/${reply.id}`, this.aService.getHeader())
    .map((response: Response): boolean => {
        let count = response.json() ? response.json().count : null;
        this.snackBar.open(response.json().message, null, { duration: 3000 });
        return count > 0;
    })
    .catch((error, caught): Observable<boolean> => {
      this.snackBar.open('Gagal menghapus reply', null, { duration: 3000 });
      return Observable.of(false);
    });
  }

}

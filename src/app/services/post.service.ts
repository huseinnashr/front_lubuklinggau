import { Injectable } from '@angular/core';
import { Post, Reply } from '../models/Post';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../_config/index';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from './auth.service';
import { CurrentUser } from '../models/index';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse, HttpRequest } from '@angular/common/http';
import { ActionProgressDialogComponent } from '../components/dialog/action-progress-dialog/action-progress-dialog.component';

@Injectable()
export class PostService {

  constructor(
    public http: Http,
    public http_: HttpClient,
    private snackBar: MatSnackBar,
    private aService: AuthService,
    public dialog: MatDialog,
  ) { }

  handleError(err: HttpErrorResponse, action: String): Observable<any> {
    if (err instanceof Error){
      console.log(err);
    } else if (err.error instanceof Error) {
      console.log(err.error.message);
    } else {
      let error = err.error;
      let msg = error.isLoggedOut ? `Kamu harus masuk untuk ${action}` : error.message || `Kesalahan dalam aksi ${action}`;
      this.snackBar.open(msg, null, { duration: 3000 });
    }
    return Observable.empty();
  }

  private isFollowed(user: CurrentUser, followers: { id: number }[]): boolean {
    if (!user) return false;
    if (user.usertype < 3) return false;
    const userId = user.id;
    for ( let i = 0; i < followers.length; i++ ){
      if (followers[i].id == userId) return true;
    }  
    return false;
  }

  uploadImage(files: FileList): Observable<String[]>{
    let formData = new FormData();
    for (let i = 0; i < files.length; i++){
      formData.append('image', files.item(i));
    }
    const dialogData = { description: `Mengunggah ${files.length} gambar`, progress: 0, bytes: {loaded: 0, total: 0 }};
    const dialogRef = this.dialog.open(ActionProgressDialogComponent, {
      disableClose: true,
      width: '300px',
      data: dialogData,
    });
    const req = new HttpRequest('POST', `${CONFIG.API_ADDRESS}/image/`, formData, { headers: this.aService.getMultipartHeader_(), reportProgress: true });
    return this.http_.request(req)
    .map((event: any): String[] => {
      if (event.type === HttpEventType.UploadProgress) {
        dialogData.progress = Math.round(100 * event.loaded / event.total);
        dialogData.bytes.loaded = Math.round(event.loaded / 1000);
        dialogData.bytes.total = Math.round(event.total / 1000);
        return [];
      } else if (event.type === HttpEventType.Response) {
        dialogRef.close();
        return event.body.map((res) => `${CONFIG.API_ADDRESS}/public/images/${res}`);
      } else {
        return [];
      }
    })
    .catch((error) => { 
      dialogRef.close();
      return this.handleError(error, 'Upload Gambar');
    })
    .takeUntil(dialogRef.afterClosed().first());
  }

  getPosts(filters, showSnackbar = true): Observable<{rows: Post[], count: number}> {
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
              post.isFollowed = this.isFollowed(this.aService.getCurrentUser(), post.follower);
              return post;
            })
            return res;
        } else {
          if (showSnackbar) this.snackBar.open(res.message, null, { duration: 3000 });
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
            post.isFollowed = this.isFollowed(this.aService.getCurrentUser(), post.follower);
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

  follow(postId: number): Observable<{following: boolean, follower: {id: number}[]}> {
    return this.http.post(`${CONFIG.API_ADDRESS}/post/${postId}/follow`, {}, this.aService.getHeader())
    .map((response: Response): {following: boolean, follower: {id: number}[]} => {
        let result = response.json();
        let msg = result.following ? 'Berhasil mengikuti post' : 'Berhasil berhenti mengikuti post';
        this.snackBar.open(msg, null, { duration: 3000 });
        return result;
    })
    .catch((error): Observable<{following: boolean, follower: {id: number}[]}> => {
      let err = error.json();
      let msg = !err.isLoggedIn ? 'Kamu harus masuk untuk mengikuti post' : err.message || 'Kesalahan dalam aksi mengikuti post';
      this.snackBar.open(msg, null, { duration: 3000 });
      return Observable.throw(msg);
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
        let reply = response.json().reply;
        if (reply) {
            return reply;
        } else {
          return null
        }
    })
    .catch((error): Observable<Reply> => {
      this.snackBar.open('Kesalahan dalam mendapatkan jawaban', null, { duration: 3000 });
      return Observable.throw(error);
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

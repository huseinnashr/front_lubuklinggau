import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tambah-jawaban-page',
  templateUrl: './tambah-jawaban-page.component.html',
  styleUrls: ['./tambah-jawaban-page.component.scss']
})
export class TambahJawabanPageComponent implements OnInit {

  jawabanFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);

  post: Post;

  constructor(private pService: PostService, private navigator: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
    let postId = this.route.snapshot.params['id'];
    this.post = this.pService.getPostById(postId);
  }

  onTambahJawaban(){
  }

}

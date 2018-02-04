import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { PostService } from '../../services/index';
import { Quill } from 'quill';
import * as q from 'quill';
import { Subject } from 'rxjs';

const quill: any = q;
const Parchment = quill.import('parchment');
const BlockEmbed = quill.import('blots/block/embed');

let Block = Parchment.query('block');
Block.tagName = 'DIV';

class ImageBlot extends BlockEmbed {
  static blotName = 'imageWContainer';
  static tagName = 'img';
  static create(url) {
      const node = super.create();
      node.setAttribute('src', url);
      const imgWrapper = <HTMLDivElement>document.createElement('div');
      imgWrapper.setAttribute('class', 'ql-align-center');

      imgWrapper.appendChild(node);
      return imgWrapper;
  }

  static value(node) {
    return node.firstChild.getAttribute('src');
  }

  deleteAt(index: number, length: number) {
    super.deleteAt(0, 1);
  }

  length() {
      return 1;
  }
}

quill.register(Block, true);
quill.register(ImageBlot);

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent{

  @ViewChild('imageInput') imageInput;
  @Input('bounds') bounds;
  @Input('placeholder') placeholder;
  @Output('onCreated') onCreated: EventEmitter<Quill> = new EventEmitter();
  public quill: Quill;
  public style = { height: '300px' };

  toolbarOptions = { 
    container: [['bold', 'italic', 'underline', 'strike'], [{ 'align': ['', 'center', 'right', 'justify'] }], ['link', 'image']],
    handlers: { image: this.imageHandler.bind(this)}
  };

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private pService: PostService) { 
    const height = window.innerHeight - 365;
    this.style.height = `${height}px`;
  }
  
  getQuill($event: Quill){
    this.quill = $event; 
    this.onCreated.emit($event);
  }

  imageHandler(){
    const imageInput = document.createElement('input');
    imageInput.setAttribute('type', 'file');
    imageInput.setAttribute('accept', 'image/*');
    imageInput.setAttribute('multiple', 'multiple');
  
    const cursor = this.quill.getSelection().index;
    const line = this.quill.getLine(cursor + 1);

    imageInput.addEventListener('change', () => {
      this.pService.uploadImage(imageInput.files)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((urls) => {
        urls.forEach((url) => {
          this.quill.insertEmbed(cursor, 'imageWContainer', url);
          this.quill.setSelection(cursor + 1, 0);
        })
      });
    });

    imageInput.click();
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  static isQuillEmpty(quill: Quill){
    return quill.getContents().ops[0].insert == '\n' && quill.getLength() < 2;
  }

}

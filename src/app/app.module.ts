import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/Http';

import { AppComponent } from './app.component';
import { BantuanPageComponent } from './components/bantuan-page/bantuan-page.component';
import { CariPageComponent } from './components/cari-page/cari-page.component';
import { DaftarPageComponent } from './components/daftar-page/daftar-page.component';
import { MasukPageComponent } from './components/masuk-page/masuk-page.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { PostPreviewItemComponent } from './components/post-preview-item/post-preview-item.component';
import { PostToolbarComponent } from './components/post-toolbar/post-toolbar.component';
import { TambahPostPageComponent } from './components/tambah-post-page/tambah-post-page.component';
import { UtamaPageComponent } from './components/utama-page/utama-page.component';
import { PostService } from './services/post.service';
import { CategoryService } from './services/category.service';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DATE_FORMATS } from './models/Date';

@NgModule({
  declarations: [
    AppComponent,
    BantuanPageComponent,
    CariPageComponent,
    DaftarPageComponent,
    MasukPageComponent,
    PostPageComponent,
    PostPreviewItemComponent,
    PostToolbarComponent,
    TambahPostPageComponent,
    UtamaPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    MatMomentDateModule
  ],
  providers: [ 
    PostService, 
    CategoryService,
    { provide: MAT_DATE_LOCALE, useValue: 'id-ID' },
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


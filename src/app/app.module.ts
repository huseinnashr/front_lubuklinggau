import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BantuanPageComponent } from './components/bantuan-page/bantuan-page.component';
import { CariPageComponent } from './components/cari-page/cari-page.component';
import { DaftarPageComponent } from './components/daftar-page/daftar-page.component';
import { MasukPageComponent } from './components/masuk-page/masuk-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { PostPreviewItemComponent } from './components/post-preview-item/post-preview-item.component';
import { PostToolbarComponent } from './components/post-toolbar/post-toolbar.component';
import { TambahPostPageComponent } from './components/tambah-post-page/tambah-post-page.component';
import { UtamaPageComponent } from './components/utama-page/utama-page.component';
import { PostService } from './services/post.service';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [
    AppComponent,
    BantuanPageComponent,
    CariPageComponent,
    DaftarPageComponent,
    MasukPageComponent,
    NavbarComponent,
    PostPageComponent,
    PostPreviewItemComponent,
    PostToolbarComponent,
    TambahPostPageComponent,
    UtamaPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [ PostService, CategoryService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { BantuanPageComponent } from './components/bantuan-page/bantuan-page.component';
import { CariPageComponent } from './components/cari-page/cari-page.component';
import { DaftarPageComponent } from './components/daftar-page/daftar-page.component';
import { MasukPageComponent } from './components/masuk-page/masuk-page.component';
import { PostDetailPageComponent } from './components/post-detail-page/post-detail-page.component';
import { PostPreviewItemComponent } from './components/post-preview-item/post-preview-item.component';
import { PostToolbarComponent } from './components/post-toolbar/post-toolbar.component';
import { TambahPostPageComponent } from './components/tambah-post-page/tambah-post-page.component';
import { UtamaPageComponent } from './components/utama-page/utama-page.component';

import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DATE_FORMATS } from './models/Date';
import { PostPageComponent } from './components/post-page/post-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { TambahJawabanPageComponent } from './components/tambah-jawaban-page/tambah-jawaban-page.component';
import { EditJawabanPageComponent } from './components/edit-jawaban-page/edit-jawaban-page.component';
import { EditPostPageComponent } from './components/edit-post-page/edit-post-page.component';
import { ManageAdminPageComponent } from './components/manage-admin-page/manage-admin-page.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

import { UserService, PostService, CategoryService, AuthService } from './services';
import { AuthGuard, AdminGuard, AlreadyAuthGuard, CanDeactivateGuard } from './_guards/index';
import { NotfoundPageComponent } from './components/notfound-page/notfound-page.component';
import { AdminService } from './services/admin.service';
import { HttpModule } from '@angular/http';
import { DisposisiDialogComponent } from './components/dialog/disposisi-dialog/disposisi-dialog.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { ManageDinasComponent } from './components/manage-dinas/manage-dinas.component';
import { AuthorDialogComponent } from './components/dialog/author-dialog/author-dialog.component';
import { UserlistDialogComponent } from './components/dialog/userlist-dialog/userlist-dialog.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { ActionProgressDialogComponent } from './components/dialog/action-progress-dialog/action-progress-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BantuanPageComponent,
    CariPageComponent,
    DaftarPageComponent,
    MasukPageComponent,
    PostDetailPageComponent,
    PostPreviewItemComponent,
    PostToolbarComponent,
    TambahPostPageComponent,
    UtamaPageComponent,
    PostPageComponent,
    ProfilePageComponent,
    TambahJawabanPageComponent,
    EditJawabanPageComponent,
    EditPostPageComponent,
    ManageAdminPageComponent,
    ConfirmationDialogComponent,
    NotfoundPageComponent,
    DisposisiDialogComponent,
    ManageCategoryComponent,
    ManageDinasComponent,
    AuthorDialogComponent,
    UserlistDialogComponent,
    TextEditorComponent,
    ActionProgressDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    QuillModule,
    HttpClientModule,
  ],
  providers: [ 
    PostService, 
    CategoryService,
    { provide: MAT_DATE_LOCALE, useValue: 'id-ID' },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    AuthService,
    UserService,
    AdminService,
    AuthGuard,
    AlreadyAuthGuard,
    AdminGuard,
    CanDeactivateGuard,
   ],
  entryComponents: [ConfirmationDialogComponent, DisposisiDialogComponent, AuthorDialogComponent, UserlistDialogComponent, ActionProgressDialogComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


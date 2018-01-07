import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtamaPageComponent } from './components/utama-page/utama-page.component';
import { CariPageComponent } from './components/cari-page/cari-page.component';
import { TambahPostPageComponent } from './components/tambah-post-page/tambah-post-page.component';
import { MasukPageComponent } from './components/masuk-page/masuk-page.component';
import { DaftarPageComponent } from './components/daftar-page/daftar-page.component';
import { BantuanPageComponent } from './components/bantuan-page/bantuan-page.component';
import { PostDetailPageComponent } from './components/post-detail-page/post-detail-page.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ManageAdminPageComponent } from './components/manage-admin-page/manage-admin-page.component';
import { TambahJawabanPageComponent } from './components/tambah-jawaban-page/tambah-jawaban-page.component';
import { EditJawabanPageComponent } from './components/edit-jawaban-page/edit-jawaban-page.component';
import { EditPostPageComponent } from './components/edit-post-page/edit-post-page.component';
import { AuthGuard, AdminGuard, AlreadyAuthGuard } from './_guards/index';
import { NotfoundPageComponent } from './components/notfound-page/notfound-page.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { ManageDinasComponent } from './components/manage-dinas/manage-dinas.component';

const routes: Routes = [
  { path: '', component: UtamaPageComponent },
  { path: 'cari', component: CariPageComponent, },
  { path: 'masuk', component: MasukPageComponent, canActivate: [AlreadyAuthGuard] },
  { path: 'daftar', component: DaftarPageComponent, canActivate: [AlreadyAuthGuard] },
  { path: 'kelola-admin', component: ManageAdminPageComponent, canActivate: [AdminGuard] },
  { path: 'kelola-kategori', component: ManageCategoryComponent, canActivate: [AdminGuard] },
  { path: 'kelola-dinas', component: ManageDinasComponent, canActivate: [AdminGuard] },
  { path: 'bantuan', component: BantuanPageComponent },
  { path: 'post/tambah', component: TambahPostPageComponent, canActivate: [AuthGuard]},
  { path: 'post', component: PostPageComponent },
  { path: 'post/:id', component: PostDetailPageComponent },
  { path: 'post/:id/edit', component: EditPostPageComponent, canActivate: [AuthGuard] },
  { path: 'post/:id/jawaban/tambah', component: TambahJawabanPageComponent, canActivate: [AdminGuard] },
  { path: 'post/:id/jawaban/edit', component: EditJawabanPageComponent, canActivate: [AdminGuard] },
  { path: '404', component: NotfoundPageComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

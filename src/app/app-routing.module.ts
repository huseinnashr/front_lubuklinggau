import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtamaPageComponent } from './components/utama-page/utama-page.component';
import { CariPageComponent } from './components/cari-page/cari-page.component';
import { TambahPostPageComponent } from './components/tambah-post-page/tambah-post-page.component';
import { MasukPageComponent } from './components/masuk-page/masuk-page.component';
import { DaftarPageComponent } from './components/daftar-page/daftar-page.component';
import { BantuanPageComponent } from './components/bantuan-page/bantuan-page.component';
import { PostPageComponent } from './components/post-page/post-page.component';

const routes: Routes = [
  { path: '', component: UtamaPageComponent },
  { path: 'cari', component: CariPageComponent },
  { path: 'tambah-pertanyaan', component: TambahPostPageComponent },
  { path: 'masuk', component: MasukPageComponent },
  { path: 'daftar', component: DaftarPageComponent },
  { path: 'bantuan', component: BantuanPageComponent },
  { path: 'post/:id', component: PostPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

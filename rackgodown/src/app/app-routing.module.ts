import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GodownAddComponent } from './godown-add/godown-add.component';
import { GodownEditComponent } from './godown-edit/godown-edit.component';
import { GodownListComponent } from './godown-list/godown-list.component';
import { RackAddComponent } from './rack-add/rack-add.component';
import { RackEditComponent } from './rack-edit/rack-edit.component';
import { RackListComponent } from './rack-list/rack-list.component';

const routes: Routes = [

  { path: '', redirectTo: '/racks', pathMatch: 'full' },
  {
    path: 'rack-list', component: RackListComponent,
    children: [
      { path: 'edit-rack/:id', component: RackEditComponent }
    ]
  },
  { path: 'add-rack', component: RackAddComponent },
  { path: 'edit-rack', component: RackEditComponent },
  {
    path: 'godown-list', component: GodownListComponent,
    children: [
      { path: 'edit-godown/:id', component: RackEditComponent }
    ]
  },
  { path: 'add-godown', component: GodownAddComponent },
  { path: 'edit-godown', component: GodownEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

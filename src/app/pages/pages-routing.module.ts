import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterUserComponent } from './master-user/master-user.component';
import { CategoryComponent } from './category/category.component';
import { EditUserComponent } from './master-user/edit-user/edit-user.component';


const routes: Routes = [
  { path: 'master-user', component: MasterUserComponent },
  {
    path: 'master-user/edit-user/:id',
    component: EditUserComponent, // Nested route untuk edit user
  },
  { path: 'category', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

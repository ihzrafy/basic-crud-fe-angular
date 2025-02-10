import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MasterUserComponent } from './master-user/master-user.component';
import { MatTableModule } from '@angular/material/table';
import { CategoryComponent } from './category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './master-user/edit-user/edit-user.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    MasterUserComponent,
    CategoryComponent,
    EditUserComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgApexchartsModule
  ]
})
export class PagesModule { }

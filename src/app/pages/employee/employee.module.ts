import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailComponent } from './detail/detail.component';
import { CurrencyMaskDirective } from '../../directives/currency-mask.directive';
import { FormatNumberDirective } from '../../directives/format-number.directive';

const routes: Routes = [
  {
    path: 'employee',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: ':id',
    component: DetailComponent
  }
];


const components = [ // NOSONA
  FormatNumberDirective,
  CurrencyMaskDirective,
  ListComponent,
  AddComponent,
  DetailComponent,
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxPaginationModule
  ],
  exports: [components],
  providers: [
    DecimalPipe,
    CurrencyPipe,
  ]
})
export class EmployeeModule { }

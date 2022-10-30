import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { ExercisesComponent } from '../app/components/exercises/exercises.component';
import { HomeComponent } from '../app/components/home/home.component';
import { NotificationsComponent } from '../app/components/notifications/notifications.component';
import { OrdersComponent } from '../app/components/orders/orders.component';
import { ProductsComponent } from '../app/components/products/products.component';
import { TraineesComponent } from '../app/components/trainees/trainees.component';
import { TrainersComponent } from '../app/components/trainers/trainers.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'login',component:LoginFormComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'trainers',component:TrainersComponent},
  {path:'trainees',component:TraineesComponent},
  {path:'exercises',component:ExercisesComponent},
  {path:'products',component:ProductsComponent},
  {path:'orders',component:OrdersComponent},
  {path:'notifications',component:NotificationsComponent},
  {path:'add-product',component:AddProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'trainers',component:TrainersComponent},
  {path:'trainees',component:TraineesComponent},
  {path:'exercises',component:ExercisesComponent},
  {path:'products',component:ProductsComponent},
  {path:'orders',component:OrdersComponent},
  {path:'notifications',component:NotificationsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {path:'login',component:LoginFormComponent},
  {
    path: 'dashboard', component: MainLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'trainers', component: TrainersComponent },
      { path: 'trainees', component: TraineesComponent },
      { path: 'exercises', component: ExercisesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'add-product', component: AddProductComponent },
    ]
  },
  
    
  { path: '', redirectTo: 'login', pathMatch: 'full' },
     //canActivate: [AuthGuard]
  
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

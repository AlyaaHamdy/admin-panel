import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { SidenavComponent } from '../app/components/sidenav/sidenav.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from '../app/components/home/home.component';
import { TrainersComponent } from '../app/components/trainers/trainers.component';
import { TraineesComponent } from '../app/components/trainees/trainees.component';
import { ExercisesComponent } from '../app/components/exercises/exercises.component';
import { ProductsComponent } from '../app/components/products/products.component';
import { OrdersComponent } from '../app/components/orders/orders.component';
import { NotificationsComponent } from '../app/components/notifications/notifications.component';
import { DialogComponent } from '../app/components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productDialog } from '../app/components/products/product-dialog/productDialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './components/card/card.component';
import { TrainersDialogComponent } from './components/trainers-dialog/trainers-dialog.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpIntercepters } from './services/API/httpInetcebtors';
import { TrainerDetailsComponent } from './components/trainer-details/trainer-details.component';
import { TraineeDetailsComponent } from './components/trainee-details/trainee-details.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AssignedTraineeComponent } from './components/assigned-trainee/assigned-trainee.component';
import { ToastrModule } from 'ngx-toastr';
import {ThemePalette} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CanvasJSChart } from 'angular-canvasjs-chart-samples/angular-canvasjs-chart-samples/src/assets/canvasjs.angular.component';
// import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
// var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    HomeComponent,
    TrainersComponent,
    TraineesComponent,
    ExercisesComponent,
    ProductsComponent,
    OrdersComponent,
    NotificationsComponent,
    DialogComponent,
    productDialog,
    CardComponent,
    TrainersDialogComponent,
    AddProductComponent,
    LoginFormComponent,
    LogoutComponent,
    NotFoundComponent,
    MainLayoutComponent,
    LoaderComponent,
    TrainerDetailsComponent,
    TraineeDetailsComponent,
    ProductDetailsComponent,
    AssignedTraineeComponent,
    ConfirmDialogComponent,
    CanvasJSChart
    
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    HighchartsChartModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot({
      positionClass:"toast-top-center",
      timeOut:5000,
      
    }),
    MatCheckboxModule
  
  
    
  ],
  providers: [
    HttpIntercepters,
    // {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions}
  ],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmDialogComponent]
})
export class AppModule { }

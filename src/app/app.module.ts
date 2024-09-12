import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './page/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardHeadComponent } from './components/dashboard-head/dashboard-head.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule, DatePipe } from '@angular/common';
import {FormsModule} from'@angular/forms'
import {
  HttpClientModule
} from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';

//primeng imports
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { NgxUiLoaderModule,NgxUiLoaderHttpModule} from "ngx-ui-loader";
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';
import { AuthGuard } from './auth-service/authguard/authguard';
import { SignupComponent } from './page/signup/signup.component';
import { CourseListComponent } from './page/courses/course-list/course-list.component';
import { AddCourseComponent } from './page/courses/add-course/add-course.component';
import { RoomListComponent } from './page/room/room-list/room-list.component';
import { DxSchedulerModule } from 'devextreme-angular';
import { AddPrefComponent } from './page/courses/add-pref/add-pref.component';
import { PrefListComponent } from './page/pref/pref-list/pref-list.component';
import { StudentCoursesComponent } from './page/courses/student-courses/student-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DashboardHeadComponent,
    DashboardComponent,
    SidebarComponent,
    SignupComponent,
    CourseListComponent,
    AddCourseComponent,
    RoomListComponent,
    AddPrefComponent,
    PrefListComponent,
    StudentCoursesComponent,
  ],
  imports: [
    ChipsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    DropdownModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    BreadcrumbModule,
    MultiSelectModule,
    PasswordModule,
    InputSwitchModule,
    CalendarModule,
    FileUploadModule,
    ToastModule,
    ChartModule,
    NgxUiLoaderModule,
    DialogModule,
    InputNumberModule,
    PaginatorModule,
    BadgeModule,
    DxSchedulerModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    })
  ],

  providers: [
    AuthGuard,
    DatePipe
],
  bootstrap: [AppComponent]
})
export class AppModule { }

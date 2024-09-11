import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './page/login-form/login-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth-service/authguard/authguard';
import { SignupComponent } from './page/signup/signup.component';
import { CourseListComponent } from './page/courses/course-list/course-list.component';
import { AddCourseComponent } from './page/courses/add-course/add-course.component';
import { RoomListComponent } from './page/room/room-list/room-list.component';
import { AddPrefComponent } from './page/courses/add-pref/add-pref.component';
import { PrefListComponent } from './page/pref/pref-list/pref-list.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'course',
    component: CourseListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pref',
    component: PrefListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-pref',
    component: AddPrefComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'room',
    component: RoomListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

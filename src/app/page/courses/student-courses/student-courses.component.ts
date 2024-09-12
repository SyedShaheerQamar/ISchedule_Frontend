import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthguardService } from 'src/app/auth-service/authguard/authguard.service';
import { CourseService } from '../serivce/course.service';
import { Course } from 'src/app/model/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.scss'],
  providers: [MessageService]
})
export class StudentCoursesComponent {
  visible!: boolean;
  assignVisibile!: boolean;
  perfVisible!: boolean;
  dId!:number;
  aId!:number;
  items: MenuItem[] | undefined;
  courses!:Course[];
  permission: boolean = true;
  courseNameAssign!: any;

  constructor(
    private courseService:CourseService,
    private messageService:MessageService, 
    private authguardService: AuthguardService,
    private router: Router
  ) { }
  
 

  ngOnInit() {
      this.items = [{ label: 'Course List'}];
      this.getCourses();
  }

  getCourses(){
    const email = localStorage.getItem("email");

   this.courseService.getAllCourseByStudent(email).subscribe((res:Course[])=>{
    console.log(res);
    
    this.courses=res;    
    var count=0;
    this.courses.forEach(course => {
      if (course.days && course.days.length > 0) {
        course.days = course.days.join(", ");
        console.log(course.days);
        
      } else {
         console.log(`Course: ${course.courseName} has no days specified.`);
      }
   });
    
    
   },error=>{
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
   })
  }

}

import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthguardService } from 'src/app/auth-service/authguard/authguard.service';
import { CourseService } from '../serivce/course.service';
import { Course } from 'src/app/model/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers:[MessageService]
})
export class CourseListComponent implements OnInit {
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

  hasPermission():boolean{
    return this.authguardService.hasAdminPermission()
  }
  
  hasStudentPermission():boolean{
    return this.authguardService.hasStudentPermission();
  }

  hasAssistantPermission():boolean{
    return this.authguardService.hasAssistantPermission();
  }

  getCourses(){
   this.courseService.getAllCourse().subscribe((res:Course[])=>{
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

  deleteCourseByID(id:number){
    this.courseService.deleteCourseByID(id).subscribe(()=>{
      this.visible = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Course is deleted on id '});
      this.getCourses();
    },error=>{
      this.visible = false;
      this.getCourses();
    });
   }

   assignCourseByID(){
    const email = localStorage.getItem("email");

    this.courseService.assignStudentCourse(email, this.courseNameAssign).subscribe((res:Course)=>{
      this.assignVisibile = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Course added'});
      this.getCourses();
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Already assigned' });
    });
   }

   addPerference(courseName: any){
    localStorage.setItem("course", courseName);
    this.router.navigate(['/add-pref']);
   }

  showDialog(id:number) {
    this.dId=id;
    this.visible = true;
  }

  showAssignDialog(courseName: any) {
    this.courseNameAssign = courseName;
    this.assignVisibile = true;
  }

  showPerfDialog() {
    this.perfVisible = true;
  }
}

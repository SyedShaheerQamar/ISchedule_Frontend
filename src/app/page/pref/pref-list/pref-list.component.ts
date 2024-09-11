import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthguardService } from 'src/app/auth-service/authguard/authguard.service';
import { Course } from 'src/app/model/room';
import { PrefService } from '../service/pref.service';

@Component({
  selector: 'app-pref-list',
  templateUrl: './pref-list.component.html',
  styleUrls: ['./pref-list.component.scss'],
  providers: [MessageService]
})
export class PrefListComponent {

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
    private prefService:PrefService,
    private messageService:MessageService, 
    private authguardService: AuthguardService
  ) { }
  
 

  ngOnInit() {
      this.items = [{ label: 'Pref List'}];
      this.getPrefs();
  }

  hasPermission():boolean{
    return this.authguardService.hasAdminPermission()
  }

  getPrefs(){
   this.prefService.getAllPref().subscribe((res:Course[])=>{
    console.log(res);
    
    this.courses=res;
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

  deletePrefByID(id:number){
    this.prefService.deleteCourse(id).subscribe((res:any)=>{
      this.getPrefs();
      this.visible = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Driver is deleted on id '+res.id});
      
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    });
   }

   updateCourseByID(id: any){

    this.prefService.updateCourse(id).subscribe((res:Course)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Course updated'});
      this.deletePrefByID(id);
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Already assigned' });
    });
   }

  showDialog(id:number) {
    this.dId=id;
    this.visible = true;
  }

}

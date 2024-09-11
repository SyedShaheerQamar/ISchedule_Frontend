import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { TimetableService } from './service/timetable.service';
import { Course } from 'src/app/model/room';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, DatePipe]
})
export class DashboardComponent implements OnInit {

  date!: string|null;
  rooms!: any[];

  items: MenuItem[] | undefined;
  data1: any;
  options1: any;
  userLength: number = 0;
  requestLength: number = 0;
  categoryLength: number = 0;
  url = environment.baseurl;

  constructor(
    private timeTableService: TimetableService,
    private messageService:MessageService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.items = [{ label: 'Dash Board' }];
    this.getTimeTable();
  }

  getTimeTable(){
    const currentDate = new Date();
    this.date = this.datePipe.transform(currentDate, 'MMMM d, y');
    
    this.timeTableService.getTimeTable().subscribe((res:any) => {
      if (res && Array.isArray(res)) {
        const roomMap: { [key: string]: Course[] } = {};
  
        res.forEach(course => {
          if (course.roomNumber) {
            if (!roomMap[course.roomNumber]) {
              roomMap[course.roomNumber] = [];
            }
            roomMap[course.roomNumber].push(course);
          }
        });
  
        this.rooms = Object.keys(roomMap).map(roomNumber => ({
          id: roomNumber,
          courses: roomMap[roomNumber].map(course => ({
            name: course.courseName || 'Unknown Course',
            time: course.startTime && course.endTime ? `${course.startTime}-${course.endTime}` : 'Unknown Time'
          }))
        }));
      } else {
        this.rooms = [];  
      }      
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
     
    });
  }

}

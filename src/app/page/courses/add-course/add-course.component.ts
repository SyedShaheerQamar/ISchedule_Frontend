import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Dropdown } from 'primeng/dropdown';
import { CourseService } from '../serivce/course.service';
import { CheckboxModule } from 'primeng/checkbox';
import { RoomService } from '../../room/service/room.service';
import { Course, Room } from 'src/app/model/room';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  providers: [MessageService]
})
export class AddCourseComponent {
  
  constructor(private courseService:CourseService,private messageService:MessageService,private router:Router, private roomService: RoomService) { }

  @ViewChild('iconDropdown') iconDropdown!: Dropdown;
  @ViewChild('backgroundDropdown') backgroundDropdown!: Dropdown;
  @ViewChild('roomDropdown') roomDropdown!: Dropdown;

  items: MenuItem[] | undefined;
  visible!: boolean;
  courseName!:string;
  course!: any;
  rooms!: Room[];
  roomName!: any[];
  selectedStartTime: any;
  selectedEndTime: any;
  filteredStartTime: any[] = [];
  filteredEndTime: any[] = [];
  selectedRoom: any;
  selectedDays: string[] = [];
  savedCourse!: Course;

  startTime: any[] = [
    { name: 8 }, { name: 9 }, { name: 10 }, { name: 11 },
    { name: 12 }, { name: 13 }, { name: 14 }, { name: 15 },
    { name: 16 }, { name: 17 }, { name: 18 }, { name: 19 },
    { name: 20 }, { name: 21 }, { name: 22 }
  ];

  endTime: any[] = [
    { name: 9 }, { name: 10 }, { name: 11 },{ name: 12 },
    { name: 13 }, { name: 14 }, { name: 15 },{ name: 16 }, 
    { name: 17 }, { name: 18 }, { name: 19 },{ name: 20 },
    { name: 21 }, { name: 22 }, { name: 23 }
  ];

  daysOfWeek = [
    { name: 'Monday', selected: false },
    { name: 'Tuesday', selected: false },
    { name: 'Wednesday', selected: false },
    { name: 'Thursday', selected: false },
    { name: 'Friday', selected: false },
  ];


  ngOnInit(): void {
    this.items = [{ label: 'Course List', routerLink: '/course' }, { label: 'Add Course' }];
    this.getRooms();
    this.filteredStartTime = [...this.startTime];
    this.filteredEndTime = [...this.endTime];
  }

  onSubmit() {
    this.course = {
      id: null,
      startTime: this.selectedStartTime.name,
      endTime: this.selectedEndTime.name,
      courseName: this.courseName,
      days: this.selectedDays,
      roomNumber: this.selectedRoom.name
    };
    console.log(this.course);

    this.courseService.saveCourse(this.course).subscribe((res:any) => {

      this.savedCourse = res;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Course added" });
      this.router.navigate(['/course']);

    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
     
    });
    

  }

  onStartTimeChange() {
    const selectedStartTimeValue = this.selectedStartTime ? this.selectedStartTime.name : null;
    this.filteredEndTime = this.endTime.filter(time => time.name > selectedStartTimeValue);
  }

  onEndTimeChange() {
    debugger
    const selectedEndTimeValue = this.selectedEndTime ? this.selectedEndTime.name : null;
    this.filteredStartTime = this.startTime.filter(time => time.name < selectedEndTimeValue);
  }


  getRooms() {
    this.roomService.getAllRooms().subscribe((res: Room[]) => {
      console.log(res);
      this.rooms = res;
      this.populateDropdowns();
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    })
  }

  populateDropdowns() {
    const roomNamesSet = new Set<string>();
    this.roomName = [];
    this.rooms.forEach(room => {
      if (!roomNamesSet.has(room.roomName)) {
        roomNamesSet.add(room.roomName);
        this.roomName.push({ name: room.roomName });
      }
    });
  }

  onDayChange(dayName: string, event: any) {
    if (event.target.checked) {
      this.selectedDays.push(dayName);
    } else {
      const index = this.selectedDays.indexOf(dayName);
      if (index > -1) {
        this.selectedDays.splice(index, 1);
      }
    }
  }

  showDialog() {
    this.visible = true;
  }

}

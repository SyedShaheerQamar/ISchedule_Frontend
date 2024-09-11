import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthguardService } from 'src/app/auth-service/authguard/authguard.service';
import { RoomService } from '../service/room.service';
import { Room } from 'src/app/model/room';
import { Course } from 'src/app/model/room';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
  providers: [MessageService]
})
export class RoomListComponent implements OnInit{
  visible!: boolean;
  visibleRoom!: boolean;
  dId!:number;
  items: MenuItem[] | undefined;
  rooms:Room[] = [];
  roomName!: String;
  course!: Course[];

  constructor(
    private roomService:RoomService,
    private messageService:MessageService, 
    private authguardService: AuthguardService
  ) { }
  
 

  ngOnInit() {
      this.items = [{ label: 'Room List'}];
      this.getRooms();
  }

  hasPermission():boolean{
    return this.authguardService.hasAdminPermission()
  }

  getRooms(){
   this.roomService.getAllRooms().subscribe((res:Room[])=>{
    this.rooms=res;  
    console.log(this.rooms);
    
    
   },error=>{
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
   })
  }


  deleteRoomByID(id:number){
    this.roomService.deleteRoomByID(id).subscribe((res:Room)=>{
      this.visible = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Driver is deleted on id '+res.id});
      this.getRooms();
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
      this.visible = false;
      this.getRooms();
    });
   }

   AddCourses(name: any){
    console.log(name);
    console.log({ "roomName": name });
    
    this.roomService.saveNewRoom({ "roomName": name }).subscribe((res:any)=>{
      this.visibleRoom = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Room is added'});
      this.getRooms();
    },error=>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
    });
   }

  showDialog(id:number) {
    this.dId=id;
    this.visible = true;
  }

  showDialogAddRoom() {
    this.visibleRoom = true;
  }
}

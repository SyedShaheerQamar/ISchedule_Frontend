import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/model/room';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http:HttpClient) { }
  url=environment.baseurl;


  saveNewRoom(name: any) {
    return this.http.post<any>(this.url.concat("/room/save"), name);
  }

  getAllRooms():Observable<Room[]>{
    return this.http.get<Room[]>(this.url.concat("/room"));
  }

  deleteRoomByID(id:number):Observable<Room>{
    return this.http.delete<Room>(this.url.concat('/room/',id.toString()));
  }

  saveCateogry(category: any):Observable<any>{
    return this.http.post<any>(this.url.concat("/category/saveCategory"), category)
  }
}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/model/room';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  constructor(private http:HttpClient) { }
  url=environment.baseurl;

  getTimeTable():Observable<any>{
    return this.http.get<any>(this.url.concat("/course/timetable"))
  }

}

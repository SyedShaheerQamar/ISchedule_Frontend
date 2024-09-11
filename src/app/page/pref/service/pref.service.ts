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
export class PrefService {

  constructor(private http:HttpClient) { }
  url=environment.baseurl;


  getAllPref():Observable<Course[]>{
    return this.http.get<Course[]>(this.url.concat("/pref"))
  }

  updateCourse(id: any):Observable<Course>{
    return this.http.put<Course>(this.url.concat("/pref/updateCourse/"+id), null);
  }

  deleteCourse(id: any):Observable<Course>{
    return this.http.delete<Course>(this.url.concat("/pref/"+id));
  }
}

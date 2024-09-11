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
export class CourseService {
  constructor(private http:HttpClient) { }
  url=environment.baseurl;


  getAllCourse():Observable<Course[]>{
    return this.http.get<Course[]>(this.url.concat("/course"))
  }

  deleteCourseByID(id:number){
    return this.http.delete(this.url.concat('/course/',id.toString()));
  }

  saveCourse(course: any):Observable<any>{
    return this.http.post<any>(this.url.concat("/course/save"), course)
  }

  savePref(course: any):Observable<any>{
    return this.http.post<any>(this.url.concat("/pref/save"), course)
  }

  assignStudentCourse(email: any, course: any):Observable<any>{
    return this.http.post<any>(this.url.concat("/user/saveCourse/"+email+"/"+course), null)
  }
}

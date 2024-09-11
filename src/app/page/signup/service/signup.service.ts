import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http:HttpClient) { }
  url=environment.baseurl;

  registerUser(registrationForm: any){
    return this.http.post(this.url.concat("/auth/register"), registrationForm);
  }
}

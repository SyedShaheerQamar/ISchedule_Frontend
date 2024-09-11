import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PermissionAuthService {
  constructor() { }
  private token=localStorage.getItem('accessToken');
  private decodedToken!:any
  permissionManager() {
    this.token = localStorage.getItem('role'); 
    this.decodedToken=jwtDecode(this.token!)
 
    
    if(this.token != null){
      return true
    }

    return false
  }
}

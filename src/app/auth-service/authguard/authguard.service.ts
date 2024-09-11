import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

token!:any;

  constructor(private router: Router) {

  }

  private permissionName!: string | null ;
  // private token = localStorage.getItem('accessToken');
  // private decodeToken = this.getDecodedAccessToken(this.token!)
  // private userPermissions: string[] = this.decodeToken.PERMISSIONS;

  // PermissionRoutes: { permission: string, route: string[] }[] = [
  //   { permission: 'Dash Board', route: ['/home', '/'] },
  //   { permission: 'User', route: ['/user', '/add-user'] },
  //   { permission: 'Category', route: ['/category', '/add-category'] },
  //   { permission: 'Request', route: ['/request'] },
    
  // ]


  isAuthenticated(state: RouterStateSnapshot): boolean {
    debugger
    this.token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    const decodedToken: any = jwtDecode(this.token);
    localStorage.setItem('email', decodedToken.sub);
    
    if (this.tokenExists()) {
      

      if (role == "ADMIN" || role == "STUDENT" || role == "ASSISTANT") {

        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      
      this.router.navigate(['/login']);
      return false;
    }
  }

  // private getPermissionByUrl(url: string): string | null {

  //   for (const permissionRoute of this.PermissionRoutes) {
  //     if (permissionRoute.route.some(route => this.isRouteMatch(url, route))) {
  //       return permissionRoute.permission;
  //     }
  //   }

  //   return null; // If no match found
  // }

  // private isRouteMatch(url: string, route: string): boolean {
  //   const regex = new RegExp('^' + route.replace(/:[^\/]+/g, '[^\/]+') + '$');
  //   return regex.test(url);
  // }

  private tokenExists(): boolean {
    const token = localStorage.getItem('accessToken');

    return !!token;
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error('Error decoding JWT token:' + Error);
    }
  }
  hasAdminPermission(): boolean {
    const token = localStorage.getItem('role');
    if(token == "ADMIN"){
      return true;
    }

    return false;
  }

  hasAssistantPermission(): boolean {
    const token = localStorage.getItem('role');
    if(token == "ASSISTANT"){
      return true;
    }

    return false;
  }

  hasStudentPermission(): boolean {
    const token = localStorage.getItem('role');
    if(token == "STUDENT"){
      return true;
    }

    return false;
  }
}



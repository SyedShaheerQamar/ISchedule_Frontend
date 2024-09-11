import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth-service/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [MessageService]
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  error: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Initialize the login form with validation
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe((res:any)=>{
      
        localStorage.setItem("accessToken", res.token);
        localStorage.setItem("role", res.role);
        
        this.router.navigate(['/home']);
  
      },(error:any)=>{
        this.error=true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
      })
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from './service/signup.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent {
  signupForm: FormGroup;
  dropdownOptions = ['Student', 'Admin', 'Assistant'];
  error: boolean = false;

  constructor(private fb: FormBuilder, private signupService: SignupService,private router: Router, private messageService: MessageService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);

      this.signupService.registerUser(this.signupForm.value).subscribe((res:any) => {
        debugger
        this.router.navigate(['/login']);

      },
      (error:any)=>{
        debugger
        this.error=true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
      });

    }
  }

}

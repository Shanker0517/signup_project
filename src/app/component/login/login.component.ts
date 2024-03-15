import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserserviceService } from '../../core/Services/userservice.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[UserserviceService]
})
export class LoginComponent {
  loginForm!: FormGroup
  constructor(private userService:UserserviceService, public router:Router) {
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    });
  }
  onSubmit() {
    // console.log()
    if (this.loginForm.valid){
      this.userService.login(this.loginForm.value).subscribe(
        {
          next: (response: any) => { 
            console.log('Api response', response)
            this.router.navigateByUrl('')    
        },
          error:(error:any)=>{
            this.loginForm.get('email')?.setErrors({ 'emailerror': true, 'email_error': error.error['email'] });
            this.loginForm.get('password')?.setErrors({ 'passworderror': true, 'password_error': error.error['password'] });
          alert('error in form data')
          }
        }
      )
    }
  }
}

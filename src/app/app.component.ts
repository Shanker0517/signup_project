import { UserserviceService } from './Services/userservice.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Userinterface } from './interfaces/userinterface';
import { HttpClientModule } from '@angular/common/http';
import { error } from 'console';
import { response } from 'express';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, ReactiveFormsModule, NgbDatepickerModule, NgbDatepickerModule, NgbAlertModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UserserviceService]
})
export class AppComponent {
  title = 'ReactiveForms';
  userForm!: FormGroup;
  constructor(private UserDataService: UserserviceService) {
    this.userForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      middlename: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateofbirth: new FormControl('', [Validators.required]),
      phoneno: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      conformPassword: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    // console.log()
  }
  onSubmit(): void {
    // console.log(this.userForm.value)
    if (this.userForm.valid) {
      const userData: Userinterface = this.userForm.value;
      this.UserDataService.addUser(userData).subscribe({
        next: (response) => { console.log('Api response', response) },
        error: (error) => {
          console.log('errors', error.error);
          // Set the error message to the phoneno FormControl
          this.userForm.get('firstname')?.setErrors({ 'firstnameerror': true, 'firstname_error': error.error['firstname'] });
          this.userForm.get('middlename')?.setErrors({ 'middlenameerror': true, 'middlename_error': error.error['middlename'] });
          this.userForm.get('lastname')?.setErrors({ 'lastnameerror': true, 'lastname_error': error.error['lastname'] });
          this.userForm.get('email')?.setErrors({ 'emailerror': true, 'email_error': error.error['email'] });
          this.userForm.get('dateofbirth')?.setErrors({ 'dateofbirtherror': true, 'dateofbirth_error': error.error['dateofbirth'] }); 
          this.userForm.get('phoneno')?.setErrors({ 'phnoerror': true, 'phoneno_error': error.error['phoneno'] });
          this.userForm.get('password')?.setErrors({ 'passworderror': true, 'password_error': error.error['password'] });
          alert('error in form data')
        },
        complete: () => {
          this.userForm.reset();
          alert('form saved successfully')
        }
      })
    }
  }
}
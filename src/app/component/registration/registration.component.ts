import { UserserviceService } from '../../core/Services/userservice.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { Userinterface } from '../../interfaces/userinterface';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, ReactiveFormsModule, NgbDatepickerModule, NgbDatepickerModule, NgbAlertModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  providers: [UserserviceService]
})
export class RegistrationComponent {
  userForm!: FormGroup;
  constructor(private UserDataService: UserserviceService) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      dateofbirth: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneno: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      pincode: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required]),
      conformPassword: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    // console.log()
  }
  onSubmit(): void {
    var r
    // console.log(this.userForm.value)
    if (this.userForm.valid) {
      const userData: Userinterface = this.userForm.value;
      this.UserDataService.addUser(userData).subscribe({
        next: (response: any) => { console.log('Api response', response) },
        error: (error :any) => {
          console.log('errors', error.error);
          // Set the error message to the phoneno FormControl
          this.userForm.get('username')?.setErrors({ 'usernameerror': true, 'username_error': error.error['username'] });
          this.userForm.get('address')?.setErrors({ 'addresserror': true, 'address_error': error.error['address'] });
          this.userForm.get('city')?.setErrors({ 'cityerror': true, 'city_error': error.error['city'] });
          this.userForm.get('email')?.setErrors({ 'emailerror': true, 'email_error': error.error['email'] });
          this.userForm.get('dateofbirth')?.setErrors({ 'dateofbirtherror': true, 'dateofbirth_error': error.error['dateofbirth'] }); 
          this.userForm.get('phoneno')?.setErrors({ 'phnoerror': true, 'phoneno_error': error.error['phoneno'] });
          this.userForm.get('pincode')?.setErrors({ 'pincodeerror': true, 'pincode_error': error.error['pincode'] });
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

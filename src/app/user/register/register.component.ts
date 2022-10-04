import { Auth, createUserWithEmailAndPassword, user } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addDoc, collection } from '@firebase/firestore';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/_services/auth.service';
import { Component } from '@angular/core';
import { EmailTaken } from '../_validators/email-taken';
import { Firestore } from '@angular/fire/firestore';
import { IUser } from 'src/app/_models/user';
import { RegisterValidators } from '../_validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showAlert = false;
  alertMessage = '';
  alertColor = 'blue';

  inSubmission = false;

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email], [this.emailTaken.validate]);
  age = new FormControl(null, [Validators.required, Validators.min(18), Validators.max(120)]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]);

  constructor(private authService: AuthService, private emailTaken: EmailTaken) {}

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.match('password', 'confirmPassword')]
  );

  async register() {
    this.showAlert = true;
    this.alertMessage = 'Please wait your account is being created';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.authService.createUser(this.registerForm.value);
    } catch (e) {
      console.log('register error: ', e);
      this.alertMessage = 'An unexpected error ocurred! Try again later';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }
    this.alertMessage = 'Success your account has been created';
    this.alertColor = 'green';
  }
}

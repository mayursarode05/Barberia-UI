import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BarberiaService } from '../../../core/services/barberia.service';
import { LoggedInResponse } from '../../models/LoginVM';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  providers : [BarberiaService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = <FormGroup>{};
  subscription$ : Subscription = new Subscription();

  constructor(private fb:FormBuilder, private service: BarberiaService, private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.InItLoginForm();
  }

  InItLoginForm = () => {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  handleLogin = () =>{
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.subscription$.add(
        this.service.login(this.loginForm.value).subscribe(
          {
            next: (response: LoggedInResponse) => {
                sessionStorage.setItem('token', response?.token);
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
              console.log(error);
            }
          }
        )
      );
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}

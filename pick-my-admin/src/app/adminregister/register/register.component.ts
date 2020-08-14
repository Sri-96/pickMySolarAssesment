import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MustMatch } from '../../shared/must-match.validator';
import { AuthserviceService } from '../../services/authservice.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private authService:AuthserviceService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      registredDate: new Date(),
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const data = (this.registerForm.value);
    const response:any = this.authService.register(data);    
    if(response.status == 200 ){
      let users = JSON.parse(localStorage.getItem('users')) || [];
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      Swal.fire(
        '',
        'Successfully registered.',
        'success',
      )
      
    }else{
      Swal.fire(
        '',
        response,
        'warning',
      )   
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}

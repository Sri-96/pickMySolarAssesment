import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService:AuthserviceService
     
  ) {
      // redirect to home if already logged in
      // if (this.authService.currentUserValue) {
      //     this.router.navigate(['/admin/home']);
      // }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }
      const data = (this.loginForm.value)
      const response:any = this.authService.authenticate(data);

      if(response.status == 200){
        alert('SUCCESS!!\n\n' + JSON.stringify(this.loginForm.value));
        this.router.navigate(['/admin']);
        
      }else{
        alert(response);
      }
      
  }
}
